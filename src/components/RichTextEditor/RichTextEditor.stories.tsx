/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { RichTextEditor, RichTextEditorProps } from "./RichTextEditor";

export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditor,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
    },
} as Meta;

export const Template: Story<RichTextEditorProps> = (args: RichTextEditorProps) => <RichTextEditor {...args} />;
