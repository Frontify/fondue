/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import { DefinitionError, type Feature, type JsonObject } from '#/model';
import { type ReaderContext } from '#/model/declarations';

import { type EditorPlugin } from './plugin';

/** The shape of `ReaderRenderers` from `#/reader/define`, which a bridge module cannot import without a folder cycle. */
export type ReaderOverrides = Readonly<
    Record<
        string,
        ComponentType<{ readonly attrs: JsonObject; readonly children?: ReactNode; readonly context: ReaderContext }>
    >
>;

/** One feature's unit: its vocabulary, its editor part and its optional reader overrides, which a profile lists once. */
export interface RichTextPlugin<Id extends string = string, Commands extends object = object> {
    readonly id: Id;
    readonly feature: Feature<object, object, object, Id>;
    readonly editor: EditorPlugin<Id, Commands>;
    readonly reader?: ReaderOverrides;
}

/** The inputs of a unit: the feature's factory, its editor part and the reader overrides of its nodes and marks. */
interface PluginParts<Id extends string, Options extends object, Commands extends object> {
    readonly feature: (options?: Options) => Feature<object, object, object, Id>;
    readonly editor: EditorPlugin<NoInfer<Id>, Commands>;
    readonly reader?: ReaderOverrides;
}

/** A factory for the unit, which takes the options of the feature's own factory. */
export const definePlugin = <Id extends string, Options extends object, Commands extends object>(
    parts: PluginParts<Id, Options, Commands>,
): ((options?: Options) => RichTextPlugin<Id, Commands>) => {
    const { feature, editor, reader } = parts;
    if (editor.feature !== feature().id) {
        throw new DefinitionError('definition.plugin-mismatch', { feature: feature().id, editor: editor.feature });
    }
    const id = editor.feature;
    return (options) => {
        const plugin: RichTextPlugin<Id, Commands> = { id, feature: feature(options), editor };
        if (reader === undefined) {
            return Object.freeze(plugin);
        }
        return Object.freeze({ ...plugin, reader });
    };
};
