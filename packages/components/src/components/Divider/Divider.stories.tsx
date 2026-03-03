/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';

type Story = StoryObj<typeof Divider>;
const meta: Meta<typeof Divider> = {
    title: 'Components/Divider',
    component: Divider,
    tags: ['autodocs'],
    args: {
        color: 'default',
        variant: 'solid',
        padding: 'medium',
        direction: 'horizontal',
    },
    parameters: {
        status: {
            type: 'released',
        },
        docs: {
            description: {
                component: [
                    'A visual separator between content sections. Renders as an `<hr>` with configurable orientation, style, and spacing.',
                    '',
                    '**When to use:** To visually group or separate content areas. Set `decorative` to `true` when the divider carries no semantic meaning.',
                ].join('\n'),
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="tw-h-8">
                <Story />
            </div>
        ),
    ],
};
export default meta;

export const Primary: Story = {
    args: {},
};

export const CustomColor: Story = {
    args: {
        color: 'strong',
    },
};

export const CustomStyle: Story = {
    args: {
        variant: 'dashed',
    },
};

export const CustomHeight: Story = {
    args: {
        padding: 'large',
    },
};

export const Vertical: Story = {
    args: {
        direction: 'vertical',
    },
};
