/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { IconSize } from '@foundation/Icon/IconSize';
import { format, getYear } from 'date-fns';
import React, { FC, useState } from 'react';
import DatepickerComponent from 'react-datepicker';
import './DatePicker.css';
import { DatePickerTrigger } from './DatePickerTrigger';
import { IconCaretLeft, IconCaretLeftDouble, IconCaretRight, IconCaretRightDouble } from '@foundation/Icon';
import { Validation } from '@utilities/validation';

export type DatePickerProps = {
    placeHolder?: string;
    isClearable?: boolean;
    shouldCloseOnSelect?: boolean;
    onChange?: (date: Date | null) => void;
    dateFormat?: string;
    value?: Date;
    validation?: Validation;
};

export const DatePicker: FC<DatePickerProps> = ({
    placeHolder = 'Select a date',
    isClearable,
    shouldCloseOnSelect,
    onChange,
    dateFormat = 'dd MMM yyyy',
    value,
    validation = Validation.Default,
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
                        validation={validation}
                        onDateChanged={onDateChanged}
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
                            style={ButtonStyle.Default}
                            size={ButtonSize.Medium}
                            onClick={decreaseYear}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconCaretLeftDouble size={IconSize.Size20} />}
                        />
                        <Button
                            style={ButtonStyle.Default}
                            size={ButtonSize.Medium}
                            onClick={decreaseMonth}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconCaretLeft size={IconSize.Size20} />}
                        />
                        <p className="tw-font-sans tw-font-semibold tw-grow tw-self-center">
                            {format(date, 'MMMM')} {getYear(date)}
                        </p>
                        <Button
                            style={ButtonStyle.Default}
                            size={ButtonSize.Medium}
                            onClick={increaseMonth}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconCaretRight size={IconSize.Size20} />}
                        />
                        <Button
                            style={ButtonStyle.Default}
                            size={ButtonSize.Medium}
                            onClick={increaseYear}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconCaretRightDouble size={IconSize.Size20} />}
                        />
                    </div>
                )}
            />
        </div>
    );
};
DatePicker.displayName = 'FondueDatePicker';
