/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext, useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';

export const useBandTicks = (horizontal: boolean, updateBandTicks: Dispatch<SetStateAction<string[]>>) => {
    const dataContext = useContext(DataContext);
    const { xScale, yScale } = dataContext;

    const scale = horizontal ? yScale : xScale;
    const ticksJSON = scale ? JSON.stringify(scale.domain()) : null;
    const chartWidth = dataContext?.innerWidth ?? null;
    const chartHeight = dataContext?.innerHeight ?? null;

    const filteredTicks = useMemo(() => {
        const chartSize = horizontal ? chartHeight : chartWidth;
        if (chartSize && ticksJSON) {
            let ticks: string[] = JSON.parse(ticksJSON);

            let pxPerTick = chartSize / ticks.length;

            while (pxPerTick < 15 && ticks.length > 1) {
                ticks = ticks.filter((_, index) => index % 2 === 0);
                pxPerTick = chartSize / ticks.length;
            }
            return ticks;
        }
        return [];
    }, [chartWidth, chartHeight, horizontal, ticksJSON]);

    useEffect(() => {
        updateBandTicks(filteredTicks);
    }, [filteredTicks, updateBandTicks]);

    return filteredTicks;
};
