/* (c) Copyright Frontify Ltd., all rights reserved. */

import './styles.css';

import { offset, shift } from '@floating-ui/dom';
import { format, getYear } from 'date-fns';
import { forwardRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import ReactDatePicker from 'react-datepicker';
import { createPortal } from 'react-dom';

import { Button } from '@components/Button/Button';
import { ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button/ButtonTypes';
import IconCaretLeft from '@foundation/Icon/Generated/IconCaretLeft';
import IconCaretLeftDouble from '@foundation/Icon/Generated/IconCaretLeftDouble';
import IconCaretRight from '@foundation/Icon/Generated/IconCaretRight';
import IconCaretRightDouble from '@foundation/Icon/Generated/IconCaretRightDouble';
import { IconSize } from '@foundation/Icon/IconSize';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';

import { DatePickerTrigger } from './DatePickerTrigger';

// Needed because of https://github.com/Hacker0x01/react-datepicker/issues/3834
const ReactDatePickerComponent =
    (ReactDatePicker as unknown as { default: typeof ReactDatePicker }).default ?? ReactDatePicker;

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
    customTrigger?: ReactNode;
    customHeader?: ReactNode;
    children?: ReactNode;
    hasPopperArrow?: boolean;
    preventOpenOnFocus?: boolean;
    inline?: boolean;
    filterDate?: (date: Date) => boolean;
    fixedHeight?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onBlur?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    'data-test-id'?: string;
} & (SingleDatePickerProps | RangeDatePickerProps);

const getDayClasses = (variant: DatePickerProps['variant'], date: Date) => {
    if (variant === 'single') {
        return date < new Date() ? 'past-date' : 'future-date';
    }
    return 'range-day';
};

export type ReactDatePickerRef = ReactDatePicker<boolean, undefined>;

export const DatePicker = forwardRef<ReactDatePickerRef, DatePickerProps>(
    (
        {
            placeHolder = 'Select a date',
            isClearable,
            shouldCloseOnSelect,
            onChange,
            onOpen,
            onClose,
            onBlur,
            onKeyDown,
            dateFormat = 'MMM dd, yyyy',
            value,
            startDate,
            endDate,
            minDate,
            maxDate,
            validation = Validation.Default,
            customTrigger,
            customHeader,
            children,
            fixedHeight = true,
            hasPopperArrow = true,
            preventOpenOnFocus = false,
            inline = false,
            filterDate = () => true,
            variant = 'single',
            'data-test-id': dataTestId = 'date-picker',
        },
        ref,
    ) => {
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
            <div data-test-id={dataTestId}>
                <ReactDatePickerComponent
                    calendarClassName={merge([
                        'react-datepicker-wrap tw-pointer-events-auto',
                        inline && 'react-datepicker-inline',
                    ])}
                    inline={inline}
                    selected={value}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    calendarStartDay={1}
                    onChange={onChange}
                    onKeyDown={isCalendarOpen ? undefined : onKeyDown}
                    onBlur={onBlur}
                    selectsRange={variant === 'range'}
                    showPopperArrow={hasPopperArrow}
                    preventOpenOnFocus={preventOpenOnFocus}
                    filterDate={filterDate}
                    fixedHeight={fixedHeight}
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
                    ref={ref}
                    formatWeekDay={(day) => day.slice(0, 1)}
                    isClearable={isClearable}
                    dateFormat={dateFormat}
                    onCalendarClose={handleClose}
                    onCalendarOpen={handleOpen}
                    shouldCloseOnSelect={shouldCloseOnSelect}
                    dayClassName={(date) => getDayClasses(variant, date)}
                    popperProps={{
                        strategy: 'fixed',
                    }}
                    popperContainer={({ children }) => createPortal(children, document.body)}
                    popperModifiers={[shift({ padding: 8 }), offset(8)]}
                    renderCustomHeader={({ date, decreaseMonth, increaseMonth, increaseYear, decreaseYear }) => (
                        <div className="tw-flex tw-flex-col tw-gap-3">
                            {customHeader}
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
                        </div>
                    )}
                >
                    {children}
                </ReactDatePickerComponent>
            </div>
        );
    },
);

DatePicker.displayName = 'FondueDatePicker';
