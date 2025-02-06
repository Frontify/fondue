/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

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
    render: (args) => (
        <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
    ),
};

export const WithLoading: Story = {
    name: 'Loading',
    args: {
        'aria-label-loading': 'Loading',
    },
    render: (args) => {
        const [isLoading, setIsLoading] = useState(false);

        return (
            <Button
                {...args}
                loading={isLoading}
                onPress={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000);
                }}
            >
                Submit
            </Button>
        );
    },
};

export const WithError: Story = {
    name: 'Error',
    args: {
        'aria-label-error': 'Error',
    },
    render: (args) => {
        const [error, setError] = useState(false);

        return (
            <Button
                {...args}
                error={error}
                onPress={() => {
                    setError(true);
                }}
            >
                Submit
            </Button>
        );
    },
};

export const WithLoadingAndError: Story = {
    name: 'Loading and error',
    args: {
        'aria-label-loading': 'Loading',
    },
    render: (args) => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(false);

        return (
            <Button
                {...args}
                loading={isLoading}
                onPress={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                        setError(true);
                        setIsLoading(false);
                    }, 2000);
                }}
                error={error}
            >
                Submit
            </Button>
        );
    },
};
