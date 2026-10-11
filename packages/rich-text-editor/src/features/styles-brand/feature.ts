/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, setAttributes } from '#/model';

/**
 * Brand styles: a `styleId` on paragraphs, headings and quotes that the presentation resolves to a recipe. A style
 * changes only how a block looks; its node type and heading level stay. The text style picker lists the
 * presentation's styles that apply to the block's type.
 */
export const brandStyles = defineFeature({
    id: 'styles.brand',
    version: 1,
    requires: [
        { id: 'core', version: 1 },
        { id: 'blocks.heading', version: 1 },
        { id: 'blocks.quote', version: 1 },
    ],
    attributes: {
        styleId: {
            on: ['paragraph', 'heading', 'blockquote'],
            value: { type: 'id', nullable: true, default: null },
            html: { attr: 'data-rte-style' },
            parse: { attr: 'data-rte-style' },
        },
    },
    // Markdown and plain text have no brand styles.
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    commands: {
        'block.style.set': setAttributes(['paragraph', 'heading'], {
            fields: { styleId: { type: 'id', nullable: true } },
        }),
    },
    toolbar: [
        {
            kind: 'toggle',
            command: 'block.style.set',
            payload: { styleId: null },
            labelKey: 'RichTextEditor_defaultStyle',
            icon: 'IconEraser',
        },
    ],
});
