/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        type: 'button',
        style: 'default',
        emphasis: 'default',
        size: 'medium',
        rounding: 'medium',
        disabled: false,
        hugWidth: true,
        children: 'Button Text',
        aspect: 'default',
    },
};
export default meta;

export const Default: Story = {
    name: 'Icon and Text Label',
    args: {
        children: (
            <>
                <IconColorFan size={16} />
                Button Text
            </>
        ),
    },
};

export const TextLabelOnly: Story = {
    name: 'Text Label Only',
};

export const WithIcon: Story = {
    name: 'Icon Only',
    args: {
        aspect: 'square',
        children: <IconIcon size={20} />,
    },
};

export const WithRoundedIcon: Story = {
    name: 'Icon Only Rounded',
    args: {
        rounding: 'full',
        title: 'Icon Only Rounded',
        children: <IconIcon size={20} />,
        aspect: 'square',
    },
};

export const WithIconAndLabel: Story = {
    name: 'Icon and Text Label',
    args: {
        children: (
            <>
                <IconColorFan size={16} />
                Button Text
            </>
        ),
    },
};
