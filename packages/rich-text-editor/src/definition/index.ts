/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import {
    type CommandRef,
    type ContentModel,
    DefinitionError,
    type InputRule,
    type JsonValue,
    type KeyBinding,
    type PayloadDeclaration,
} from '#/model';
import {
    BLOCK_DECORATIONS_PLUGIN,
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    declaresNodeIds,
    INPUT_RULES_PLUGIN,
    keyHandlersPlugin,
    keymapPlugin,
    NODE_IDS_PLUGIN,
    orderPlugins,
    type PluginContribution,
    SUGGESTIONS_PLUGIN,
} from '#/model/capabilities';
import { compiledModel } from '#/model/compile';
import { type BlockDecorationSource, type SuggestionPage, type SuggestionRules } from '#/model/declarations';
import { pointer } from '#/model/errors';
import { isApple, isPlatformBinding, keyOn, modOn } from '#/model/platform';
import { findInvalidPayload } from '#/model/values';

import { type CompiledInputRule, compileInputRules } from './input-rules';
import { NORMALIZE_META, NORMALIZERS } from './normalizers';
import { buildSchema } from './schema';

export {
    type BlockRule,
    type CompiledInputRule,
    type LineStartRule,
    type MarkDelimiterRule,
    type MarkRule,
    type QuotesRule,
    type TextReplaceRule,
} from './input-rules';
export { carriesNodeId, withNodeIds } from './schema';
export { NodeIdsStep, NORMALIZE_META, type Normalizer, NORMALIZERS } from './normalizers';

/** The transaction meta that names the command a transaction runs, so the runtime reports it. */
export const COMMAND_META = 'rte.command';
/** The transaction meta that names a change's origin where no UI event or command does. */
export const ORIGIN_META = 'rte.origin';
/** The transaction meta that carries a root batch's `AppendBatch`, which the wrapped `appendTransaction` counts in. */
export const APPEND_BATCH_META = 'rte.append-batch';

/** What the runtime hands a command it runs or queries, which a plugin command reads its session from. */
export interface CommandContext {
    /** Holds an effect, such as opening an overlay, until the command has run for real; a query drops it. */
    readonly defer: (effect: () => void) => void;
    /** The running session and the hosts the editor layer gave it, which a plugin command acts through. */
    readonly session: unknown;
    /** Notes that a write inside the command was refused as not allowed, so a run that then returns false is rejected as `not-allowed`. */
    readonly refuse?: () => void;
}

/**
 * A command as the engine runs it, with no view, so commands that call `view.endOfTextblock` take their state-only
 * path, and whether its target is active, partly active or not.
 */
export interface EngineCommand {
    readonly run: (
        state: EditorState,
        dispatch?: (transaction: Transaction) => void,
        payload?: unknown,
        context?: CommandContext,
    ) => boolean;
    readonly active: (state: EditorState, payload?: unknown, context?: CommandContext) => boolean | 'mixed';
    /** Whether running would drop content its target cannot hold, which the runtime rejects as `not-allowed`. */
    readonly refuses?: (state: EditorState, payload?: unknown) => boolean;
    /** Whether the authoring policy the runtime passes refuses `payload`, which it rejects as `not-allowed`. */
    readonly policyRefuses?: (policy: unknown, payload?: unknown) => boolean;
    /** The command's payload declaration; none means it takes no payload. */
    readonly payload?: PayloadDeclaration;
    /** The feature that installs it, whose policy and options apply to it. */
    readonly featureId?: string;
    /** Runs in a read-only editor too, as a command that only opens a panel does. */
    readonly readOnly?: boolean;
    /** A key runs it through the session's `execute`, so its deferred effects run and the session checks it. */
    readonly viaExecute?: boolean;
}
/** The compiled command with `id`, read when a command runs, since commands compile in declaration order. */
export type CommandLookup = (id: string) => EngineCommand | undefined;
/** One key binding of an editor part, with the command and payload it runs. */
export interface KeymapEntry {
    readonly plugin: string;
    readonly key: string;
    readonly command: string;
    readonly payload: JsonValue | null;
}
/** What a list's search gets in the engine: the view, what the editor layer hands plugins, the signal and the page's cursor. */
export interface EngineSearchContext {
    readonly view: EditorView;
    readonly host: unknown;
    readonly signal: AbortSignal;
    readonly cursor: string | null;
}
/** An editor part's suggestion list as the engine runs it, named by `labelKey` or by `label`'s translations. */
export interface EngineSuggestion {
    readonly featureId: string;
    readonly trigger: string;
    readonly rules: SuggestionRules;
    readonly command: string;
    readonly labelKey?: string;
    readonly label?: Readonly<Record<string, string>>;
    /** Whether the list can open now; one that cannot closes as Escape does, before it searches. */
    available(context: Pick<EngineSearchContext, 'view' | 'host'>): boolean;
    /** A page of options. */
    search(query: string, context: EngineSearchContext): Promise<SuggestionPage>;
}
// One or two characters that are neither letters, digits nor white space, so a trigger never fires inside a word.
const SUGGESTION_TRIGGER = /^[^\p{L}\p{N}\s]{1,2}$/u;

/** Builds a package plugin whose code lives in the runtime, such as the history or the input rule engine. */
export type PluginImplementation = (context: {
    readonly inputRules: readonly CompiledInputRule[];
    readonly suggestions: readonly EngineSuggestion[];
    readonly decorations: readonly BlockDecorationSource[];
}) => Plugin;
export interface EngineImplementations {
    /** The package plugins the runtime builds, by plugin ID; any other plugin holds only its key until it is built. */
    readonly plugins?: Readonly<Record<string, PluginImplementation>>;
    /** Runs a `viaExecute` command for a key in the session of `view`; `false` hands the key on. */
    readonly execute?: (view: EditorView, id: string, payload: unknown) => boolean;
    /** Runs a key handler in the session of `view` as the input it replaces; `false` hands the key on. */
    readonly handleKey?: (view: EditorView, handler: EngineCommand) => boolean;
}

/** What an editor plugin adds to the engine for its installed feature: its commands, key bindings and input rules. */
export interface EngineExtension {
    readonly featureId: string;
    /** Builds the plugin's commands once the schema exists; `lookup` finds any compiled command when one runs. */
    readonly commands: (schema: Schema, lookup: CommandLookup) => Readonly<Record<string, EngineCommand>>;
    readonly keys: Readonly<Record<KeyBinding, CommandRef>>;
    /** Builds the plugin's key handlers, which carry no command ID, so their change groups and reports as typing does. */
    readonly handlers?: (schema: Schema, lookup: CommandLookup) => Readonly<Record<KeyBinding, EngineCommand>>;
    readonly inputRules: readonly InputRule[];
    readonly decorations: readonly BlockDecorationSource[];
    readonly suggestions: readonly Omit<EngineSuggestion, 'featureId'>[];
}

export interface CompiledDefinition {
    readonly model: ContentModel;
    readonly schema: Schema;
    /** One instance per plugin ID, in plugin order. */
    readonly plugins: readonly Plugin[];
    /** Every command of the editor parts, by command ID. */
    readonly commands: ReadonlyMap<string, EngineCommand>;
    /** The editor parts' key bindings, in part order. */
    readonly keymap: readonly KeymapEntry[];
}

/** The feature and capability that contribute a plugin, which an append-limit diagnostic names. */
export interface PluginOrigin {
    readonly featureId: string;
    readonly capability: string;
}
/**
 * What `commit` puts on a root transaction: the append limit, the time appended transactions take, the id function
 * normalizers draw from, and the origin of each transaction appended so far.
 */
export interface AppendBatch {
    readonly limit: number;
    readonly now: () => number;
    readonly generateId: () => string;
    readonly chain: PluginOrigin[];
}
/** Thrown past the append limit, so `commit` tells it apart from a plugin error. */
export class AppendLimitError extends Error {
    constructor(readonly chain: readonly PluginOrigin[]) {
        super('A root batch appended more transactions than ResourceLimits.maxAppendedTransactions allows.');
        this.name = 'AppendLimitError';
    }
}

/** The root transaction that `transactions` belong to; ProseMirror marks each appended transaction with its root. */
const rootOf = (transactions: readonly Transaction[]): Transaction | undefined => {
    const root = transactions[0];
    const rootOfAppended: unknown = root?.getMeta('appendedTransaction');
    if (rootOfAppended !== undefined) {
        return rootOfAppended as Transaction;
    }
    return root;
};

/** The batch of the root that `transactions` belong to. */
const batchOf = (transactions: readonly Transaction[]): AppendBatch | undefined =>
    rootOf(transactions)?.getMeta(APPEND_BATCH_META) as AppendBatch | undefined;

/**
 * Wraps a plugin's `appendTransaction`, since `state.applyTransaction` loops with no cap: each appended transaction
 * is counted against its root batch's limit and takes its time from `Date.now`.
 */
export const countAppends = (plugin: Plugin, origin: PluginOrigin): Plugin => {
    const append = plugin.spec.appendTransaction;
    if (append === undefined) {
        return plugin;
    }
    const counted: Plugin = new Plugin({
        ...plugin.spec,
        appendTransaction: (transactions, oldState, newState) => {
            const appended = append.call(counted, transactions, oldState, newState);
            const batch = batchOf(transactions);
            if (appended === null || appended === undefined || batch === undefined) {
                return appended;
            }
            batch.chain.push(origin);
            if (batch.chain.length > batch.limit) {
                throw new AppendLimitError(batch.chain);
            }
            return appended.setTime(batch.now());
        },
    });
    return counted;
};

const withCommandId = (
    id: string,
    inner: EngineCommand,
    payload: PayloadDeclaration | undefined,
    featureId: string,
): EngineCommand => {
    const { run } = inner;
    const command: EngineCommand = {
        ...inner,
        featureId,
        run: (state, dispatch, given, context) => {
            if (dispatch === undefined) {
                return run(state, undefined, given, context);
            }
            return run(
                state,
                (transaction) => {
                    // A command that runs another command keeps the inner command's ID.
                    if (transaction.getMeta(COMMAND_META) === undefined) {
                        transaction.setMeta(COMMAND_META, id);
                    }
                    dispatch(transaction);
                },
                given,
                context,
            );
        },
    };
    if (payload === undefined) {
        return command;
    }
    return { ...command, payload };
};

/** The key bindings of `extensions`, each checked against the command it names. */
const extensionKeymap = (
    extensions: readonly EngineExtension[],
    commands: ReadonlyMap<string, EngineCommand>,
): KeymapEntry[] =>
    extensions.flatMap(({ featureId, keys }) =>
        Object.entries(keys).map(([key, ref]) => {
            const target = typeof ref === 'string' ? { command: ref, payload: undefined } : ref;
            const command = commands.get(target.command);
            const path = pointer('keys', key);
            if (command === undefined) {
                throw new DefinitionError('definition.orphan-behavior', { feature: featureId, path });
            }
            const invalid = findInvalidPayload(command.payload, target.payload);
            if (invalid !== undefined) {
                let at = `${path}/payload${invalid}`;
                if (typeof ref === 'string') {
                    at = path;
                }
                throw new DefinitionError('definition.invalid-declaration', { feature: featureId, path: at });
            }
            return {
                plugin: keymapPlugin(featureId).id,
                key,
                command: target.command,
                payload: target.payload ?? null,
            };
        }),
    );

/**
 * Turns a content model into the engine's schema and plugins, with the commands, keymap and input rules of its
 * editor parts' `extensions`. A keymap plugin runs its feature's bindings; every other plugin holds only its key
 * until `implementations` build it.
 */
export const compileDefinition = (
    model: ContentModel,
    implementations: EngineImplementations = {},
    extensions: readonly EngineExtension[] = [],
): CompiledDefinition => {
    const compiled = compiledModel(model);
    const schema = buildSchema(model);
    const commands = new Map<string, EngineCommand>();
    const lookup: CommandLookup = (id) => commands.get(id);
    const owners = new Map<string, string>();
    for (const extension of extensions) {
        for (const [id, command] of Object.entries(extension.commands(schema, lookup))) {
            const first = owners.get(id);
            if (first !== undefined) {
                throw new DefinitionError('definition.duplicate-id', {
                    kind: 'command',
                    id,
                    features: [first, extension.featureId],
                });
            }
            owners.set(id, extension.featureId);
            commands.set(id, withCommandId(id, command, command.payload, extension.featureId));
        }
    }
    // A plugin's rules run as its feature's, under that feature's options and policy.
    const features = compiled.features.map((feature) => {
        const inputRules = extensions
            .filter(({ featureId }) => featureId === feature.id)
            .flatMap((extension) => extension.inputRules);
        for (const [index, rule] of inputRules.entries()) {
            if (
                (rule.kind === 'mark-delimiter' || rule.kind === 'mark-rule') &&
                schema.marks[rule.mark] === undefined
            ) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: `${pointer('inputRules', index)}/mark`,
                });
            }
            if ((rule.kind === 'line-start' || rule.kind === 'block-rule') && !commands.has(rule.command)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: `${pointer('inputRules', index)}/command`,
                });
            }
        }
        return { ...feature, inputRules };
    });
    const keymap = extensionKeymap(extensions, commands);
    const keyHandlers = extensions.flatMap(({ featureId, handlers }) =>
        Object.entries(handlers?.(schema, lookup) ?? {}).map(([key, handler]) => ({
            plugin: keyHandlersPlugin(featureId).id,
            key,
            handler,
        })),
    );
    const suggestions: EngineSuggestion[] = [];
    const contributions: PluginContribution[] = compiled.plugins.map((plugin) => ({ featureId: '', plugin }));
    for (const { featureId, keys, inputRules: rules, decorations: sources, suggestions: lists } of extensions) {
        if (Object.keys(keys).length > 0) {
            contributions.push({ featureId, plugin: keymapPlugin(featureId) });
        }
        const handlersId = keyHandlersPlugin(featureId).id;
        if (keyHandlers.some(({ plugin }) => plugin === handlersId)) {
            contributions.push({ featureId, plugin: keyHandlersPlugin(featureId) });
        }
        if (rules.length > 0) {
            contributions.push({ featureId, plugin: INPUT_RULES_PLUGIN });
        }
        for (const [index, source] of sources.entries()) {
            for (const node of source.nodes) {
                if (schema.nodes[node]?.isTextblock !== true) {
                    throw new DefinitionError('definition.orphan-behavior', {
                        feature: featureId,
                        path: `${pointer('decorations', index)}/nodes`,
                        reason: 'decoration sources cover textblocks',
                    });
                }
            }
            contributions.push({ featureId, plugin: BLOCK_DECORATIONS_PLUGIN });
        }
        for (const [index, list] of lists.entries()) {
            const { trigger, command, rules: listRules } = list;
            const path = pointer('suggestions', index);
            if (!SUGGESTION_TRIGGER.test(trigger)) {
                throw new DefinitionError('definition.invalid-declaration', {
                    feature: featureId,
                    path: `${path}/trigger`,
                });
            }
            const { maxQuery, leadingLetters } = listRules;
            if (!Number.isInteger(maxQuery) || maxQuery < 1) {
                throw new DefinitionError('definition.invalid-declaration', {
                    feature: featureId,
                    path: `${path}/rules/maxQuery`,
                });
            }
            if (!Number.isInteger(leadingLetters) || leadingLetters < 0 || leadingLetters > maxQuery) {
                throw new DefinitionError('definition.invalid-declaration', {
                    feature: featureId,
                    path: `${path}/rules/leadingLetters`,
                });
            }
            if (!commands.has(command)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: featureId,
                    path: `${path}/command`,
                });
            }
            const first = suggestions.find((other) => other.trigger === trigger);
            if (first !== undefined) {
                throw new DefinitionError('definition.duplicate-id', {
                    kind: 'suggestion',
                    id: trigger,
                    features: [first.featureId, featureId],
                });
            }
            suggestions.push({ ...list, featureId });
            contributions.push({ featureId, plugin: SUGGESTIONS_PLUGIN });
        }
    }
    const plugins = extensions.length === 0 ? compiled.plugins : orderPlugins(contributions);
    /** The first feature that contributes a plugin, or the plugin ID for the package's plugins no feature owns. */
    const originOf = (id: string): PluginOrigin => {
        const contributor = features.find(
            (feature) =>
                id === `keymap:${feature.id}` ||
                id === keyHandlersPlugin(feature.id).id ||
                (id === INPUT_RULES_PLUGIN.id && feature.inputRules.length > 0) ||
                (id === NODE_IDS_PLUGIN.id && declaresNodeIds(feature.declaration)) ||
                (id === CONTENT_ISSUES_PLUGIN.id && feature.id === CONTENT_CHECKS_FEATURE),
        );
        if (contributor === undefined) {
            return { featureId: id, capability: id };
        }
        return { featureId: contributor.id, capability: id };
    };
    const inputRules = compileInputRules(features, schema, (id) => commands.get(id));
    const decorations = extensions.flatMap((extension) => extension.decorations);
    const pluginOf = (id: string) => {
        const built = implementations.plugins?.[id];
        if (built !== undefined) {
            return built({ inputRules, suggestions, decorations });
        }
        const normalizer = NORMALIZERS[id];
        if (normalizer !== undefined) {
            return new Plugin({
                key: normalizer.key,
                state: normalizer.field,
                appendTransaction: (transactions, _old, state) => {
                    const batch = batchOf(transactions);
                    const timing: unknown = rootOf(transactions)?.getMeta(NORMALIZE_META);
                    // Outside a commit no id function is on the batch, and a composition batch is repaired once input settles.
                    if (batch === undefined || timing === 'later') {
                        return null;
                    }
                    // A batch that kept the document has nothing to repair, unless it settles a composition.
                    if (timing !== 'now' && !transactions.some(({ docChanged }) => docChanged)) {
                        return null;
                    }
                    const repair = normalizer.normalize(state, batch.generateId);
                    if (repair === null) {
                        return null;
                    }
                    return repair.setMeta(ORIGIN_META, 'normalization');
                },
            });
        }
        // A binding that starts with `mac:` or `other:` runs only on that platform.
        const apple: Record<string, Command> = {};
        const other: Record<string, Command> = {};
        const bindKey = (key: string, run: Command) => {
            const appleKey = keyOn(key, true);
            if (appleKey !== undefined) {
                apple[modOn(appleKey, true)] = run;
            }
            const otherKey = keyOn(key, false);
            if (otherKey !== undefined) {
                other[modOn(otherKey, false)] = run;
            }
        };
        const bind = (entry: (typeof keymap)[number]) => {
            const command = commands.get(entry.command);
            if (entry.plugin !== id || command === undefined) {
                return;
            }
            bindKey(entry.key, (state, dispatch, view) => {
                if (command.viaExecute === true && view !== undefined && implementations.execute !== undefined) {
                    return implementations.execute(view, entry.command, entry.payload);
                }
                return command.run(state, dispatch, entry.payload);
            });
        };
        const bindHandler = ({ plugin, key, handler: given }: (typeof keyHandlers)[number]) => {
            if (plugin !== id) {
                return;
            }
            // A key that took its key keeps the caret in sight, as the base keys do.
            const handler: EngineCommand = {
                ...given,
                run: (state, dispatch, payload, context) => {
                    if (dispatch === undefined) {
                        return given.run(state, undefined, payload, context);
                    }
                    return given.run(state, (transaction) => dispatch(transaction.scrollIntoView()), payload, context);
                },
            };
            bindKey(key, (state, dispatch, view) => {
                if (view !== undefined && implementations.handleKey !== undefined) {
                    return implementations.handleKey(view, handler);
                }
                return handler.run(state, dispatch);
            });
        };
        // Plain bindings first, so on its platform a prefixed one of the same key wins.
        for (const entry of keymap) {
            if (!isPlatformBinding(entry.key)) {
                bind(entry);
            }
        }
        for (const binding of keyHandlers) {
            if (!isPlatformBinding(binding.key)) {
                bindHandler(binding);
            }
        }
        for (const entry of keymap) {
            if (isPlatformBinding(entry.key)) {
                bind(entry);
            }
        }
        for (const binding of keyHandlers) {
            if (isPlatformBinding(binding.key)) {
                bindHandler(binding);
            }
        }
        if (Object.keys(other).length === 0 && Object.keys(apple).length === 0) {
            return new Plugin({ key: new PluginKey(id) });
        }
        const handlers = { apple: keydownHandler(apple), other: keydownHandler(other) };
        const handleKeyDown = (view: EditorView, event: KeyboardEvent) => {
            // The tooltips name the bindings of the same platform check.
            const owner = view.dom.ownerDocument.defaultView;
            if (owner !== null && isApple(owner.navigator)) {
                return handlers.apple(view, event);
            }
            return handlers.other(view, event);
        };
        return new Plugin({ key: new PluginKey(id), props: { handleKeyDown } });
    };
    // Every plugin's appended transactions count against the append limit.
    const built = plugins.map(({ id }) => countAppends(pluginOf(id), originOf(id)));
    return { model, schema, plugins: built, commands, keymap };
};
