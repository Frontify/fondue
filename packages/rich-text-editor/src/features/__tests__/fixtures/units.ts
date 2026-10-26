/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { type EditorPart, OPTION_PARTS, partWithOptions } from '#/bridge/plugin';
import { pluginsById } from '#/features/plugins';
import { type ContentModel, type Feature, type JsonObject } from '#/model';
import { compiledModel } from '#/model/internal';

import { fixtureChrome } from './chrome/feature';
import { fixtureChromeEditor } from './chrome/view';
import { fixtureCodeBlock } from './code-block/feature';
import { fixtureCodeBlockEditor } from './code-block/view';
import {
    fixtureBoldEditor,
    fixtureEmbedEditor,
    fixtureHeadingEditor,
    fixtureHeadingSetEditor,
    fixtureHighlightEditor,
    fixtureHistoryEditor,
    fixtureInputRulesEditor,
    fixtureMentionEditor,
    fixtureRedoEditor,
    fixtureTableEditor,
    fixtureToolbarEditor,
} from './editors';
import {
    fixtureBold,
    fixtureHeading,
    fixtureHeadingSet,
    fixtureHistory,
    fixtureInputRules,
    fixtureMention,
    fixtureRedo,
    fixtureToolbar,
} from './features';
import { fixtureHighlight } from './highlight';
import { fixtureEmbed } from './media/embed';
import { fixtureMediaImage } from './media/feature';
import { fixtureMediaImageEditor } from './media/view';
import { fixtureTable, fixtureTableBlock } from './table/feature';
import { fixtureTableBlockEditor } from './table/view';

/** The commands of the units `unitsOf` returns, whose payloads their feature list does not type. */
export type UnitCommands = Readonly<Record<string, unknown>>;

/** A unit of the feature `factory` makes and its editor part, as `definePlugin` makes one for a shipped feature. */
const fixtureUnit = (factory: () => Feature, editor: EditorPart): RichTextPlugin => {
    const feature = factory();

    return Object.freeze({ id: feature.id, feature, editor });
};

const FIXTURE_UNITS = [
    fixtureUnit(fixtureBold, fixtureBoldEditor),
    fixtureUnit(fixtureHistory, fixtureHistoryEditor),
    fixtureUnit(fixtureRedo, fixtureRedoEditor),
    fixtureUnit(fixtureHeading, fixtureHeadingEditor),
    fixtureUnit(fixtureMention, fixtureMentionEditor),
    fixtureUnit(fixtureHeadingSet, fixtureHeadingSetEditor),
    fixtureUnit(fixtureInputRules, fixtureInputRulesEditor),
    fixtureUnit(fixtureToolbar, fixtureToolbarEditor),
    fixtureUnit(fixtureHighlight, fixtureHighlightEditor),
    fixtureUnit(fixtureEmbed, fixtureEmbedEditor),
    fixtureUnit(fixtureTable, fixtureTableEditor),
    fixtureUnit(fixtureChrome, fixtureChromeEditor),
    fixtureUnit(fixtureCodeBlock, fixtureCodeBlockEditor),
    fixtureUnit(fixtureMediaImage, fixtureMediaImageEditor),
    fixtureUnit(fixtureTableBlock, fixtureTableBlockEditor),
];

const baseUnitOf = (id: string, version: number): RichTextPlugin => {
    const fixture = FIXTURE_UNITS.find((unit) => unit.id === id);
    if (fixture !== undefined) {
        return fixture;
    }

    try {
        return pluginsById([id])[0] as RichTextPlugin;
    } catch {
        return fixtureUnit(() => ({ id, version }) as unknown as Feature, { feature: id });
    }
};

/** `base` with the parts of `host` over its editor part: its commands and keys by ID, every other list whole. */
const layered = (base: RichTextPlugin, host: EditorPart): RichTextPlugin => {
    const resolve = (options: JsonObject) => {
        const shipped = partWithOptions(base.editor, options);
        const own = partWithOptions(host, options);

        return {
            ...shipped,
            ...own,
            commands: { ...shipped.commands, ...own.commands },
            keys: { ...shipped.keys, ...own.keys },
        };
    };

    const editor = Object.freeze({ feature: base.id, [OPTION_PARTS]: Object.freeze(resolve) });

    return Object.freeze({ ...base, editor });
};

/**
 * One unit per feature `model` installs: the fixture feature's unit, else the shipped one, else one with no editor
 * part; the part of `hosts` for a feature goes over that unit's editor part.
 */
export const unitsOf = (
    model: ContentModel,
    hosts: readonly EditorPart[] = [],
): readonly RichTextPlugin<string, UnitCommands>[] =>
    compiledModel(model).features.map(({ id, version }) => {
        const base = baseUnitOf(id, version);
        const host = [...hosts].reverse().find((candidate) => candidate.feature === id);
        if (host === undefined) {
            return base;
        }

        return layered(base, host);
    }) as unknown as readonly RichTextPlugin<string, UnitCommands>[];
