/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType } from 'react';

import { declaredViews } from '#/bridge/define';
import { clipboardPlugin, dropCursorPlugin } from '#/clipboard/plugin';
import { compileDefinition, type CompiledDefinition } from '#/definition';
import { type ContentModel, DefinitionError, type ResourceLimits } from '#/model';
import { CLIPBOARD_PLUGIN, DROP_CURSOR_PLUGIN } from '#/model/capabilities';
import { compiledModel } from '#/model/compile';
import { limitsOf } from '#/model/decode';
import { pointer } from '#/model/errors';
import { CAPABILITIES } from '#/runtime/capabilities';
import { authoringOf } from '#/runtime/policy';

import {
    type CommandsOfModel,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
    type ReactPresentation,
} from './types';

// Kept off the definition, so no engine value is reachable from what a host holds (DR-034).
const engines = new WeakMap<object, CompiledDefinition>();
const nodeViews = new WeakMap<object, ReadonlyMap<string, ComponentType<object>>>();

/** The engine a definition compiled once, which every editor mounted with it shares (SPEC-rich-text/AC-029). */
export const engineOf = (definition: CompiledEditorDefinition<object>): CompiledDefinition => {
    const engine = engines.get(definition);
    if (engine === undefined) {
        throw new Error('RichTextEditor takes only a definition that defineEditor made.');
    }
    return engine;
};

/** The node view chrome of a definition by node name; a later feature's view of a node replaces an earlier one's. */
export const viewsOf = (definition: CompiledEditorDefinition<object>): ReadonlyMap<string, ComponentType<object>> =>
    nodeViews.get(definition) ?? new Map();

/** The node views the model's features attach, each for a node the model declares (SPEC-rich-text/AC-021). */
const collectViews = (model: ContentModel) => {
    const { features, nodes } = compiledModel(model);
    const views = new Map<string, ComponentType<object>>();
    for (const feature of features) {
        for (const { node, component } of declaredViews(feature.declaration)) {
            if (!nodes.some(({ name }) => name === node)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: pointer('nodeViews', node),
                });
            }
            views.set(node, component);
        }
    }
    return views;
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

/**
 * Compiles an editor definition once: the model's engine, the authoring policy and the limits. A host renders
 * every editor of this definition with it, and remote policy values are checked like a manifest's (SPEC-rich-text/AC-030).
 */
export const defineEditor = <Model extends ContentModel>(
    options: EditorDefinitionOptions<Model>,
): CompiledEditorDefinition<CommandsOfModel<Model>> => {
    const { id, model, policy } = options;
    const views = collectViews(model);
    const definition = Object.freeze({
        id,
        model: model.ref,
        capabilities: model.capabilities,
        authoring: authoringOf(model, policy),
        limits: limitsWithin(options.limits, options.limitOverrides),
    });
    const plugins = {
        ...CAPABILITIES.plugins,
        [CLIPBOARD_PLUGIN.id]: clipboardPlugin(model),
        [DROP_CURSOR_PLUGIN.id]: dropCursorPlugin,
    };
    engines.set(definition, compileDefinition(model, { ...CAPABILITIES, plugins }));
    nodeViews.set(definition, views);
    return definition as unknown as CompiledEditorDefinition<CommandsOfModel<Model>>;
};

/** A presentation with no toolbar, styles or colour tokens, and the values given. */
export const defineReactPresentation = (input: Partial<ReactPresentation>): ReactPresentation => ({
    styles: [],
    colorTokens: [],
    toolbar: [],
    sliceContext: null,
    ...input,
});
