/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin, type EditorPlugin } from '#/bridge/plugin';
import { type ContentModel } from '#/model';

import { fixtureBold, fixtureHeading, fixtureHeadingSet } from './features';

const LEVEL = { fields: { level: { type: 'integer', min: 1, max: 6 } } } as const;

/** Binds Mod+B to a paragraph command, so a model has a feature key. */
export const fixtureBoldEditor = defineEditorPlugin(fixtureBold, {
    commands: { 'fixture.paragraph.set': { run: (api) => api.blocks.set('paragraph') } },
    keys: { 'Mod-b': 'fixture.paragraph.set' },
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

/** The fixture features' editor parts that hold no React, so a worker with no style loader takes them. */
export const FIXTURE_EDITORS = [fixtureBoldEditor, fixtureHeadingEditor, fixtureHeadingSetEditor] as const;

/** The ones of `parts` for the features `model` installs, in feature order, as a host passes `defineEditor` its own. */
export const installedOf = <P extends EditorPlugin>(model: ContentModel, parts: readonly P[]): readonly P[] =>
    model.capabilities.flatMap(({ id }) => parts.filter(({ feature }) => feature === id));

/** The editor parts of the fixture features `model` installs, with no React. */
export const fixtureEditorsOf = (model: ContentModel) => installedOf(model, FIXTURE_EDITORS);
