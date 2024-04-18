/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale } from '@visx/xychart';

import { isBandScale } from '@components/BarChart/types';
import { getScaleBandwidth } from '@components/common/helpers/getScaleBandwith';

export const getCrosshairBarWidth = (
    horizontal: boolean,
    scalePadding: number,
    xScale?: AxisScale,
    yScale?: AxisScale,
) => {
    const bandScale = horizontal ? yScale : xScale;
    let multiplier;
    if (bandScale && isBandScale(bandScale)) {
        const paddingInner = bandScale.paddingInner();
        const paddingOuter = bandScale.paddingOuter();
        multiplier = 1 + paddingInner + paddingOuter;
    } else {
        multiplier = 1 + scalePadding;
    }
    return getScaleBandwidth(horizontal ? yScale : xScale) * multiplier;
};
