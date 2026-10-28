/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type ContentModel, DefinitionError } from '#/model';
import { compiledModel, pointer } from '#/model/internal';
import { type ReaderOverrides } from '#/reader/helpers/plan';

/** Rejects plugins that do not cover `model`'s features exactly: one plugin per feature, of the same ID and version. */
export const checkCover = (model: ContentModel, plugins: readonly RichTextPlugin[]) => {
    const { features } = compiledModel(model);
    for (const [index, plugin] of plugins.entries()) {
        const installed = features.find(({ id }) => id === plugin.id);
        if (installed === undefined) {
            throw new DefinitionError('definition.orphan-behavior', {
                feature: plugin.id,
                path: pointer('plugins', index),
            });
        }

        if (plugins.findIndex(({ id }) => id === plugin.id) !== index) {
            throw new DefinitionError('definition.duplicate-id', {
                feature: plugin.id,
                path: pointer('plugins', index),
            });
        }

        if (installed.version !== plugin.feature.version) {
            throw new DefinitionError('definition.version-mismatch', {
                feature: plugin.id,
                required: installed.version,
                installed: plugin.feature.version,
                path: pointer('plugins', index),
            });
        }
    }

    for (const { id } of features) {
        if (!plugins.some((plugin) => plugin.id === id)) {
            throw new DefinitionError('definition.missing-plugin', { feature: id, path: pointer('plugins') });
        }
    }
};

/** The reader overrides of the plugins that have them, by feature ID. */
export const readersOfPlugins = (plugins: readonly RichTextPlugin[]): ReaderOverrides => {
    const withReader = plugins.flatMap(({ id, reader }) => {
        if (reader === undefined) {
            return [];
        }

        return [[id, reader] as const];
    });

    return Object.fromEntries(withReader);
};
