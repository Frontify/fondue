/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

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
        minRows: 1,
        onBlur: action('onBlur'),
        onChange: action('onChange'),
        onFocus: action('onFocus'),
        placeholder: 'Placeholder',
    },
};

export default meta;

export const Default: Story = {
    render: (args) => <Textarea {...args} />,
};
