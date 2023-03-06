/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DatePicker, DatePickerProps } from './DatePicker';
import { FormControl } from '@components/FormControl';
import { Slider } from '@components/Slider';
import { Validation } from '@utilities/validation';
import { intlFormat, subDays } from 'date-fns';
import { IconCalendar16 } from '@foundation/Icon/Generated';
import { Badge, BadgeEmphasis, BadgeStyle } from '..';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    argTypes: {
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
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
            <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                <FormControl>
                    <Slider
                        activeItemId="a"
                        items={[
                            { id: 'a', value: 'abc' },
                            { id: 'b', value: 'def' },
                            { id: 'c', value: 'ghi' },
                        ]}
                        onChange={() => void 0}
                    />
                </FormControl>
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    dateFormat: 'dd MMM yyyy',
};

Default.storyName = 'Date Picker';

export const InsideFormControlAndOverSlider = TemplateWithFormControl.bind({});
InsideFormControlAndOverSlider.args = {
    placeHolder: 'Select a date',
    isClearable: true,
    shouldCloseOnSelect: true,
    dateFormat: 'dd MMM yyyy',
};

const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' } as const;

const TemplateDateRange: StoryFn<DatePickerProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 5));
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const onChange = (dates: [Date | null, Date | null] | null) => {
        if (!dates) {
            return;
        }
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <DatePicker
            value={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
            onBlur={() => console.log('blur')}
            minDate={subDays(new Date(), 40)}
            maxDate={new Date()}
            variant="range"
            customTrigger={
                <button className="tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2">
                    <IconCalendar16 />
                    Date:
                    <Badge style={BadgeStyle.Progress} emphasis={BadgeEmphasis.Strong} size="small">
                        {intlFormat(startDate || new Date(), formatOptions)} -{' '}
                        {intlFormat(endDate || new Date(), formatOptions)}
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
