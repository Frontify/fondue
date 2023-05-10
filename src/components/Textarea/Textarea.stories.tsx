/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Textarea as TextareaComponent, TextareaProps } from './Textarea';
import { Validation } from '@utilities/validation';

export default {
    title: 'Components/Textarea',
    component: TextareaComponent,
    tags: ['autodocs'],
    args: {
        disabled: false,
        required: false,
        autosize: false,
        resizeable: true,
        selectable: false,
        readOnly: false,
        validation: Validation.Default,
    },
    argTypes: {
        id: { type: 'string' },
        value: { type: 'string' },
        placeholder: { type: 'string' },
        decorator: { type: 'string' },
        onInput: { action: 'onInput' },
        onBlur: { action: 'onBlur' },
        onFocus: { action: 'onFocus' },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        minRows: { type: 'number' },
        maxRows: { type: 'number' },
        disabled: { type: 'boolean' },
        required: { type: 'boolean' },
        autosize: { type: 'boolean' },
        resizeable: { type: 'boolean' },
        selectable: { type: 'boolean' },
        readOnly: { type: 'boolean' },
    },
} as Meta<TextareaProps>;

const TextareaTemplate: StoryFn<TextareaProps> = (args: TextareaProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value || ''}`), [args.value]);

    return <TextareaComponent {...args} value={input} onInput={setInput} />;
};

export const TextareaFieldOnly = TextareaTemplate.bind({});
