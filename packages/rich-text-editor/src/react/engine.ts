/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { type CompiledDefinition, type EngineExtension } from '#/definition';
import { type ContentModel } from '#/model';

import { editorEngine as engineWith, extensionsOf as extensionsWith } from './compile-editor';
import { SHIPPED_PLUGINS } from './plugins';

/** The engine of `model` with the editor part of each installed feature: the given one, else the shipped one. */
export const editorEngine = (
    model: ContentModel,
    given?: readonly EditorPlugin[],
): { readonly engine: CompiledDefinition; readonly plugins: readonly EditorPlugin[] } =>
    engineWith(model, given, SHIPPED_PLUGINS);

/** What the editor parts of `model`'s features add to its engine, for a definition compiled without React. */
export const extensionsOf = (model: ContentModel, given?: readonly EditorPlugin[]): readonly EngineExtension[] =>
    extensionsWith(model, given, SHIPPED_PLUGINS);
