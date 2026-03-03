/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

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
        return <ForwardedRefDatePickerInput {...args} />;
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
        return <ForwardedRefDatePickerInput {...args} />;
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
        return <ForwardedRefDatePickerInput {...args} />;
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
        return <ForwardedRefDatePickerInput {...args} />;
    },
};

export const Clearable: Story = {
    args: {
        onClear: action('onClear'),
    },
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} />;
    },
};

export const Empty: Story = {
    args: {},
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} />;
    },
};

export const Disabled: Story = {
    args: {},
    render: (args) => {
        return <ForwardedRefDatePickerInput {...args} disabled />;
    },
};
