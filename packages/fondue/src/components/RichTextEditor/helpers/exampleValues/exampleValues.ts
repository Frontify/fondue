/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { MARK_COLOR } from '@udecode/plate-font';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type TDescendant, type TNode } from '@udecode/slate';

import { ELEMENT_BUTTON } from '../../Plugins';
import { ELEMENT_CHECK_ITEM } from '../../Plugins/CheckboxListPlugin/id';
import { MARK_TEXT_STYLE } from '../../Plugins/ListPlugin/ListPlugin';
import { TextStyles } from '../../Plugins/TextStylePlugin/types';
import { mixedMarkdownWithUnsafeLink1 } from '../../serializer/markdown/__tests__/fixtures';

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

export const markdownText = mixedMarkdownWithUnsafeLink1;

const createElement = ({ text, element = ELEMENT_PARAGRAPH, mark }: CreateElementProps) => {
    const leaf: TDescendant = { text, [MARK_TEXT_STYLE]: element };
    if (mark) {
        leaf[mark] = true;
    }
    return {
        type: element,
        children: [leaf],
    };
};

type CreateLicElementProps = {
    text: string;
    textStyle?: string;
};

const createLicElement = ({ text, textStyle }: CreateLicElementProps) => {
    const textNode: TNode = { text };
    if (textStyle) {
        textNode[MARK_TEXT_STYLE] = textStyle;
    }
    return {
        type: ELEMENT_LIC,
        children: [{ text, [MARK_TEXT_STYLE]: textStyle }],
    };
};

export const IPSUM =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

export const unorderedListValue = {
    type: ELEMENT_UL,
    children: [
        {
            type: ELEMENT_LI,
            children: [createLicElement({ text: 'This is list item number two.', textStyle: TextStyles.custom1 })],
        },
        {
            type: ELEMENT_LI,
            children: [createLicElement({ text: 'This is list item number one.', textStyle: TextStyles.custom2 })],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'This is list item number three.', textStyle: TextStyles.custom3 }),
                {
                    type: ELEMENT_UL,
                    children: [
                        {
                            type: ELEMENT_LI,
                            children: [createLicElement({ text: 'This is child item number one.' })],
                        },
                        {
                            type: ELEMENT_LI,
                            children: [
                                createLicElement({ text: 'This is child item number two, with more children.' }),
                                {
                                    type: ELEMENT_UL,
                                    children: [
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'This is child of child item number one.' }),
                                            ],
                                        },
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'This is child of child item number two.' }),
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This is aligned right.' }], align: 'right' }],
        },
    ],
};

export const orderedListValue = {
    type: ELEMENT_OL,
    children: [
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This comes first.' }] }],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This comes second.' }] }],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'And last but not least, this comes third.' }),
                {
                    type: ELEMENT_OL,
                    children: [
                        {
                            type: ELEMENT_LI,
                            children: [createLicElement({ text: 'This is child item number one.' })],
                        },
                        {
                            type: ELEMENT_LI,
                            children: [
                                createLicElement({ text: 'This is child item number two.' }),
                                {
                                    type: ELEMENT_OL,
                                    children: [
                                        {
                                            type: ELEMENT_LI,
                                            children: [createLicElement({ text: 'Nested child item number one.' })],
                                        },
                                        {
                                            type: ELEMENT_LI,
                                            children: [
                                                createLicElement({ text: 'Nested child item number two.' }),
                                                {
                                                    type: ELEMENT_OL,
                                                    children: [
                                                        {
                                                            type: ELEMENT_LI,
                                                            children: [createLicElement({ text: 'Level 5 item 1' })],
                                                        },
                                                        {
                                                            type: ELEMENT_LI,
                                                            children: [createLicElement({ text: 'Level 5 item 2' })],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: ELEMENT_LI,
            children: [{ type: ELEMENT_LIC, children: [{ text: 'This is aligned right.' }], align: 'right' }],
        },
    ],
};

const nestedListValue = {
    type: ELEMENT_LI,
    children: [
        createLicElement({ text: 'This comes first' }),
        {
            type: ELEMENT_OL,
            children: [
                {
                    type: ELEMENT_LI,
                    children: [createLicElement({ text: 'First Child Item' })],
                },
                {
                    type: ELEMENT_LI,
                    children: [
                        createLicElement({ text: 'Second Child Item' }),
                        {
                            type: ELEMENT_OL,
                            children: [
                                {
                                    type: ELEMENT_LI,
                                    children: [createLicElement({ text: 'Nested Child Item number one' })],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export const multipleOrderedListsValue = {
    type: ELEMENT_OL,
    children: [nestedListValue, nestedListValue],
};

export const defaultValue = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is blue.', [MARK_COLOR]: 'rgb(0 0 255)' }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is almost red.', [MARK_COLOR]: 'rgba(255, 20, 73, 0.5)' }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'An example of subscript is N' }, { text: '2', subscript: true }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'An example of superscript is 2' }, { text: '5', superscript: true }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
    },
    createElement({
        text: IPSUM,
    }),
    unorderedListValue,
    orderedListValue,
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: '' },
            {
                type: ELEMENT_LINK,
                children: [{ text: 'This is a Link. Without any breaks before or after' }],
                url: 'https://frontify.com',
            },
            { text: '' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'Try mentioning characters, like ' },
            {
                type: ELEMENT_MENTION,
                category: 'user',
                id: 'aaaaaaaa20',
                children: [{ text: '' }],
            },
            { text: ' or ' },
            {
                type: ELEMENT_MENTION,
                category: 'group',
                id: '1111111111',
                children: [{ text: '' }],
            },
            { text: '.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                type: ELEMENT_LINK,
                chosenLink: {
                    searchResult: {
                        link: 'https://smartive.ch',
                    },
                    openInNewTab: true,
                },
                children: [
                    {
                        text: 'This is also a Link (Legacy Format).',
                    },
                ],
            },
        ],
    },
    createElement({ text: 'Heading 1', element: TextStyles.heading1 }),
    createElement({ text: 'Heading 2', element: TextStyles.heading2 }),
    createElement({ text: 'Heading 3', element: TextStyles.heading3 }),
    createElement({ text: 'Heading 4', element: TextStyles.heading4 }),
    createElement({ text: 'Custom 1', element: TextStyles.custom1 }),
    createElement({ text: 'Custom 2', element: TextStyles.custom2 }),
    createElement({ text: 'Custom 3', element: TextStyles.custom3 }),
    createElement({ text: 'Quote', element: TextStyles.quote }),
];

export const customControlValues = [
    createElement({ text: 'Image Title', element: TextStyles.imageTitle }),
    createElement({ text: 'Image Caption', element: TextStyles.imageCaption }),
    createElement({ text: IPSUM, element: ELEMENT_PARAGRAPH }),
];

export const valueWithColumnBreaks = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 1.' }],
        breakAfterColumn: 'active',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: '' }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 2.' }],
        breakAfterColumn: 'inactive',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is followed by a break 3.' }],
        breakAfterColumn: 'inactive',
    },
];

export const value = [
    ...defaultValue,
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is a checked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 0,
        children: [{ text: 'This is an unchecked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is checked again.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        align: 'right',
        children: [{ text: 'This is aligned right and checked.' }],
    },
];
export const alignedValues = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is left aligned.' }],
        align: 'left',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is center aligned.' }],
        align: 'center',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is right aligned.' }],
        align: 'right',
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'This text is justified.' }],
        align: 'justify',
    },
    {
        type: 'p',
        children: [
            { text: '' },
            { type: 'a', url: 'https://frontify.com/', target: '_blank', children: [{ text: 'This is a Link.' }] },
            { text: '' },
        ],
    },
];

/* eslint-disable no-irregular-whitespace */
export const htmlValue = `
        <p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">
            <span style="color: rgba(255, 20, 73, 0.5)">
               <span class="tw-font-bold">
                    <span class="tw-underline">
                        <span class="tw-italic">
                            <span class="!tw-line-through">
                                    This text is bold, italic, underlined, strikethrough and is almost red. It also has <sup>superscript</sup> and <sub>subscript</sub>. Oh, and there is a link to <a href="https://frontify.com" target="_blank" rel="noopener noreferrer">Frontify</a>.
                            </span>
                        </span>
                    </span>
                </span>
            </span>
        </p>
        <p><strong>This text is bold.</strong></p>
        <p><i>This text is italic.</i></p>
        <p><u>This text has an underline.</u></p>
        <p><s>This text has a strikethrough.</s></p>
        <p><code>This text is a code line.</code></p>
        <p style="text-align: center;"><code>This text is center aligned.</code></p>
        <p>${IPSUM}</p>
        <ul>
            <li>This is list item number one.</li>
            <li>This is list item number two.</li>
            <li>This is list item number three.</li>
            <ul>
                <li>This is child item number one.</li>
                <li>This is child item number two, with more children.</li>
                <ul>
                    <li>This is child of child item number one.</li>
                    <li>This is child of child item number two.</li>
                </ul>
            </ul>
        </ul>
        <ol>
            <li>This comes first.</li>
            <li>This comes second.</li>
            <li>And last but not least, this comes third.</li>
        </ol>
        <p><a href="https://frontify.com">This is a link.</a></p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <p class="custom1">Custom 1</p>
        <p class="custom2">Custom 2</p>
        <p class="custom3">Custom 3</p>
        <blockquote>Quote</blockquote>
        <a class="btn btn-primary" contenteditable="false" href="https://smartive.ch/" data-design="primary">﻿<span contenteditable="false">Test</span>﻿</a>
    `;
/* eslint-enable no-irregular-whitespace */

export const checkboxValue = [
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is a checked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 0,
        children: [{ text: 'This is an unchecked checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 0,
        children: [{ text: 'This is checked again, and it also has children!' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 1,
        children: [{ text: 'This is child checklist item.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 1,
        children: [{ text: 'This is a checked child checklist item, with even more children!' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: "Hello, I'm unchecked." }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: "I'm also unchecked." }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: false,
        indent: 2,
        children: [{ text: 'Yep, unchecked.' }],
    },
    {
        type: ELEMENT_CHECK_ITEM,
        checked: true,
        indent: 2,
        children: [{ text: "And I'm checked! Followed by an empty one!" }],
    },
];

export const buttonValues = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'primary',
                children: [{ text: 'primary' }],
            },
            { text: ' button.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'secondary',
                children: [{ text: 'secondary' }],
            },
            { text: ' button.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'This is a ' },
            {
                type: ELEMENT_BUTTON,
                url: 'https://www.google.com',
                buttonStyle: 'tertiary',
                children: [{ text: 'tertiary' }],
            },
            { text: ' button.' },
        ],
    },
];

export const nodesToSerialize: TDescendant[] = [
    ...defaultValue,
    ...alignedValues,
    ...valueWithColumnBreaks,
    ...checkboxValue,
    ...buttonValues,
];

export const mentionValue = [
    createElement({ text: '💬 Mention', element: TextStyles.heading2 }),
    createElement({
        text: 'This example shows how you might implement a simple @-mentions feature that lets users autocomplete mentioning a user by their username. Which, in this case means Star Wars characters. The mentions are rendered as void inline elements inside the document.',
        element: ELEMENT_PARAGRAPH,
    }),
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            { text: 'Try mentioning characters, like ' },
            {
                type: ELEMENT_MENTION,
                category: 'user',
                id: 'aaaaaaaa20',
                children: [{ text: '' }],
            },
            { text: ' or ' },
            {
                type: ELEMENT_MENTION,
                category: 'group',
                id: '1111111111',
                children: [{ text: '' }],
            },
            { text: '.' },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [{ text: 'Continue ...' }, { text: ' ' }],
    },
];
