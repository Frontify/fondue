/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { DatePickerRoot, DatePicker } from './DatePicker';

type Story = StoryObj<typeof DatePickerRoot>;
const meta: Meta<typeof DatePickerRoot> = {
    title: 'Components/DatePicker',
    component: DatePickerRoot,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
    render: (args) => {
        return <DatePicker {...args} />;
    },
};
export default meta;

export const Default: Story = {
    args: {},
};
