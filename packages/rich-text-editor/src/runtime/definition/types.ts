/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorState, type Plugin, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import {
    type CommandRef,
    type ContentModel,
    type InputRule,
    type JsonValue,
    type KeyBinding,
    type PayloadDeclaration,
} from '#/model';
import { type BlockDecorationSource, type SuggestionPage, type SuggestionRules } from '#/model/internal';

import { type CompiledInputRule } from './inputRules';
import { type AuthoringPolicy } from './policy';

/** The transaction meta that names the command a transaction runs, so the runtime reports it. */
export const COMMAND_META = 'rte.command';
/** The transaction meta that names a change's origin where no UI event or command does. */
export const ORIGIN_META = 'rte.origin';
/** The transaction meta that carries a root batch's `AppendBatch`, which the wrapped `appendTransaction` counts in. */
export const APPEND_BATCH_META = 'rte.append-batch';

/** What the runtime hands a command it runs or queries, which a plugin command reads its session from. */
export type CommandContext = {
    /** Holds an effect, such as opening an overlay, until the command has run for real; a query drops it. */
    defer: (effect: () => void) => void;
    /** The running session and the hosts the editor layer gave it, which a plugin command acts through. */
    session: unknown;
    /** Notes that a write inside the command was refused as not allowed, so a run that then returns false is rejected as `not-allowed`. */
    refuse?: () => void;
};

/**
 * A command as the engine runs it, with no view, so commands that call `view.endOfTextblock` take their state-only
 * path, and whether its target is active, partly active or not.
 */
export type EngineCommand = {
    run: (
        state: EditorState,
        dispatch?: (transaction: Transaction) => void,
        payload?: unknown,
        context?: CommandContext,
    ) => boolean;
    active: (state: EditorState, payload?: unknown, context?: CommandContext) => boolean | 'mixed';
    /** Whether running would drop content its target cannot hold, which the runtime rejects as `not-allowed`. */
    refuses?: (state: EditorState, payload?: unknown) => boolean;
    /** Whether the authoring policy the runtime passes refuses `payload`, which it rejects as `not-allowed`. */
    policyRefuses?: (policy: AuthoringPolicy, payload?: unknown) => boolean;
    /** The command's payload declaration; none means it takes no payload. */
    payload?: PayloadDeclaration;
    /** The feature that installs it, whose policy and options apply to it. */
    featureId?: string;
    /** Runs in a read-only editor too, as a command that only opens a panel does. */
    readOnly?: boolean;
    /** A key runs it through the session's `execute`, so its deferred effects run and the session checks it. */
    viaExecute?: boolean;
};
/** The compiled command with `id`, read when a command runs, since commands compile in declaration order. */
export type CommandLookup = (id: string) => EngineCommand | undefined;
/** One key binding of an editor part, with the command and payload it runs. */
export type KeymapEntry = {
    plugin: string;
    key: string;
    command: string;
    payload: JsonValue | null;
};
/** What a list's search gets in the engine: the view, what the editor layer hands plugins, the signal and the page's cursor. */
export type EngineSearchContext = {
    view: EditorView;
    host: unknown;
    signal: AbortSignal;
    cursor: string | null;
};
/** An editor part's suggestion list as the engine runs it, named by `labelKey` or by `label`'s translations. */
export type EngineSuggestion = {
    featureId: string;
    trigger: string;
    rules: SuggestionRules;
    command: string;
    labelKey?: string;
    label?: Readonly<Record<string, string>>;
    /** Whether the list can open now; one that cannot closes as Escape does, before it searches. */
    available(context: Pick<EngineSearchContext, 'view' | 'host'>): boolean;
    /** A page of options. */
    search(query: string, context: EngineSearchContext): Promise<SuggestionPage>;
};

/** Builds a package plugin whose code lives in the runtime, such as the history or the input rule engine. */
export type PluginImplementation = (context: {
    inputRules: readonly CompiledInputRule[];
    suggestions: readonly EngineSuggestion[];
    decorations: readonly BlockDecorationSource[];
}) => Plugin;
/** The runtime-built parts a compile can be given, which stay unset where the editor layer provides none. */
export type EngineImplementations = {
    /** The package plugins the runtime builds, by plugin ID; any other plugin holds only its key until it is built. */
    plugins?: Readonly<Record<string, PluginImplementation>>;
    /** Runs a `viaExecute` command for a key in the session of `view`; `false` hands the key on. */
    execute?: (view: EditorView, id: string, payload: unknown) => boolean;
    /** Runs a key handler in the session of `view` as the input it replaces; `false` hands the key on. */
    handleKey?: (view: EditorView, handler: EngineCommand) => boolean;
};

/** What an editor part adds to the engine for its installed feature: its commands, key bindings and input rules. */
export type EngineExtension = {
    featureId: string;
    /** Builds the plugin's commands once the schema exists; `lookup` finds any compiled command when one runs. */
    commands: (schema: Schema, lookup: CommandLookup) => Readonly<Record<string, EngineCommand>>;
    keys: Readonly<Partial<Record<KeyBinding, CommandRef>>>;
    /** Builds the plugin's key handlers, which carry no command ID, so their change groups and reports as typing does. */
    handlers?: (schema: Schema, lookup: CommandLookup) => Readonly<Partial<Record<KeyBinding, EngineCommand>>>;
    inputRules: readonly InputRule[];
    decorations: readonly BlockDecorationSource[];
    suggestions: readonly Omit<EngineSuggestion, 'featureId'>[];
};

/** What compiling a content model yields: its schema, the plugins in order, and the commands and keys of the editor parts. */
export type CompiledDefinition = {
    model: ContentModel;
    schema: Schema;
    /** One instance per plugin ID, in plugin order. */
    plugins: readonly Plugin[];
    /** Every command of the editor parts, by command ID. */
    commands: ReadonlyMap<string, EngineCommand>;
    /** The editor parts' key bindings, in part order. */
    keymap: readonly KeymapEntry[];
};

/** The feature and capability that contribute a plugin, which an append-limit diagnostic names. */
export type PluginOrigin = {
    featureId: string;
    capability: string;
};
/**
 * What `commit` puts on a root transaction: the append limit, the time appended transactions take, the id function
 * normalizers draw from, and the origin of each transaction appended so far.
 */
export type AppendBatch = {
    limit: number;
    now: () => number;
    generateId: () => string;
    chain: PluginOrigin[];
    /** The origin of the plugin whose `appendTransaction` threw, which `commit` reports. */
    failed?: PluginOrigin;
};
