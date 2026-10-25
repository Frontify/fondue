/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeViewDeclaration, type PanelDeclaration } from '#/bridge/define';
import { type RichTextPlugin } from '#/bridge/define-plugin';
import { commandApiOf, editorApiOf } from '#/bridge/live-api';
import {
    type EditorApi,
    type EditorHosts,
    type EditorPart,
    type EditorSuggestion,
    partWithOptions,
} from '#/bridge/plugin';
import {
    compileDefinition,
    type CompiledDefinition,
    type EngineCommand,
    type EngineExtension,
    type EngineSuggestion,
} from '#/definition';
import {
    type CommandRef,
    type ContentModel,
    createEmptyDocument,
    decodeDocument,
    DefinitionError,
    type ResourceLimits,
    type ValueDeclaration,
} from '#/model';
import { CLIPBOARD_PLUGIN, DROP_CURSOR_PLUGIN } from '#/model/capabilities';
import { CONTENT_REPAIRS } from '#/model/checks';
import { attributesOf, compiledModel } from '#/model/compile';
import { limitsOf } from '#/model/decode';
import { pointer } from '#/model/errors';
import { type ReaderOverrides } from '#/reader/plan';
import { RUNTIME_PLUGINS } from '#/runtime/capabilities';
import { clipboardPlugin, dropCursorPlugin, type FileIntake } from '#/runtime/clipboard/plugin';
import { pluginCommand, rangeOf } from '#/runtime/editor-api';
import { authoringOf } from '#/runtime/policy';
import { runtimeOfView } from '#/runtime/runtime';

import {
    type CommandsOfPlugins,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
    type RichTextProfile,
} from './types';
import { checkCover, readersOfUnits } from './units';

// Kept off the definition, so no engine value is reachable from what a host holds.
const engines = new WeakMap<object, CompiledDefinition>();
const nodeViews = new WeakMap<object, ReadonlyMap<string, NodeViewDeclaration>>();
const editorPanels = new WeakMap<object, ReadonlyMap<string, PanelDeclaration>>();
const editorPlugins = new WeakMap<object, readonly EditorPart[]>();
const profiles = new WeakMap<object, RichTextProfile>();
const readers = new WeakMap<object, ReaderOverrides>();

/** The engine a definition compiled once, which every editor mounted with it shares. */
export const engineOf = (definition: CompiledEditorDefinition<object>): CompiledDefinition => {
    const engine = engines.get(definition);
    if (engine === undefined) {
        throw new Error('RichTextEditor takes only a definition that defineEditor made.');
    }
    return engine;
};

/** The node view chrome of a definition by node name; a later feature's view of a node replaces an earlier one's. */
export const viewsOf = (definition: CompiledEditorDefinition<object>): ReadonlyMap<string, NodeViewDeclaration> =>
    nodeViews.get(definition) ?? new Map();

/** The panels of a definition by control id; a later feature's panel of a control replaces an earlier one's. */
export const panelsOf = (definition: CompiledEditorDefinition<object>): ReadonlyMap<string, PanelDeclaration> =>
    editorPanels.get(definition) ?? new Map();

/** The editor parts a definition installs, in feature order. */
export const pluginsOf = (definition: CompiledEditorDefinition<object>): readonly EditorPart[] =>
    editorPlugins.get(definition) ?? [];

/** The reader overrides of the shipped features a definition renders its blocked and recovery shells with. */
export const readersOf = (definition: CompiledEditorDefinition<object>): ReaderOverrides =>
    readers.get(definition) ?? {};

/** The shipped profile a definition was compiled for, whose Enter keys and line mode it keeps. */
export const profileOf = (definition: CompiledEditorDefinition<object>): RichTextProfile | undefined =>
    profiles.get(definition);

/** The editor part of each installed feature, in feature order, from units that cover the model exactly. */
const collectPlugins = (model: ContentModel, units: readonly RichTextPlugin[]): readonly EditorPart[] => {
    checkCover(model, units);
    const { features } = compiledModel(model);
    return features.flatMap(({ id, options }) => {
        const unit = units.find((candidate) => candidate.id === id);
        if (unit === undefined) {
            return [];
        }
        return [partWithOptions(unit.editor, options)];
    });
};

/** A part's list as the engine runs it, whose search reads the API of the session that shows the list's view. */
const engineSuggestion = ({ search, available, ...list }: EditorSuggestion): Omit<EngineSuggestion, 'featureId'> => ({
    ...list,
    available: ({ view, host }) => {
        const runtime = runtimeOfView(view);
        if (runtime === undefined) {
            return false;
        }
        if (available === undefined) {
            return true;
        }
        return available(editorApiOf(runtime, host as EditorHosts));
    },
    search: async (query, { view, host, signal, cursor }) => {
        const runtime = runtimeOfView(view);
        if (runtime === undefined) {
            throw new Error('The list has no session.');
        }
        return search(query, {
            api: editorApiOf(runtime, host as EditorHosts),
            signal,
            cursor,
        });
    },
});

/** What a plugin adds to the engine: its commands over `EditorApi`, its keys and its input rules. */
const extensionOf = (model: ContentModel, plugin: EditorPart): EngineExtension => ({
    featureId: plugin.feature,
    keys: Object.fromEntries(
        Object.entries(plugin.keys ?? {}).filter(
            (entry): entry is [string, CommandRef] => typeof entry[1] !== 'function',
        ),
    ),
    handlers: (schema, lookup) => {
        const handlers: Record<string, EngineCommand> = {};
        for (const [key, handler] of Object.entries(plugin.keys ?? {})) {
            if (typeof handler === 'function') {
                handlers[key] = pluginCommand({ run: handler }, model, schema, lookup, commandApiOf);
            }
        }
        return handlers;
    },
    inputRules: plugin.inputRules ?? [],
    decorations: plugin.decorations ?? [],
    suggestions: (plugin.suggestions ?? []).map(engineSuggestion),
    commands: (schema, lookup) => {
        const commands: Record<string, EngineCommand> = {};
        for (const [id, spec] of Object.entries(plugin.commands ?? {})) {
            commands[id] = pluginCommand(spec, model, schema, lookup, commandApiOf);
        }
        return commands;
    },
});

/** Runs a key's plugin command through the `execute` of the session the key reached. */
const executeFor: NonNullable<Parameters<typeof compileDefinition>[1]>['execute'] = (view, id, payload) => {
    const runtime = runtimeOfView(view);
    if (runtime === undefined) {
        return false;
    }
    return runtime.handle.execute(id, payload ?? undefined).status !== 'rejected';
};

/** Runs a key handler through the commit path of the session the key reached, as one edit with no command ID. */
const handleKeyFor: NonNullable<Parameters<typeof compileDefinition>[1]>['handleKey'] = (view, handler) => {
    const runtime = runtimeOfView(view);
    if (runtime === undefined) {
        return false;
    }
    return runtime.perform(handler).status !== 'rejected';
};

/** Hands pasted or dropped files to the first part whose `files` takes them, each run as a command with no ID. */
const intakeOf =
    (model: ContentModel, plugins: readonly EditorPart[]): FileIntake =>
    (view, files, origin, from, to) => {
        const runtime = runtimeOfView(view);
        if (runtime === undefined) {
            return false;
        }
        const { schema, commands } = runtime.definition;
        const range = rangeOf(runtime.state.doc, from, to);
        return plugins.some(({ files: take }) => {
            if (take === undefined) {
                return false;
            }
            const run = (api: EditorApi) => take(api, files, { origin, range });
            const command = pluginCommand({ run }, model, schema, (id) => commands.get(id), commandApiOf);
            return runtime.perform(command).status !== 'rejected';
        });
    };

/** The node views the model's editor parts attach, each for a node the model declares. */
const collectViews = (model: ContentModel, plugins: readonly EditorPart[]) => {
    const { features, nodes } = compiledModel(model);
    const views = new Map<string, NodeViewDeclaration>();
    for (const feature of features) {
        const plugin = plugins.find((candidate) => candidate.feature === feature.id);
        const declared = plugin?.views;
        for (const view of declared ?? []) {
            const { node } = view;
            if (!nodes.some(({ name }) => name === node)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: pointer('nodeViews', node),
                });
            }
            views.set(node, view);
        }
    }
    return views;
};

/** The panels the model's editor parts attach, keyed by the id the slot opens. */
const collectPanels = (plugins: readonly EditorPart[]) => {
    const panels = new Map<string, PanelDeclaration>();
    for (const plugin of plugins) {
        for (const panel of plugin.panels ?? []) {
            panels.set(panel.control, panel);
        }
    }
    return panels;
};

/** The defaults with `limitOverrides`, then each of `limits` that is stricter; invalid values are ignored. */
const limitsWithin = (limits: Partial<ResourceLimits> | undefined, overrides: Partial<ResourceLimits> | undefined) => {
    const loosened = limitsOf(overrides);
    const result = { ...limitsOf(limits, loosened) };
    // `limitsOf` always gives every key of `ResourceLimits`, which `Object.keys` cannot show.
    for (const name of Object.keys(loosened) as (keyof ResourceLimits)[]) {
        result[name] = Math.min(loosened[name], result[name]);
    }
    return result;
};

/** The longest string default or enum value of a stored attribute of `model`, which `maxAttributeLength` must admit. */
export const longestAttributeValue = (model: ContentModel): number => {
    const { nodes, marks } = compiledModel(model);
    let longest = 0;
    const measure = (declaration: ValueDeclaration) => {
        const values: unknown[] = [declaration.default];
        if (declaration.type === 'enum') {
            values.push(...declaration.values);
        }
        for (const value of values) {
            if (typeof value === 'string') {
                longest = Math.max(longest, value.length);
            }
        }
    };
    const declared = [...nodes.map((node) => attributesOf(node)), ...marks.map((mark) => mark.declaration.attrs)];
    for (const attributes of declared) {
        for (const [name, declaration] of Object.entries(attributes)) {
            // `checkHref` caps an `href`, never `maxAttributeLength`.
            if (name !== 'href') {
                measure(declaration);
            }
        }
    }
    return longest;
};

/**
 * Rejects limits under which the model's own values or its new document could not load again, naming `limits` when
 * its own value is the one in force, else `limitOverrides`.
 */
const checkLimits = (model: ContentModel, limits: ResourceLimits, given: Partial<ResourceLimits> | undefined) => {
    const pathOf = (name: keyof ResourceLimits) => {
        if (given?.[name] === limits[name]) {
            return pointer('limits', name);
        }
        return pointer('limitOverrides', name);
    };
    const minimum = longestAttributeValue(model);
    if (limits.maxAttributeLength < minimum) {
        throw new DefinitionError('definition.invalid-option', {
            path: pathOf('maxAttributeLength'),
            minimum,
        });
    }
    const empty = decodeDocument(createEmptyDocument(model), model, { limits });
    if (empty.status === 'blocked') {
        const exceeded = empty.diagnostics.find(({ code }) => code === 'format.limit-exceeded');
        const details = exceeded?.details;
        const limit = details?.limit;
        throw new DefinitionError('definition.invalid-option', {
            path: pathOf(limit as keyof ResourceLimits),
        });
    }
};

/** The engine of `model` with the editor part of each installed feature, from units that cover the model exactly. */
export const editorEngine = (
    model: ContentModel,
    units: readonly RichTextPlugin[],
): {
    readonly engine: CompiledDefinition;
    readonly plugins: readonly EditorPart[];
} => {
    const plugins = collectPlugins(model, units);
    const built = {
        ...RUNTIME_PLUGINS.plugins,
        [CLIPBOARD_PLUGIN.id]: clipboardPlugin(model, intakeOf(model, plugins)),
        [DROP_CURSOR_PLUGIN.id]: dropCursorPlugin,
    };
    const extensions = plugins.map((plugin) => extensionOf(model, plugin));
    const engine = compileDefinition(
        model,
        { plugins: built, execute: executeFor, handleKey: handleKeyFor },
        extensions,
    );
    for (const plugin of plugins) {
        for (const [index, entry] of (plugin.toolbar ?? []).entries()) {
            if (!engine.commands.has(entry.command)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: plugin.feature,
                    path: `${pointer('toolbar', index)}/command`,
                });
            }
        }
    }
    // The server offers a repair when the model installs its feature, so the editor must have its command.
    const { features } = compiledModel(model);
    for (const { command, feature } of CONTENT_REPAIRS(model)) {
        if (features.some(({ id }) => id === feature) && !engine.commands.has(command)) {
            throw new DefinitionError('definition.orphan-behavior', {
                feature,
                path: pointer('repairs', command),
            });
        }
    }
    return { engine, plugins };
};

/** What the editor parts of `model`'s features add to its engine, for a definition compiled without React. */
export const extensionsOf = (model: ContentModel, units: readonly RichTextPlugin[]): readonly EngineExtension[] =>
    collectPlugins(model, units).map((plugin) => extensionOf(model, plugin));

/** Compiles an editor definition once, from units that cover the model exactly. */
export const compileEditor = <Model extends ContentModel, Plugins extends readonly RichTextPlugin[]>(
    options: EditorDefinitionOptions<Model> & { readonly plugins: Plugins },
    profile?: RichTextProfile,
): CompiledEditorDefinition<CommandsOfPlugins<Plugins>> => {
    const { id, model, policy } = options;
    const { engine, plugins } = editorEngine(model, options.plugins);
    const views = collectViews(model, plugins);
    const panels = collectPanels(plugins);
    const limits = limitsWithin(options.limits, options.limitOverrides);
    checkLimits(model, limits, options.limits);
    const definition = Object.freeze({
        id,
        model: model.ref,
        capabilities: model.capabilities,
        authoring: authoringOf(model, policy),
        limits,
    });
    engines.set(definition, engine);
    nodeViews.set(definition, views);
    editorPanels.set(definition, panels);
    editorPlugins.set(definition, plugins);
    readers.set(definition, readersOfUnits(options.plugins));
    if (profile !== undefined) {
        profiles.set(definition, profile);
    }
    return definition as CompiledEditorDefinition<CommandsOfPlugins<Plugins>>;
};
