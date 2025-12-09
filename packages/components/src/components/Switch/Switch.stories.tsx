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
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
    ),
};

export const WithLabelRequired: Story = {
    args: {
        required: true,
    },
    render: (args) => (
        <>
            <Label id="label" htmlFor="switch" required={args.required}>
                Switch
            </Label>
            <Switch {...args} id="switch" aria-labelledby="label" />
        </>
    ),
};

export const WithLabelAndTooltip: Story = {
    render: (args) => (
        <>
            <Label id="label" htmlFor="switch" required={args.required}>
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

export const HugWidth: Story = {
    render: (args) => (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div>
                <div className="tw-mb-2">hugWidth: true (default) - Use flex with gap</div>
                <div className="tw-flex tw-gap-1.5 tw-items-center">
                    <Label id="label-hug-true" htmlFor="switch-hug-true">
                        Label
                    </Label>
                    <Switch {...args} id="switch-hug-true" aria-labelledby="label-hug-true" />
                </div>
            </div>
            <div>
                <div className="tw-mb-2">hugWidth: false - Use flex with justify-between and full width</div>
                <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <Label id="label-hug-false" htmlFor="switch-hug-false">
                        Label
                    </Label>
                    <Switch {...args} id="switch-hug-false" aria-labelledby="label-hug-false" />
                </div>
            </div>
        </div>
    ),
    decorators: [],
    parameters: {
        docs: {
            description: {
                story: 'The Switch component does not have a `hugWidth` prop. Instead, control the layout using flex container styles. When `hugWidth: true`, use a flex container with a small gap. When `hugWidth: false`, use a flex container with `justify-between` and full width.',
            },
        },
    },
};
