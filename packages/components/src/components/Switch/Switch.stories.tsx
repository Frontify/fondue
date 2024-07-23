/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Switch } from './Switch';

type Story = StoryObj<typeof Switch>;
const meta: Meta<typeof Switch> = {
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    argTypes: {
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
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

export const ExternallyControlled: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);

        const onChange = (checked: boolean) => {
            setChecked(checked);
        };

        return <Switch value={checked} onChange={onChange} {...args} />;
    },
};

export const Size: Story = {
    render: (args) => (
        <>
            <Switch {...args} size="small" />
            <Switch {...args} size="medium" />
            <Switch {...args} size="large" />
        </>
    ),
};
