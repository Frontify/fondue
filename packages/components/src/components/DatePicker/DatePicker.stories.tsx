/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { useState } from 'storybook/internal/preview-api';

import { DatePicker } from './DatePicker';
import { type DateRange, RangeDatePicker } from './RangeDatePicker';
import { SingleDatePicker } from './SingleDatePicker';

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
        const defaultDate = new Date(2026, 1, 17);
        const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);
        const handleSelect = (date: Date) => {
            setSelectedDate(date);
            args.onSelect?.(date);
        };
        return <DatePicker {...args} selected={selectedDate} onSelect={handleSelect} />;
    },
};

export const RangeDate: StoryObj<typeof RangeDatePicker> = {
    args: {},
    render: () => {
        return <DatePicker.Range />;
    },
};

export const ControlledRangeDate: StoryObj<typeof RangeDatePicker> = {
    args: {},
    render: (args) => {
        const defaultDateRange = { from: new Date(2026, 1, 17), to: new Date(2026, 1, 24) };
        const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(defaultDateRange);

        const handleSelect = (dateRange: DateRange) => {
            setSelectedDateRange(dateRange);
            args.onSelect?.(dateRange);
        };
        return <DatePicker.Range {...args} selected={selectedDateRange} onSelect={handleSelect} />;
    },
};

export const DisabledIndividualDates: Story = {
    args: {
        disabledDates: [new Date(2026, 1, 17), new Date(2026, 1, 21), new Date(2026, 1, 25)],
    },
    render: (args) => {
        return <DatePicker {...args} />;
    },
};

export const DisabledDateRange: Story = {
    args: {
        disabledDates: [{ from: new Date(2026, 1, 17), to: new Date(2026, 1, 24) }],
    },
    render: (args) => {
        return <DatePicker {...args} />;
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
