/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Box } from '@components/Box';
import { Textarea, TextareaProps } from '.';
import { IconClipboard16, IconNook16, IconQuestionMark16 } from '@foundation/Icon';
import { Validation } from '@utilities/validation';
import { useCallback, useEffect, useState } from 'react';
import { FormField } from '@components/FormField';

const ExtraActions = [
    {
        icon: <IconClipboard16 />,
        tooltip: { content: 'Save to Clipboard' },
        callback: () => {
            alert('Mock Copied to Clipboard');
        },
    },
    {
        icon: <IconQuestionMark16 />,
        tooltip: { content: 'Help Desk' },
        callback: () => alert('Here to Help'),
    },
];

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
            description: 'A `ReactElement` that will be rendered at the start of the `Textarea`',
            table: {
                type: { summary: 'ReactElement | undefined' },
                defaultValue: { summary: undefined },
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
        extraActions: {
            description: 'Collection of extra actions the input can preform',
            table: {
                type: { summary: 'ExtraAction[] | undefined' },
                defaultValue: { summary: undefined },
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
        placeholder: {
            type: 'string',
            description: 'Placeholder text',
            table: {
                type: { summary: 'string | undefined' },
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
            description: 'Callback function to return current value on the `Textarea`',
            table: {
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
    const [input, setInput] = useState<string | undefined>(undefined);

    return (
        <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
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

export const WithExtraActions = TextareaTemplate.bind({});
WithExtraActions.args = {
    extraActions: ExtraActions,
    placeholder: 'Enter some long form text here',
    clearable: true,
};

export const WithFocusOnMount = TextareaTemplate.bind({});
WithFocusOnMount.args = {
    focusOnMount: true,
};

export const WithFormFieldCombination: StoryFn<TextareaProps> = (args) => {
    const [currentStatus, setCurrentStatus] = useState<Validation | undefined>(undefined);
    const [input, setInput] = useState<string | undefined>(undefined);
    const maxChars = 160;
    const currentChars = input ? input.length : 0;

    const handleValidation = useCallback(() => {
        if (currentChars === 0) {
            setCurrentStatus(undefined);
        } else if (currentChars > maxChars) {
            setCurrentStatus(Validation.Error);
        } else if (!currentStatus || currentStatus === Validation.Error) {
            setCurrentStatus(Validation.Success);
        }
    }, [currentChars, currentStatus]);

    const handleOnChange = (value?: string) => {
        setInput(value);
    };

    useEffect(() => {
        handleValidation();
    }, [input, handleValidation]);

    return (
        <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <FormField
                label={{
                    text: 'Label from the FormField',
                    secondaryLabel: `${currentChars}/${maxChars}`,
                    tooltips: [{ content: 'Just a tooltip', children: <IconQuestionMark16 /> }],
                }}
                error={currentStatus === Validation.Error}
                errorText={`Text can not be more than ${maxChars} long.`}
                helperText="Please enter a short description of your favorite Fondue component!"
            >
                <Textarea {...args} onChange={handleOnChange} value={input} status={currentStatus} autosize />
            </FormField>
        </Box>
    );
};
