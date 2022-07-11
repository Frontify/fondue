/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from './RichTextEditor';
import { EditorActions } from './utils/actions';
import { IPSUM, checkboxValue, htmlValue, value } from './utils/exampleValues';

export default {
    title: 'Components/Rich Text Editor',
    component: RichTextEditorComponent,
    args: {
        value: JSON.stringify(value),
        placeholder: 'Some placeholder',
        readonly: false,
        clear: false,
    },
    argTypes: {
        onTextChange: { action: 'onTextChange' },
        onBlur: { action: 'onBlur' },
        vale: { type: 'string' },
    },
} as Meta;

const RichTextEditorTemplate: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);

export const RichTextEditor = RichTextEditorTemplate.bind({});

export const WithReadonlyState = RichTextEditorTemplate.bind({});
WithReadonlyState.args = {
    readonly: true,
};

export const RichTextWithHTML = RichTextEditorTemplate.bind({});
RichTextWithHTML.args = {
    value: htmlValue,
};

export const RichTextEditorFlex: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex">
        <RichTextEditorComponent {...args} />
    </div>
);

export const WithCustomTextStyle = RichTextEditorTemplate.bind({});
WithCustomTextStyle.args = {
    designTokens: {
        heading1: {
            fontSize: '48px',
            fontStyle: 'italic',
            fontWeight: '800',
            textDecoration: 'underline',
            textTransform: 'uppercase',
        },
        heading2: {
            fontFamily: 'inherit',
            fontSize: '32px',
            fontWeight: '300',
            textDecoration: 'underline',
        },
        heading3: {
            fontSize: '24px',
        },
        heading4: {
            fontSize: '18px',
            fontStyle: 'italic',
        },
        custom1: {
            fontSize: '14px',
            color: 'rgb(255, 0, 0)',
            fontWeight: '700',
            textTransform: 'uppercase',
        },
        custom2: {
            fontSize: '14px',
            letterSpacing: 10,
        },
        custom3: {
            fontSize: '14px',
        },
    },
};

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

export const WithChecklist = RichTextEditorTemplate.bind({});
WithChecklist.args = {
    value: JSON.stringify(checkboxValue),
};

export const WithCustomControls = RichTextEditorTemplate.bind({});
WithCustomControls.args = {
    value: `<p>${IPSUM}</p>`,
    actions: [
        [EditorActions.LINK],
        [EditorActions.ITALIC, EditorActions.BOLD, EditorActions.UNDERLINE],
        [EditorActions.ORDERED_LIST, EditorActions.UNORDERED_LIST],
    ],
};
