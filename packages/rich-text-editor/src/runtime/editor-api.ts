/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Node, type Schema } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';

import { COMMAND_META, type CommandContext, type CommandLookup, type EngineCommand } from '#/definition';
import {
    type AttributeDeclaration,
    checkHref,
    type ContentModel,
    defaultLimits,
    type JsonObject,
    type PayloadDeclaration,
    type ResourceLimits,
} from '#/model';
import { attributesOf, compiledModel } from '#/model/compile';
import { hrefPolicyOf } from '#/model/href';
import { findInvalidPayload, findUnsafeJson, isRecord, isValidValue, snapshot } from '#/model/values';

import { type CapabilityImplementation, EDITS } from './capabilities';
import {
    type AncestorValue,
    type CommandOutcome,
    type DocumentApi,
    type EditorRange,
    type SelectionValue,
} from './document-api';
import { inCodeTextblock } from './positions';
import { type EditorRuntime, summarize } from './runtime';
import { appendSteps, carrySelection } from './transactions';
import { type AuthoringPolicy, type CommandOptions, type CommandResult, type CommandState } from './types';

export { type CommandContext } from '#/definition';

interface Positions {
    readonly from: number;
    readonly to: number;
}

const RANGES = new WeakMap<object, Positions & { readonly doc: Node }>();

/** The range from `from` to `to` in `doc`. */
export const rangeOf = (doc: Node, from: number, to: number): EditorRange => {
    const range = Object.freeze({});
    RANGES.set(range, { from, to, doc });
    return range as unknown as EditorRange;
};

/** The document positions behind a range this module made, as they were when it was read. */
export const positionsOf = (range: EditorRange): Positions | undefined => RANGES.get(range);

/** Where the document API reads and writes: a running command's state, or the live session. */
interface ApiSource {
    readonly model: ContentModel;
    readonly schema: Schema;
    readonly lookup: CommandLookup;
    readonly limits: ResourceLimits;
    state(): EditorState;
    /** Runs `command` with `payload` as one edit. */
    edit(command: EngineCommand, payload?: unknown): CommandOutcome;
    /** Notes a write refused as not allowed, which makes a running command that then fails report `not-allowed`. */
    refused(): void;
    execute(id: string, payload: unknown, options: CommandOptions | undefined): CommandOutcome;
    query(id: string, payload: unknown, options: CommandOptions | undefined): CommandState;
    editable(): boolean;
}

const valuesOf = (attrs: Readonly<Record<string, unknown>>): JsonObject => snapshot({ ...attrs }) as JsonObject;

const idOf = (node: Node): string | null => {
    if (typeof node.attrs.nodeId === 'string') {
        return node.attrs.nodeId;
    }
    return null;
};

/** The URL policy of the feature that installs a node or mark. */
const policyOf = (model: ContentModel, featureId: string) => {
    const options = compiledModel(model).features.find(({ id }) => id === featureId)?.options;
    return options === undefined ? undefined : hrefPolicyOf(options);
};

/** Whether `value` holds a string longer than `max`, as decode counts `maxAttributeLength`. */
const tooLong = (value: unknown, max: number): boolean => {
    if (typeof value === 'string') {
        return value.length > max;
    }
    return Array.isArray(value) && value.some((item) => tooLong(item, max));
};

/** The URL policy's verdict on `value` of `declaration` in `featureId`, or `undefined` when it is no URL. */
const checkedUrl = (
    model: ContentModel,
    featureId: string,
    declaration: AttributeDeclaration,
    value: unknown,
): ReturnType<typeof checkHref> | undefined => {
    if (declaration.type !== 'url' || typeof value !== 'string') {
        return undefined;
    }
    return checkHref(value, policyOf(model, featureId));
};

interface AttributeOwner {
    readonly attrs: Readonly<Record<string, AttributeDeclaration>>;
    readonly exactlyOne: readonly string[] | undefined;
    readonly featureId: string;
}

/**
 * `attrs` as decode checks them on every one of `types`: each declared and valid there, no string but an `href` longer than
 * `maxLength`, every `url` value in the form `checkHref` stores after its feature's policy, and `exactlyOne` held. With
 * `whole`, they are the attributes of a new mark or node, so each attribute without a default must be among them.
 * `undefined` when one is not.
 */
const checkedAttrs = (
    model: ContentModel,
    types: readonly string[],
    attrs: JsonObject,
    maxLength: number,
    whole: boolean,
): JsonObject | undefined => {
    const { marks, nodes } = compiledModel(model);
    const owners = types.flatMap((name): AttributeOwner[] => {
        const mark = marks.find((candidate) => candidate.name === name);
        if (mark !== undefined) {
            const { declaration } = mark;
            return [
                {
                    attrs: declaration.attrs,
                    exactlyOne: declaration.exactlyOne,
                    featureId: mark.featureId,
                },
            ];
        }
        const node = nodes.find((candidate) => candidate.name === name);
        if (node === undefined) {
            return [];
        }
        return [
            {
                attrs: attributesOf(node),
                exactlyOne: node.declaration.exactlyOne,
                featureId: node.featureId,
            },
        ];
    });
    if (owners.length === 0 || Object.hasOwn(attrs, 'nodeId')) {
        return undefined;
    }
    const checked: Record<string, unknown> = {};
    for (const owner of owners) {
        const values: Record<string, unknown> = {};
        for (const [name, value] of Object.entries(attrs)) {
            const declaration = owner.attrs[name];
            // A type that does not declare an attribute skips it; `checked` below refuses one that none declares.
            if (declaration === undefined) {
                continue;
            }
            // Decode exempts `href` from the length limit: the URL check bounds it.
            if (!isValidValue(declaration, value) || (name !== 'href' && tooLong(value, maxLength))) {
                return undefined;
            }
            values[name] = value;
            const url = checkedUrl(model, owner.featureId, declaration, value);
            if (url !== undefined) {
                if (!url.ok) {
                    return undefined;
                }
                values[name] = url.href;
            }
            checked[name] = values[name];
        }
        for (const [name, declaration] of Object.entries(owner.attrs)) {
            // The runtime gives a new node its `nodeId` before a commit publishes it.
            if (!whole || name === 'nodeId' || Object.hasOwn(values, name)) {
                continue;
            }
            if (!('default' in declaration)) {
                return undefined;
            }
            values[name] = declaration.default;
        }
        const group = owner.exactlyOne ?? [];
        const set = group.filter((name) => values[name] !== null && values[name] !== undefined);
        if (group.some((name) => Object.hasOwn(values, name)) && set.length !== 1) {
            return undefined;
        }
    }
    if (Object.keys(attrs).some((name) => !Object.hasOwn(checked, name))) {
        return undefined;
    }
    return checked as JsonObject;
};

const documentApi = (source: ApiSource): DocumentApi => {
    const { schema, lookup, model, limits } = source;
    const { maxAttributeLength } = limits;
    /** Runs `command` as one edit, refused where it would drop content its target cannot hold, as `execute` refuses it. */
    const edit = (command: EngineCommand, payload?: unknown) => {
        if (command.refuses?.(source.state(), payload) === true) {
            source.refused();
            return false;
        }
        return source.edit(command, payload).status !== 'rejected';
    };
    const capability = (implementation: CapabilityImplementation, args: JsonObject) =>
        implementation(args, schema, lookup);
    /**
     * Runs `implementation` with `args` and the checked `attrs` as its payload, or refuses attributes the types do not take;
     * `whole` attributes make a new mark or node.
     */
    const editWith = (
        implementation: CapabilityImplementation,
        args: JsonObject,
        types: readonly string[],
        attrs: JsonObject | undefined,
        whole: boolean,
        extra: JsonObject = {},
    ) => {
        const checked = checkedAttrs(model, types, attrs ?? {}, maxAttributeLength, whole);
        return checked !== undefined && edit(capability(implementation, args), Object.assign({ ...checked }, extra));
    };
    const markType = (mark: string): MarkType | undefined => schema.marks[mark];
    const selectionOf = (state: EditorState): SelectionValue => {
        const { selection } = state;
        const { $from, $to } = selection;
        const ancestors: AncestorValue[] = [];
        for (let depth = 1; depth <= $from.depth; depth += 1) {
            const node = $from.node(depth);
            ancestors.push({
                type: node.type.name,
                attrs: valuesOf(node.attrs),
                nodeId: idOf(node),
                index: $from.index(depth - 1),
                childCount: node.childCount,
                last: $from.index(depth - 1) === $from.node(depth - 1).childCount - 1,
                empty: node.content.size === 0,
            });
        }
        const before = $from.nodeBefore;
        let nodeBefore: SelectionValue['nodeBefore'] = null;
        if (before !== null) {
            nodeBefore = {
                type: before.type.name,
                attrs: valuesOf(before.attrs),
                nodeId: idOf(before),
            };
        }
        return {
            ...summarize(selection),
            ancestors,
            atStart: $from.parent.isTextblock && $from.parentOffset === 0,
            atEnd: $to.parent.isTextblock && $to.parentOffset === $to.parent.content.size,
            nodeBefore,
            verbatim: inCodeTextblock($from),
        };
    };
    return {
        selection: () => selectionOf(source.state()),
        selectedText: () => {
            const { selection, doc } = source.state();
            if (selection.empty || !selection.$from.sameParent(selection.$to)) {
                return '';
            }
            return doc.textBetween(selection.from, selection.to);
        },
        selectedRange: () => {
            const { selection, doc } = source.state();
            return rangeOf(doc, selection.from, selection.to);
        },
        editable: () => source.editable(),
        optionsOf: (featureId) => compiledModel(source.model).features.find(({ id }) => id === featureId)?.options,
        marks: {
            active: (mark) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                return capability(EDITS.toggleMark, { mark }).active(source.state());
            },
            toggle: (mark, attrs) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                if (attrs === undefined) {
                    return edit(capability(EDITS.toggleMark, { mark }));
                }
                const checked = checkedAttrs(model, [mark], attrs, maxAttributeLength, true);
                return checked !== undefined && edit(capability(EDITS.toggleMark, { mark, attrs: checked }));
            },
        },
        blocks: {
            active: (node, attrs) => {
                const type = schema.nodes[node];
                if (type === undefined) {
                    return false;
                }
                return capability(EDITS.setBlock, { node }).active(source.state(), attrs);
            },
            set: (node, attrs, options) =>
                schema.nodes[node] !== undefined &&
                editWith(EDITS.setBlock, { node, toggle: options?.toggle === true }, [node], attrs, true),
        },
        insert: {
            text: (text) => edit(capability(EDITS.insertText, {}), { text }),
        },
        commands: {
            execute: (id, payload, options) => source.execute(id, payload, options),
            query: (id, payload, options) => source.query(id, payload, options),
        },
    };
};

/** What a command's result says to plugin code: its status, and the code of a refusal. */
const outcomeOf = (result: CommandResult): CommandOutcome => {
    if (result.status === 'rejected') {
        return { status: 'rejected', code: result.code };
    }
    return { status: result.status };
};

/** The document API over the live session, whose writes each commit as one undo step. */
export const liveDocumentApi = (runtime: EditorRuntime): DocumentApi => {
    const { definition } = runtime;
    return documentApi({
        model: definition.model,
        schema: definition.schema,
        lookup: (id) => definition.commands.get(id),
        limits: runtime.limits,
        state: () => runtime.state,
        // A command origin makes each write its own undo step, apart from the typing before it.
        edit: (command, payload) =>
            outcomeOf(
                runtime.perform({
                    run: (state, dispatch) =>
                        command.run(
                            state,
                            (transaction) => dispatch?.(transaction.setMeta(COMMAND_META, null)),
                            payload,
                        ),
                    active: () => false,
                }),
            ),
        refused: () => undefined,
        execute: (id, payload, options) => runtime.handle.execute(id, payload, options),
        query: (id, payload, options) => runtime.handle.query(id, payload, options),
        editable: () => {
            const { phase, mode } = runtime.handle.getSummary();
            return phase === 'ready' && mode === 'editable';
        },
    });
};

/** Builds one transaction from the edits of a command, so the command stays one undo step. */
const composer = (base: EditorState) => {
    let current = base;
    let first: Transaction | undefined;
    let outer: Transaction | undefined;
    const take = (next: Transaction) => {
        if (first === undefined) {
            first = next;
        } else {
            if (outer === undefined) {
                outer = base.tr;
                appendSteps(outer, first);
                carryState(outer, first);
            }
            appendSteps(outer, next);
            carryState(outer, next);
        }
        current = current.apply(next);
    };
    return {
        state: () => current,
        apply: (command: EngineCommand, payload?: unknown, context?: CommandContext) => {
            let built: Transaction | undefined;
            const applied = command.run(
                current,
                (transaction) => {
                    built = transaction;
                },
                payload,
                context,
            );
            if (applied && built !== undefined) {
                take(built);
            }
            return applied;
        },
        finish: (): Transaction | undefined => {
            if (outer === undefined) {
                return first;
            }
            return outer.setSelection(carrySelection(outer.doc, current.selection));
        },
    };
};

/** What one edit of a composed command leaves besides its steps: stored marks and scrolling. */
const carryState = (outer: Transaction, next: Transaction) => {
    if (next.storedMarksSet) {
        outer.setStoredMarks(next.storedMarks);
    }
    if (next.scrolledIntoView) {
        outer.scrollIntoView();
    }
};

/** The session a plugin command runs in, as the runtime hands it over in `CommandContext.session`. */
export interface CommandSession {
    readonly runtime: EditorRuntime;
    readonly host: unknown;
}

const sessionOf = (context: CommandContext | undefined): CommandSession | undefined => {
    const session = context?.session;
    if (!isRecord(session) || !('runtime' in session)) {
        return undefined;
    }
    return session as unknown as CommandSession;
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
    const policy = command.featureId === undefined ? undefined : policyOf(model, command.featureId);
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
    return documentApi({
        model,
        schema,
        lookup,
        limits,
        state: compose.state,
        edit: (command, payload) => {
            if (compose.apply(command, payload)) {
                return { status: 'applied' };
            }
            return NOT_APPLICABLE;
        },
        refused: () => context?.refuse?.(),
        execute: (id, given) => {
            const command = lookup(id);
            const checked = command === undefined ? undefined : checkedPayload(command, given, model);
            if (command === undefined || checked === undefined) {
                return {
                    status: 'rejected',
                    code: command === undefined ? 'unknown-command' : 'invalid-payload',
                };
            }
            const refused = session?.runtime.refusal(command, compose.state(), checked.payload);
            if (refused !== undefined) {
                return { status: 'rejected', code: refused };
            }
            const applied = runNoting(context, (noted) => compose.apply(command, checked.payload, noted));
            if (applied === 'not-allowed') {
                return { status: 'rejected', code: 'not-allowed' };
            }
            return applied ? { status: 'applied' } : NOT_APPLICABLE;
        },
        query: (id, given) => {
            const command = lookup(id);
            if (command === undefined) {
                return {
                    enabled: false,
                    active: false,
                    disabledReason: 'unknown-command',
                };
            }
            const checked = checkedPayload(command, given, model);
            if (checked === undefined) {
                return {
                    enabled: false,
                    active: false,
                    disabledReason: 'invalid-payload',
                };
            }
            const quiet = quietOf(context);
            const active = command.active(compose.state(), checked.payload, quiet);
            const refused = session?.runtime.refusal(command, compose.state(), checked.payload);
            if (refused !== undefined) {
                return { enabled: false, active, disabledReason: refused };
            }
            const enabled = runNoting(quiet, (noted) =>
                command.run(compose.state(), undefined, checked.payload, noted),
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
        },
        editable: () => session?.runtime.handle.getSummary().mode === 'editable',
    });
};

/** A plugin command, written over the API it is handed, which runs only through that API. */
export interface PluginCommandSpec<A> {
    readonly payload?: PayloadDeclaration;
    readonly run: (api: A, payload: never) => boolean;
    readonly enabled?: (api: A, payload: never) => boolean;
    readonly active?: (api: A, payload: never) => boolean | 'mixed';
    readonly refuses?: (policy: AuthoringPolicy, payload: never) => boolean;
    readonly readOnly?: boolean;
}

/**
 * The engine command of a plugin command. `extend` adds the session's hosts to the document API, holding their
 * effects until the command has run for real.
 */
export const pluginCommand = <A>(
    spec: PluginCommandSpec<A>,
    model: ContentModel,
    schema: Schema,
    lookup: CommandLookup,
    extend: (api: DocumentApi, context: CommandContext | undefined, session: CommandSession | undefined) => A,
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
            const payload = given === null && spec.payload === undefined ? undefined : given;
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
                if (!spec.enabled(probe, payload as never)) {
                    return false;
                }
            }
            const compose = composer(state);
            const api = extend(commandDocumentApi(compose, model, schema, lookup, context, session), context, session);
            if (!spec.run(api, payload as never)) {
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
                payload as never,
            );
        },
        policyRefuses: (policy, payload) =>
            spec.refuses !== undefined &&
            findInvalidPayload(spec.payload, payload) === undefined &&
            spec.refuses(policy as AuthoringPolicy, payload as never),
        ...declared,
        viaExecute: true,
    };
};
