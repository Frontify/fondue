/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, setBlock } from '#/model';

const nodeId = { type: 'string', required: true } as const;

/**
 * Stands in for the node view features until they ship: a block with content (a code block or a task item), an inline
 * atom (a mention) and a leaf (an image), each with a `nodeId`; `view.tsx` gives each chrome.
 */
export const fixtureChrome = defineFeature({
    id: 'fixture.chrome',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        chrome_block: {
            group: 'block',
            content: 'text*',
            marks: [],
            whitespace: 'pre',
            attrs: {
                nodeId,
                language: { type: 'string', default: 'plain' },
                checked: { type: 'boolean', default: false },
            },
            html: ['pre', { 'data-chrome-block': { attr: 'nodeId' } }, 0],
            parse: [{ tag: 'pre[data-chrome-block]', attrs: { nodeId: { from: 'data-chrome-block' } } }],
        },
        chrome_mention: {
            group: 'inline',
            atom: true,
            attrs: { nodeId, label: { type: 'string', default: '' } },
            html: ['span', { 'data-chrome-mention': { attr: 'nodeId' }, 'data-label': { attr: 'label' } }],
            parse: [
                {
                    tag: 'span[data-chrome-mention]',
                    attrs: { nodeId: { from: 'data-chrome-mention' }, label: { from: 'data-label' } },
                },
            ],
        },
        chrome_image: {
            group: 'block',
            atom: true,
            attrs: { nodeId, assetId: { type: 'id', nullable: true, default: null } },
            html: ['div', { 'data-chrome-image': { attr: 'nodeId' } }],
            parse: [],
        },
    },
    commands: {
        'fixture.chrome-block.set': setBlock('chrome_block'),
        'fixture.chrome-block.unset': setBlock('paragraph'),
    },
});
