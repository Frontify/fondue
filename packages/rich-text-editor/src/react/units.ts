/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { type ContentModel, DefinitionError } from '#/model';
import { compiledModel, pointer } from '#/model/internal';
import { type ReaderOverrides } from '#/reader/plan';

/** Rejects units that do not cover `model`'s features exactly: one unit per feature, of the same ID and version. */
export const checkCover = (model: ContentModel, units: readonly RichTextPlugin[]) => {
    const { features } = compiledModel(model);
    for (const [index, unit] of units.entries()) {
        const installed = features.find(({ id }) => id === unit.id);
        if (installed === undefined) {
            throw new DefinitionError('definition.orphan-behavior', {
                feature: unit.id,
                path: pointer('plugins', index),
            });
        }

        if (units.findIndex(({ id }) => id === unit.id) !== index) {
            throw new DefinitionError('definition.duplicate-id', {
                feature: unit.id,
                path: pointer('plugins', index),
            });
        }

        if (installed.version !== unit.feature.version) {
            throw new DefinitionError('definition.version-mismatch', {
                feature: unit.id,
                required: installed.version,
                installed: unit.feature.version,
                path: pointer('plugins', index),
            });
        }
    }

    for (const { id } of features) {
        if (!units.some((unit) => unit.id === id)) {
            throw new DefinitionError('definition.missing-plugin', { feature: id, path: pointer('plugins') });
        }
    }
};

/** The reader overrides of the units that have them, by feature ID. */
export const readersOfUnits = (units: readonly RichTextPlugin[]): ReaderOverrides =>
    Object.fromEntries(units.flatMap(({ id, reader }) => (reader === undefined ? [] : [[id, reader] as const])));
