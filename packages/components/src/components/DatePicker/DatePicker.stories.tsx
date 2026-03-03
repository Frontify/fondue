/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { useState } from 'storybook/internal/preview-api';

import { Button } from '../Button/Button';
import { Flyout } from '../Flyout/Flyout';

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
        onChange: action('onChange'),
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
        const handleChange = (date: DatePickerDate) => {
            setSelectedDate(date);
            args.onChange?.(date);
        };
        return <DatePicker {...args} selected={selectedDate} onChange={handleChange} />;
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

        const handleChange = (dateRange: DatePickerDateRange) => {
            setSelectedDateRange(dateRange);
            args.onChange?.(dateRange);
        };
        return <DatePicker.Range {...args} selected={selectedDateRange} onChange={handleChange} />;
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

export const InFlyout: Story = {
    args: {},
    render: () => {
        const [savedDateRange, setSavedDateRange] = useState<DatePickerDateRange | undefined>(undefined);
        const [selectedDate, setSelectedDate] = useState<DatePickerDateRange | undefined>(undefined);
        const [isOpen, setIsOpen] = useState(true);
        return (
            <div className="tw-w-64">
                <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Flyout.Trigger>
                        <DatePicker.Input
                            aria-label="Date Picker"
                            selected={savedDateRange}
                            isOpen={isOpen}
                            onClear={() => {
                                setSavedDateRange(undefined);
                                setSelectedDate(undefined);
                            }}
                        />
                    </Flyout.Trigger>
                    <Flyout.Content>
                        <Flyout.Body>
                            <DatePicker.Range
                                selected={selectedDate}
                                onChange={(dateRange) => {
                                    setSelectedDate(dateRange);
                                }}
                            />
                        </Flyout.Body>
                        <Flyout.Footer>
                            <Button
                                emphasis="default"
                                onPress={() => {
                                    setIsOpen(false);
                                    setSelectedDate(savedDateRange);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setIsOpen(false);
                                    setSavedDateRange(selectedDate);
                                }}
                            >
                                Save
                            </Button>
                        </Flyout.Footer>
                    </Flyout.Content>
                </Flyout.Root>
            </div>
        );
    },
};
