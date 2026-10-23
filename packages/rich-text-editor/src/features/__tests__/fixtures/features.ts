/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

const requiresCore = [{ id: 'core', version: 1 }];

export const fixtureBold = defineFeature({
    id: 'fixture.bold',
    version: 1,
    requires: requiresCore,
    marks: { bold: { attrs: {}, html: ['strong', 0], parse: [{ tag: 'strong' }] } },
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

/** Binds undo, as `core` does. */
export const fixtureHistory = defineFeature({ id: 'fixture.history', version: 1, requires: requiresCore });

/** Binds redo beside it. */
export const fixtureRedo = defineFeature({ id: 'fixture.redo', version: 1, requires: requiresCore });

/** Stands in for `blocks.heading`: a block with a required level and an option. */
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
});

/** A container of blocks with a required `tone`, which only a wrap given one can make. */
export const fixtureCallout = defineFeature({
    id: 'fixture.callout',
    version: 1,
    requires: requiresCore,
    nodes: {
        callout: {
            group: 'block',
            content: 'block+',
            attrs: { tone: { type: 'enum', values: ['info', 'warning'], required: true } },
            html: ['aside', { 'data-tone': { attr: 'tone' } }, 0],
            parse: [{ tag: 'aside', attrs: { tone: { from: 'data-tone' } } }],
        },
    },
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

/** Stands in for mentions, with a resource and a label, and shows the label through CSS so a pointer can drag it. */
export const fixtureLabelledMention = defineFeature({
    id: 'fixture.labelled-mention',
    version: 1,
    requires: requiresCore,
    nodes: {
        mention: {
            group: 'inline',
            atom: true,
            marks: [],
            attrs: {
                nodeId,
                resourceType: { type: 'id', required: true },
                resourceId: { type: 'string', required: true },
                labelSnapshot: { type: 'string', required: true },
            },
            html: ['span', { 'data-mention': { attr: 'labelSnapshot' } }],
            parse: [],
        },
    },
});

/** Stands in for `blocks.heading`: a heading with a `nodeId`, a level and a language. */
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
 * Stands in for the text features whose input rules its editor part adds: a `strike` and a `code` mark, beside a
 * `code_block` whose whitespace is `pre`.
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
});

/** Stands in for `lists.bullet`: a list whose items hold paragraphs and a nested list. */
export const fixtureList = defineFeature({
    id: 'fixture.list',
    version: 1,
    requires: requiresCore,
    nodes: {
        bullet_list: { group: 'block', content: 'list_item+', attrs: {}, html: ['ul', 0], parse: [{ tag: 'ul' }] },
        list_item: { content: 'paragraph+ bullet_list?', attrs: {}, html: ['li', 0], parse: [{ tag: 'li' }] },
    },
});

/** Stands in for the blocks that its editor part's toolbar entries toggle: `toggled_block` and `toggled_heading`. */
export const fixtureToolbar = defineFeature({
    id: 'fixture.toolbar',
    version: 1,
    requires: [
        { id: 'fixture.italic', version: 1 },
        { id: 'links', version: 1 },
    ],
    nodes: {
        toggled_block: { group: 'block', content: 'inline*', attrs: {}, html: ['blockquote', 0], parse: [] },
        toggled_heading: {
            group: 'block',
            content: 'inline*',
            attrs: { level: { type: 'integer', min: 1, max: 6, required: true } },
            html: [{ attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } }, 0],
            parse: [],
        },
    },
});
