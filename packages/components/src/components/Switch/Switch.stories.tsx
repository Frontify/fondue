/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Label } from '../Label/Label';
import { Tooltip } from '../Tooltip/Tooltip';

import { Switch } from './Switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
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
    decorators: [
        (Story) => (
            <div className="tw-flex tw-gap-1.5 tw-items-center">
                <Story />
            </div>
        ),
    ],
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

export const WithLabel: Story = {
    render: (args) => (
        <>
            <Label id="label" htmlFor="switch">
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
    ),
};

export const WithLabelAndTooltip: Story = {
    render: (args) => (
        <>
            <Label id="label" htmlFor="switch">
                Switch
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconQuestionMarkCircle size="16" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>Tooltip</Tooltip.Content>
                </Tooltip.Root>
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
    ),
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
