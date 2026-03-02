/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ForwardedRefDatePickerInput, DatePickerInput } from './DatePickerInput';

type Story = StoryObj<typeof DatePickerInput>;
const meta: Meta<typeof DatePickerInput> = {
    title: 'Components/DatePicker/Input',
    component: DatePickerInput,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {
        currentDate: new Date('2026-02-11T00:00:00.000-08:00'),
    },
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} onClear={() => {}} />;
    },
};

export const Empty: Story = {
    args: {},
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} onClear={() => {}} />;
    },
};

export const Disabled: Story = {
    args: {},
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} disabled onClear={() => {}} />;
    },
};
