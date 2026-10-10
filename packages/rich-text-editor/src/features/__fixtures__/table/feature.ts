/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/** Stands in for `tables` until it ships: a block with content and a `nodeId`, whose chrome `view.tsx` adds. */
export const fixtureTableBlock = defineFeature({
    id: 'fixture.table-block',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        table_block: {
            group: 'block',
            content: 'paragraph+',
            attrs: { nodeId: { type: 'string', required: true } },
            html: ['section', { 'data-table-block': { attr: 'nodeId' } }, 0],
            parse: [],
        },
    },
});
