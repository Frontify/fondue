/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { ContentState, convertToRaw } from "draft-js";
import React from "react";
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
        <RichTextEditorComponent {...args} />
    </>
);
RichTextEditor.argTypes = { value: { type: "object" } };

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithReadonlyState.args = {
    readonly: true,
    value: [{ type: "paragraph", children: [{ text: "This is some text that you can not edit" }] }],
};
WithReadonlyState.argTypes = { value: { type: "object" } };

export const RichTextWithHTML: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
RichTextWithHTML.args = {
    value: `
        <p><bold>bold</bold></p>
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
        <a href="https://git-scm.com/downloads" class="link" target="_blank">Link</a>
    `,
};
RichTextWithHTML.argTypes = { value: { type: "string" } };
