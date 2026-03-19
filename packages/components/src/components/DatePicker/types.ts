/* (c) Copyright Frontify Ltd., all rights reserved. */

export type DatePickerDate =
    | {
          year: number;
          month: number;
          day: number;
      }
    | undefined;

export type DatePickerDateRange =
    | {
          from: DatePickerDate;
          to: DatePickerDate;
      }
    | undefined;

export type DisabledDatePickerDates = { before: DatePickerDate } | { after: DatePickerDate };
