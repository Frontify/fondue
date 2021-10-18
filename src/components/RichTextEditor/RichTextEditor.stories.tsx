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
} as Meta;

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <>
        <RichTextEditorComponent {...args} />
    </>
);

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent
        {...args}
        value={convertToRaw(ContentState.createFromText("This is some text that you can not edit"))}
    />
);
WithReadonlyState.args = {
    readonly: true,
};
