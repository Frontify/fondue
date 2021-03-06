/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Textarea as TextareaComponent, TextareaProps } from './Textarea';
import { Validation } from '@utilities/validation';

export default {
    title: 'Components/Textarea',
    component: TextareaComponent,
    args: {
        disabled: false,
        required: false,
        autosize: false,
        resizeable: true,
        validation: Validation.Default,
    },
    argTypes: {
        value: { type: 'string' },
        placeholder: { type: 'string' },
        decorator: { type: 'string' },
        onInput: { action: 'onInput' },
        onBlur: { action: 'onBlur' },
        onClear: { action: 'onClear' },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        minRows: { type: 'number' },
        maxRows: { type: 'number' },
    },
} as Meta<TextareaProps>;

export const Textarea: Story<TextareaProps> = (args: TextareaProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value || ''}`), [args.value]);

    return <TextareaComponent {...args} value={input} onInput={setInput} />;
};
