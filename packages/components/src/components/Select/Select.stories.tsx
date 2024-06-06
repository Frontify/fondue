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
            <Select.Combobox defaultItem={{ value: 'bla2', label: 'test2' }}>
                <Select.Item ref={test}>Test1</Select.Item>
                <Select.Item value="bla2" label="test2">
                    Test2
                </Select.Item>

                <Select.Group groupId="testgroup">
                    <Select.Item>Tes3</Select.Item>
                    <Select.Item value="bla4" label="test4">
                        Test4
                    </Select.Item>
                </Select.Group>
            </Select.Combobox>
        );
    },
};
