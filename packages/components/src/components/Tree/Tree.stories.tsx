/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Tree } from './Tree';

type Story = StoryObj<typeof Tree>;
const meta: Meta<typeof Tree> = {
    component: Tree,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
    render: () => <Tree>Hello World</Tree>,
};
