/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin, type EditorPlugin } from '#/bridge/plugin';
import { type ContentModel } from '#/model';

import {
    fixtureBold,
    fixtureHeading,
    fixtureHeadingSet,
    fixtureHistory,
    fixtureInputRules,
    fixtureRedo,
} from './features';

const LEVEL = { fields: { level: { type: 'integer', min: 1, max: 6 } } } as const;
const LEVELS = [1, 2, 3, 4, 5, 6] as const;

/** Binds Mod+B to a paragraph command, so a model has a feature key. */
export const fixtureBoldEditor = defineEditorPlugin(fixtureBold, {
    commands: { 'fixture.paragraph.set': { run: (api) => api.blocks.set('paragraph') } },
    keys: { 'Mod-b': 'fixture.paragraph.set' },
});

/** Contributes the keyed history plugin, as `core` does. */
export const fixtureHistoryEditor = defineEditorPlugin(fixtureHistory, {
    commands: { 'fixture.undo': { run: (api) => api.history.undo() } },
    keys: { 'Mod-z': 'fixture.undo' },
});

/** Contributes the history plugin a second time. */
export const fixtureRedoEditor = defineEditorPlugin(fixtureRedo, {
    commands: { 'fixture.redo': { run: (api) => api.history.redo() } },
    keys: { 'Mod-y': 'fixture.redo' },
});

/** Sets a heading of a level from a payload. */
export const fixtureHeadingEditor = defineEditorPlugin(fixtureHeading, {
    commands: {
        'fixture.heading.set': {
            payload: LEVEL,
            run: (api, { level }: { readonly level: number }) => api.blocks.set('heading', { level }),
            active: (api, { level }) => api.blocks.active('heading', { level }),
        },
    },
    keys: { 'Mod-Alt-2': { command: 'fixture.heading.set', payload: { level: 2 } } },
});

/** `heading.set` turns the selected textblocks into headings of the payload's level. */
export const fixtureHeadingSetEditor = defineEditorPlugin(fixtureHeadingSet, {
    commands: {
        'heading.set': {
            payload: LEVEL,
            run: (api, { level }: { readonly level: number }) => api.blocks.set('heading', { level }),
            active: (api, { level }) => api.blocks.active('heading', { level }),
        },
    },
});

/**
 * The input rules of the text features: `heading.hashes` over `heading.set`, and the mark rules over `italic`, the
 * `strike` mark and the `code` mark; the editor part of `marks.bold` brings the bold rules.
 */
export const fixtureInputRulesEditor = defineEditorPlugin(fixtureInputRules, {
    inputRules: [
        {
            id: 'heading.hashes',
            kind: 'line-start',
            command: 'heading.set',
            markers: LEVELS.map((level) => ({ marker: '#'.repeat(level), payload: { level } })),
        },
        { id: 'italic.star', kind: 'mark-delimiter', open: '*', close: '*', mark: 'italic' },
        { id: 'italic.underscore', kind: 'mark-delimiter', open: '_', close: '_', mark: 'italic' },
        { id: 'strike.tildes', kind: 'mark-delimiter', open: '~~', close: '~~', mark: 'strike' },
        { id: 'code.backtick', kind: 'mark-delimiter', open: '`', close: '`', mark: 'code' },
    ],
});

/** The fixture features' editor parts that hold no React, so a worker with no style loader takes them. */
export const FIXTURE_EDITORS = [
    fixtureBoldEditor,
    fixtureHistoryEditor,
    fixtureRedoEditor,
    fixtureHeadingEditor,
    fixtureHeadingSetEditor,
    fixtureInputRulesEditor,
] as const;

/** The ones of `parts` for the features `model` installs, in feature order, as a host passes `defineEditor` its own. */
export const installedOf = <P extends EditorPlugin>(model: ContentModel, parts: readonly P[]): readonly P[] =>
    model.capabilities.flatMap(({ id }) => parts.filter(({ feature }) => feature === id));

/** The editor parts of the fixture features `model` installs, with no React. */
export const fixtureEditorsOf = (model: ContentModel) => installedOf(model, FIXTURE_EDITORS);
