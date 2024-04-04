/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Validation } from '@utilities/validation';

import { type LegacyTextareaProps, LegacyTextarea as TextareaComponent } from './LegacyTextarea';

export default {
    title: 'Deprecated/LegacyTextarea',
    component: TextareaComponent,
    tags: ['autodocs'],
    args: {
        disabled: false,
        required: false,
        autosize: false,
        resizeable: true,
        selectable: false,
        validation: Validation.Default,
        focusOnMount: false,
    },
    argTypes: {
        value: { type: 'string' },
        placeholder: { type: 'string' },
        decorator: { type: 'string' },
        onInput: { action: 'onInput' },
        onBlur: { action: 'onBlur' },
        onClear: { action: 'onClear' },
        onFocus: { action: 'onFocus' },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        minRows: { type: 'number' },
        maxRows: { type: 'number' },
        onEnterPressed: { action: 'onEnterPressed', table: { disable: true } },
        focusOnMount: { type: 'boolean' },
    },
} as Meta<LegacyTextareaProps>;

export const LegacyTextarea: StoryFn<LegacyTextareaProps> = (args: LegacyTextareaProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value ?? ''}`), [args.value]);

    return <TextareaComponent {...args} value={input} onInput={setInput} />;
};

export const FocusOnMount = LegacyTextarea.bind({});
FocusOnMount.args = {
    focusOnMount: true,
};
