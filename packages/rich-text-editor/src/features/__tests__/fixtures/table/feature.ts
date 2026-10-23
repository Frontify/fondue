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

/**
 * Stands in for `tables` until it ships, with its node names, so the content checks meet a table with and without
 * header cells. Never in the registry or a profile.
 */
export const fixtureTable = defineFeature({
    id: 'tables',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        table: {
            group: 'block',
            content: 'table_row+',
            attrs: { nodeId: { type: 'string', required: true } },
            html: ['table', 0],
            parse: [],
        },
        table_row: { content: '(table_cell | table_header)+', attrs: {}, html: ['tr', 0], parse: [] },
        table_cell: { content: 'paragraph+', attrs: {}, html: ['td', 0], parse: [] },
        table_header: { content: 'paragraph+', attrs: {}, html: ['th', 0], parse: [] },
    },
});
