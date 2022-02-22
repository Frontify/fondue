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
import { RichTextEditor as RichTextEditorComponent, EditorProps } from "./RichTextEditor";

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
];

export const RichTextEditor: Story<EditorProps> = (args: EditorProps) => <RichTextEditorComponent {...args} />;
RichTextEditor.args = { value: JSON.stringify(value) };

export const WithReadonlyState: Story<EditorProps> = (args: EditorProps) => <RichTextEditorComponent {...args} />;
WithReadonlyState.args = {
    readonly: true,
    value: JSON.stringify(value),
};
WithReadonlyState.argTypes = { value: { type: "string" } };

export const RichTextWithHTML: Story<EditorProps> = (args: EditorProps) => <RichTextEditorComponent {...args} />;
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
    `,
};
RichTextWithHTML.argTypes = { value: { type: "string" } };

export const RichTextEditorFlex: Story<EditorProps> = (args: EditorProps) => (
    <div className="tw-flex">
        <RichTextEditorComponent {...args} />
    </div>
);
RichTextEditorFlex.argTypes = { value: { type: "string" } };
