/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React from "react";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";
import { EditorActions } from "./utils/actions";
import { checkboxValue, htmlValue, IPSUM, value } from "./utils/exampleValues";
import { TextStyles } from "./utils/getTextStyles";

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
    value: htmlValue,
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
WithChecklist.args = {
    value: JSON.stringify(checkboxValue),
};
WithChecklist.argTypes = { value: { type: "string" } };

export const WithCustomControls: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
WithCustomControls.args = {
    value: IPSUM,
    actions: [
        [EditorActions.LINK],
        [EditorActions.ITALIC, EditorActions.BOLD, EditorActions.UNDERLINE],
        [EditorActions.ORDERED_LIST, EditorActions.UNORDERED_LIST],
    ],
};
WithCustomControls.argTypes = { value: { type: "string" } };
