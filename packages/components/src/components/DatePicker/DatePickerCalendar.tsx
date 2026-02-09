/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';
import { DayPicker, type OnSelectHandler, type DateRange as DayPickerDateRange } from 'react-day-picker';
import 'react-day-picker/style.css';

import styles from './styles/datePicker.module.scss';

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
} & DatePickerCalendarModeProps;

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
    ({ 'data-test-id': dataTestId = 'fondue-date-picker-calendar', ...modeProps }, ref): JSX.Element => {
        return (
            <div ref={ref} data-test-id={dataTestId}>
                <DayPicker navLayout="around" data-test-id={dataTestId} {...modeProps} />
            </div>
        );
    },
);
DatePickerCalendar.displayName = 'DatePickerCalendar';
