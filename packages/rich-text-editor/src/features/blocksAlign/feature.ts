/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature } from '#/model';

const SIDES = ['left', 'center', 'right'] as const;

/**
 * Physical alignment on paragraphs and headings. `justify: false` leaves justify out of the values, the key and the
 * toolbar. Pressing the value every selected block already has removes it.
 */
export const align = (options?: { justify?: boolean }) => {
    const values: string[] = [...SIDES];
    if (options?.justify !== false) {
        values.push('justify');
    }

    return defineFeature({
        id: 'blocks.align',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        options: { justify: { type: 'boolean', default: true } },
        attributes: {
            align: {
                on: ['paragraph', 'heading'],
                value: { type: 'enum', values, nullable: true, default: null },
                html: { style: 'text-align' },
                parse: { style: 'text-align' },
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    })(options);
};
