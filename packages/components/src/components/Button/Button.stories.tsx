/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

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
        docs: {
            description: {
                component: [
                    'An interactive element that triggers actions — from submitting a form to opening a menu. At least one content element must be included: a label, an icon, or both.',
                    '',
                    '**When to use:** For actions and commands only. Use links for navigation — buttons trigger an immediate result, links navigate to a new location.',
                    '',
                    '**Icon:** Pass an icon as a child to add visual context. Use `aspect="square"` for icon-only buttons.',
                    '',
                    '**Caret:** Signals that clicking will reveal additional options. Usually used with the Dropdown component.',
                    '',
                    '**Accessible labeling:** Use concise, descriptive labels that reflect the action. Prefer specific verbs like "Submit" or "Download" over vague terms like "Go" or "Click here."',
                ].join('\n'),
            },
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
