/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';

import {
    checkHref,
    type ContentModel,
    defaultLimits,
    type PayloadDeclaration,
    findInvalidPayload,
    isRecord,
} from '#/model';
import { type TreeNode, encodeTree, findUnsafeJson, snapshot } from '#/model/internal';
import { type CommandContext, type CommandLookup, type EngineCommand } from '#/runtime/definition';

import { type EditorRuntime } from '../runtime';
import { mediaOf } from '../session/lifecycle/uploadsWiring';
import { type AuthoringPolicy, type CommandState } from '../types';

import { policyOf } from './checked';
import { composer } from './composer';
import { documentApi } from './document';
import { type CommandOutcome, type DocumentApi } from './documentApi';

/** The session a plugin command runs in, as the runtime hands it over in `CommandContext.session`. */
export type CommandSession = {
    runtime: EditorRuntime;
    host: unknown;
};

const isCommandSession = (value: unknown): value is CommandSession => isRecord(value) && 'runtime' in value;

const sessionOf = (context: CommandContext | undefined): CommandSession | undefined => {
    const session = context?.session;
    if (!isCommandSession(session)) {
        return undefined;
    }

    return session;
};

const NOT_APPLICABLE: CommandOutcome = {
    status: 'rejected',
    code: 'not-applicable',
};

/** A payload as `execute` checks it: plain JSON, valid for its declaration, its `url` fields through the feature's policy. */
const checkedPayload = (
    command: EngineCommand,
    given: unknown,
    model: ContentModel,
): { payload: unknown } | undefined => {
    if (given !== undefined && findUnsafeJson(given, '') !== undefined) {
        return undefined;
    }

    const payload: unknown = snapshot(given);
    if (findInvalidPayload(command.payload, payload) !== undefined) {
        return undefined;
    }

    if (command.payload === undefined || !isRecord(payload)) {
        return { payload };
    }

    let policy: ReturnType<typeof policyOf>;
    if (command.featureId !== undefined) {
        policy = policyOf(model, command.featureId);
    }

    const checked: Record<string, unknown> = { ...payload };
    for (const [name, field] of Object.entries(command.payload.fields)) {
        const value = payload[name];
        if (field.type === 'url' && typeof value === 'string') {
            const result = checkHref(value, policy);
            if (!result.ok) {
                return undefined;
            }

            checked[name] = result.href;
        }
    }

    return { payload: checked };
};

/** What a query hands a command: the same session, and effects dropped. */
const quietOf = (context: CommandContext | undefined): CommandContext => ({
    defer: () => undefined,
    session: context?.session,
});

/** Runs a command with `context` plus a note of any refusal, and says `not-allowed` for a failure that followed one. */
const runNoting = (
    context: CommandContext | undefined,
    run: (noted: CommandContext) => boolean,
): boolean | 'not-allowed' => {
    let refused = false;
    const defer = context?.defer;
    const session = context?.session;
    const applied = run({
        defer: defer ?? (() => undefined),
        session,
        refuse: () => {
            refused = true;
        },
    });
    if (!applied && refused) {
        return 'not-allowed';
    }

    return applied;
};

/** The composer and session a command's document API reads. */
type CommandDocumentContext = {
    compose: ReturnType<typeof composer>;
    model: ContentModel;
    lookup: CommandLookup;
    context: CommandContext | undefined;
    session: CommandSession | undefined;
};

const editComposed = (context: CommandDocumentContext, command: EngineCommand, payload?: unknown): CommandOutcome => {
    if (context.compose.apply(command, payload)) {
        return { status: 'applied' };
    }

    return NOT_APPLICABLE;
};

const executeNested = (context: CommandDocumentContext, id: string, given: unknown): CommandOutcome => {
    const command = context.lookup(id);
    if (command === undefined) {
        return { status: 'rejected', code: 'unknown-command' };
    }

    const checked = checkedPayload(command, given, context.model);
    if (checked === undefined) {
        return { status: 'rejected', code: 'invalid-payload' };
    }

    const refused = context.session?.runtime.refusal(command, context.compose.state(), checked.payload);
    if (refused !== undefined) {
        return { status: 'rejected', code: refused };
    }

    const applied = runNoting(context.context, (noted) => context.compose.apply(command, checked.payload, noted));
    if (applied === 'not-allowed') {
        return { status: 'rejected', code: 'not-allowed' };
    }

    if (applied) {
        return { status: 'applied' };
    }

    return NOT_APPLICABLE;
};

const queryNested = (context: CommandDocumentContext, id: string, given: unknown): CommandState => {
    const command = context.lookup(id);
    if (command === undefined) {
        return {
            enabled: false,
            active: false,
            disabledReason: 'unknown-command',
        };
    }

    const checked = checkedPayload(command, given, context.model);
    if (checked === undefined) {
        return {
            enabled: false,
            active: false,
            disabledReason: 'invalid-payload',
        };
    }

    const quiet = quietOf(context.context);
    const active = command.active(context.compose.state(), checked.payload, quiet);
    const refused = context.session?.runtime.refusal(command, context.compose.state(), checked.payload);
    if (refused !== undefined) {
        return { enabled: false, active, disabledReason: refused };
    }

    const enabled = runNoting(quiet, (noted) =>
        command.run(context.compose.state(), undefined, checked.payload, noted),
    );
    if (enabled === 'not-allowed') {
        return {
            enabled: false,
            active,
            disabledReason: 'not-allowed',
        };
    }

    return {
        enabled,
        active,
        disabledReason: enabled ? null : 'not-applicable',
    };
};

const commandUploads = (session: CommandSession | undefined) => {
    if (session === undefined) {
        return undefined;
    }

    return mediaOf(session.runtime)?.uploads;
};

/**
 * The document API inside a running command: reads see its edits so far, and its edits compose into one step. A
 * command it runs gets `context` and the checks the session runs before a command.
 */
const commandDocumentApi = (
    compose: ReturnType<typeof composer>,
    model: ContentModel,
    schema: Schema,
    lookup: CommandLookup,
    context: CommandContext | undefined,
    session: CommandSession | undefined,
): DocumentApi => {
    let limits = defaultLimits;
    if (session !== undefined) {
        limits = session.runtime.limits;
    }

    const api: CommandDocumentContext = { compose, model, lookup, context, session };

    return documentApi({
        model,
        schema,
        lookup,
        limits,
        state: compose.state,
        resolve: compose.resolve,
        edit: (command, payload) => editComposed(api, command, payload),
        refusal: (before, transaction) => session?.runtime.writeRefusal(before, transaction),
        refused: () => context?.refuse?.(),
        execute: (id, given) => executeNested(api, id, given),
        query: (id, given) => queryNested(api, id, given),
        // A capture commits on its own, which a running command cannot.
        capture: () => undefined,
        release: (target) => context?.defer(() => session?.runtime.handle.releaseTarget(target)),
        select: (transaction) => {
            compose.select(transaction);

            return true;
        },
        policy: () =>
            session?.runtime.policy ?? {
                features: {},
                creatableHeadingLevels: [],
                enterBehavior: 'none',
            },
        editable: () => session?.runtime.handle.getSummary().mode === 'editable',
        positionAt: () => undefined,
        document: (state) => encodeTree(state.doc.toJSON() as TreeNode, model).document,
        later: (effect) => context?.defer(effect),
        uploads: () => commandUploads(session),
    });
};

/** A plugin command, written over the API it is handed, which runs only through that API. */
export type PluginCommandSpec<Api, Payload = never> = {
    payload?: PayloadDeclaration;
    run: (api: Api, payload: Payload) => boolean;
    enabled?: (api: Api, payload: Payload) => boolean;
    active?: (api: Api, payload: Payload) => boolean | 'mixed';
    refuses?: (policy: AuthoringPolicy, payload: Payload) => boolean;
    readOnly?: boolean;
};

/**
 * The engine command of a plugin command. `extend` adds the session's hosts to the document API, holding their
 * effects until the command has run for real.
 */
export const pluginCommand = <Api, Payload = never>(
    spec: PluginCommandSpec<Api, Payload>,
    model: ContentModel,
    schema: Schema,
    lookup: CommandLookup,
    extend: (api: DocumentApi, context: CommandContext | undefined, session: CommandSession | undefined) => Api,
): EngineCommand => {
    // The spec's payload and read-only fields are set only when it declares them.
    const declared: { payload?: PayloadDeclaration; readOnly?: boolean } = {};
    if (spec.payload !== undefined) {
        declared.payload = spec.payload;
    }

    if (spec.readOnly === true) {
        declared.readOnly = true;
    }

    return {
        run: (state, dispatch, given, context) => {
            // A key binding passes `null` for no payload; a query straight on the engine may pass one `execute` never checked.
            let payload = given;
            if (given === null && spec.payload === undefined) {
                payload = undefined;
            }

            if (findInvalidPayload(spec.payload, payload) !== undefined) {
                return false;
            }

            const session = sessionOf(context);
            // `enabled` answers a query, so neither its edits nor its effects reach the run.
            if (spec.enabled !== undefined) {
                const quiet = quietOf(context);
                const probe = extend(
                    commandDocumentApi(composer(state), model, schema, lookup, quiet, session),
                    quiet,
                    session,
                );
                if (!spec.enabled(probe, payload as Payload)) {
                    return false;
                }
            }

            const compose = composer(state);
            const api = extend(commandDocumentApi(compose, model, schema, lookup, context, session), context, session);
            if (!spec.run(api, payload as Payload)) {
                return false;
            }

            const transaction = compose.finish();
            if (transaction !== undefined) {
                dispatch?.(transaction);
            }

            return true;
        },
        active: (state, payload, context) => {
            if (spec.active === undefined || findInvalidPayload(spec.payload, payload) !== undefined) {
                return false;
            }

            const session = sessionOf(context);

            return spec.active(
                extend(commandDocumentApi(composer(state), model, schema, lookup, context, session), context, session),
                payload as Payload,
            );
        },
        policyRefuses: (policy, payload) =>
            spec.refuses !== undefined &&
            findInvalidPayload(spec.payload, payload) === undefined &&
            spec.refuses(policy as AuthoringPolicy, payload as Payload),
        ...declared,
        viaExecute: true,
    };
};
