/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { BlockStyleTypes } from "./renderer/renderBlockStyles";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";
import { createLinkNode } from "./utils/link";
import { createListItemNode } from "./utils/listItem";

export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
    },
    argTypes: {
        onTextChange: { action: "onTextChange" },
        onBlur: { action: "onBlur" },
    },
} as Meta;

const value = [
    { type: BlockStyleTypes.Paragraph, children: [{ text: "bold", bold: true }] },
    { type: BlockStyleTypes.Paragraph, children: [{ text: "italic", italic: true }] },
    { type: BlockStyleTypes.Paragraph, children: [{ text: "underline", underline: true }] },
    { type: BlockStyleTypes.Paragraph, children: [{ text: "strikethrough", strikethrough: true }] },
    { type: BlockStyleTypes.Paragraph, children: [{ text: "code", code: true }] },
    {
        type: BlockStyleTypes.UnorderedList,
        children: [createListItemNode("red"), createListItemNode("blue"), createListItemNode("yellow")],
    },
    {
        type: BlockStyleTypes.OrderedList,
        children: [
            createListItemNode("Mix flour, baking powder, sugar, and salt."),
            createListItemNode("In another bowl, mix eggs, milk, and oil."),
            createListItemNode("Stir both mixtures together."),
            createListItemNode("Fill muffin tray 3/4 full."),
            createListItemNode("Bake for 20 minutes."),
        ],
    },
];

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <>
        <RichTextEditorComponent {...args} />
    </>
);
RichTextEditor.argTypes = { value: { type: "object" } };
RichTextEditor.args = { value: JSON.stringify(value) };

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithReadonlyState.args = {
    readonly: true,
    value: JSON.stringify([
        ...value,
        {
            type: BlockStyleTypes.Paragraph,
            children: [createLinkNode("https://git-scm.com/downloads", "Link")],
        },
    ]),
};
WithReadonlyState.argTypes = { value: { type: "object" } };

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
