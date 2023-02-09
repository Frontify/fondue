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
        children: [{ text: 'This text is followed by a break.' }],
        breakAfterColumn: true,
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

export const nodesToSerialize: TDescendant[] = defaultValue;

export const serializedHtml =
    '<p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-font-bold">This text is bold.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-italic">This text is italic.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-underline">This text has an underline.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-line-through">This text has a strikethrough.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]">This text is a code line.</span></p><p class="tw-border-b tw-border-dashed tw-border-line-x-strong tw-break-after-column tw-break-inside-avoid-column tw-pb-5" style="font-size: 14px; font-style: normal; font-weight: normal;">This text is followed by a break.</p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><p style="">This is list item number two.</p></li><li style="font-size: 14px; font-weight: 600; font-style: normal; text-decoration: none;"><p style="">This is list item number one.</p></li><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><p style="text-decoration: underline;">This is list item number three.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number two, with more children.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child of child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child of child item number two.</p></li></ul></li></ul></li></ul><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This comes first.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This comes second.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">And last but not least, this comes third.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-alpha]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number two.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-roman]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Nested child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Nested child item number two.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Level 5 item 1</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Level 5 item 2</p></li></ol></li></ol></li></ol></li></ol><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Try mentioning characters, like <span data-slate-category="user" contenteditable="false" style="line-height:10px;padding:1px;margin:0 1px;font-weight:bold;vertical-align:baseline;display:inline-block;border-radius:2px;background-color:rgb(227, 232, 246);color:rgb(130, 95, 255)">aaaaaaaa20</span> or <span data-slate-category="group" contenteditable="false" style="line-height:10px;padding:1px;margin:0 1px;font-weight:bold;vertical-align:baseline;display:inline-block;border-radius:2px;background-color:rgb(227, 232, 246);color:rgb(130, 95, 255)"><span style="padding-right:3px;display:inline-block;margin:-1px 0"><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="tw-flex tw-items-center tw-justify-center tw-fill-current" name="IconPeople12"><path fill="currentColor" fill-rule="evenodd" d="M4 4.783c.847 0 1.475-.655 1.475-1.392C5.475 2.655 4.847 2 4 2c-.847 0-1.475.655-1.475 1.391 0 .737.628 1.392 1.475 1.392ZM6.475 3.39a2.36 2.36 0 0 1-.973 1.9A4.001 4.001 0 0 1 8 9v1h2.4v-.8A2.6 2.6 0 0 0 8 6.608V5.289c.606-.09 1.028-.59 1.028-1.137C9.028 3.548 8.51 3 7.8 3c-.104 0-.205.012-.3.034V2.019c.098-.012.198-.019.3-.019 1.23 0 2.228.964 2.228 2.152 0 .697-.343 1.317-.876 1.71A3.601 3.601 0 0 1 11.4 9.2V11H0V9a4.001 4.001 0 0 1 2.498-3.708 2.36 2.36 0 0 1-.973-1.9C1.525 2.07 2.633 1 4 1s2.475 1.07 2.475 2.391ZM4.2 10H7V9a3 3 0 0 0-6 0v1h3.2Z" clip-rule="evenodd"></path></svg></span></span>1111111111</span>.</p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link (Legacy Format).</a></p><h1 style="font-size: 48px; font-weight: 700; font-style: normal;">Heading 1</h1><h2 style="font-size: 32px; font-weight: 700; font-style: normal;">Heading 2</h2><h3 style="font-size: 24px; font-weight: normal; font-style: normal;">Heading 3</h3><h4 style="font-size: 18px; font-weight: normal; font-style: normal;">Heading 4</h4><p style="font-size: 14px; font-weight: normal; font-style: normal;">Custom 1</p><p style="font-size: 14px; font-weight: 600; font-style: normal;">Custom 2</p><p style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: underline;">Custom 3</p><p style="font-size: 16px; font-weight: normal; font-style: italic;">Quote</p>';

export const serializedHtmlWithCustomDesignTokens =
    '<p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-font-bold">This text is bold.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-italic">This text is italic.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-underline">This text has an underline.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-line-through">This text has a strikethrough.</span></p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-[0.2em] tw-font-mono tw-text-[85%]">This text is a code line.</span></p><p class="tw-border-b tw-border-dashed tw-border-line-x-strong tw-break-after-column tw-break-inside-avoid-column tw-pb-5" style="font-size: 14px; font-style: normal; font-weight: normal;">This text is followed by a break.</p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><p style="">This is list item number two.</p></li><li style="font-size: 14px; font-weight: 600; font-style: normal; text-decoration: none;"><p style="">This is list item number one.</p></li><li style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: none;"><p style="text-decoration: underline;">This is list item number three.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number two, with more children.</p><ul class="tw-list-disc tw-pl-[10px] tw-mb-[10px] tw-ml-[25px]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child of child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child of child item number two.</p></li></ul></li></ul></li></ul><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This comes first.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This comes second.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">And last but not least, this comes third.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-alpha]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">This is child item number two.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[lower-roman]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Nested child item number one.</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Nested child item number two.</p><ol class="tw-pl-[10px] tw-mb-[10px] tw-ml-[25px] tw-list-[decimal]"><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Level 5 item 1</p></li><li style="font-size: 14px; font-style: normal; font-weight: normal; text-decoration: none;"><p style="">Level 5 item 2</p></li></ol></li></ol></li></ol></li></ol><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p style="font-size: 14px; font-style: normal; font-weight: normal;">Try mentioning characters, like <span data-slate-category="user" contenteditable="false" style="line-height:10px;padding:1px;margin:0 1px;font-weight:bold;vertical-align:baseline;display:inline-block;border-radius:2px;background-color:rgb(227, 232, 246);color:rgb(130, 95, 255)">aaaaaaaa20</span> or <span data-slate-category="group" contenteditable="false" style="line-height:10px;padding:1px;margin:0 1px;font-weight:bold;vertical-align:baseline;display:inline-block;border-radius:2px;background-color:rgb(227, 232, 246);color:rgb(130, 95, 255)"><span style="padding-right:3px;display:inline-block;margin:-1px 0"><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="tw-flex tw-items-center tw-justify-center tw-fill-current" name="IconPeople12"><path fill="currentColor" fill-rule="evenodd" d="M4 4.783c.847 0 1.475-.655 1.475-1.392C5.475 2.655 4.847 2 4 2c-.847 0-1.475.655-1.475 1.391 0 .737.628 1.392 1.475 1.392ZM6.475 3.39a2.36 2.36 0 0 1-.973 1.9A4.001 4.001 0 0 1 8 9v1h2.4v-.8A2.6 2.6 0 0 0 8 6.608V5.289c.606-.09 1.028-.59 1.028-1.137C9.028 3.548 8.51 3 7.8 3c-.104 0-.205.012-.3.034V2.019c.098-.012.198-.019.3-.019 1.23 0 2.228.964 2.228 2.152 0 .697-.343 1.317-.876 1.71A3.601 3.601 0 0 1 11.4 9.2V11H0V9a4.001 4.001 0 0 1 2.498-3.708 2.36 2.36 0 0 1-.973-1.9C1.525 2.07 2.633 1 4 1s2.475 1.07 2.475 2.391ZM4.2 10H7V9a3 3 0 0 0-6 0v1h3.2Z" clip-rule="evenodd"></path></svg></span></span>1111111111</span>.</p><p style="font-size: 14px; font-style: normal; font-weight: normal;"><a style="font-size: 14px; font-style: normal; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link (Legacy Format).</a></p><h1 style="font-size: 1.5rem; font-weight: 800; font-style: normal;">Heading 1</h1><h2 style="font-size: 1.25rem; font-weight: 500; font-style: normal;">Heading 2</h2><h3 style="font-size: 24px; font-weight: normal; font-style: normal;">Heading 3</h3><h4 style="font-size: 18px; font-weight: normal; font-style: normal;">Heading 4</h4><p style="font-size: 14px; font-weight: normal; font-style: normal;">Custom 1</p><p style="font-size: 14px; font-weight: 600; font-style: normal;">Custom 2</p><p style="font-size: 14px; font-weight: normal; font-style: normal; text-decoration: underline;">Custom 3</p><p style="font-size: 16px; font-weight: normal; font-style: italic;">Quote</p>';

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
