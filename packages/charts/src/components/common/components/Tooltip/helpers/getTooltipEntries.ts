/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { getDataPointValue } from '@components/common/components/Tooltip/helpers/getDataPointValue';
import { isNoDataKey } from '@components/common/components/Tooltip/helpers/isNoDataKey';
import { type ValueFormatter } from '@components/common/types';
import { type TooltipDatum } from '@visx/xychart/lib/types/tooltip';

export const getTooltipEntries = (
    missingValueLabel: string,
    colorAccessor: (key: string) => string | undefined,
    valueFormatter?: ValueFormatter,
    datumByKey?: {
        [key: string]: TooltipDatum<LineChartDataPoint | BarChartDataPoint>;
    },
    childSumLabel?: string,
) => {
    const dataPoints = [];
    let sum = 0;

    if (datumByKey) {
        for (const key of Object.keys(datumByKey)) {
            if (isNoDataKey(key)) {
                continue;
            }

            if (childSumLabel) {
                sum += datumByKey[key]?.datum.value || 0;
            }

            dataPoints.push({
                title: key,
                value: getDataPointValue(missingValueLabel, datumByKey[key]?.datum.value, valueFormatter),
                color: colorAccessor(key),
                ...(datumByKey[key]?.datum.valueContext ? { valueContext: datumByKey[key]?.datum.valueContext } : {}),
            });
        }
    }

    if (childSumLabel) {
        return [
            ...dataPoints,
            {
                title: childSumLabel,
                value: getDataPointValue(missingValueLabel, sum, valueFormatter),
                color: '',
            },
        ];
    }

    return dataPoints;
};
