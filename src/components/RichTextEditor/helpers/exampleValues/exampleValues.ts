/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LIC,
    ELEMENT_LINK,
    ELEMENT_MENTION,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    TDescendant,
    TNode,
} from '@udecode/plate';
import { ELEMENT_BUTTON } from '../../Plugins';
import { ELEMENT_CHECK_ITEM } from '../../Plugins/CheckboxListPlugin/id';
import { TextStyles } from '../../Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '../../types';
import { mixedMarkdown } from '../../serializer/markdown/__tests__/fixtures';
import { MARK_TEXT_STYLE } from '../../Plugins/ListPlugin/ListPlugin';

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

export const markdownText = mixedMarkdown;

const createElement = ({ text, element = ELEMENT_PARAGRAPH, mark }: CreateElementProps) => {
    const leaf: TDescendant = { text };
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
    textStyle?: TextStyles;
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
            children: [
                createLicElement({ text: 'This is list item number two.', textStyle: TextStyles.ELEMENT_CUSTOM1 }),
            ],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'This is list item number one.', textStyle: TextStyles.ELEMENT_CUSTOM2 }),
            ],
        },
        {
            type: ELEMENT_LI,
            children: [
                createLicElement({ text: 'This is list item number three.', textStyle: TextStyles.ELEMENT_CUSTOM3 }),
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
    ],
};

export const defaultValue = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
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
            {
                type: ELEMENT_LINK,
                children: [{ text: 'This is a Link.' }],
                url: 'https://frontify.com',
            },
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
    createElement({ text: 'Heading 1', element: TextStyles.ELEMENT_HEADING1 }),
    createElement({ text: 'Heading 2', element: TextStyles.ELEMENT_HEADING2 }),
    createElement({ text: 'Heading 3', element: TextStyles.ELEMENT_HEADING3 }),
    createElement({ text: 'Heading 4', element: TextStyles.ELEMENT_HEADING4 }),
    createElement({ text: 'Custom 1', element: TextStyles.ELEMENT_CUSTOM1 }),
    createElement({ text: 'Custom 2', element: TextStyles.ELEMENT_CUSTOM2 }),
    createElement({ text: 'Custom 3', element: TextStyles.ELEMENT_CUSTOM3 }),
    createElement({ text: 'Quote', element: TextStyles.ELEMENT_QUOTE }),
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
];

export const htmlValue = `
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
        children: [{ text: "And I'm checked!" }],
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

export const customDesignTokens: DesignTokens = {
    heading1: {
        fontSize: '1.5rem',
        fontWeight: 800,
    },
    heading2: {
        fontSize: '1.25rem',
        fontWeight: 500,
    },
};

export const mentionValue = [
    createElement({ text: '💬 Mention', element: TextStyles.ELEMENT_HEADING2 }),
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
