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
import { ELEMENT_BUTTON } from '../Plugins';
import { ELEMENT_CHECK_ITEM } from '../Plugins/CheckboxListPlugin/id';
import { MentionableCategory, MentionableItems } from '../Plugins/MentionPlugin/types';
import { TextStyles } from '../Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '../types';
import { mixedMarkdown } from '../serializer/markdown/__tests__/fixtures';
import { MARK_TEXT_STYLE } from '../Plugins/ListPlugin/ListPlugin';

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

const defaultValue = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
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

export const htmlValue = `
        <p><strong>This text is bold.</strong></p>
        <p><i>This text is italic.</i></p>
        <p><u>This text has an underline.</u></p>
        <p><s>This text has a strikethrough.</s></p>
        <p><code>This text is a code line.</code></p>
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

export const nodesToSerialize: TDescendant[] = defaultValue;

export const serializedHtml =
    '<p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-font-bold">This text is bold.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-italic">This text is italic.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-underline">This text has an underline.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-line-through">This text has a strikethrough.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5 tw-font-mono">This text is a code line.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><span style="">This is list item number two.</span></li><li style="font-size: 14px; font-weight: 600; font-style: normal; text-decoration: none;"><span style="">This is list item number one.</span></li><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><span style="text-decoration: underline;">This is list item number three.</span><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number two, with more children.</span><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child of child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child of child item number two.</span></li></ul></li></ul></li></ul><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This comes first.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This comes second.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">And last but not least, this comes third.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-alpha]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number two.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-roman]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Nested child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Nested child item number two.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Level 5 item 1</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Level 5 item 2</span></li></ol></li></ol></li></ol></li></ol><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link (Legacy Format).</a></p><h1 style="font-size: 48px; font-weight: 700; font-style: normal;">Heading 1</h1><h2 style="font-size: 32px; font-weight: 700; font-style: normal;">Heading 2</h2><h3 style="font-size: 24px; font-weight: normal; font-style: normal;">Heading 3</h3><h4 style="font-size: 18px; font-weight: normal; font-style: normal;">Heading 4</h4><p style="font-size: 14px; font-weight: normal; font-style: normal;">Custom 1</p><p style="font-size: 14px; font-weight: 600; font-style: normal;">Custom 2</p><p style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: underline;">Custom 3</p><p style="font-size: 16px; font-weight: normal; font-style: italic;">Quote</p>';

export const serializedHtmlWithCustomDesignTokens =
    '<p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-font-bold">This text is bold.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-italic">This text is italic.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-underline">This text has an underline.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-line-through">This text has a strikethrough.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5 tw-font-mono">This text is a code line.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><span style="">This is list item number two.</span></li><li style="font-size: 14px; font-weight: 600; font-style: normal; text-decoration: none;"><span style="">This is list item number one.</span></li><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><span style="text-decoration: underline;">This is list item number three.</span><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number two, with more children.</span><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child of child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child of child item number two.</span></li></ul></li></ul></li></ul><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This comes first.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This comes second.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">And last but not least, this comes third.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-alpha]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">This is child item number two.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-roman]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Nested child item number one.</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Nested child item number two.</span><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Level 5 item 1</span></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><span style="">Level 5 item 2</span></li></ol></li></ol></li></ol></li></ol><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link (Legacy Format).</a></p><h1 style="font-size: 1.5rem; font-weight: 800; font-style: normal;">Heading 1</h1><h2 style="font-size: 1.25rem; font-weight: 500; font-style: normal;">Heading 2</h2><h3 style="font-size: 24px; font-weight: normal; font-style: normal;">Heading 3</h3><h4 style="font-size: 18px; font-weight: normal; font-style: normal;">Heading 4</h4><p style="font-size: 14px; font-weight: normal; font-style: normal;">Custom 1</p><p style="font-size: 14px; font-weight: 600; font-style: normal;">Custom 2</p><p style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: underline;">Custom 3</p><p style="font-size: 16px; font-weight: normal; font-style: italic;">Quote</p>';

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
                children: [{ text: '' }],
                category: 'user',
                key: '28',
                value: 'Barriss Offee',
            },
            { text: ' or ' },
            {
                type: ELEMENT_MENTION,
                category: 'group',
                key: '2',
                value: 'Admiral Dodd Rancit',
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

export const mentionable: MentionableItems = [
    { category: MentionableCategory.ALL, key: '0', text: 'Aayla Secura' },
    { category: MentionableCategory.GROUP, key: '1', text: 'Adi Gallia' },
    { category: MentionableCategory.GROUP, key: '2', text: 'Admiral Dodd Rancit' },
    { category: MentionableCategory.USER, key: '3', text: 'Admiral Firmus Piett' },
    { category: MentionableCategory.USER, key: '4', text: 'Admiral Gial Ackbar' },
    { category: MentionableCategory.USER, key: '5', text: 'Admiral Ozzel' },
    { category: MentionableCategory.USER, key: '6', text: 'Admiral Raddus' },
    { category: MentionableCategory.USER, key: '7', text: 'Admiral Terrinald Screed' },
    { category: MentionableCategory.USER, key: '8', text: 'Admiral Trench' },
    { category: MentionableCategory.USER, key: '9', text: 'Admiral U.O. Statura' },
    { category: MentionableCategory.USER, key: '10', text: 'Agen Kolar' },
    { category: MentionableCategory.USER, key: '11', text: 'Agent Kallus' },
    { category: MentionableCategory.USER, key: '12', text: 'Aiolin and Morit Astarte' },
    { category: MentionableCategory.USER, key: '13', text: 'Aks Moe' },
    { category: MentionableCategory.USER, key: '14', text: 'Almec' },
    { category: MentionableCategory.USER, key: '15', text: 'Alton Kastle' },
    { category: MentionableCategory.USER, key: '16', text: 'Amee' },
    { category: MentionableCategory.USER, key: '17', text: 'AP-5' },
    { category: MentionableCategory.USER, key: '18', text: 'Armitage Hux' },
    { category: MentionableCategory.USER, key: '19', text: 'Artoo' },
    { category: MentionableCategory.USER, key: '20', text: 'Arvel Crynyd' },
    { category: MentionableCategory.USER, key: '21', text: 'Asajj Ventress' },
    { category: MentionableCategory.USER, key: '22', text: 'Aurra Sing' },
    { category: MentionableCategory.USER, key: '23', text: 'AZI-3' },
    { category: MentionableCategory.USER, key: '24', text: 'Bala-Tik' },
    { category: MentionableCategory.USER, key: '25', text: 'Barada' },
    { category: MentionableCategory.USER, key: '26', text: 'Bargwill Tomder' },
    { category: MentionableCategory.USER, key: '27', text: 'Baron Papanoida' },
    { category: MentionableCategory.USER, key: '28', text: 'Admiral Dodd Rancit' },
    { category: MentionableCategory.USER, key: '29', text: 'Baze Malbus' },
    { category: MentionableCategory.USER, key: '30', text: 'Bazine Netal' },
    { category: MentionableCategory.USER, key: '31', text: 'BB-8' },
    { category: MentionableCategory.USER, key: '32', text: 'BB-9E' },
    { category: MentionableCategory.USER, key: '33', text: 'Ben Quadinaros' },
    { category: MentionableCategory.USER, key: '34', text: 'Berch Teller' },
    { category: MentionableCategory.USER, key: '35', text: 'Beru Lars' },
    { category: MentionableCategory.USER, key: '36', text: 'Bib Fortuna' },
    { category: MentionableCategory.USER, key: '37', text: 'Biggs Darklighter' },
    { category: MentionableCategory.USER, key: '38', text: 'Black Krrsantan' },
    { category: MentionableCategory.USER, key: '39', text: 'Bo-Katan Kryze' },
    { category: MentionableCategory.USER, key: '40', text: 'Boba Fett' },
    { category: MentionableCategory.USER, key: '41', text: 'Bobbajo' },
    { category: MentionableCategory.USER, key: '42', text: 'Bodhi Rook' },
    { category: MentionableCategory.USER, key: '43', text: 'Borvo the Hutt' },
    { category: MentionableCategory.USER, key: '44', text: 'Boss Nass' },
    { category: MentionableCategory.USER, key: '45', text: 'Bossk' },
    { category: MentionableCategory.USER, key: '46', text: 'Breha Antilles-Organa' },
    { category: MentionableCategory.USER, key: '47', text: 'Bren Derlin' },
    { category: MentionableCategory.USER, key: '48', text: 'Brendol Hux' },
    { category: MentionableCategory.USER, key: '49', text: 'BT-1' },
    { category: MentionableCategory.USER, key: '50', text: 'C-3PO' },
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
