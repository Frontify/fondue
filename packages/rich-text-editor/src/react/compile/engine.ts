/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type EditorPart } from '#/bridge/pluginApi/plugin';
import { type ContentModel } from '#/model';
import { type CompiledDefinition, type EngineExtension } from '#/runtime/definition';

import { editorEngine as engineWith, extensionsOf as extensionsWith } from './compileEditor';

/** The engine of `model` with the editor part of each unit, which must cover the model's features exactly. */
export const editorEngine = (
    model: ContentModel,
    units: readonly RichTextPlugin[],
): { engine: CompiledDefinition; plugins: readonly EditorPart[] } => engineWith(model, units);

/** What the editor parts of `units` add to the engine of `model`, for a definition compiled without React. */
export const extensionsOf = (model: ContentModel, units: readonly RichTextPlugin[]): readonly EngineExtension[] =>
    extensionsWith(model, units);
