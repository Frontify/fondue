/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LineChartSeries } from '@components/LineChart/types';

import { Area, Line, SeriesClipPath } from './components';

type LineChartSeriesProps = {
    series: LineChartSeries[];
    backfilledSeries: LineChartSeries[];
    hideGlyphs: boolean;
    hideArea: boolean;
    highlightNegativeValues: boolean;
};

export const Series = ({
    series,
    backfilledSeries,
    hideGlyphs,
    hideArea,
    highlightNegativeValues,
}: LineChartSeriesProps) => {
    return (
        <>
            <SeriesClipPath highlightNegativeValues={highlightNegativeValues} />
            <Area series={series} backfilledSeries={backfilledSeries} hideArea={hideArea} />
            <Line
                series={series}
                backfilledSeries={backfilledSeries}
                hideGlyphs={hideGlyphs}
                highlightNegativeValues={highlightNegativeValues}
            />
        </>
    );
};
