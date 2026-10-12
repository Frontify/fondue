/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Stands in for `blocks.code` until it ships: a `pre` block with a language, whose chrome `view.tsx` adds. */
export const fixtureCodeBlock = defineFeature({
    id: 'fixture.code-block',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        chrome_code: {
            group: 'block',
            content: 'text*',
            marks: [],
            whitespace: 'pre',
            attrs: { nodeId: { type: 'string', required: true }, language: { type: 'string', default: 'plain' } },
            html: ['pre', { 'data-chrome-code': { attr: 'nodeId' } }, 0],
            parse: [{ tag: 'pre[data-chrome-code]', attrs: { nodeId: { from: 'data-chrome-code' } } }],
        },
    },
});
