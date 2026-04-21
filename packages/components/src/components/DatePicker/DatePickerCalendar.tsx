/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowLeft, IconArrowRight, IconCaretLeftDouble, IconCaretRightDouble } from '@frontify/fondue-icons';
import { addYears, subYears } from 'date-fns';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import {
    getDefaultClassNames,
    DayPicker,
    useDayPicker,
    type PreviousMonthButtonProps,
    type NextMonthButtonProps,
    type OnSelectHandler,
    type DateRange as InternalDayPickerDateRange,
    type CustomComponents,
    type Matcher,
    type DayButtonProps,
} from 'react-day-picker';
import 'react-day-picker/style.css';

import { Button } from '../Button/Button';
import { useFondueTheme } from '../ThemeProvider/ThemeProvider';

import { transformDisabledDates } from './helpers/dateTransformer';
import styles from './styles/datePickerCalendar.module.scss';
import { type DisabledDatePickerDates } from './types';

type DatePickerCalendarSingleModeProps = {
    mode: 'single';
    required: true;
    selected: Date | undefined;
    onSelect: OnSelectHandler<Date>;
};
type DatePickerCalendarRangeModeProps = {
    mode: 'range';
    required: true;
    selected: InternalDayPickerDateRange | undefined;
    onSelect: OnSelectHandler<InternalDayPickerDateRange>;
    modifiers?: Record<string, Matcher>;
    onDayMouseEnter?: (day: Date) => void;
    onDayMouseLeave?: (day: Date) => void;
};

type DatePickerCalendarModeProps = DatePickerCalendarSingleModeProps | DatePickerCalendarRangeModeProps;

export type DatePickerBaseProps = {
    /** The days to be disabled. */
    disabledDates?: DisabledDatePickerDates | DisabledDatePickerDates[];
    /** The test id applied to the wrapper and forwarded to DayPicker. */
    'data-test-id'?: string;
};

type DatePickerCalendarProps = DatePickerBaseProps & DatePickerCalendarModeProps;

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
    ({ 'data-test-id': dataTestId = 'fondue-date-picker-calendar', disabledDates, ...modeProps }, ref): JSX.Element => {
        const defaultClassNames = getDefaultClassNames();
        const {
            dir,
            translations: { dateLocale },
        } = useFondueTheme();

        const transformedDisabledDates = useMemo(() => transformDisabledDates(disabledDates), [disabledDates]);

        const defaultMonth = useMemo(() => {
            if (modeProps.mode === 'single') {
                return modeProps.selected;
            }
            return modeProps.selected?.from;
        }, [modeProps]);

        return (
            <div ref={ref} data-test-id={dataTestId} className={styles.wrapper}>
                <DayPicker
                    navLayout="around"
                    data-test-id={dataTestId}
                    locale={dateLocale}
                    components={getCustomComponents()}
                    showOutsideDays
                    disabled={transformedDisabledDates}
                    defaultMonth={defaultMonth}
                    dir={dir}
                    classNames={{
                        root: `${defaultClassNames.root} ${styles.root}`,
                        day: `${styles.day}`,
                        selected: `${styles.selected}`,
                        week: `${defaultClassNames.week} ${styles.week}`,
                        weekday: `${styles.weekday}`,
                        weekdays: `${defaultClassNames.weekdays} ${styles.weekdays}`,
                        range_start: `${styles.selectedStart}`,
                        range_end: `${styles.selectedEnd}`,
                        range_middle: `${styles.selectedMiddle}`,
                        disabled: `${styles.disabled}`,
                        outside: `${styles.outside}`,
                    }}
                    {...modeProps}
                    modifiersClassNames={{
                        hoverAfter: `${styles.hoverAfter}`,
                        hoverBefore: `${styles.hoverBefore}`,
                        hoverSelected: `${styles.hoverSelected}`,
                    }}
                />
            </div>
        );
    },
);
DatePickerCalendar.displayName = 'DatePickerCalendar';

const getCustomComponents = (): Partial<CustomComponents> => ({
    DayButton: ({ day, modifiers, onClick, onMouseEnter, onMouseLeave, ...props }: DayButtonProps): JSX.Element => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        useEffect(() => {
            if (modifiers.focused) {
                buttonRef.current?.focus();
            }
        }, [modifiers.focused]);

        return (
            <button
                {...props}
                ref={buttonRef}
                className={styles.dayButton}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                type="button"
            >
                <div className={styles.dayContent}>{day.date.getDate()}</div>
            </button>
        );
    },
    PreviousMonthButton: ({
        onClick,
        'aria-label': ariaLabel,
        'aria-disabled': ariaDisabled,
    }: PreviousMonthButtonProps): JSX.Element => {
        const { months, goToMonth, previousMonth } = useDayPicker();
        const currentMonth = months[0]?.date;
        const isYearDisabled = !previousMonth;
        return (
            <div className={`${styles.toggleMonthButtonContainer} ${styles.previousMonthButtonContainer}`}>
                <Button
                    emphasis="weak"
                    size="small"
                    aspect="square"
                    aria-label="Go to the Previous Year"
                    aria-disabled={isYearDisabled}
                    onPress={() => {
                        if (currentMonth && !isYearDisabled) {
                            goToMonth(subYears(currentMonth, 1));
                        }
                    }}
                >
                    <IconCaretLeftDouble size={16} />
                </Button>
                <Button
                    emphasis="weak"
                    size="small"
                    aspect="square"
                    aria-label={ariaLabel}
                    aria-disabled={ariaDisabled}
                    onPress={(event) => {
                        if (event) {
                            onClick?.(event);
                        }
                    }}
                >
                    <IconArrowLeft size={16} />
                </Button>
            </div>
        );
    },
    NextMonthButton: ({
        onClick,
        'aria-label': ariaLabel,
        'aria-disabled': ariaDisabled,
    }: NextMonthButtonProps): JSX.Element => {
        const { months, goToMonth, nextMonth } = useDayPicker();
        const currentMonth = months[0]?.date;
        const isYearDisabled = !nextMonth;
        return (
            <div className={`${styles.toggleMonthButtonContainer} ${styles.nextMonthButtonContainer}`}>
                <Button
                    emphasis="weak"
                    size="small"
                    aspect="square"
                    aria-label={ariaLabel}
                    aria-disabled={ariaDisabled}
                    onPress={(event) => {
                        if (event) {
                            onClick?.(event);
                        }
                    }}
                >
                    <IconArrowRight size={16} />
                </Button>
                <Button
                    emphasis="weak"
                    size="small"
                    aspect="square"
                    aria-label="Go to the Next Year"
                    aria-disabled={isYearDisabled}
                    onPress={() => {
                        if (currentMonth && !isYearDisabled) {
                            goToMonth(addYears(currentMonth, 1));
                        }
                    }}
                >
                    <IconCaretRightDouble size={16} />
                </Button>
            </div>
        );
    },
});
