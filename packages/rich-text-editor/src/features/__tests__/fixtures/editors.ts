/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPlugin, type EditorPlugin } from '#/bridge/plugin';
import { type ContentModel } from '#/model';

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

/** Inserts a mention at the selection. */
export const fixtureMentionEditor = defineEditorPlugin(fixtureMention, {
    commands: {
        'fixture.mention.insert': { run: (api) => api.insert.node('mention').status === 'applied' },
    },
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

/**
 * Stands in for the toolbar entries of `marks.italic`, a list toggle, the heading levels and history:
 * an italic toggle, a block toggle over a `toggled_block`, six heading items with payloads and undo and redo
 * buttons, with keys for italic and the block.
 */
export const fixtureToolbarEditor = defineEditorPlugin(fixtureToolbar, {
    commands: {
        'fixture.italic.toggle': {
            run: (api) => api.marks.toggle('italic'),
            active: (api) => api.marks.active('italic'),
        },
        'fixture.list.toggle': {
            run: (api) => api.blocks.set('toggled_block', undefined, { toggle: true }),
            active: (api) => api.blocks.active('toggled_block'),
        },
        'fixture.heading.set': {
            payload: LEVEL,
            run: (api, { level }: { readonly level: number }) =>
                api.blocks.set('toggled_heading', { level }, { toggle: true }),
            active: (api, { level }) => api.blocks.active('toggled_heading', { level }),
        },
        'fixture.history.undo': { run: (api) => api.history.undo() },
        'fixture.history.redo': { run: (api) => api.history.redo() },
    },
    keys: { 'Mod-i': 'fixture.italic.toggle', 'Mod-Shift-8': 'fixture.list.toggle' },
    toolbar: [
        {
            id: 'italic',
            kind: 'toggle',
            command: 'fixture.italic.toggle',
            labelKey: 'RichTextEditor_fixtureItalic',
            icon: 'IconTextFormatItalic',
        },
        {
            id: 'list',
            kind: 'toggle',
            command: 'fixture.list.toggle',
            labelKey: 'RichTextEditor_fixtureList',
            icon: 'IconListBullet',
        },
        ...LEVELS.map((level) => ({
            id: `heading-${level}`,
            kind: 'toggle' as const,
            command: 'fixture.heading.set',
            payload: { level },
            labelKey: `RichTextEditor_fixtureHeading${level}`,
            icon: 'IconTextFormatBold',
        })),
        {
            id: 'undo',
            kind: 'button',
            command: 'fixture.history.undo',
            labelKey: 'RichTextEditor_fixtureUndo',
            icon: 'IconArrowRoundAntiClockwise',
        },
        {
            id: 'redo',
            kind: 'button',
            command: 'fixture.history.redo',
            labelKey: 'RichTextEditor_fixtureRedo',
            icon: 'IconArrowRoundClockwise',
        },
    ],
});

/** Sets and removes the highlight of `marks.highlight`, as `mark.font-color.set` does the text colour. */
export const fixtureHighlightEditor = defineEditorPlugin(fixtureHighlight, {
    commands: {
        'mark.highlight.set': {
            payload: {
                fields: { tokenId: { type: 'id' }, value: { type: 'color' } },
                exactlyOne: ['tokenId', 'value'],
                nullable: true,
            },
            run: (api, payload: { readonly tokenId: string } | { readonly value: string } | null) => {
                if (payload === null) {
                    return api.marks.remove('highlight');
                }
                return api.marks.set('highlight', payload);
            },
            active: (api, payload) => {
                if (payload === null) {
                    return false;
                }
                return api.marks.active('highlight', payload);
            },
        },
    },
});

/** The fixture features' editor parts that hold no React, so a worker with no style loader takes them. */
export const FIXTURE_EDITORS = [
    fixtureBoldEditor,
    fixtureHistoryEditor,
    fixtureRedoEditor,
    fixtureHeadingEditor,
    fixtureMentionEditor,
    fixtureHeadingSetEditor,
    fixtureInputRulesEditor,
    fixtureToolbarEditor,
    fixtureHighlightEditor,
] as const;

/** The ones of `parts` for the features `model` installs, in feature order, as a host passes `defineEditor` its own. */
export const installedOf = <P extends EditorPlugin>(model: ContentModel, parts: readonly P[]): readonly P[] =>
    model.capabilities.flatMap(({ id }) => parts.filter(({ feature }) => feature === id));

/** The editor parts of the fixture features `model` installs, with no React. */
export const fixtureEditorsOf = (model: ContentModel) => installedOf(model, FIXTURE_EDITORS);
