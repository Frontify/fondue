/* (c) Copyright Frontify Ltd., all rights reserved. */

import { blockRule, defineFeature, openControl, setAttributes, toggleList } from '#/model';

const start = { fields: { start: { type: 'integer', min: 0, max: 1_000_000 } } } as const;

/** Numbered lists as `ordered_list`, whose `start` the toggle, the `1. ` rule and the numbering dialog set. */
export const orderedList = defineFeature({
    id: 'lists.ordered',
    version: 1,
    requires: [{ id: 'lists.item', version: 1 }],
    nodes: {
        ordered_list: {
            group: 'block',
            content: 'list_item+',
            attrs: {
                start: { type: 'integer', min: 0, max: 1_000_000, default: 1 },
                marker: {
                    type: 'enum',
                    values: ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'],
                    nullable: true,
                    default: null,
                },
            },
            html: ['ol', { start: { attr: 'start' }, 'data-marker': { attr: 'marker' } }, 0],
            parse: [{ tag: 'ol', attrs: { start: { from: 'start' }, marker: { from: 'data-marker' } } }],
        },
    },
    // Markdown has no marker style.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: {
        'list.ordered.toggle': toggleList('ordered_list', 'list_item', start),
        'list.ordered.start.edit': openControl('numbering'),
        'list.ordered.start.set': setAttributes('ordered_list', start),
    },
    keys: { 'Mod-Shift-7': { command: 'list.ordered.toggle', payload: { start: 1 } } },
    // The payload declaration refuses a number above 1,000,000, so the rule keeps such text.
    inputRules: [
        blockRule({ id: 'list.ordered.number', match: /^(?<start>\d+)[.)] $/, command: 'list.ordered.toggle' }),
    ],
    toolbar: [
        {
            kind: 'toggle',
            command: 'list.ordered.toggle',
            payload: { start: 1 },
            labelKey: 'RichTextEditor_numberedList',
            icon: 'IconListNumbers',
        },
        {
            kind: 'button',
            command: 'list.ordered.start.edit',
            labelKey: 'RichTextEditor_startNumbering',
            icon: 'IconListNumbers',
        },
    ],
});
