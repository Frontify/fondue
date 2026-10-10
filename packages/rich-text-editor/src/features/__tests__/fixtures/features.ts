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
