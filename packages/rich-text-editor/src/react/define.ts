/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { type ContentModel } from '#/model';
import { SHIPPED_OVERRIDES } from '#/reader/registry';

import { compileEditor } from './compile-editor';
import { SHIPPED_PLUGINS } from './plugins';
import {
    type CommandsOfModel,
    type CommandsOfPlugins,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
} from './types';

export { defineReactPresentation } from './presentation';

/**
 * Compiles an editor definition once: the model's engine, the authoring policy and the limits. A host renders
 * every editor of this definition with it, and remote policy values are checked like option values.
 */
export const defineEditor = <Model extends ContentModel, const Plugins extends readonly EditorPlugin[] = readonly []>(
    options: EditorDefinitionOptions<Model> & { readonly plugins?: Plugins },
): CompiledEditorDefinition<CommandsOfModel<Model> & CommandsOfPlugins<Plugins>> =>
    compileEditor(options, SHIPPED_PLUGINS, SHIPPED_OVERRIDES);
