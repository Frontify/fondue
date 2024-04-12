/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LineChartDataPoint, type LineChartSeries } from '@components/LineChart/types';

const defined = (dataPoint: LineChartDataPoint) => dataPoint.value !== null && !Number.isNaN(dataPoint.value);

const interpolateMissingData = (missingData: LineChartDataPoint[][]): LineChartDataPoint[][] => {
    return missingData.map((dataPoints) => {
        const endValue = dataPoints.at(-1)?.value as number;
        const startValue = dataPoints[0]?.value ?? endValue;
        const diff = endValue - startValue;

        return dataPoints.map((dataPoint, index) => {
            const value = startValue + diff * (index / (dataPoints.length - 1));
            return { ...dataPoint, value };
        });
    });
};

const getMissingDataGroupsWithEdgePoints = (series: LineChartSeries): LineChartDataPoint[][] => {
    const missingDataGroups: LineChartDataPoint[][] = [];
    series.dataPoints.reduce<LineChartDataPoint[]>((group, dataPoint, index) => {
        if (!defined(dataPoint)) {
            // @ts-expect-error Wrong typing in the original code
            const isPreviousDataPointDefined = index > 0 && defined(series.dataPoints[index - 1]);
            const isNextDataPointDefined =
                // @ts-expect-error Wrong typing in the original code
                index < series.dataPoints.length - 1 && defined(series.dataPoints[index + 1]);
            const isLastDataPointAndNotDefined = index === series.dataPoints.length - 1 && !defined(dataPoint);

            if (isPreviousDataPointDefined) {
                // @ts-expect-error Wrong typing in the original code
                group.push(series.dataPoints[index - 1]);
            }
            group.push(dataPoint);
            if (isNextDataPointDefined) {
                // @ts-expect-error Wrong typing in the original code
                group.push(series.dataPoints[index + 1]);
                missingDataGroups.push([...group]);
                group.splice(0, group.length);
            }
            if (isLastDataPointAndNotDefined) {
                if (group[0] && defined(group[0])) {
                    group.push({ ...dataPoint, value: group[0]?.value });
                }
                missingDataGroups.push([...group]);
                group.splice(0, group.length);
            }
        }
        return group;
    }, []);

    return missingDataGroups;
};

export const createBackfilledSeries = (series: LineChartSeries[]): LineChartSeries[] => {
    return series.reduce<LineChartSeries[]>((accumulator, currentSeries) => {
        const missingDataGroupsWithEdges = getMissingDataGroupsWithEdgePoints(currentSeries);

        if (missingDataGroupsWithEdges) {
            const interpolatedData = interpolateMissingData(missingDataGroupsWithEdges);

            return [
                ...accumulator,
                ...interpolatedData.map((dataPoints, index) => ({
                    name: `${currentSeries.name}-${index}`,
                    dataPoints,
                })),
            ];
        } else {
            return accumulator;
        }
    }, []);
};
