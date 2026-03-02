/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRefDatePickerInput } from './DatePickerInput';
import { ForwardedRefRangeDatePicker } from './RangeDatePicker';
import { ForwardedRefSingleDatePicker } from './SingleDatePicker';

// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const DatePicker: typeof ForwardedRefSingleDatePicker & {
    Range: typeof ForwardedRefRangeDatePicker;
    Input: typeof ForwardedRefDatePickerInput;
} = ForwardedRefSingleDatePicker;
DatePicker.Range = ForwardedRefRangeDatePicker;
DatePicker.Input = ForwardedRefDatePickerInput;

export type { DatePickerDate, DatePickerDateRange } from './types';
