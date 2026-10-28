/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, type Transaction } from 'prosemirror-state';

import { checkHref, type HrefPolicy, hrefPolicyOf, findInvalidPayload, isRecord } from '#/model';
import { compiledModel, diagnostic } from '#/model/internal';
import { type CompiledDefinition, type EngineCommand, ORIGIN_META } from '#/runtime/definition';

import { type Composition } from '../state/composition';
import { type Lifecycle } from '../state/lifecycle';
import { type ModeService } from '../state/mode';
import { type PolicyService } from '../state/policy';
import { type Store } from '../state/store';
import { type Attempt, type Prepared, type RejectedCode, type Route } from '../state/types';

import { pluginError } from './prepare';

type Checked = { payload: unknown } | undefined;
type Base = EditorState | RejectedCode;

/** The services one command attempt reads. */
type AttemptArgs = {
    definition: CompiledDefinition;
    store: Store;
    lifecycle: Pick<Lifecycle, 'is'>;
    mode: ModeService;
    policy: Pick<PolicyService, 'refusal'>;
    composition: Pick<Composition, 'active'>;
    commit: {
        prepare(root: Transaction, ids: () => string, fromView: boolean): Prepared;
    };
};

/** The attempt arguments, the session, and each feature's URL policy. */
type AttemptContext = AttemptArgs & {
    session: object;
    hrefPolicies: Map<EngineCommand, HrefPolicy>;
};

// The URL policy of each command whose feature narrows `checkHref`, which its `url` payload fields must pass too.
const hrefPoliciesOf = (definition: CompiledDefinition) =>
    new Map<EngineCommand, HrefPolicy>(
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
const withCheckedUrls = (context: AttemptContext, command: EngineCommand, payload: unknown): Checked => {
    if (command.payload === undefined || !isRecord(payload)) {
        return { payload };
    }

    const hrefPolicy = context.hrefPolicies.get(command);
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

const readyToRun = (
    context: AttemptContext,
    command: EngineCommand | undefined,
    checked: Checked,
    base: Base,
): { ok: true; command: EngineCommand; payload: unknown; state: EditorState } | { ok: false; attempt: Attempt } => {
    if (command === undefined) {
        return { ok: false, attempt: { code: 'unknown-command' } };
    }

    // One JSON copy is checked and run, so an accessor or proxy cannot change the payload in between.
    if (checked === undefined) {
        return { ok: false, attempt: { code: 'invalid-payload' } };
    }

    if (findInvalidPayload(command.payload, checked.payload) !== undefined) {
        return { ok: false, attempt: { code: 'invalid-payload' } };
    }

    const urls = withCheckedUrls(context, command, checked.payload);
    if (urls === undefined) {
        return { ok: false, attempt: { code: 'invalid-payload' } };
    }

    const { payload } = urls;
    if (context.lifecycle.is('transitioning')) {
        return { ok: false, attempt: { code: 'busy' } };
    }

    if (!context.lifecycle.is('ready')) {
        return { ok: false, attempt: { code: 'not-ready' } };
    }

    if (context.mode.refusesReadOnly(command)) {
        return { ok: false, attempt: { code: 'readonly' } };
    }

    if (typeof base === 'string') {
        return { ok: false, attempt: { code: base } };
    }

    const refused = context.policy.refusal(command, base, payload);
    if (refused !== undefined) {
        return { ok: false, attempt: { code: refused } };
    }

    return { ok: true, command, payload, state: base };
};

/** Runs a command with a dispatch that captures its transaction, then prepares it; `effects` take what it defers. */
const attemptCommand = (
    context: AttemptContext,
    command: EngineCommand | undefined,
    checked: Checked,
    base: Base,
    ids: () => string,
    route: Route,
    effects?: (() => void)[],
): Attempt => {
    const ready = readyToRun(context, command, checked, base);
    if (!ready.ok) {
        return ready.attempt;
    }

    const { payload, state } = ready;
    const dispatched: Transaction[] = [];
    let refusedWrite = false;
    const commandContext = {
        defer: (effect: () => void) => effects?.push(effect),
        refuse: () => {
            refusedWrite = true;
        },
        session: context.session,
    };
    let applicable: boolean;
    try {
        applicable = ready.command.run(state, (transaction) => dispatched.push(transaction), payload, commandContext);
    } catch (error) {
        // A plugin that throws while a command's API write applies drops the command, as it drops a batch.
        return {
            code: 'not-applicable',
            diagnostic: pluginError(error, ready.command.featureId),
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
    if (context.mode.mode() === 'readonly' && root.docChanged) {
        return { code: 'readonly' };
    }

    // Work that runs later through a target maps the user's selection through its change instead of moving it there.
    if (route !== 'host' && state !== context.store.state) {
        root.setSelection(context.store.state.selection.map(root.doc, root.mapping));
    }

    // An async completion is no undo step of its own.
    if (route === 'async') {
        root.setMeta(ORIGIN_META, 'async').setMeta('addToHistory', false);
    }

    const prepared = context.commit.prepare(root, ids, false);
    // A host call never changes content during a composition, which queued intents and async results wait out.
    if ('candidate' in prepared && prepared.candidate.doc !== context.store.state.doc && context.composition.active()) {
        return { code: 'composition-active' };
    }

    return prepared;
};

/** The attempt a session's commands share, with each feature's URL policy already read. */
export const createAttempt = (args: AttemptArgs, session: object) => {
    const context: AttemptContext = { ...args, session, hrefPolicies: hrefPoliciesOf(args.definition) };

    return (
        command: EngineCommand | undefined,
        checked: Checked,
        base: Base,
        ids: () => string,
        route: Route,
        effects?: (() => void)[],
    ) => attemptCommand(context, command, checked, base, ids, route, effects);
};
