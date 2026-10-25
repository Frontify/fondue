/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { type EditorPart } from '#/bridge/plugin';
import { type CompiledDefinition, type EngineExtension } from '#/definition';
import { type ContentModel } from '#/model';

import { editorEngine as engineWith, extensionsOf as extensionsWith } from './compileEditor';

/** The engine of `model` with the editor part of each unit, which must cover the model's features exactly. */
export const editorEngine = (
    model: ContentModel,
    units: readonly RichTextPlugin[],
): { readonly engine: CompiledDefinition; readonly plugins: readonly EditorPart[] } => engineWith(model, units);

/** What the editor parts of `units` add to the engine of `model`, for a definition compiled without React. */
export const extensionsOf = (model: ContentModel, units: readonly RichTextPlugin[]): readonly EngineExtension[] =>
    extensionsWith(model, units);
