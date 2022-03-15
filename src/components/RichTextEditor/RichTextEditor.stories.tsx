/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
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
} from "@udecode/plate";
import React from "react";
import { ELEMENT_CHECK_ITEM, ELEMENT_CHECK_LIST } from "./plugins/checkboxListPlugin";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";
import { TextStyles } from "./utils/getTextStyles";

const IPSUM =
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

type LeafType = {
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

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
        clear: false,
    },
    argTypes: {
        onTextChange: { action: "onTextChange" },
        onBlur: { action: "onBlur" },
    },
} as Meta;

const value = [
    createElement({ text: "This text is bold.", mark: MARK_BOLD }),
    createElement({ text: "This text is italic.", mark: MARK_ITALIC }),
    createElement({ text: "This text has an underline.", mark: MARK_UNDERLINE }),
    createElement({ text: "This text has a strikethrough.", mark: MARK_STRIKETHROUGH }),
    createElement({ text: "This text is a code line.", mark: MARK_CODE }),
    createElement({
        text: IPSUM,
    }),
    {
        type: ELEMENT_UL,
        children: [
            {
                type: ELEMENT_LI,
                children: [{ text: "This is list item number one." }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: "This is list item number two." }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: "This is list item number three." }],
            },
            {
                type: ELEMENT_UL,
                children: [
                    {
                        type: ELEMENT_LI,
                        children: [{ text: "This is child item number one." }],
                    },
                    {
                        type: ELEMENT_LI,
                        children: [{ text: "This is child item number two, with more children." }],
                    },
                    {
                        type: ELEMENT_UL,
                        children: [
                            {
                                type: ELEMENT_LI,
                                children: [{ text: "This is child of child item number one." }],
                            },
                            {
                                type: ELEMENT_LI,
                                children: [{ text: "This is child of child item number two." }],
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
                children: [{ text: "This comes first." }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: "This comes second." }],
            },
            {
                type: ELEMENT_LI,
                children: [{ text: "And last but not least, this comes third." }],
            },
        ],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                type: ELEMENT_LINK,
                children: [{ text: "This is a link." }],
                url: "https://frontify.com",
            },
        ],
    },
    createElement({ text: "Heading 1", element: TextStyles.ELEMENT_HEADING1 }),
    createElement({ text: "Heading 2", element: TextStyles.ELEMENT_HEADING2 }),
    createElement({ text: "Heading 3", element: TextStyles.ELEMENT_HEADING3 }),
    createElement({ text: "Heading 4", element: TextStyles.ELEMENT_HEADING4 }),
    createElement({ text: "Custom 1", element: TextStyles.ELEMENT_CUSTOM1 }),
    createElement({ text: "Custom 2", element: TextStyles.ELEMENT_CUSTOM2 }),
];

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
RichTextEditor.args = { value: JSON.stringify(value) };

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithReadonlyState.args = {
    readonly: true,
    value: JSON.stringify(value),
};
WithReadonlyState.argTypes = { value: { type: "string" } };

export const RichTextWithHTML: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
RichTextWithHTML.args = {
    value: `
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
    `,
};
RichTextWithHTML.argTypes = { value: { type: "string" } };

export const RichTextEditorFlex: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex">
        <RichTextEditorComponent {...args} />
    </div>
);
RichTextEditorFlex.argTypes = { value: { type: "string" } };

export const WithCustomTextStyle: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithCustomTextStyle.args = {
    value: JSON.stringify(value),
    textStyles: [
        { type: TextStyles.ELEMENT_HEADING1, className: "tw-text-7xl tw-font-bold tw-text-green-80" },
        { type: TextStyles.ELEMENT_HEADING2, className: "tw-text-5xl tw-font-bold tw-text-violet-60" },
        { type: TextStyles.ELEMENT_HEADING3, className: "tw-text-3xl tw-font-bold tw-text-yellow-70" },
        { type: TextStyles.ELEMENT_HEADING4, className: "tw-text-xl tw-text-red-50" },
        { type: TextStyles.ELEMENT_CUSTOM1, className: "tw-font-mono tw-italic tw-text-black-80" },
        { type: TextStyles.ELEMENT_CUSTOM2, className: "tw-underline tw-text-black-80" },
    ],
};
WithCustomTextStyle.argTypes = { value: { type: "string" } };

export const MultipleRichTextEditors: Story<RichTextEditorProps> = () => (
    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder one"
                id="editor-one"
                value="<p>I'm editor <strong>one</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder two"
                id="editor-two"
                value="<p>I'm editor <strong>two</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder three"
                id="editor-three"
                value="<p>I'm editor <strong>three</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder four"
                id="editor-four"
                value="<p>I'm editor <strong>four</strong>.</p>"
            />
        </div>
    </div>
);
export const WithChecklist: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
const checklistValue = [
    {
        type: ELEMENT_CHECK_LIST,
        children: [
            {
                type: ELEMENT_CHECK_ITEM,
                checked: true,
                children: [{ text: "This is a checked checklist item." }],
            },
            {
                type: ELEMENT_CHECK_ITEM,
                checked: false,
                children: [{ text: "This is an unchecked checklist item." }],
            },
            {
                type: ELEMENT_CHECK_ITEM,
                checked: true,
                children: [{ text: "This is checked again, and it also has children!" }],
            },
            {
                type: ELEMENT_CHECK_LIST,
                children: [
                    {
                        type: ELEMENT_CHECK_ITEM,
                        checked: false,
                        children: [{ text: "This is child checklist item." }],
                    },
                    {
                        type: ELEMENT_CHECK_ITEM,
                        checked: true,
                        children: [{ text: "This is a checked child checklist item, with even more children!" }],
                    },
                    {
                        type: ELEMENT_CHECK_LIST,
                        children: [
                            {
                                type: ELEMENT_CHECK_ITEM,
                                checked: false,
                                children: [{ text: "Hello, I'm unchecked." }],
                            },
                            {
                                type: ELEMENT_CHECK_ITEM,
                                checked: true,
                                children: [{ text: "And I'm checked!" }],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
WithChecklist.args = {
    value: JSON.stringify(checklistValue),
};
WithChecklist.argTypes = { value: { type: "string" } };
