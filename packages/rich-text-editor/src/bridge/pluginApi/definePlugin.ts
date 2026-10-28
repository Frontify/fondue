/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import {
    compileContentModel,
    type ContentModel,
    type ContentModelOptions,
    DefinitionError,
    type Feature,
    type JsonObject,
} from '#/model';
import { type ReaderContext } from '#/model/internal';

import { type EditorFacet, type EditorPart, type EditorPartSpec, OPTION_PARTS, type SpecOfOptions } from './plugin';

/** The shape of `ReaderRenderers` from `#/reader/define`, which a bridge module cannot import without a folder cycle. */
export type ReaderOverrides = Readonly<
    Record<string, ComponentType<{ attrs: JsonObject; children?: ReactNode; context: ReaderContext }>>
>;

/** One feature's plugin: its vocabulary, its editor part and its optional reader overrides, which a profile lists once. */
export type RichTextPlugin<FeatureId extends string = string, Commands extends object = object> = {
    /** The feature's ID. */
    readonly id: FeatureId;
    /** The feature's vocabulary. */
    readonly feature: Feature<object, object, object, FeatureId>;
    /** What the feature does while it is edited. */
    readonly editor: EditorPart<FeatureId, Commands>;
    /** Renderers that replace the reader's own for the feature's nodes and marks. */
    readonly reader?: ReaderOverrides;
};

/** The inputs of a plugin: the feature's factory, its editor part and the reader overrides of its nodes and marks. */
type PluginSides<FeatureId extends string, Options extends object, Commands extends object> = {
    feature: (options?: Options) => Feature<object, object, object, FeatureId>;
    editor: EditorPart<NoInfer<FeatureId>, Commands>;
    reader?: ReaderOverrides;
};

/**
 * A factory for the plugin, which takes the options of the feature's own factory.
 *
 * @throws DefinitionError when the editor part belongs to another feature than `parts.feature`.
 */
export const definePlugin = <FeatureId extends string, Options extends object, Commands extends object>(
    parts: PluginSides<FeatureId, Options, Commands>,
): ((options?: Options) => RichTextPlugin<FeatureId, Commands>) => {
    const { feature, editor, reader } = parts;
    if (editor.feature !== feature().id) {
        throw new DefinitionError('definition.plugin-mismatch', { feature: feature().id, editor: editor.feature });
    }

    const id = editor.feature;

    return (options) => {
        const plugin: RichTextPlugin<FeatureId, Commands> = { id, feature: feature(options), editor };
        if (reader === undefined) {
            return Object.freeze(plugin);
        }

        return Object.freeze({ ...plugin, reader });
    };
};

/** The facets of both, since the functions of either run over the one part's API. */
const needsOf = (own: Pick<EditorPartSpec, 'needs'>, added: Pick<EditorPartSpec, 'needs'>): readonly EditorFacet[] => [
    ...(own.needs ?? []),
    ...(added.needs ?? []),
];

/** The editor part with `parts` over its own, and over the parts its function gives for the resolved options. */
const extendEditor = <FeatureId extends string, Commands extends object>(
    editor: EditorPart<FeatureId, Commands>,
    parts: Omit<EditorPartSpec, 'commands'>,
): EditorPart<FeatureId, Commands> => {
    const specOfOptions = (editor as EditorPart & { readonly [OPTION_PARTS]?: SpecOfOptions })[OPTION_PARTS];
    if (specOfOptions === undefined) {
        return Object.freeze({
            ...editor,
            ...parts,
            needs: needsOf(editor, parts),
        });
    }

    const extended: SpecOfOptions = Object.freeze((options: JsonObject) => {
        const own = specOfOptions(options);

        return { ...own, ...parts, needs: needsOf(own, parts) };
    });

    return Object.freeze({ ...editor, [OPTION_PARTS]: extended });
};

/** `plugin` with `parts` merged over its editor part, such as another key set; its feature and readers stay. */
export const extendPlugin = <
    FeatureId extends string,
    Commands extends object,
    const Facet extends EditorFacet = never,
>(
    plugin: RichTextPlugin<FeatureId, Commands>,
    parts: Omit<EditorPartSpec<Facet>, 'commands'>,
): RichTextPlugin<FeatureId, Commands> => Object.freeze({ ...plugin, editor: extendEditor(plugin.editor, parts) });

type FeaturesOf<Plugins extends readonly RichTextPlugin[]> = {
    readonly [Index in keyof Plugins]: Plugins[Index]['feature'];
};

/** The content model that `plugins`' features compile to, which `defineEditor` takes with the same plugins. */
export const modelOf = <const Plugins extends readonly RichTextPlugin[]>(
    plugins: Plugins,
    ref: ContentModelOptions,
): ContentModel<FeaturesOf<Plugins>> =>
    compileContentModel(plugins.map(({ feature }) => feature) as FeaturesOf<Plugins>, ref);
