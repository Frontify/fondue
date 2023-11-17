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
        autosize: {
            type: 'boolean',
            description: 'If `true`, component rendered is a auto sizing Textarea',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        autocomplete: {
            type: 'boolean',
            description: 'If `true`, Textarea will have `autoComplete` functionality',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        clearable: {
            type: 'boolean',
            description: 'Render `clear` button to clear input on click',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        decorator: {
            type: 'string',
            description: 'A `ReactElement` that will be rendered at the start of the `Textarea`',
            table: {
                type: { summary: 'ReactElement | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        debounceTime: {
            type: 'number',
            description:
                'Time in `milliseconds` that the `onChange` & `onInput` methods will use for the `useDebounce` method',
            table: {
                type: { summary: 'number | undefined' },
                defaultValue: { summary: 500 },
            },
        },
        defaultValue: {
            type: 'string',
            description: 'Initial value',
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        disabled: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        focusOnMount: {
            type: 'boolean',
            description: 'If `true`, Textarea will be focused on mount',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        minRows: {
            type: 'number',
            description: 'If `autosize` is false, this is used as `rows` property for default textarea',
            table: {
                type: { summary: 'number | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        maxRows: {
            type: 'number',
            defaultValue: undefined,
            description: 'If `autosize` is false, this property is ignored',
            table: {
                type: { summary: 'number | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        readOnly: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        resizable: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        selectable: {
            type: 'boolean',
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        status: {
            control: { type: 'select' },
            options: Object.values(Validation),
            defaultValue: Validation.Default,
            description:
                'The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`',
            table: {
                type: { summary: 'Validation | undefined' },
                defaultValue: { summary: 'Validation.Default' },
            },
        },
        onChange: {
            action: 'onChange',
            type: 'function',
            description: 'Callback function to return current value on the `Textarea` (uses a `debounce` method)',
            table: {
                defaultValue: { summary: undefined },
            },
        },
        onInput: {
            action: 'onInput',
            type: 'function',
            description: 'Callback function to return current value on the `Textarea` (uses a `debounce` method)',
            table: {
                type: { summary: '((value: string) => void) | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        onEnterPressed: {
            action: 'onEnterPressed',
            description: 'Callback function to return current value on the `Textarea` when `enter` key id pressed',
            type: 'function',
            table: {
                type: { summary: '((value: string) => void) | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        onKeyDown: {
            action: 'onKeyDown',
            description: 'Callback function that is called on every `keydown` event',
            type: 'function',
            table: {
                type: { summary: '((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        onBlur: {
            action: 'onBlur',
            description: 'Callback function that is called when `Textarea` is unfocused',
            type: 'function',
            table: {
                type: { summary: '((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        onFocus: {
            action: 'onFocus',
            description: 'Callback function that is called when `Textarea` is focused',
            type: 'function',
            table: {
                type: { summary: '((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined' },
                defaultValue: { summary: undefined },
            },
        },
    },
    args: {
        autosize: false,
        autocomplete: false,
        clearable: false,
        disabled: false,
        focusOnMount: false,
        readOnly: false,
        resizable: false,
        selectable: false,
        status: Validation.Default,
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

export const WithDecoratorAndAutosize = TextareaTemplate.bind({});
WithDecoratorAndAutosize.args = {
    autosize: true,
    decorator: <IconNook16 />,
};

export const WithDefaultText = TextareaTemplate.bind({});
WithDefaultText.args = {
    defaultValue: 'I am some initialized texts to start the input.',
};
