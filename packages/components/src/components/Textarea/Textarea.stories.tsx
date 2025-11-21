/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard, IconNook } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Textarea } from './Textarea';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
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
};

export default meta;

export const Default: Story = {
    render: (args) => <Textarea {...args} />,
};

export const WithDecoratorAndAutosize: Story = {
    args: {
        autosize: true,
        decorator: <IconNook size={16} />,
        placeholder: 'Enter some long form text here',
    },
    render: (args) => <Textarea {...args} />,
};


export const Required: Story = {
    args: {
        placeholder: 'Enter some long form text here',
        required: true,
    },
    render: (args) => <Textarea {...args} />,
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

