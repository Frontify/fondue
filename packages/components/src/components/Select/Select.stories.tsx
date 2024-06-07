/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Select } from './Select';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof Select> = {
    component: Select,
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
    name: 'Text Label Only',
    render: () => {
        const test = useRef<HTMLLIElement | null>(null);
        return (
            <Select>
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>

                <Select.Group groupId="testgroup">
                    <Select.Item>Group 1.1</Select.Item>
                    <Select.Item>Group 1.2</Select.Item>
                    <Select.Item>Group 1.3</Select.Item>
                </Select.Group>
                <Select.Group groupId="testgroup2">
                    <Select.Item>Group 2.1</Select.Item>
                    <Select.Item>Group 2.2</Select.Item>
                </Select.Group>
                <Select.Item>End1</Select.Item>
                <Select.Item>End2</Select.Item>
            </Select>
        );
    },
};
