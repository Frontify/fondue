/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DataContext, TooltipContext, type TooltipContextType } from '@visx/xychart';
import { useCallback, useContext } from 'react';

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { getScaleBandwidth } from '@components/common/helpers/getScaleBandwith';

import { isValidNumber } from '../../../../../utils/isValidNumber';
import { xAccessor } from '../../../../LineChart/helpers';
import { getTooltipCoordinates } from '../helpers/getTooltipCoordinates';

type TooltipGlyphProps = {
    x: number;
    y: number;
    key: string;
};

export const usePositions = (hideGlyphs: boolean, horizontal: boolean, stackingGlyphs = false) => {
    const { xScale, yScale, dataRegistry } = useContext(DataContext) || {};
    const tooltipContext = useContext(TooltipContext) as TooltipContextType<LineChartDataPoint | BarChartDataPoint>;

    const xScaleBandwidth = xScale ? getScaleBandwidth(xScale) : 0;
    const yScaleBandwidth = yScale ? getScaleBandwidth(yScale) : 0;

    const getDatumLeftTop = useCallback(
        (key: string, datum: LineChartDataPoint | BarChartDataPoint) => {
            const entry = dataRegistry?.get(key);
            const xAccessor = entry?.xAccessor;
            const yAccessor = entry?.yAccessor;
            const left = xScale && xAccessor ? Number(xScale(xAccessor(datum))) + xScaleBandwidth / 2 ?? 0 : undefined;
            const top = yScale && yAccessor ? Number(yScale(yAccessor(datum))) + yScaleBandwidth / 2 ?? 0 : undefined;

            return { left, top };
        },
        [dataRegistry, xScaleBandwidth, yScaleBandwidth, xScale, yScale],
    );

    const getDatumLeftTopWithStackingGlyphs = (key: string, datum: LineChartDataPoint) => {
        const datumArray = Object.values(tooltipContext?.tooltipData?.datumByKey ?? {}).filter(
            (value) => !value.key.includes('white-gap'),
        );
        const keyIndex = datumArray.findIndex((value) => value.key === key);

        const left = (xScale && Number(xScale(xAccessor(datum) || 0)) + xScaleBandwidth / 2) ?? 0;
        let top = 0;
        for (let i = 0; i <= keyIndex; i++) {
            top += datumArray[i]?.datum.value ?? 0;
        }
        top = (yScale && Number(yScale(top)) + yScaleBandwidth / 2) ?? 0;

        return { left, top };
    };

    const showTooltip = Boolean(tooltipContext?.tooltipOpen && tooltipContext?.tooltipData);
    const nearestDatum = tooltipContext?.tooltipData?.nearestDatum;

    const glyphProps: TooltipGlyphProps[] = [];
    let tooltipLeft = tooltipContext?.tooltipLeft;
    let tooltipTop = tooltipContext?.tooltipTop;

    if (showTooltip && nearestDatum && tooltipLeft && tooltipTop) {
        if (!hideGlyphs) {
            for (const { key, datum } of Object.values(tooltipContext?.tooltipData?.datumByKey ?? {})) {
                const { left, top } = stackingGlyphs
                    ? getDatumLeftTopWithStackingGlyphs(key, datum as LineChartDataPoint)
                    : getDatumLeftTop(key, datum);
                if (isValidNumber(left) && isValidNumber(top)) {
                    glyphProps.push({ key, x: left, y: top });
                }
            }
        }
        const { left, top } = stackingGlyphs
            ? getDatumLeftTopWithStackingGlyphs(nearestDatum.key, nearestDatum.datum as LineChartDataPoint)
            : getDatumLeftTop(nearestDatum.key, nearestDatum.datum);
        const tooltipCoordinates = getTooltipCoordinates(
            { left, top },
            { left: tooltipLeft, top: tooltipTop },
            horizontal,
        );
        tooltipLeft = tooltipCoordinates.tooltipLeft;
        tooltipTop = tooltipCoordinates.tooltipTop;
    }

    return {
        glyphProps,
        tooltipPosition: {
            tooltipLeft,
            tooltipTop,
        },
    };
};
