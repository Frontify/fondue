/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Textarea, TextareaProps } from '.';
import { Validation } from '@utilities/validation';
import { IconNook16 } from '@foundation/Icon';
import { Box } from '@components/Box';

export default {
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        autosize: { type: 'boolean' },
        autocomplete: { type: 'boolean' },
        decorator: { type: 'string' },
        disabled: { type: 'boolean' },
        readOnly: { type: 'boolean' },
        focusOnMount: { type: 'boolean' },
        minRows: {
            type: 'number',
            defaultValue: undefined,
            description: 'If `autosize` is false, this is used as `rows` property for default textarea',
        },
        maxRows: {
            type: 'number',
            defaultValue: undefined,
            description: 'If `autosize` is false, this property is ignored',
        },
        resizable: { type: 'boolean' },
        selectable: { type: 'boolean' },
        status: { control: { type: 'select' }, options: Object.values(Validation), defaultValue: Validation.Default },
        defaultValue: {
            type: 'string',
            defaultValue: undefined,
            description: 'Initial value. \n\n `sting` `undefined`',
        },
        value: {
            type: 'string',
            defaultValue: undefined,
            description: 'Current value. \n\n `sting` `undefined`',
        },
        onChange: {
            type: 'function',
            action: 'onChange',
            defaultValue: undefined,
        },
        onInput: {
            action: 'onInput',
            description: '`((value: string) => void) | undefined`',
        },
        onEnterPressed: {
            type: 'function',
            description: '`((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined`',
            action: 'onEnterPressed',
            defaultValue: undefined,
        },
        onBlur: {
            action: 'onBlur',
            description: '`((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined`',
        },
        onFocus: {
            action: 'onFocus',
            defaultValue: undefined,
            description: '`((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined`',
        },
    },
    args: {
        status: Validation.Default,
        autosize: false,
        resizable: false,
        autocomplete: false,
        disabled: false,
        readOnly: false,
        selectable: false,
        focusOnMount: false,
    },
} as Meta<TextareaProps>;

const TextareaTemplate: StoryFn<TextareaProps> = (args) => {
    return (
        <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} />
        </Box>
    );
};

export const Default = TextareaTemplate.bind({});
Default.args = {};

export const WithDecoratorAndAutosize = TextareaTemplate.bind({});
WithDecoratorAndAutosize.args = {
    autosize: true,
    decorator: <IconNook16 />,
};

export const WithDefaultText = TextareaTemplate.bind({});
WithDefaultText.args = {
    defaultValue: 'I am some initialized texts to start the input.',
};
