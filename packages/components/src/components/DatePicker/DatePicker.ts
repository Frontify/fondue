/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRefRangeDatePicker } from './RangeDatePicker';
import { ForwardedRefSingleDatePicker } from './SingleDatePicker';

// type DatePickerSingleProps = {
//     testId?: string;
// } & DatePickerBaseProps;

// export const DatePickerSingle = (
//     { 'data-test-id': dataTestId = 'fondue-date-picker', ...props }: DatePickerSingleProps,
//     ref: ForwardedRef<HTMLDivElement>,
// ): JSX.Element => {
//     const [selectedDate, setSelectedDate] = useState<Date>();

//     return (
//         <div ref={ref} data-test-id={dataTestId}>
//             <SingleDatePicker {...props} selected={selectedDate} onSelect={setSelectedDate} />
//         </div>
//     );
// };
// DatePickerSingle.displayName = 'DatePickerSingle';
// const ForwardedRefDatePickerSingle = forwardRef<HTMLDivElement, DatePickerSingleProps>(DatePickerSingle);

// type DatePickerRangeProps = {
//     testId?: string;
// } & RangeDatePickerProps;

// export const DatePickerRange = (
//     { 'data-test-id': dataTestId = 'fondue-date-picker', ...props }: DatePickerRangeProps,
//     ref: ForwardedRef<HTMLDivElement>,
// ): JSX.Element => {
//     const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();

//     return (
//         <div ref={ref} data-test-id={dataTestId}>
//             <RangeDatePicker {...props} selected={selectedDateRange} onSelect={setSelectedDateRange} />
//         </div>
//     );
// };
// DatePickerRange.displayName = 'DatePickerRange';
// const ForwardedRefDatePickerRange = forwardRef<HTMLDivElement, DatePickerRangeProps>(DatePickerRange);

// @ts-expect-error We support both single component (without slots) and compound components (with slots)

export const DatePicker: typeof ForwardedRefSingleDatePicker & {
    Range: typeof ForwardedRefRangeDatePicker;
} = ForwardedRefSingleDatePicker;
DatePicker.Range = ForwardedRefRangeDatePicker;
