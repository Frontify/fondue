/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/define-plugin';
import { type ContentModel, DefinitionError } from '#/model';
import { compiledModel } from '#/model/compile';
import { pointer } from '#/model/errors';
import { type ReaderOverrides } from '#/reader/plan';

import { type ShippedParts } from './compile-editor';
import { type RichTextProfile } from './types';

/** Rejects units that do not cover `model`'s features exactly: one unit per feature, of the same ID and version. */
const checkCover = (model: ContentModel, units: readonly RichTextPlugin[]) => {
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

/** The units of a profile, or the editor parts `compileEditor` installs by feature ID. */
export type CompileSource = readonly RichTextPlugin[] | ShippedParts;

/** The profile alone after units, else the reader overrides by feature ID and then the profile. */
export type CompileRest = readonly [RichTextProfile?] | readonly [ReaderOverrides, RichTextProfile?];

/** The editor parts, reader overrides and profile of a `compileEditor` call, from units that cover the model or as given. */
export const sourcesOf = (model: ContentModel, source: CompileSource, rest: CompileRest) => {
    if (!Array.isArray(source)) {
        return { shipped: source as ShippedParts, overrides: rest[0] as ReaderOverrides, profile: rest[1] };
    }
    const units = source as readonly RichTextPlugin[];
    checkCover(model, units);
    const readerEntries = units.flatMap(({ id, reader }) => (reader === undefined ? [] : [[id, reader] as const]));
    return {
        shipped: Object.fromEntries(units.map(({ id, editor }) => [id, editor])),
        overrides: Object.fromEntries(readerEntries) as ReaderOverrides,
        profile: rest[0] as RichTextProfile | undefined,
    };
};
