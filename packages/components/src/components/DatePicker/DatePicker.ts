/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRefRangeDatePicker } from './RangeDatePicker';
import { ForwardedRefSingleDatePicker } from './SingleDatePicker';

// @ts-expect-error We support both single component (without slots) and compound components (with slots)

export const DatePicker: typeof ForwardedRefSingleDatePicker & {
    Range: typeof ForwardedRefRangeDatePicker;
} = ForwardedRefSingleDatePicker;
DatePicker.Range = ForwardedRefRangeDatePicker;
