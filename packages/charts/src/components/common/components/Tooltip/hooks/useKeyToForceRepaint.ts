/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TooltipContext, type TooltipContextType } from '@visx/xychart';
import { useState, useContext, useEffect } from 'react';

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';

/**
 * Webkit sometimes does not handle the svg update
 * correctly, so we need to force a full repaint
 */
export const useKeyToForceRepaint = () => {
    const { tooltipLeft, tooltipTop } = useContext(TooltipContext) as TooltipContextType<
        LineChartDataPoint | BarChartDataPoint
    >;
    const [key, setKey] = useState<string>('');

    useEffect(() => {
        setKey(`${tooltipLeft}-${tooltipTop}`);
    }, [tooltipLeft, tooltipTop]);

    return key;
};
