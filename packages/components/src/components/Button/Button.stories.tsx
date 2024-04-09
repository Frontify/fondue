/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        type: 'button',
        style: 'default',
        size: 'medium',
        rounding: 'medium',
        hideLabel: false,
        disabled: false,
        hugWidth: true,
        children: 'Button Text',
    },
};
export default meta;

export const Default: Story = {
    name: 'Text Label Only',
};

export const WithIcon: Story = {
    name: 'Icon Only',
    args: {
        hideLabel: true,
        icon: <IconIcon />,
    },
};

export const WithRoundedIcon: Story = {
    name: 'Icon Only Rounded',
    args: {
        rounding: 'full',
        icon: <IconIcon />,
        hideLabel: true,
    },
};

export const WithIconAndLabel: Story = {
    name: 'Icon and Text Label',
    args: {
        icon: <IconColorFan />,
    },
};
