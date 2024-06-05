/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Select, SelectWrapper } from './SelectWrapper';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof SelectWrapper> = {
    component: SelectWrapper,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        isSearchable: false,
    },
};
export default meta;

export const Default: Story = {
    name: 'Text Label Only',
    render: (args) => {
        const testRef = useRef<HTMLLIElement>(null);
        return (
            <Select.Root {...args}>
                <Select.Item ref={testRef}>Test1</Select.Item>
                <Select.Item value="bla2" label="test2">
                    Test2
                </Select.Item>
                <Select.Group groupId="testgroup">
                    <Select.Item>Tes3</Select.Item>
                    <Select.Item value="bla3" label="test3">
                        Test4
                    </Select.Item>
                </Select.Group>
            </Select.Root>
        );
    },
};
