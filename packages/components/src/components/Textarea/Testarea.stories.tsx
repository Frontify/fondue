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
        autosize: false,
        autocomplete: false,
        clearable: false,
        placeholder: 'Placeholder',
        defaultValue: 'Hello from Frontify',
        minRows: 1,
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
};

export default meta;

export const Default: Story = {
    render: (args) => <Textarea {...args} />,
};
