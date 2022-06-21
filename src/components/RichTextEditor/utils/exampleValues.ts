/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_LI,
    ELEMENT_LINK,
    ELEMENT_OL,
    ELEMENT_PARAGRAPH,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from '@udecode/plate';
import { ELEMENT_CHECK_ITEM } from '../plugins/checkboxListPlugin/createCheckboxListPlugin';
import { TextStyles } from './textStyles';

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

type LeafType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

const createElement = ({ text, element = ELEMENT_PARAGRAPH, mark }: CreateElementProps) => {
    const leaf: LeafType = { text };
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
                        text: 'This is also a Link.',
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
