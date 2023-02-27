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

type SingleDatePickerProps = {
    variant?: 'single';
    onChange: (date: Date | null) => void;
    startDate?: null;
    endDate?: null;
};

type RangeDatePickerProps = {
    variant: 'range';
    onChange: (date: [Date | null, Date | null] | null) => void;
    startDate: Date | null;
    endDate: Date | null;
};

export type DatePickerProps = {
    placeHolder?: string;
    isClearable?: boolean;
    shouldCloseOnSelect?: boolean;
    dateFormat?: string;
    /** @description when the variant is of type 'range', the value should be the startDate */
    value?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    validation?: Validation;
    customTrigger?: React.ReactNode;
    children?: React.ReactNode;
    hasPopperArrow?: boolean;
    filterDate?: (date: Date) => boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onBlur?: () => void;
} & (SingleDatePickerProps | RangeDatePickerProps);

const getDayClasses = (variant: DatePickerProps['variant'], date: Date) => {
    if (variant === 'single') {
        return date < new Date() ? 'past-date' : 'future-date';
    }
    return 'range-day';
};

export const DatePicker: FC<DatePickerProps> = ({
    placeHolder = 'Select a date',
    isClearable,
    shouldCloseOnSelect,
    onChange,
    onOpen,
    onClose,
    onBlur,
    dateFormat = 'dd MMM yyyy',
    value,
    startDate,
    endDate,
    minDate,
    maxDate,
    validation = Validation.Default,
    customTrigger,
    children = <></>,
    hasPopperArrow = true,
    filterDate = () => true,
    variant = 'single',
}) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsCalendarOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setIsCalendarOpen(false);
        onClose?.();
    };

    return (
        <div data-test-id="date-picker">
            <DatepickerComponent
                calendarClassName="tw-rounded-sm tw-border tw-border-line-x-strong react-datepicker-wrap"
                selected={value}
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                calendarStartDay={1}
                onChange={onChange}
                onBlur={onBlur}
                selectsRange={variant === 'range' ? true : false}
                showPopperArrow={hasPopperArrow}
                filterDate={filterDate}
                customInput={
                    customTrigger ?? (
                        <DatePickerTrigger
                            isCalendarOpen={isCalendarOpen}
                            isClearable={isClearable}
                            placeHolder={placeHolder}
                            validation={validation}
                            onDateChanged={onChange}
                        />
                    )
                }
                formatWeekDay={(day) => day.slice(0, 1)}
                isClearable={isClearable}
                dateFormat={dateFormat}
                onCalendarClose={handleClose}
                onCalendarOpen={handleOpen}
                shouldCloseOnSelect={shouldCloseOnSelect}
                dayClassName={(date) => getDayClasses(variant, date)}
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
            >
                {children}
            </DatepickerComponent>
        </div>
    );
};
DatePicker.displayName = 'FondueDatePicker';
