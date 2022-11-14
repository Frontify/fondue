/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
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
} from '@udecode/plate';
import { ELEMENT_BUTTON } from '../Plugins';
import { ELEMENT_CHECK_ITEM } from '../Plugins/CheckboxListPlugin/id';
import { MentionComboboxItem, MentionableCategory } from '../Plugins/MentionPlugin/types';
import { TextStyles } from '../Plugins/TextStylePlugin/TextStyles';
import { DesignTokens } from '../types';
import { mixedMarkdown } from '../serializer/markdown/__tests__/fixtures';

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

export const IPSUM =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

export const value = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
    createElement({
        text: IPSUM,
    }),
    {
        type: ELEMENT_UL,
        children: [
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number one.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number two.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number three.' }],
            },
            {
                type: ELEMENT_UL,
                children: [
                    {
                        type: ELEMENT_LI,
                        children: [{ text: 'This is child item number one.' }],
                    },
                    {
                        type: ELEMENT_LI,
                        children: [{ text: 'This is child item number two, with more children.' }],
                    },
                    {
                        type: ELEMENT_UL,
                        children: [
                            {
                                type: ELEMENT_LI,
                                children: [{ text: 'This is child of child item number one.' }],
                            },
                            {
                                type: ELEMENT_LI,
                                children: [{ text: 'This is child of child item number two.' }],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: ELEMENT_OL,
        children: [
            {
                type: ELEMENT_LI,
                children: [{ text: 'This comes first.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This comes second.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'And last but not least, this comes third.' }],
            },
        ],
    },
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
    createElement({ text: 'Heading 1', element: TextStyles.ELEMENT_HEADING1 }),
    createElement({ text: 'Heading 2', element: TextStyles.ELEMENT_HEADING2 }),
    createElement({ text: 'Heading 3', element: TextStyles.ELEMENT_HEADING3 }),
    createElement({ text: 'Heading 4', element: TextStyles.ELEMENT_HEADING4 }),
    createElement({ text: 'Custom 1', element: TextStyles.ELEMENT_CUSTOM1 }),
    createElement({ text: 'Custom 2', element: TextStyles.ELEMENT_CUSTOM2 }),
    createElement({ text: 'Custom 3', element: TextStyles.ELEMENT_CUSTOM3 }),
    createElement({ text: 'Quote', element: TextStyles.ELEMENT_QUOTE }),
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

export const nodesToSerialize: TDescendant[] = [
    createElement({ text: 'This text is bold.', mark: MARK_BOLD }),
    createElement({ text: 'This text is italic.', mark: MARK_ITALIC }),
    createElement({ text: 'This text has an underline.', mark: MARK_UNDERLINE }),
    createElement({ text: 'This text has a strikethrough.', mark: MARK_STRIKETHROUGH }),
    createElement({ text: 'This text is a code line.', mark: MARK_CODE }),
    createElement({
        text: IPSUM,
    }),
    {
        type: ELEMENT_UL,
        children: [
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number one.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number two.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This is list item number three.' }],
            },
            {
                type: ELEMENT_UL,
                children: [
                    {
                        type: ELEMENT_LI,
                        children: [{ text: 'This is child item number one.' }],
                    },
                    {
                        type: ELEMENT_LI,
                        children: [{ text: 'This is child item number two, with more children.' }],
                    },
                    {
                        type: ELEMENT_UL,
                        children: [
                            {
                                type: ELEMENT_LI,
                                children: [{ text: 'This is child of child item number one.' }],
                            },
                            {
                                type: ELEMENT_LI,
                                children: [{ text: 'This is child of child item number two.' }],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: ELEMENT_OL,
        children: [
            {
                type: ELEMENT_LI,
                children: [{ text: 'This comes first.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'This comes second.' }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: 'And last but not least, this comes third.' }],
            },
        ],
    },
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
                        text: 'This is also a Link.',
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

export const serializedHtml =
    '<p><span class="tw-font-bold">This text is bold.</span></p><p><span class="tw-italic">This text is italic.</span></p><p><span class="tw-underline">This text has an underline.</span></p><p><span class="tw-line-through">This text has a strikethrough.</span></p><p><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5">This text is a code line.</span></p><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-6"><li>This is list item number one.</li><li>This is list item number two.</li><li>This is list item number three.</li><ul class="tw-list-disc tw-pl-6"><li>This is child item number one.</li><li>This is child item number two, with more children.</li><ul class="tw-list-disc tw-pl-6"><li>This is child of child item number one.</li><li>This is child of child item number two.</li></ul></ul></ul><ol class="tw-list-decimal tw-pl-6"><li>This comes first.</li><li>This comes second.</li><li>And last but not least, this comes third.</li></ol><p><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link.</a></p><h1 style="font-size: 48px; font-weight: 700;">Heading 1</h1><h2 style="font-size: 32px; font-weight: 700;">Heading 2</h2><h3 style="font-size: 24px;">Heading 3</h3><h4 style="font-size: 18px;">Heading 4</h4><p style="font-size: 14px;">Custom 1</p><p style="font-size: 14px; font-weight: 600;">Custom 2</p>';

export const serializedHtmlWithCustomDesignTokens =
    '<p><span class="tw-font-bold">This text is bold.</span></p><p><span class="tw-italic">This text is italic.</span></p><p><span class="tw-underline">This text has an underline.</span></p><p><span class="tw-line-through">This text has a strikethrough.</span></p><p><span class="tw-table-cell tw-rounded tw-bg-box-neutral tw-text-box-neutral-inverse tw-m-0 tw-px-2 tw-py-0.5">This text is a code line.</span></p><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><ul class="tw-list-disc tw-pl-6"><li>This is list item number one.</li><li>This is list item number two.</li><li>This is list item number three.</li><ul class="tw-list-disc tw-pl-6"><li>This is child item number one.</li><li>This is child item number two, with more children.</li><ul class="tw-list-disc tw-pl-6"><li>This is child of child item number one.</li><li>This is child of child item number two.</li></ul></ul></ul><ol class="tw-list-decimal tw-pl-6"><li>This comes first.</li><li>This comes second.</li><li>And last but not least, this comes third.</li></ol><p><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" href="https://frontify.com">This is a Link.</a></p><p><a style="font-size: 14px; color: rgb(113, 89, 215); text-decoration: underline; cursor: pointer;" target=_blank href="https://smartive.ch">This is also a Link.</a></p><h1 style="font-size: 1.5rem; font-weight: 800;">Heading 1</h1><h2 style="font-size: 1.25rem; font-weight: 500;">Heading 2</h2><h3 style="font-size: 24px;">Heading 3</h3><h4 style="font-size: 18px;">Heading 4</h4><p style="font-size: 14px;">Custom 1</p><p style="font-size: 14px; font-weight: 600;">Custom 2</p>';

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

export const mentionable: MentionComboboxItem[] = [
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
