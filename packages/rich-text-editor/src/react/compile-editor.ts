/* (c) Copyright Frontify Ltd., all rights reserved. */

import { commandApiOf, editorApiOf } from '#/bridge/live-api';
import { type EditorHosts, type EditorPlugin, type EditorSuggestion, pluginWithOptions } from '#/bridge/plugin';
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
import { attributesOf, compiledModel } from '#/model/compile';
import { limitsOf } from '#/model/decode';
import { pointer } from '#/model/errors';
import { ownValue } from '#/model/values';
import { type ReaderOverrides } from '#/reader/plan';
import { RUNTIME_PLUGINS } from '#/runtime/capabilities';
import { pluginCommand } from '#/runtime/editor-api';
import { authoringOf } from '#/runtime/policy';
import { runtimeOfView } from '#/runtime/runtime';

import {
    type CommandsOfModel,
    type CommandsOfPlugins,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
} from './types';

/** Editor parts by feature ID, which a definition installs for the features its model installs. */
export type ShippedParts = Readonly<Record<string, EditorPlugin>>;

// Kept off the definition, so no engine value is reachable from what a host holds.
const engines = new WeakMap<object, CompiledDefinition>();
const readers = new WeakMap<object, ReaderOverrides>();

/** The engine a definition compiled once, which every editor mounted with it shares. */
export const engineOf = (definition: CompiledEditorDefinition<object>): CompiledDefinition => {
    const engine = engines.get(definition);
    if (engine === undefined) {
        throw new Error('RichTextEditor takes only a definition that defineEditor made.');
    }
    return engine;
};

/** `base` with `added` in place of its entry of the same `key`, and each other entry of `added` after it. */
const byKey = <T>(base: readonly T[] = [], added: readonly T[] = [], key: keyof T): readonly T[] => [
    ...base.map((entry) => added.find((other) => other[key] === entry[key]) ?? entry),
    ...added.filter((other) => !base.some((entry) => entry[key] === other[key])),
];

/**
 * The shipped part extended by the host's, never replaced whole: commands and keys by ID, and each keyed list by its
 * entry key.
 */
const extend = (shipped: EditorPlugin, host: EditorPlugin): EditorPlugin => {
    const merged = Object.assign({ ...shipped }, host);
    return Object.freeze({
        ...merged,
        commands: Object.assign({ ...shipped.commands }, host.commands),
        keys: Object.assign({ ...shipped.keys }, host.keys),
        inputRules: byKey(shipped.inputRules, host.inputRules, 'id'),
        toolbar: byKey(shipped.toolbar, host.toolbar, 'id'),
        decorations: byKey(shipped.decorations, host.decorations, 'id'),
        suggestions: byKey(shipped.suggestions, host.suggestions, 'trigger'),
    });
};

/**
 * The editor part of each installed feature: the shipped one extended by the host's. A host plugin for a feature the
 * model does not install is an orphan, and a second host plugin for one feature a duplicate.
 */
const collectPlugins = (
    model: ContentModel,
    given: readonly EditorPlugin[] = [],
    shipped: ShippedParts,
): readonly EditorPlugin[] => {
    const { features } = compiledModel(model);
    for (const [index, plugin] of given.entries()) {
        if (!features.some(({ id }) => id === plugin.feature)) {
            throw new DefinitionError('definition.orphan-behavior', {
                feature: plugin.feature,
                path: pointer('plugins', index),
            });
        }
        if (given.findIndex(({ feature }) => feature === plugin.feature) !== index) {
            throw new DefinitionError('definition.duplicate-id', {
                feature: plugin.feature,
                path: pointer('plugins', index),
            });
        }
    }
    return features.flatMap(({ id, options }) => {
        const host = given.find((candidate) => candidate.feature === id);
        const part = ownValue(shipped, id);
        if (host !== undefined && part !== undefined) {
            return [extend(pluginWithOptions(part, options), pluginWithOptions(host, options))];
        }
        const plugin = host ?? part;
        return plugin === undefined ? [] : [pluginWithOptions(plugin, options)];
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
const extensionOf = (model: ContentModel, plugin: EditorPlugin): EngineExtension => ({
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

/** The defaults with `limitOverrides`, then each of `limits` that is stricter; invalid values are ignored. */
const limitsWithin = (limits: Partial<ResourceLimits> | undefined, overrides: Partial<ResourceLimits> | undefined) => {
    const loosened = limitsOf(overrides);
    const values: Readonly<Record<string, number>> = { ...loosened };
    const result: Record<string, number> = { ...limitsOf(limits, loosened) };
    for (const [name, value] of Object.entries(values)) {
        result[name] = Math.min(value, result[name] ?? value);
    }
    return result as unknown as ResourceLimits;
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

/** The engine of `model` with the editor part of each installed feature: the given one, else the one of `shipped`. */
export const editorEngine = (
    model: ContentModel,
    given: readonly EditorPlugin[] | undefined,
    shipped: ShippedParts,
): {
    readonly engine: CompiledDefinition;
    readonly plugins: readonly EditorPlugin[];
} => {
    const plugins = collectPlugins(model, given, shipped);
    const built = {
        ...RUNTIME_PLUGINS.plugins,
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
    return { engine, plugins };
};

/** What the editor parts of `model`'s features add to its engine, for a definition compiled without React. */
export const extensionsOf = (
    model: ContentModel,
    given: readonly EditorPlugin[] | undefined,
    shipped: ShippedParts,
): readonly EngineExtension[] => collectPlugins(model, given, shipped).map((plugin) => extensionOf(model, plugin));

/**
 * Compiles an editor definition once with the editor parts of `shipped` and the reader overrides of `overrides`: the
 * model's engine, the authoring policy and the limits.
 */
export const compileEditor = <Model extends ContentModel, const Plugins extends readonly EditorPlugin[] = readonly []>(
    options: EditorDefinitionOptions<Model> & { readonly plugins?: Plugins },
    shipped: ShippedParts,
    overrides: ReaderOverrides,
): CompiledEditorDefinition<CommandsOfModel<Model> & CommandsOfPlugins<Plugins>> => {
    const { id, model, policy } = options;
    const { engine } = editorEngine(model, options.plugins, shipped);
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
    readers.set(definition, overrides);
    return definition as unknown as CompiledEditorDefinition<CommandsOfModel<Model> & CommandsOfPlugins<Plugins>>;
};
