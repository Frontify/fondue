/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type EditorPart, OPTION_PARTS, partWithOptions } from '#/bridge/pluginApi/plugin';
import { type ContentModel, type Feature, type JsonObject } from '#/model';
import { compiledModel } from '#/model/internal';
import { pluginsById } from '#/plugins/plugins';

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

/** The commands of the plugins `pluginsFor` returns, whose payloads their feature list does not type. */
export type PluginCommands = Readonly<Record<string, unknown>>;

/** A plugin of the feature `factory` makes and its editor part, as `definePlugin` makes one for a shipped feature. */
const fixturePlugin = (factory: () => Feature, editor: EditorPart): RichTextPlugin => {
    const feature = factory();

    return Object.freeze({ id: feature.id, feature, editor });
};

const FIXTURE_PLUGINS = [
    fixturePlugin(fixtureBold, fixtureBoldEditor),
    fixturePlugin(fixtureHistory, fixtureHistoryEditor),
    fixturePlugin(fixtureRedo, fixtureRedoEditor),
    fixturePlugin(fixtureHeading, fixtureHeadingEditor),
    fixturePlugin(fixtureMention, fixtureMentionEditor),
    fixturePlugin(fixtureHeadingSet, fixtureHeadingSetEditor),
    fixturePlugin(fixtureInputRules, fixtureInputRulesEditor),
    fixturePlugin(fixtureToolbar, fixtureToolbarEditor),
    fixturePlugin(fixtureHighlight, fixtureHighlightEditor),
    fixturePlugin(fixtureEmbed, fixtureEmbedEditor),
    fixturePlugin(fixtureTable, fixtureTableEditor),
    fixturePlugin(fixtureChrome, fixtureChromeEditor),
    fixturePlugin(fixtureCodeBlock, fixtureCodeBlockEditor),
    fixturePlugin(fixtureMediaImage, fixtureMediaImageEditor),
    fixturePlugin(fixtureTableBlock, fixtureTableBlockEditor),
];

const basePluginOf = (id: string, version: number): RichTextPlugin => {
    const fixture = FIXTURE_PLUGINS.find((plugin) => plugin.id === id);
    if (fixture !== undefined) {
        return fixture;
    }

    try {
        return pluginsById([id])[0] as RichTextPlugin;
    } catch {
        return fixturePlugin(() => ({ id, version }) as unknown as Feature, { feature: id });
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
 * One plugin per feature `model` installs: the fixture feature's plugin, else the shipped one, else one with no editor
 * part; the part of `hosts` for a feature goes over that plugin's editor part.
 */
export const pluginsFor = (
    model: ContentModel,
    hosts: readonly EditorPart[] = [],
): readonly RichTextPlugin<string, PluginCommands>[] =>
    compiledModel(model).features.map(({ id, version }) => {
        const base = basePluginOf(id, version);
        const host = [...hosts].reverse().find((candidate) => candidate.feature === id);
        if (host === undefined) {
            return base;
        }

        return layered(base, host);
    }) as unknown as readonly RichTextPlugin<string, PluginCommands>[];
