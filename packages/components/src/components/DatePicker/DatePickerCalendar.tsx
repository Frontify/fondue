/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowLeft, IconArrowRight } from '@frontify/fondue-icons';
import { forwardRef } from 'react';
import {
    getDefaultClassNames,
    DayPicker,
    type PreviousMonthButtonProps,
    type OnSelectHandler,
    type DateRange as DayPickerDateRange,
    type CustomComponents,
} from 'react-day-picker';
import 'react-day-picker/style.css';
import { type Locale } from 'react-day-picker/locale';

import { Button } from '../Button/Button';

import styles from './styles/datePickerCalendar.module.scss';

type DatePickerCalendarModeProps =
    | { mode: 'single'; required: true; selected: Date | undefined; onSelect: OnSelectHandler<Date> }
    | {
          mode: 'range';
          required: true;
          selected: DayPickerDateRange | undefined;
          onSelect: OnSelectHandler<DayPickerDateRange>;
      };

type DisabledDates =
    | {
          from: Date;
          to: Date;
      }
    | { before: Date }
    | { after: Date };

export type DatePickerBaseProps = {
    /** The test id applied to the wrapper and forwarded to DayPicker. */
    'data-test-id'?: string;
    /** The locale used to format the dates. */
    locale?: Locale;
    /** The days to be disabled. */
    disabledDates?: DisabledDates[];
};

type DatePickerCalendarProps = DatePickerBaseProps & DatePickerCalendarModeProps;

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
    (
        { 'data-test-id': dataTestId = 'fondue-date-picker-calendar', locale, disabledDates, ...modeProps },
        ref,
    ): JSX.Element => {
        const defaultClassNames = getDefaultClassNames();
        console.log('disabledDates', disabledDates);

        return (
            <div ref={ref} data-test-id={dataTestId}>
                <DayPicker
                    navLayout="around"
                    data-test-id={dataTestId}
                    locale={locale}
                    components={getCustomComponents()}
                    showOutsideDays
                    disabled={disabledDates}
                    classNames={{
                        day: ` ${styles.day} ${styles.button}`,
                        day_button: `${styles.button} ${styles.dayButton}`,
                        selected: styles.selected,
                        week: `${defaultClassNames.week} ${styles.week}`,
                        weekday: styles.weekday,
                        weekdays: `${defaultClassNames.weekdays} ${styles.weekdays}`,
                        range_start: styles.rangeStart,
                        range_end: styles.rangeEnd,
                        range_middle: styles.rangeMiddle,
                    }}
                    {...modeProps}
                />
            </div>
        );
    },
);
DatePickerCalendar.displayName = 'DatePickerCalendar';

const getCustomComponents = (): Partial<CustomComponents> => ({
    PreviousMonthButton: ({
        onClick,
        'aria-label': ariaLabel,
        'aria-disabled': ariaDisabled,
    }: PreviousMonthButtonProps): JSX.Element => {
        return (
            <div className={`${styles.toggleMonthButtonContainer} `}>
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
    }: PreviousMonthButtonProps): JSX.Element => {
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
            </div>
        );
    },
});
