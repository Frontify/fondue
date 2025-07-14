/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        type: 'button',
        variant: 'default',
        emphasis: 'default',
        size: 'medium',
        rounding: 'medium',
        disabled: false,
        hugWidth: true,
        children: 'Button Text',
        aspect: 'default',
        onPress: action('onPress'),
    },
};
export default meta;

export const Default: Story = {
    name: 'Icon and Text Label',
    render: (args) => (
        <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
    ),
};

export const TextLabelOnly: Story = {};

export const WithIcon: Story = {
    name: 'Icon Only',
    args: {
        aspect: 'square',
        children: <IconIcon size={16} />,
    },
};

export const WithRoundedIcon: Story = {
    name: 'Icon Only Rounded',
    args: {
        rounding: 'full',
        title: 'Icon Only Rounded',
        children: <IconIcon size={16} />,
        aspect: 'square',
    },
};

export const WithIconAndLabel: Story = {
    name: 'Icon and Text Label',
    render: (args) => (
        <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
    ),
};
