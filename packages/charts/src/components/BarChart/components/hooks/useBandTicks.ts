/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext } from '@visx/xychart';
import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const useBandTicks = (horizontal: boolean, updateBandTicks: Dispatch<SetStateAction<string[]>>) => {
    const [filteredTicks, setFilteredTicks] = useState<string[]>([]);
    const dataContext = useContext(DataContext);
    const { xScale, yScale } = dataContext;

    const scale = horizontal ? yScale : xScale;
    const ticksJSON = scale ? JSON.stringify(scale.domain()) : null;
    const chartWidth = dataContext?.innerWidth ?? null;
    const chartHeight = dataContext?.innerHeight ?? null;

    useEffect(() => {
        const chartSize = horizontal ? chartHeight : chartWidth;
        if (chartSize && ticksJSON) {
            let ticks: string[] = JSON.parse(ticksJSON);

            let pxPerTick = chartSize / ticks.length;

            while (pxPerTick < 15 && ticks.length > 1) {
                ticks = ticks.filter((_, index) => index % 2 === 0);
                pxPerTick = chartSize / ticks.length;
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFilteredTicks(ticks);
            updateBandTicks(ticks);
        }
    }, [chartWidth, chartHeight, horizontal, updateBandTicks, ticksJSON]);

    return filteredTicks;
};
