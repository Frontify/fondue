/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale } from '@visx/xychart';

import { isBandScale } from '@components/BarChart/types';

export const getBandScaleColumnWidth = (scale?: AxisScale) => {
    if (scale && isBandScale(scale)) {
        const bandwidth = scale.bandwidth();
        const padding = scale.paddingInner();

        return bandwidth * (1 + padding);
    }

    return 0;
};
