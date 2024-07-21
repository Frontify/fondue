/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Switch } from './Switch';
import { useState } from 'react';

type Story = StoryObj<typeof Switch>;
const meta: Meta<typeof Switch> = {
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        id: 'airplane-mode',
        'aria-label': 'Toggle airplane mode',
    },
};
export default meta;

export const Checked: Story = {
    args: {
        defaultValue: true,
    },
};

export const Unchecked: Story = {
    args: {
        defaultValue: false,
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: false,
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        defaultValue: false,
        required: true,
    },
};

export const Indeterminate: Story = {
    args: {},
};

export const ExternallyControlled: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);

        const onChange = (checked: boolean) => {
            setChecked(checked);
        };

        return <Switch value={checked} onChange={onChange} {...args} />;
    },
};

export const HugWidth: Story = {
    args: {
        defaultValue: false,
        hugWidth: true,
    },
};

export const SizeSmall: Story = {
    args: {
        defaultValue: false,
        size: 'small',
    },
};

export const SizeMedium: Story = {
    args: {
        defaultValue: false,
        size: 'medium',
    },
};

export const SizeLarge: Story = {
    args: {
        defaultValue: false,
        size: 'large',
    },
};
