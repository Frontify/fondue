/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { BlockStyleTypes } from "./renderer/renderBlockStyles";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";

export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
    },
    argTypes: {
        onTextChange: { action: "onTextChange" },
    },
} as Meta;

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <>
        <RichTextEditorComponent
            {...args}
            value={JSON.stringify([
                { type: BlockStyleTypes.Paragraph, children: [{ text: "bold", bold: true }] },
                { type: BlockStyleTypes.Paragraph, children: [{ text: "italic", italic: true }] },
                { type: BlockStyleTypes.Paragraph, children: [{ text: "underline", underline: true }] },
                { type: BlockStyleTypes.Paragraph, children: [{ text: "strikethrough", strikethrough: true }] },
                { type: BlockStyleTypes.Code, children: [{ text: "code" }] },
                {
                    type: BlockStyleTypes.UnorderedList,
                    children: [
                        { type: BlockStyleTypes.ListItem, children: [{ text: "red" }] },
                        { type: BlockStyleTypes.ListItem, children: [{ text: "blue" }] },
                        { type: BlockStyleTypes.ListItem, children: [{ text: "yellow" }] },
                    ],
                },
                {
                    type: BlockStyleTypes.OrderedList,
                    children: [
                        {
                            type: BlockStyleTypes.ListItem,
                            children: [{ text: "Mix flour, baking powder, sugar, and salt." }],
                        },
                        {
                            type: BlockStyleTypes.ListItem,
                            children: [{ text: "In another bowl, mix eggs, milk, and oil." }],
                        },
                        { type: BlockStyleTypes.ListItem, children: [{ text: "Stir both mixtures together." }] },
                        { type: BlockStyleTypes.ListItem, children: [{ text: "Fill muffin tray 3/4 full." }] },
                        { type: BlockStyleTypes.ListItem, children: [{ text: "Bake for 20 minutes." }] },
                    ],
                },
            ])}
        />
    </>
);
RichTextEditor.argTypes = { value: { type: "object" } };

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithReadonlyState.args = {
    readonly: true,
    value: JSON.stringify([
        { type: BlockStyleTypes.Paragraph, children: [{ text: "This is some text that you can not edit" }] },
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
        <pre><code>code</code></pre>
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
        <a href="https://git-scm.com/downloads" class="link" target="_blank">Link</a>
    `,
};
RichTextWithHTML.argTypes = { value: { type: "string" } };
