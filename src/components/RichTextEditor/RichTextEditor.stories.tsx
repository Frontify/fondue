/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import {
    ELEMENT_LINK,
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from "@udecode/plate";
import React from "react";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";

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
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    }),
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number one.",
            },
        ],
        indent: 1,
        listStyleType: "decimal",
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number two.",
            },
        ],
        indent: 2,
        listStart: 2,
        listStyleType: "decimal",
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number three.",
            },
        ],
        indent: 3,
        listStart: 3,
        listStyleType: "decimal",
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number one.",
            },
        ],
        indent: 1,
        listStyleType: "disc",
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number two.",
            },
        ],
        indent: 1,
        listStyleType: "disc",
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: "This is list item number three.",
            },
        ],
        indent: 1,
        listStyleType: "disc",
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
        <p><strong>bold</strong></p>
        <p><i>italic</i></p>
        <p><u>underline</u></p>
        <p><s>strikethrough</s></p>
        <p><code>code</code></p>
        <ul>
            <li>red</li>
            <li>blue</li>
            <li>yellow</li>
        </ul>
        <ol>
            <li>Mix flour, baking powder, sugar, and salt.</li>
            <li>In another bowl, mix eggs, milk, and oil.</li>
            <li>Stir both mixtures together.</li>
            <li>Fill muffin tray 3/4 full.</li>
            <li>Bake for 20 minutes.</li>
        </ol>
    `,
};
RichTextWithHTML.argTypes = { value: { type: "string" } };

export const RichTextEditorFlex: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex">
        <RichTextEditorComponent {...args} />
    </div>
);
RichTextEditorFlex.argTypes = { value: { type: "string" } };
