/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type ResourceLimits } from '#/model';
import { diagnostic } from '#/model/internal';
import {
    APPEND_BATCH_META,
    type AppendBatch,
    AppendLimitError,
    NORMALIZE_META,
    type PluginOrigin,
} from '#/runtime/definition';

import { type InputSettling } from '../../dom/settle';
import { type ExceededLimit, storedNodeCount } from '../../guards/limits';
import { isHistoryTransaction } from '../../history';
import { firedRule, withoutRules, withRuleSetting } from '../../inputRules/inputRules';
import { pluginError } from '../../reporting/events';
import { type AuthoringPolicy } from '../../types';
import { type PolicyService } from '../state/policy';
import { type Shown } from '../state/shown';
import { type Store } from '../state/store';
import { type Candidate, type Prepared } from '../state/types';

import { type HistoryService } from './history';

// ProseMirror marks each DOM change it reads during a composition with this meta.
const COMPOSITION_META = 'composition';

// The checks of `../engines` cover a second copy of `prosemirror-model` only.
export const DUPLICATE_ENGINE = diagnostic(
    'runtime.duplicate-engine',
    undefined,
    { packages: ['prosemirror-model'] },
    'warning',
);

const unique = (values: readonly string[]) => [...new Set(values)];

const featureIdsWithoutCreate = (features: AuthoringPolicy['features']): string[] => {
    const refused: string[] = [];
    for (const [id, rules] of Object.entries(features)) {
        if (!rules.create) {
            refused.push(id);
        }
    }

    return refused;
};

export type Prepare = {
    /** A composition batch, and every batch after it until input settles, is checked and published then. */
    isProvisional(root: Transaction): boolean;
    /**
     * Applies a root transaction and every transaction plugins append to it, then the final policy and limit check,
     * which a provisional batch from the view takes once input has settled.
     */
    prepare(root: Transaction, ids: () => string, fromView: boolean): Prepared;
    /** The batch of `root` that `exceededLimit` just checked from this state, else a new one; the check is spent. */
    take(root: Transaction): Prepared;
    /** The next ID an install hands out: one a query drew, else a new one. */
    installedId(): string;
    /** An id function for one query: it replays the recorded ids, then records what it draws past them. */
    queriedIds(): () => string;
    /** The limit the batch of `root` would exceed, or `undefined`; keeps that batch for `take`. */
    exceededLimit(root: Transaction, followUp?: boolean): ExceededLimit | undefined;
    /** Marks a typed root with the rules the host's prop and the policy turn off now. */
    markRules(root: Transaction): void;
};

type PrepareArgs = {
    store: Pick<Store, 'state'>;
    composition: Pick<InputSettling, 'active'>;
    shown: Pick<Shown, 'provisional'>;
    policy: Pick<PolicyService, 'current' | 'finalCheck'>;
    history: Pick<HistoryService, 'group'>;
    limits: ResourceLimits;
    generate: () => string;
    inputRules: () => false | { exclude: readonly string[] } | undefined;
};

/** The batch half: whether a root is provisional, its preparation and its input rule marks. */
const createBatches = (args: PrepareArgs) => {
    const { store, composition, shown, policy, history, limits } = args;
    const isProvisional = (root: Transaction) =>
        composition.active() && (shown.provisional() !== undefined || root.getMeta(COMPOSITION_META) !== undefined);

    const prepare = (root: Transaction, ids: () => string, fromView: boolean): Prepared => {
        const batch: AppendBatch = {
            limit: limits.maxAppendedTransactions,
            now: () => Date.now(),
            generateId: ids,
            chain: [],
        };
        // A composition batch's repair waits for input to settle, so it never changes composing text.
        if (isProvisional(root)) {
            root.setMeta(NORMALIZE_META, 'later');
        }

        const started = Date.now();
        // History groups by this time, never by the `Date.now()` a transaction takes when created.
        root.setTime(started);
        history.group(root);
        let applied: ReturnType<EditorState['applyTransaction']>;
        try {
            applied = store.state.applyTransaction(root.setMeta(APPEND_BATCH_META, batch));
        } catch (error) {
            // A plugin that throws drops the batch, and the session stays ready.
            if (!(error instanceof AppendLimitError)) {
                return {
                    code: 'not-applicable',
                    diagnostic: pluginError(error, batch.failed?.featureId),
                };
            }

            const chain: readonly PluginOrigin[] = error.chain;
            const details = {
                features: unique(chain.map(({ featureId }) => featureId)),
                capabilities: unique(chain.map(({ capability }) => capability)),
                count: chain.length,
            };

            return { code: 'not-ready', fault: diagnostic('runtime.append-limit', undefined, details, 'error') };
        }

        if (applied.transactions.length === 0) {
            return { code: 'not-applicable' };
        }

        // A batch that keeps the document, such as a selection move, has nothing to check.
        const { doc } = applied.state;
        const mapping = root.mapping.slice();
        for (const transaction of applied.transactions.slice(1)) {
            mapping.appendMapping(transaction.mapping);
        }

        // The settle repair is judged with the composition it repairs, from the published document.
        if (doc !== store.state.doc && !(fromView && isProvisional(root)) && root.getMeta(NORMALIZE_META) !== 'now') {
            const { policy: refused, limit } = policy.finalCheck(
                store.state.doc,
                doc,
                mapping,
                isHistoryTransaction(root),
            );
            if (refused || limit !== undefined) {
                if (firedRule(applied.transactions)) {
                    return prepare(withoutRules(root), ids, fromView);
                }

                return { code: 'not-allowed', limit };
            }
        }

        const { transactions } = applied;

        return { candidate: applied.state, root, transactions, mapping, started, appended: transactions.length - 1 };
    };

    const markRules = (root: Transaction) => {
        const setting = args.inputRules();
        if (setting === false) {
            withoutRules(root);

            return;
        }

        let exclude: readonly string[] = [];
        if (setting !== undefined) {
            exclude = setting.exclude;
        }

        withRuleSetting(root, { exclude, refused: featureIdsWithoutCreate(policy.current().features) });
    };

    return [isProvisional, prepare, markRules] as const;
};

export const createPrepare = (args: PrepareArgs): Prepare => {
    const { store, limits } = args;
    const [isProvisional, prepare, markRules] = createBatches(args);
    // IDs a query drew, which the next install hands out first, so `execute` installs what `query` judged.
    const recorded: string[] = [];
    // The batch the last limit check prepared, from the state it read and with the recorded IDs it drew.
    let checked: { from: EditorState; drawn: number; prepared: Candidate } | undefined;
    const installedId = (): string => {
        const id = recorded.shift();
        if (id !== undefined) {
            return id;
        }

        return args.generate();
    };

    const queriedIds = (): (() => string) => {
        let at = 0;

        return () => {
            if (at === recorded.length) {
                recorded.push(args.generate());
            }

            const id = recorded[at] as string;
            at += 1;

            return id;
        };
    };

    return {
        isProvisional,
        markRules,
        prepare,
        installedId,
        queriedIds,
        take: (root) => {
            let prepared: Prepared;
            if (checked !== undefined && checked.prepared.root === root && checked.from === store.state) {
                recorded.splice(0, checked.drawn);
                prepared = checked.prepared;
            } else {
                prepared = prepare(root, installedId, true);
            }

            checked = undefined;

            return prepared;
        },
        exceededLimit: (root, followUp) => {
            checked = undefined;
            // Filling nodeIds keeps the node count, so a root over the node limit is refused before the fill draws one.
            const nodes = storedNodeCount(root.doc);
            if (followUp !== true && nodes > limits.maxDocumentNodes && nodes > storedNodeCount(store.state.doc)) {
                return 'maxDocumentNodes';
            }

            const query = queriedIds();
            let drawn = 0;
            const countedIds = () => {
                drawn += 1;

                return query();
            };

            const prepared = prepare(root, countedIds, true);
            if ('candidate' in prepared) {
                checked = { from: store.state, drawn, prepared };
            }

            if ('limit' in prepared) {
                return prepared.limit;
            }

            return undefined;
        },
    };
};
