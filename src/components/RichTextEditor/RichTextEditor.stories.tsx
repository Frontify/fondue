/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";
import { ContentState } from "draft-js";

export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
    },
} as Meta;

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} value={ContentState.createFromText("This is some text that you can not edit")} />
);
WithReadonlyState.args = {
    readonly: true,
};
