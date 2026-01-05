/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TextProps } from '@visx/text';
import { useMemo } from 'react';

import { truncateTextLabel } from '@components/BarChart/helpers';
import { getSVGTextDimensions } from '@components/LineChart/helpers';
import { type ValueFormatter } from '@components/common/types';

type TickType<T> = T extends undefined ? string | number : number;
type UseMarginProps = {
    ticks: TickType<undefined | ValueFormatter>[];
    valueFormatter?: ValueFormatter;
    tickLabelStyle: TextProps;
    tickLength: number;
    maxLabelHeight?: number;
    firstLabelOverflowsBy?: number;
};

const findLongestFormattedTickValue = ({ ticks, tickLabelStyle, valueFormatter }: UseMarginProps) => {
    return ticks.reduce((longestTickLength: number, tick) => {
        const formattedTick = valueFormatter
            ? truncateTextLabel(valueFormatter(tick as TickType<typeof valueFormatter>))
            : truncateTextLabel(String(tick));
        const tickLength = getSVGTextDimensions(formattedTick, tickLabelStyle).width ?? 0;
        return Math.max(longestTickLength, tickLength);
    }, 0);
};

const getTickLabelOffset = ({ tickLabelStyle, tickLength }: Pick<UseMarginProps, 'tickLabelStyle' | 'tickLength'>) => {
    const labelOffset =
        typeof tickLabelStyle.dx === 'string' ? parseFloat(tickLabelStyle.dx) : (tickLabelStyle.dx ?? 0);
    return tickLength + Math.abs(labelOffset);
};

export const useMargin = (props: UseMarginProps) => {
    const { tickLabelStyle, ticks, valueFormatter, tickLength, maxLabelHeight = 6, firstLabelOverflowsBy = 0 } = props;

    const tickLabelOffset = getTickLabelOffset({ tickLabelStyle, tickLength });
    const ticksJSON = JSON.stringify(ticks);
    const styleJSON = JSON.stringify(tickLabelStyle);

    const margin = useMemo(() => {
        const parsedTicks = JSON.parse(ticksJSON);
        const style = JSON.parse(styleJSON);

        const longestFormattedValue = findLongestFormattedTickValue({
            ticks: parsedTicks,
            tickLabelStyle: style as TextProps,
            tickLength: parsedTicks.length,
            valueFormatter,
        });
        let marginLeft = longestFormattedValue + tickLabelOffset;
        if (firstLabelOverflowsBy > marginLeft) {
            marginLeft = firstLabelOverflowsBy;
        }
        return {
            top: 10,
            right: 20,
            bottom: maxLabelHeight + 18,
            left: marginLeft,
        };
    }, [ticksJSON, styleJSON, valueFormatter, maxLabelHeight, firstLabelOverflowsBy, tickLabelOffset]);

    return margin;
};
