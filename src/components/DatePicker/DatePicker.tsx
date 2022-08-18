/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonPreset, ButtonSize, Solid } from '@components/Button';
import { IconSize } from '@foundation/Icon/IconSize';
import { format, getYear } from 'date-fns';
import React, { FC, useState } from 'react';
import DatepickerComponent from 'react-datepicker';
import './DatePicker.css';
import { DatePickerTrigger } from './DatePickerTrigger';
import { IconCaretLeft, IconCaretLeftDouble, IconCaretRight, IconCaretRightDouble } from '@foundation/Icon';

export type DatePickerProps = {
    placeHolder?: string;
    isClearable?: boolean;
    shouldCloseOnSelect?: boolean;
    onChange?: (date: Date | null) => void;
    dateFormat?: string;
    value?: Date;
};

export const DatePicker: FC<DatePickerProps> = ({
    placeHolder = 'Select a date',
    isClearable,
    shouldCloseOnSelect,
    onChange,
    dateFormat = 'MM/dd/yyyy',
    value,
}) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const onDateChanged = (date: Date | null) => {
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div data-test-id="date-picker">
            <DatepickerComponent
                calendarClassName="tw-shadow-mid tw-rounded-sm tw-border-slate-200 react-datepicker-wrap"
                selected={value}
                onChange={onDateChanged}
                customInput={
                    <DatePickerTrigger
                        isCalendarOpen={isCalendarOpen}
                        isClearable={isClearable}
                        placeHolder={placeHolder}
                    />
                }
                formatWeekDay={(day) => day.slice(0, 1)}
                isClearable={isClearable}
                dateFormat={dateFormat}
                onCalendarClose={() => setIsCalendarOpen(false)}
                onCalendarOpen={() => setIsCalendarOpen(true)}
                shouldCloseOnSelect={shouldCloseOnSelect}
                dayClassName={(date) => (date < new Date() ? 'past-date' : 'future-date')}
                renderCustomHeader={({ date, decreaseMonth, increaseMonth, increaseYear, decreaseYear }) => (
                    <div className="tw-flex tw-justify-between tw-pb-4 tw-px-0">
                        <Button
                            {...ButtonPreset.secondary}
                            size={ButtonSize.Medium}
                            onClick={decreaseYear}
                            solid={Solid.empty}
                            icon={<IconCaretLeftDouble size={IconSize.Size20} />}
                        />
                        <Button
                            {...ButtonPreset.secondary}
                            size={ButtonSize.Medium}
                            onClick={decreaseMonth}
                            solid={Solid.empty}
                            icon={<IconCaretLeft size={IconSize.Size20} />}
                        />
                        <p className="tw-font-sans tw-font-semibold tw-grow tw-self-center">
                            {format(date, 'MMMM')} {getYear(date)}
                        </p>
                        <Button
                            {...ButtonPreset.secondary}
                            size={ButtonSize.Medium}
                            onClick={increaseMonth}
                            solid={Solid.empty}
                            icon={<IconCaretRight size={IconSize.Size20} />}
                        />
                        <Button
                            {...ButtonPreset.secondary}
                            size={ButtonSize.Medium}
                            onClick={increaseYear}
                            solid={Solid.empty}
                            icon={<IconCaretRightDouble size={IconSize.Size20} />}
                        />
                    </div>
                )}
            />
        </div>
    );
};
