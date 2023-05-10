/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Textarea as TextareaComponent, TextareaProps } from './Textarea';
import { textareaFieldArgTypes, textareaFieldArgs } from '@components/TextareaField/helpers/constants';

export default {
    title: 'Components/Textarea',
    component: TextareaComponent,
    tags: ['autodocs'],
    args: { ...textareaFieldArgs },
    argTypes: { ...textareaFieldArgTypes },
} as Meta<TextareaProps>;

const TextareaTemplate: StoryFn<TextareaProps> = (args: TextareaProps) => {
    const [input, setInput] = useState('');
    useEffect(() => setInput(`${args.value || ''}`), [args.value]);

    return <TextareaComponent {...args} value={input} onInput={setInput} />;
};

export const TextareaFieldOnly = TextareaTemplate.bind({});
