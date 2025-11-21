/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard, IconNook } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { type ComponentProps } from 'react';

import { Textarea, TextareaRoot, TextareaSlot } from './Textarea';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof TextareaRoot> = {
    title: 'Components/Textarea',
    component: TextareaRoot,
    subcomponents: {
        'Textarea.Slot': TextareaSlot,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        autocomplete: false,
        autosize: false,
        clearable: false,
        defaultValue: 'Hello from Frontify',
        disabled: false,
        focusOnMount: false,
        minRows: 1,
        maxRows: undefined,
        onBlur: action('onBlur'),
        onChange: action('onChange'),
        onEnterPressed: action('onEnterPressed'),
        onFocus: action('onFocus'),
        placeholder: 'Placeholder',
        readOnly: false,
        resizable: false,
        selectable: true,
        value: undefined,
    },
    render: (args) => {
        // Used to get the correct component in the Storybook for the simple cases (`Textarea` instead of `Textarea.Root`)
        // More complex cases are using the Story `render` function
        const Component = (props: ComponentProps<typeof Textarea>) => <Textarea {...props} />;
        Component.displayName = 'Textarea';
        return <Component {...args} />;
    },
};

export default meta;

export const Default: Story = {};

export const WithDecoratorAndAutosize: Story = {
    args: {
        autosize: true,
        decorator: <IconNook size={16} />,
        placeholder: 'Enter some long form text here',
    },
};

export const Required: Story = {
    args: {
        placeholder: 'Enter some long form text here',
        required: true,
    },
};

export const WithSlots: Story = {
    args: {
        placeholder: 'Enter some long form text here',
        autosize: true,
    },
    render: (args) => (
        <Textarea.Root {...args}>
            <Textarea.Slot name="left">
                <IconNook size={16} />
            </Textarea.Slot>
            <Textarea.Slot name="right">
                <button onClick={() => alert('Action clicked!')} style={{ cursor: 'pointer' }}>
                    <IconClipboard size={16} />
                </button>
            </Textarea.Slot>
        </Textarea.Root>
    ),
};

