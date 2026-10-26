/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { type CompiledDefinition, type EngineCommand, ORIGIN_META } from '#/definition';
import { checkHref, type Diagnostic, type HrefPolicy, hrefPolicyOf, findInvalidPayload, isRecord } from '#/model';
import { compiledModel, diagnostic, findUnsafeJson, snapshot } from '#/model/internal';

import { nameOf } from '../events';
import { type CommandResult, type CommandState, type SelectionHandle } from '../types';

import { type Busy } from './busy';
import { type Composition } from './composition';
import { type Identity } from './identity';
import { type Lifecycle } from './lifecycle';
import { type ModeService } from './mode';
import { type PolicyService } from './policy';
import { type Store } from './store';
import { type Attempt, type Candidate, type Prepared, type RejectedCode, type Route } from './types';

type Checked = { readonly payload: unknown } | undefined;
type Base = EditorState | RejectedCode;

/** A plugin-error diagnostic with the failing feature and the error's name, never its message. */
export const pluginError = (error: unknown, featureId: string | undefined) => {
    const name = nameOf(error);
    if (featureId === undefined) {
        return diagnostic('runtime.plugin-error', undefined, { name }, 'error');
    }
    return diagnostic('runtime.plugin-error', undefined, { featureId, name }, 'error');
};

export const rejected = (code: RejectedCode): CommandResult => ({ status: 'rejected', code });

/** The payload as one frozen JSON copy, which is what is checked and run; `undefined` for one that is not plain JSON. */
export const checkedPayload = (given: unknown): Checked => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }
    return { payload: snapshot(given) };
};

export type Commands = {
    query(id: string, given?: unknown, options?: unknown): CommandState;
    queryOn(command: EngineCommand | undefined, checked: Checked, base: Base): CommandState;
    run(id: string, given: unknown, options: unknown, route: Route): CommandResult;
    runOn(command: EngineCommand | undefined, checked: Checked, base: () => Base, route: Route): CommandResult;
    execute(id: string, given?: unknown, options?: unknown): CommandResult;
    refusal(command: EngineCommand, base: EditorState, payload: unknown): RejectedCode | undefined;
    perform(command: EngineCommand, options?: { readonly target?: SelectionHandle }): CommandResult;
};

type Deps = {
    definition: CompiledDefinition;
    store: Store;
    identity: Identity;
    lifecycle: Lifecycle;
    mode: ModeService;
    policy: Pick<PolicyService, 'refusal'>;
    busy: Pick<Busy, 'run' | 'isBusy'>;
    composition: Pick<Composition, 'active'>;
    commit: {
        prepare(root: Transaction, ids: () => string, fromView: boolean): Prepared;
        install(prepared: Candidate): boolean;
        installedId(): string;
        queriedIds(): () => string;
    };
    baseOf: (options: unknown) => Base;
    focus: () => void;
    report: (diagnostic: Diagnostic) => void;
    fault: (diagnostic: Diagnostic) => void;
    inRender: () => boolean | undefined;
    commandHost: unknown;
    runtime: () => unknown;
};

const createAttempt = (a: Deps, session: object) => {
    const { definition, store, lifecycle, mode, policy, composition, commit } = a;
    // The URL policy of each command whose feature narrows `checkHref`, which its `url` payload fields must pass too.
    const hrefPolicies = new Map<EngineCommand, HrefPolicy>(
        [...definition.commands.values()].flatMap((command) => {
            const feature = compiledModel(definition.model).features.find(({ id }) => id === command.featureId);
            const hrefPolicy = feature === undefined ? undefined : hrefPolicyOf(feature.options);
            if (hrefPolicy === undefined) {
                return [];
            }
            return [[command, hrefPolicy] as const];
        }),
    );

    /** The payload with each `url` field as `checkHref` stores it, or `undefined` when its feature's policy refuses one. */
    const withCheckedUrls = (command: EngineCommand, payload: unknown): Checked => {
        if (command.payload === undefined || !isRecord(payload)) {
            return { payload };
        }
        const hrefPolicy = hrefPolicies.get(command);
        const checked: Record<string, unknown> = { ...payload };
        for (const [name, field] of Object.entries(command.payload.fields)) {
            const value = payload[name];
            if (field.type !== 'url' || typeof value !== 'string') {
                continue;
            }
            const result = checkHref(value, hrefPolicy);
            if (!result.ok) {
                return undefined;
            }
            checked[name] = result.href;
        }
        return { payload: checked };
    };

    /** Runs a command with a dispatch that captures its transaction, then prepares it; `effects` take what it defers. */
    const attempt = (
        command: EngineCommand | undefined,
        checked: Checked,
        base: Base,
        ids: () => string,
        route: Route,
        effects?: (() => void)[],
    ): Attempt => {
        if (command === undefined) {
            return { code: 'unknown-command' };
        }
        // One JSON copy is checked and run, so an accessor or proxy cannot change the payload in between.
        if (checked === undefined) {
            return { code: 'invalid-payload' };
        }
        if (findInvalidPayload(command.payload, checked.payload) !== undefined) {
            return { code: 'invalid-payload' };
        }
        const urls = withCheckedUrls(command, checked.payload);
        if (urls === undefined) {
            return { code: 'invalid-payload' };
        }
        const { payload } = urls;
        if (lifecycle.is('transitioning')) {
            return { code: 'busy' };
        }
        if (!lifecycle.is('ready')) {
            return { code: 'not-ready' };
        }
        if (mode.refusesReadOnly(command)) {
            return { code: 'readonly' };
        }
        if (typeof base === 'string') {
            return { code: base };
        }
        const refused = policy.refusal(command, base, payload);
        if (refused !== undefined) {
            return { code: refused };
        }
        const dispatched: Transaction[] = [];
        let refusedWrite = false;
        const context = {
            defer: (effect: () => void) => effects?.push(effect),
            refuse: () => {
                refusedWrite = true;
            },
            session,
        };
        let applicable: boolean;
        try {
            applicable = command.run(base, (transaction) => dispatched.push(transaction), payload, context);
        } catch (error) {
            // A plugin that throws while a command's API write applies drops the command, as it drops a batch.
            return {
                code: 'not-applicable',
                diagnostic: pluginError(error, command.featureId),
            };
        }
        if (dispatched.length > 1) {
            return {
                code: 'not-applicable',
                diagnostic: diagnostic('runtime.multiple-dispatch', undefined, undefined, 'error'),
            };
        }
        const [root] = dispatched;
        if (!applicable) {
            if (refusedWrite) {
                return { code: 'not-allowed' };
            }
            return { code: 'not-applicable' };
        }
        if (root === undefined) {
            return { unchanged: true };
        }
        // `readOnly` lets a command run in a read-only editor to open something, never to change content.
        if (mode.mode() === 'readonly' && root.docChanged) {
            return { code: 'readonly' };
        }
        // Work that runs later through a target maps the user's selection through its change instead of moving it there.
        if (route !== 'host' && base !== store.state) {
            root.setSelection(store.state.selection.map(root.doc, root.mapping));
        }
        // An async completion is no undo step of its own.
        if (route === 'async') {
            root.setMeta(ORIGIN_META, 'async').setMeta('addToHistory', false);
        }
        const prepared = commit.prepare(root, ids, false);
        // A host call never changes content during a composition, which queued intents and async results wait out.
        if ('candidate' in prepared && prepared.candidate.doc !== store.state.doc && composition.active()) {
            return { code: 'composition-active' };
        }
        return prepared;
    };
    return attempt;
};

export const createCommands = (a: Deps): Commands => {
    const { definition, identity, mode, policy, busy, commit, baseOf } = a;
    // What a plugin command reads its session from; `runtime` is read when a command runs, after it exists.
    const commandSession = {
        get runtime() {
            return a.runtime();
        },
        host: a.commandHost,
    };

    const attempt = createAttempt(a, commandSession);
    const queryOn: Commands['queryOn'] = (command, checked, base) => {
        let active: boolean | 'mixed' = false;
        if (command !== undefined && checked !== undefined && typeof base !== 'string') {
            active = command.active(base, checked.payload, { defer: () => undefined, session: commandSession });
        }
        const attempted = attempt(command, checked, base, commit.queriedIds(), 'host');
        if ('code' in attempted) {
            return { enabled: false, active, disabledReason: attempted.code };
        }
        return { enabled: true, active, disabledReason: null };
    };

    // Installs exactly what `query` checked, so the two agree.
    const runOn: Commands['runOn'] = (command, checked, base, route) => {
        if (busy.isBusy()) {
            return rejected('busy');
        }
        const effects: (() => void)[] = [];
        const result = busy.run((): CommandResult => {
            const attempted = attempt(command, checked, base(), commit.installedId, route, effects);
            if ('unchanged' in attempted) {
                return { status: 'no-op', stamp: identity.stamp(), contentChanged: false };
            }
            if ('candidate' in attempted) {
                const before = identity.commitSequence();
                const contentChanged = commit.install(attempted);
                // The view faulted while it installed the batch, which a later fault or `dispose` from a listener leaves applied.
                if (identity.commitSequence() === before) {
                    return rejected('not-ready');
                }
                return { status: 'applied', stamp: identity.stamp(), contentChanged };
            }
            if (attempted.diagnostic !== undefined) {
                a.report(attempted.diagnostic);
            }
            if (attempted.fault !== undefined) {
                a.fault(attempted.fault);
            }
            return rejected(attempted.code);
        });
        // Deferred effects, such as an overlay a plugin command opens, run once the command has run and its commit ended.
        if (result.status !== 'rejected') {
            for (const effect of effects) {
                effect();
            }
        }
        return result;
    };
    const run: Commands['run'] = (id, given, options, route) =>
        runOn(definition.commands.get(id), checkedPayload(given), () => baseOf(options), route);

    return {
        query: (id, given, options) => queryOn(definition.commands.get(id), checkedPayload(given), baseOf(options)),
        queryOn,
        run,
        runOn,
        execute: (id, given, commandOptions) => {
            // Commands belong in event handlers; a call inside a notification is already `busy`.
            if (!busy.isBusy() && a.inRender() === true) {
                a.report(diagnostic('react.execute-in-render', undefined, undefined, 'error'));
                return rejected('busy');
            }
            const result = run(id, given, commandOptions, 'host');
            // Without `focus: 'editor'` a command leaves focus where it is.
            if (isRecord(commandOptions) && commandOptions.focus === 'editor') {
                a.focus();
            }
            return result;
        },
        refusal: (command, base, payload) => {
            if (mode.refusesReadOnly(command)) {
                return 'readonly';
            }
            return policy.refusal(command, base, payload);
        },
        perform: (command, options) => runOn(command, { payload: undefined }, () => baseOf(options), 'host'),
    };
};
