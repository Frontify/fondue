/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

import { type RteDocument } from '../../index';

// Shared by the fixtures and the tests. Apart from the fixture components, because a component
// test cannot import plain values from the file holding the components it mounts.

/** The guideline variable each section defines for its headings. */
export const H1_COLOR_VARIABLE = '--f-h1-color';
export const SECTION_A_H1_COLOR = 'rgb(255, 0, 0)';
export const SECTION_B_H1_COLOR = 'rgb(0, 0, 255)';

/** One block per text style, in the dropdown's order. */
export const ALL_PRESETS_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
        { type: 'textStyle', style: 'heading2', children: [{ text: 'Heading 2' }] },
        { type: 'textStyle', style: 'heading3', children: [{ text: 'Heading 3' }] },
        { type: 'textStyle', style: 'heading4', children: [{ text: 'Heading 4' }] },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'custom2', children: [{ text: 'Custom 2' }] },
        { type: 'textStyle', style: 'custom3', children: [{ text: 'Custom 3' }] },
        { type: 'textStyle', style: 'imageTitle', children: [{ text: 'Image title' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'Image caption' }] },
    ],
};

/** The variable a host defines around its editors, as the guideline's theme settings would. */
const hostVariable = (name: string, value: string): CSSProperties =>
    // CSSProperties has no custom properties.
    ({ [name]: value }) as CSSProperties;

export const SECTION_A = hostVariable(H1_COLOR_VARIABLE, SECTION_A_H1_COLOR);
export const SECTION_B = hostVariable(H1_COLOR_VARIABLE, SECTION_B_H1_COLOR);

/** Body text, a block quote and links, with a preset and a heading beside them that the body look must not reach. */
export const BODY_QUOTE_LINK_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'Body text' }] },
        {
            type: 'bulletList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Bullet item' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                {
                    type: 'checkItem',
                    checked: false,
                    children: [{ type: 'paragraph', children: [{ text: 'Check item' }] }],
                },
                {
                    type: 'checkItem',
                    checked: true,
                    children: [{ type: 'paragraph', children: [{ text: 'Done item' }] }],
                },
            ],
        },
        { type: 'quote', children: [{ text: 'A quote' }] },
        { type: 'paragraph', children: [{ text: 'A link', link: { href: 'https://example.com' } }] },
        {
            type: 'paragraph',
            children: [
                {
                    text: 'A coloured link',
                    link: { href: 'https://example.com' },
                    fontColor: { color: '#ff0000' },
                },
            ],
        },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
    ],
};

/** Every text style, then body text (in list items too), a quote and a link; the text styles are listed once. */
export const EXPORT_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        ...ALL_PRESETS_DOCUMENT.blocks,
        ...BODY_QUOTE_LINK_DOCUMENT.blocks.filter((block) => block.type !== 'textStyle'),
    ],
};
