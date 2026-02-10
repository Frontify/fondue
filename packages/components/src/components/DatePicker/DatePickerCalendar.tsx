/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';
import {
    getDefaultClassNames,
    type DayButtonProps,
    DayPicker,
    type PreviousMonthButtonProps,
    type OnSelectHandler,
    type DateRange as DayPickerDateRange,
    type CustomComponents,
} from 'react-day-picker';
import 'react-day-picker/style.css';
import { type Locale } from 'react-day-picker/locale';

import styles from './styles/datePickerCalendar.module.scss';

import { IconArrowLeft, IconCaretLeft, IconCaretRight } from '@frontify/fondue-icons';

type DatePickerCalendarModeProps =
    | { mode: 'single'; required: true; selected: Date | undefined; onSelect: OnSelectHandler<Date> }
    | {
          mode: 'range';
          required: true;
          selected: DayPickerDateRange | undefined;
          onSelect: OnSelectHandler<DayPickerDateRange>;
      };

export type DatePickerCalendarProps = {
    /** The test id applied to the wrapper and forwarded to DayPicker. */
    'data-test-id'?: string;
    /** The locale used to format the dates. */
    locale?: Locale;
} & DatePickerCalendarModeProps;

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
    ({ 'data-test-id': dataTestId = 'fondue-date-picker-calendar', locale, ...modeProps }, ref): JSX.Element => {
        const defaultClassNames = getDefaultClassNames();
        return (
            <div ref={ref} data-test-id={dataTestId}>
                <DayPicker
                    navLayout="around"
                    data-test-id={dataTestId}
                    locale={locale}
                    components={getCustomComponents(locale)}
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

const getCustomComponents = (locale?: Locale): Partial<CustomComponents> => ({
    // DayButton: ({ day, modifiers, ...props }: DayButtonProps): JSX.Element => {
    //     return (
    //         <button
    //             {...props}
    //             type="button"
    //             className={`${styles.button} ${styles.dayButton}`}
    //             data-active={modifiers.selected}
    //             data-today={modifiers.today}
    //         >
    //             <span>{day.date.toLocaleDateString(locale?.code, { day: 'numeric' })}</span>
    //         </button>
    //     );
    // },
    PreviousMonthButton: ({ ...props }: PreviousMonthButtonProps): JSX.Element => {
        return (
            <div className={styles.toggleMonthButtonContainer}>
                <button {...props} type="button" className={`${styles.button} ${styles.toggleMonthButton}`}>
                    <IconCaretLeft size={20} />
                </button>
            </div>
        );
    },
    NextMonthButton: ({ ...props }: PreviousMonthButtonProps): JSX.Element => {
        return (
            <div className={`${styles.toggleMonthButtonContainer} ${styles.nextMonthButtonContainer}`}>
                <button {...props} type="button" className={`${styles.button} ${styles.toggleMonthButton}`}>
                    <IconCaretRight size={20} />
                </button>
            </div>
        );
    },
});
