/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type ContentModel } from '#/model';

import { type CommandsOfPlugins, type CompiledEditorDefinition, type EditorDefinitionOptions } from '../types';

import { compileEditor } from './compileEditor';

export { defineReactPresentation } from './presentation';

/**
 * Compiles an editor definition once: the model's engine, the authoring policy and the limits. The plugins must cover
 * the model's features exactly. A host renders every editor of this definition with it, and remote policy values are
 * checked like option values.
 */
export const defineEditor = <Model extends ContentModel, const Plugins extends readonly RichTextPlugin[]>(
    options: EditorDefinitionOptions<Model> & { plugins: Plugins },
): CompiledEditorDefinition<CommandsOfPlugins<Plugins>> => compileEditor(options);
