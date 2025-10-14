/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { addDays, subDays } from 'date-fns';
import { useRef, useState } from 'react';

import { Badge } from '@components/Badge/Badge';
import { BadgeEmphasis, BadgeStyle } from '@components/Badge/types';
import { Button } from '@components/Button/Button';
import { FormControl } from '@components/FormControl';
import IconCalendar16 from '@foundation/Icon/Generated/IconCalendar16';
import { Validation } from '@utilities/validation';

import { DatePicker, type DatePickerProps, type ReactDatePickerRef } from './DatePicker';

/**
 ### *Legacy component warning*
 #### This is a unmaintained legacy component. It will be deprecated and replaced with a new component in an upcoming release.
 */
export default {
    title: 'Legacy Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    args: {
        dateFormat: 'MMM dd, yyyy',
    },
    argTypes: {
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        isClearable: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        shouldCloseOnSelect: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        hasPopperArrow: {
            defaultValue: true,
            control: { type: 'boolean' },
        },
        preventOpenOnFocus: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        inline: {
            defaultValue: false,
            control: { type: 'boolean' },
        },
        fixedHeight: {
            defaultValue: true,
            control: { type: 'boolean' },
        },
        hugWidth: {
            defaultValue: true,
            control: { type: 'boolean' },
        },
    },
} as Meta<DatePickerProps>;

const Template: StoryFn<DatePickerProps> = (args: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return (
        <DatePicker
            {...args}
            variant="single"
            startDate={null}
            endDate={null}
            value={selectedDate as Date}
            onChange={(date) => setSelectedDate(date)}
        />
    );
};

const TemplateWithFormControl: StoryFn<DatePickerProps> = (args: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return (
        <div className="tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-row tw-justify-between">
                <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                    <FormControl>
                        <DatePicker
                            {...args}
                            variant="single"
                            startDate={null}
                            endDate={null}
                            value={selectedDate as Date}
                            onChange={(date) => setSelectedDate(date)}
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
};

Default.storyName = 'Date Picker';

export const DatePickerWithCustomHeader = Template.bind({});
DatePickerWithCustomHeader.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    customHeader: (
        <div className="tw-flex tw-gap-2 tw-grow">
            <Button hugWidth={false}>30d</Button>
            <Button hugWidth={false}>90d</Button>
            <Button hugWidth={false}>365d</Button>
        </div>
    ),
};

DatePickerWithCustomHeader.storyName = 'Date Picker with custom header';

export const DatePickerWithMinAndMaxDates = Template.bind({});
DatePickerWithMinAndMaxDates.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    minDate: subDays(new Date(), 5),
    maxDate: addDays(new Date(), 5),
};

export const InsideFormControlAndOverSegmentedControls = TemplateWithFormControl.bind({});
InsideFormControlAndOverSegmentedControls.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
};

const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' } as const;

const TemplateDateRange: StoryFn<DatePickerProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 40));
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const onChange = (dates: [Date | null, Date | null] | null) => {
        if (!dates) {
            return;
        }
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const datePickerRef = useRef<ReactDatePickerRef>(null);

    return (
        <DatePicker
            value={endDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            onOpen={() => {
                (datePickerRef.current as any)?.setPreSelection(new Date());
            }}
            onClose={() => console.log('close')}
            onBlur={() => console.log('blur')}
            minDate={subDays(new Date(), 40)}
            maxDate={new Date()}
            variant="range"
            ref={datePickerRef}
            onKeyDown={(e) => {
                if (e.code === 'Tab' && e.shiftKey) {
                    datePickerRef.current?.setOpen(false);
                }
            }}
            preventOpenOnFocus
            customTrigger={
                <button
                    type="button"
                    className="tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2"
                >
                    <IconCalendar16 />
                    Date:
                    <Badge style={BadgeStyle.Progress} emphasis={BadgeEmphasis.Strong} size="small">
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(startDate || new Date())} -{' '}
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(endDate || new Date())}
                    </Badge>
                </button>
            }
            hasPopperArrow={false}
        >
            {startDate && endDate && (
                <div>
                    <div className="tw-border-t tw-w-full tw-border-solid tw-border-line" />
                    <div className="tw-p-2">
                        <button
                            type="button"
                            className="tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </DatePicker>
    );
};

export const DateRange = TemplateDateRange.bind({});

const WithWrapperDiv: StoryFn<DatePickerProps> = (args: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();

    return (
        <div className="tw-w-[500px]">
            <DatePicker
                {...args}
                variant="single"
                startDate={null}
                endDate={null}
                value={selectedDate as Date}
                onChange={(date) => setSelectedDate(date)}
            />
        </div>
    );
};
export const Inline = WithWrapperDiv.bind({});
Inline.args = {
    inline: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    hugWidth: false,
};

FullWidth.storyName = 'Full Width';
