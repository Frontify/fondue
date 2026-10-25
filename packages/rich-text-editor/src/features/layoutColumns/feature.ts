/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

/**
 * Column breaks as `column_break`, between top-level blocks. The presentation sets the column count and gap, and the
 * first `columns - 1` breaks each end a column, as a column break does in Word.
 */
export const columns = defineFeature({
    id: 'layout.columns',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        column_break: {
            group: 'section',
            attrs: {},
            html: ['div', { 'data-rte-column-break': '' }],
            parse: [{ tag: 'div[data-rte-column-break]' }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});
