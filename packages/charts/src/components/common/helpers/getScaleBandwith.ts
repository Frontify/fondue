/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale } from '@visx/axis';

// As we can't import from sub folder, we inlined the function here
// https://github.com/airbnb/visx/blob/master/packages/visx-xychart/src/utils/getScaleBandwidth.ts
export const getScaleBandwidth = <Scale extends AxisScale>(scale?: Scale) => {
    // Broaden type before using 'xxx' in s as typeguard.
    const s = scale as AxisScale;
    return s && 'bandwidth' in s ? s?.bandwidth() ?? 0 : 0;
};
