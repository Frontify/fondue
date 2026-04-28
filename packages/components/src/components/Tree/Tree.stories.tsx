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
    render: () => (
        <Tree.Root>
            <Tree.Item id="1">Item 1</Tree.Item>
            <Tree.Folder id="a" name="Folder a">
                <Tree.Item id="a1">Item a1</Tree.Item>
                <Tree.Item id="a2">Item a2</Tree.Item>
            </Tree.Folder>
            <Tree.Folder id="b" name="Folder b">
                <Tree.Item id="b1">Item b1</Tree.Item>
                <Tree.Item id="b2">Item b2</Tree.Item>
                <Tree.Folder id="b3" name="Folder b3">
                    <Tree.Item id="b31">Item b31</Tree.Item>
                    <Tree.Item id="b32">Item b32</Tree.Item>
                    <Tree.Item id="b33">Item b33</Tree.Item>
                </Tree.Folder>
            </Tree.Folder>
        </Tree.Root>
    ),
};
