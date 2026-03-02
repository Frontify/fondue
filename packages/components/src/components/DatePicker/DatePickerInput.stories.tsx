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

export const SingleDate: Story = {
    args: {
        selected: {
            year: 2026,
            month: 2,
            day: 11,
        },
    },
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} onClear={() => {}} />;
    },
};

export const DateRangeSameMonth: Story = {
    args: {
        selected: {
            from: {
                year: 2026,
                month: 2,
                day: 11,
            },
            to: {
                year: 2026,
                month: 2,
                day: 16,
            },
        },
    },
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} onClear={() => {}} />;
    },
};

export const DateRangeDifferentMonth: Story = {
    args: {
        selected: {
            from: {
                year: 2026,
                month: 2,
                day: 11,
            },
            to: {
                year: 2026,
                month: 3,
                day: 16,
            },
        },
    },
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} onClear={() => {}} />;
    },
};

export const DateRangeDifferentYear: Story = {
    args: {
        selected: {
            from: {
                year: 2026,
                month: 2,
                day: 11,
            },

            to: {
                year: 2027,
                month: 3,
                day: 16,
            },
        },
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
