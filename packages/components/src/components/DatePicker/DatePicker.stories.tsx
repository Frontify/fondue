/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { useState } from 'storybook/internal/preview-api';

import { DatePicker, type DatePickerDate } from './DatePicker';
import { RangeDatePicker } from './RangeDatePicker';
import { SingleDatePicker } from './SingleDatePicker';
import { type DatePickerDateRange } from './types';

type Story = StoryObj<typeof SingleDatePicker>;
const meta: Meta<typeof SingleDatePicker> = {
    title: 'Components/DatePicker',
    component: SingleDatePicker,
    subcomponents: {
        'DatePicker.Range': RangeDatePicker,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        onSelect: action('onSelect'),
    },
    render: (args) => {
        return <DatePicker {...args} />;
    },
};
export default meta;

export const SingleDate: Story = {
    args: {},
};

export const ControlledSingleDate: Story = {
    args: {},
    render: (args) => {
        const [selectedDate, setSelectedDate] = useState<DatePickerDate>({
            year: 2026,
            month: 1,
            day: 17,
        });
        const handleSelect = (date: DatePickerDate) => {
            setSelectedDate(date);
            args.onSelect?.(date);
        };
        return <DatePicker {...args} selected={selectedDate} onSelect={handleSelect} />;
    },
};

export const RangeDate: StoryObj<typeof RangeDatePicker> = {
    args: {},
    render: (args) => {
        return <DatePicker.Range {...args} />;
    },
};

export const ControlledRangeDate: StoryObj<typeof RangeDatePicker> = {
    args: {},
    render: (args) => {
        const defaultDateRange = { from: { year: 2026, month: 1, day: 17 }, to: { year: 2026, month: 1, day: 24 } };
        const [selectedDateRange, setSelectedDateRange] = useState<DatePickerDateRange | undefined>(defaultDateRange);

        const handleSelect = (dateRange: DatePickerDateRange) => {
            setSelectedDateRange(dateRange);
            args.onSelect?.(dateRange);
        };
        return <DatePicker.Range {...args} selected={selectedDateRange} onSelect={handleSelect} />;
    },
};

export const DisabledDatesBefore: Story = {
    args: {
        disabledDates: [{ before: new Date() }],
    },
    render: (args) => {
        return <DatePicker {...args} />;
    },
};

export const DisabledDatesAfter: Story = {
    args: {
        disabledDates: [{ after: new Date() }],
    },
    render: (args) => {
        return <DatePicker {...args} />;
    },
};
