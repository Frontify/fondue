/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, history, insertNode, setBlock } from '#/model';

const requiresCore = [{ id: 'core', version: 1 }];

/** Stands in for `links`: a mark with a `url` attribute, outermost by rank. */
export const fixtureLink = defineFeature({
    id: 'fixture.link',
    version: 1,
    requires: requiresCore,
    marks: {
        link: {
            attrs: {
                href: { type: 'url', required: true },
                openInNewWindow: { type: 'boolean', default: false },
                styleId: { type: 'id', nullable: true, default: null },
            },
            html: ['a', { href: { attr: 'href' } }, 0],
            parse: [{ tag: 'a[href]', attrs: { href: { from: 'href' } } }],
            rank: -2,
            inclusive: false,
        },
    },
});

export const fixtureBold = defineFeature({
    id: 'fixture.bold',
    version: 1,
    requires: requiresCore,
    marks: { bold: { attrs: {}, html: ['strong', 0], parse: [{ tag: 'strong' }] } },
    commands: { 'fixture.paragraph.set': setBlock('paragraph') },
    keys: { 'Mod-b': 'fixture.paragraph.set' },
});

export const fixtureItalic = defineFeature({
    id: 'fixture.italic',
    version: 1,
    requires: requiresCore,
    marks: { italic: { attrs: {}, html: ['em', 0], parse: [{ tag: 'em' }] } },
});

/** Stands in for `marks.font-color`: a colour mark between links and the other marks. */
export const fixtureColor = defineFeature({
    id: 'fixture.color',
    version: 1,
    requires: requiresCore,
    marks: {
        font_color: {
            attrs: { value: { type: 'color', nullable: true, default: null } },
            html: ['span', { 'data-color': { attr: 'value' } }, 0],
            parse: [{ tag: 'span[data-color]', attrs: { value: { from: 'data-color' } } }],
            rank: -1,
        },
    },
});

/** Contributes the keyed history plugin, as `core` does. */
export const fixtureHistory = defineFeature({
    id: 'fixture.history',
    version: 1,
    requires: requiresCore,
    commands: { 'fixture.undo': history('undo') },
    keys: { 'Mod-z': 'fixture.undo' },
});

/** Contributes the history plugin a second time. */
export const fixtureRedo = defineFeature({
    id: 'fixture.redo',
    version: 1,
    requires: requiresCore,
    commands: { 'fixture.redo': history('redo') },
    keys: { 'Mod-y': 'fixture.redo' },
});

/** Stands in for `blocks.heading`: a block with a required level and an option-dependent command. */
export const fixtureHeading = defineFeature({
    id: 'fixture.heading',
    version: 1,
    requires: requiresCore,
    options: { defaultLevel: { type: 'integer', min: 1, max: 6, default: 2 } },
    nodes: {
        heading: {
            group: 'block',
            content: 'inline*',
            attrs: { level: { type: 'integer', min: 1, max: 6, required: true } },
            html: [{ attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } }, 0],
            parse: [{ tag: 'h2', attrs: { level: { value: 2 } } }],
        },
        rule: { group: 'block', attrs: {}, html: ['hr'], parse: [{ tag: 'hr' }] },
    },
    commands: {
        'fixture.heading.set': setBlock('heading', {
            payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } },
        }),
        'fixture.rule.insert': insertNode('rule'),
    },
    keys: { 'Mod-Alt-2': { command: 'fixture.heading.set', payload: { level: 2 } } },
});

const nodeId = { type: 'string', required: true } as const;

/** Stands in for `tables`: a block with content and a `nodeId`. */
export const fixtureTable = defineFeature({
    id: 'fixture.table',
    version: 1,
    requires: requiresCore,
    nodes: {
        table: {
            group: 'block',
            content: 'paragraph+',
            attrs: { nodeId },
            html: ['section', { 'data-table': { attr: 'nodeId' } }, 0],
            parse: [{ tag: 'section[data-table]', attrs: { nodeId: { from: 'data-table' } } }],
        },
    },
});

/** Stands in for `mentions`: an inline atom with a `nodeId`. */
export const fixtureMention = defineFeature({
    id: 'fixture.mention',
    version: 1,
    requires: requiresCore,
    nodes: {
        mention: {
            group: 'inline',
            atom: true,
            attrs: { nodeId, label: { type: 'string', default: '' } },
            html: ['span', { 'data-mention': { attr: 'nodeId' } }],
            parse: [{ tag: 'span[data-mention]', attrs: { nodeId: { from: 'data-mention' } } }],
        },
    },
});

/** Stands in for `blocks.heading`: `heading.set` turns the selected textblocks into headings of the payload's level. */
export const fixtureHeadingSet = defineFeature({
    id: 'fixture.heading-set',
    version: 1,
    requires: requiresCore,
    nodes: {
        heading: {
            group: 'block',
            content: 'inline*',
            attrs: {
                nodeId,
                level: { type: 'integer', min: 1, max: 6, required: true },
                lang: { type: 'language', nullable: true, default: null },
            },
            html: [{ attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } }, 0],
            parse: [{ tag: 'h2', attrs: { level: { value: 2 } } }],
        },
    },
    commands: {
        'heading.set': setBlock('heading', { payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } } }),
    },
});

/** Stands in for `media.image` and `media.embed`: a figure with a caption and a leaf embed, each with a `nodeId`. */
export const fixtureMedia = defineFeature({
    id: 'fixture.media',
    version: 1,
    requires: requiresCore,
    nodes: {
        figure: { group: 'block', content: 'paragraph', attrs: { nodeId }, html: ['div', 0], parse: [] },
        embed: {
            group: 'block',
            atom: true,
            attrs: { nodeId, url: { type: 'url', required: true } },
            html: ['div'],
            parse: [],
        },
    },
});

/**
 * Stands in for the input rules of the text features: `heading.hashes` over `heading.set`, and the mark rules over
 * `bold`, `italic`, a `strike` mark and a `code` mark, beside a `code_block` whose whitespace is `pre`.
 */
export const fixtureInputRules = defineFeature({
    id: 'fixture.input-rules',
    version: 1,
    requires: [
        { id: 'marks.bold', version: 1 },
        { id: 'fixture.italic', version: 1 },
        { id: 'fixture.heading-set', version: 1 },
    ],
    nodes: {
        code_block: {
            group: 'block',
            content: 'text*',
            marks: [],
            whitespace: 'pre',
            attrs: {},
            html: ['pre', 0],
            parse: [{ tag: 'pre' }],
        },
    },
    marks: {
        strike: { attrs: {}, html: ['s', 0], parse: [{ tag: 's' }] },
        code: { attrs: {}, html: ['code', 0], parse: [{ tag: 'code' }], inclusive: false },
    },
    inputRules: [
        {
            id: 'heading.hashes',
            kind: 'line-start',
            command: 'heading.set',
            markers: [1, 2, 3, 4, 5, 6].map((level) => ({ marker: '#'.repeat(level), payload: { level } })),
        },
        { id: 'bold.stars', kind: 'mark-delimiter', open: '**', close: '**', mark: 'bold' },
        { id: 'bold.underscores', kind: 'mark-delimiter', open: '__', close: '__', mark: 'bold' },
        { id: 'italic.star', kind: 'mark-delimiter', open: '*', close: '*', mark: 'italic' },
        { id: 'italic.underscore', kind: 'mark-delimiter', open: '_', close: '_', mark: 'italic' },
        { id: 'strike.tildes', kind: 'mark-delimiter', open: '~~', close: '~~', mark: 'strike' },
        { id: 'code.backtick', kind: 'mark-delimiter', open: '`', close: '`', mark: 'code' },
    ],
});

/** Stands in for an upload: a leaf whose `assetId` an async completion sets. */
export const fixtureImage = defineFeature({
    id: 'fixture.image',
    version: 1,
    requires: requiresCore,
    nodes: {
        image: {
            group: 'block',
            atom: true,
            attrs: { assetId: { type: 'id', nullable: true, default: null } },
            html: ['img', { 'data-asset': { attr: 'assetId' } }],
            parse: [],
        },
    },
});
