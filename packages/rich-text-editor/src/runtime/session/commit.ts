/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type Diagnostic, type RichTextDocument } from '#/model';
import { diagnostic } from '#/model/internal';
import { COMMAND_META, NORMALIZE_META, ORIGIN_META } from '#/runtime/definition';

import { secondCopyInView } from '../engines';
import { type RuntimeEvents } from '../events';
import { ENTER_RULES_META } from '../inputRules';
import { scrollSelectionIntoView } from '../scroll';
import { countTargets, restoreTargets } from '../targets';
import { type ChangeOrigin } from '../types';

import { type Busy } from './busy';
import { actionOrigin, originOf } from './history';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type Metrics } from './metrics';
import { type PolicyService } from './policy';
import { DUPLICATE_ENGINE, type Prepare } from './prepare';
import { type Shown } from './shown';
import { type Store } from './store';
import { type BatchMetric, type Candidate, type Prepared } from './types';
import { type ViewService } from './view';

type SelectTarget = { anchor: number; head: number; scroll?: boolean } | { node: number; scroll?: boolean };

export type Commit = {
    /** The view's `dispatchTransaction`: the one path by which any change reaches the view. */
    commit(root: Transaction): void;
    /** Publishes a checked batch, then commits the roots that plugin views dispatched while it was installed. */
    install(candidate: Candidate): boolean;
    /** `false` when the view threw and the session faulted. */
    installState(next: EditorState): boolean;
    /** Runs `work`, which installs states, then commits the roots that plugin views dispatched meanwhile. */
    guarded<T>(work: () => T): T;
    /** Repairs the provisional batches, then checks them as one change from the published document; `false` on a fault. */
    settleProvisional(mapping: Transaction['mapping']): boolean;
    select(target: SelectTarget): void;
    markTyping(): void;
    clearDeferred(): void;
};

type CommitArgs = {
    store: Store;
    identity: Pick<Identity, 'bumpSequence' | 'bumpCommit' | 'commitSequence' | 'stamp'>;
    lifecycle: Pick<Lifecycle, 'is'>;
    policy: Pick<PolicyService, 'breaks' | 'exceeds'>;
    shown: Pick<Shown, 'published' | 'setPublished' | 'addProvisional' | 'emitSelection' | 'emitSaveStatus'>;
    views: Pick<ViewService, 'current' | 'call'>;
    busy: Pick<Busy, 'run'>;
    metrics: Pick<Metrics, 'record'>;
    prepare: Pick<Prepare, 'prepare' | 'installedId' | 'isProvisional' | 'markRules' | 'take'>;
    encode: (doc: Node) => RichTextDocument;
    emit: <K extends 'documentChange'>(event: K, value: RuntimeEvents[K]) => void;
    notify: () => void;
    report: (diagnostic: Diagnostic) => void;
    resources: { targets: number };
    /** What an effective change tells the capabilities, in the Event order, which `announce` calls. */
    hooks: { committed(transactions: readonly Transaction[], fromHistory: boolean): void; changed(): void };
    fault: (diagnostic: Diagnostic) => void;
    viewFault: (attached: EditorView, candidate: EditorState) => void;
};

const createInstaller = (a: CommitArgs) => {
    const { store, identity, shown, views, metrics, policy, prepare, hooks, notify, emit, encode, report, fault } = a;

    /**
     * Publishes the current state's document: counts an effective change, notifies selector stores, then emits the
     * change, the selection and the save status in the Event order.
     */
    const announce = (
        origin: ChangeOrigin,
        commandId: string | null,
        batch: BatchMetric,
        transactions: readonly Transaction[] = [],
    ): boolean => {
        const previous = shown.published();
        const current = store.state;
        shown.setPublished(current);
        // An effective change compares documents by node equality, never by serializing them.
        const changed = !current.doc.eq(previous.doc);
        if (changed) {
            identity.bumpSequence();
        }

        notify();
        if (changed) {
            let document: RichTextDocument | undefined;
            emit('documentChange', {
                stamp: identity.stamp(),
                commitSequence: identity.commitSequence(),
                origin,
                commandId,
                readDocument: () => {
                    if (document === undefined) {
                        document = encode(current.doc);
                    }

                    return document;
                },
            });
            metrics.record(batch);
            hooks.committed(transactions, origin === 'history');
        }

        shown.emitSelection();
        if (changed) {
            hooks.changed();
        }

        shown.emitSaveStatus();

        return changed;
    };

    const installState = (next: EditorState): boolean => {
        const previous = store.state;
        store.set(next);
        const attached = views.current();
        if (attached !== undefined && views.call(() => attached.updateState(next)).threw) {
            store.set(previous);
            a.viewFault(attached, next);

            return false;
        }

        identity.bumpCommit();
        a.resources.targets += countTargets(next) - countTargets(previous);

        return true;
    };

    /** Installs a batch in the view and counts it, then publishes it, or keeps a provisional batch for input settling. */
    const publish = ({ candidate, root, transactions, mapping, started, appended }: Candidate): boolean => {
        if (!installState(candidate)) {
            return false;
        }

        if (prepare.isProvisional(root)) {
            shown.addProvisional(mapping);
            notify();

            return false;
        }

        const origin = originOf(root);
        const command: unknown = root.getMeta(COMMAND_META);
        let commandId: string | null = null;
        if (origin === 'command' && typeof command === 'string') {
            commandId = command;
        }

        const event: unknown = root.getMeta('uiEvent');
        let kind: BatchMetric['kind'] = 'commit';
        if (event === 'paste' || event === 'drop') {
            kind = 'paste';
        }

        return announce(origin, commandId, { kind, started, appended }, transactions);
    };

    const settleProvisional = (mapping: Transaction['mapping']): boolean => {
        const started = Date.now();
        let appended = 0;
        // The repair runs inside the append limit before the settled batch publishes, and the check below judges it.
        const repaired = prepare.prepare(store.state.tr.setMeta(NORMALIZE_META, 'now'), prepare.installedId, false);
        if ('fault' in repaired && repaired.fault !== undefined) {
            fault(repaired.fault);

            return false;
        }

        if ('diagnostic' in repaired && repaired.diagnostic !== undefined) {
            report(repaired.diagnostic);
        }

        if ('candidate' in repaired && repaired.candidate.doc !== store.state.doc) {
            if (!installState(repaired.candidate)) {
                return false;
            }

            mapping.appendMapping(repaired.mapping);
            appended = repaired.appended;
        }

        if (
            !policy.breaks(shown.published().doc, store.state.doc, mapping) &&
            policy.exceeds(store.state.doc, shown.published().doc) === undefined
        ) {
            announce('input', null, { kind: 'commit', started, appended });

            return true;
        }

        // Targets released during the composition stay released, and those captured during it stay.
        const restore = restoreTargets(shown.published(), store.state, mapping);
        let restored = shown.published();
        if (restore !== undefined) {
            restored = restored.apply(restore);
        }

        if (!installState(restored)) {
            return false;
        }

        notify();

        return true;
    };

    return [installState, publish, settleProvisional] as const;
};

export const createCommit = (a: CommitArgs): Commit => {
    const { store, lifecycle, prepare, busy, views, report, fault } = a;
    const [installState, publish, settleProvisional] = createInstaller(a);
    let typing = false;
    let installing = false;
    // Roots that plugin views dispatch while an install runs, committed once its selectors and events are done.
    const deferred: Transaction[] = [];

    const guarded = <T>(work: () => T): T => {
        installing = true;
        let result: T;
        try {
            result = work();
        } finally {
            installing = false;
        }

        for (let next = deferred.shift(); next !== undefined; next = deferred.shift()) {
            // A listener of this install may have faulted or disposed the session, which then commits nothing more.
            if (!lifecycle.is('ready')) {
                deferred.length = 0;
                break;
            }

            commit(next);
        }

        return result;
    };

    const commit = (root: Transaction) => {
        // A plugin view's `update` may dispatch inside `view.updateState`; its root waits for the install to publish.
        if (installing) {
            deferred.push(root);

            return;
        }

        // A recorded `beforeinput` describes this batch only, accepted or not.
        const typed = typing;
        typing = false;
        // A faulted session installs nothing more, so a broken view never updates again.
        if (lifecycle.is('faulted', 'disposed')) {
            return;
        }

        if (root.before !== store.state.doc) {
            report(diagnostic('runtime.stale-transaction', undefined, undefined, 'error'));

            return;
        }

        // Input rules fire only on typed text, never on a paste or a command after a `beforeinput` that changed nothing.
        if (typed && actionOrigin(root) === undefined) {
            root.setMeta(ORIGIN_META, 'input');
            prepare.markRules(root);
        } else if (root.getMeta(ENTER_RULES_META) === true) {
            prepare.markRules(root);
        }

        busy.run(() => {
            const prepared: Prepared = prepare.take(root);
            if ('candidate' in prepared) {
                guarded(() => publish(prepared));
            } else if (prepared.fault !== undefined) {
                fault(prepared.fault);
            } else if (prepared.diagnostic !== undefined) {
                report(prepared.diagnostic);
            }

            if (secondCopyInView(store.state.schema)) {
                report(DUPLICATE_ENGINE);
            }
        });
    };

    return {
        commit,
        install: (candidate) => guarded(() => publish(candidate)),
        installState,
        guarded,
        settleProvisional,
        select: (target) => {
            const { doc } = store.state;
            let transaction = store.state.tr;
            if ('node' in target) {
                transaction = transaction.setSelection(NodeSelection.create(doc, target.node));
            } else {
                transaction = transaction.setSelection(TextSelection.create(doc, target.anchor, target.head));
            }

            commit(transaction);
            const view = views.current();
            if (target.scroll !== true || view === undefined) {
                return;
            }

            // ProseMirror scrolls to the selection only while the browser's selection is in the surface, and a
            // panel that asks for this keeps focus.
            scrollSelectionIntoView(view, store.state.selection);
        },
        markTyping: () => {
            typing = true;
        },
        clearDeferred: () => {
            deferred.length = 0;
        },
    };
};
