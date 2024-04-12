/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext } from 'react';

import { isBandScale } from '@components/BarChart';

type BandwidthAdjusterProps = {
    horizontal: boolean;
};

export const BandwidthAdjuster = ({ horizontal }: BandwidthAdjusterProps) => {
    const dataContext = useContext(DataContext);
    const { xScale, yScale } = dataContext;

    const bandScale = horizontal ? yScale : xScale;
    if (bandScale && isBandScale(bandScale)) {
        const bandWidth = bandScale.bandwidth();
        if (bandWidth > 50) {
            const [range0, range1] = bandScale.range();
            const n = bandScale.domain().length;

            const step = Math.abs((range1 - range0) / n);
            const paddingInner = (step - 50) / step;
            bandScale.paddingInner(paddingInner);
            bandScale.paddingOuter(paddingInner / 2);
        }
    }

    return null;
};
