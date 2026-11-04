/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TextProps } from '@visx/text';
import { type Margin } from '@visx/xychart';
import { useEffect, useState } from 'react';

import { truncateTextLabel } from '@components/BarChart/helpers';
import { type ValueFormatter } from '@components/common/types';
import { getSVGTextDimensions } from '@components/LineChart/helpers';

type TickType<T> = T extends undefined ? string | number : number;
type UseMarginProps = {
    ticks: TickType<undefined | ValueFormatter>[];
    valueFormatter?: ValueFormatter;
    tickLabelStyle: TextProps;
    tickLength: number;
    maxLabelHeight?: number;
    firstLabelOverflowsBy?: number;
    maxLabelLength?: number;
};

const DEFAULT_MARGIN = { bottom: 24, left: 52.265625, right: 20, top: 10 };

const findLongestFormattedTickValue = ({ ticks, tickLabelStyle, valueFormatter, maxLabelLength }: UseMarginProps) => {
    return ticks.reduce((longestTickLength: number, tick) => {
        const formattedTick = valueFormatter
            ? truncateTextLabel(valueFormatter(tick as TickType<typeof valueFormatter>), maxLabelLength)
            : truncateTextLabel(String(tick), maxLabelLength);
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
    const {
        tickLabelStyle,
        ticks,
        valueFormatter,
        tickLength,
        maxLabelHeight = 6,
        firstLabelOverflowsBy = 0,
        maxLabelLength,
    } = props;
    const [margin, setMargin] = useState<Margin>(DEFAULT_MARGIN);

    const tickLabelOffset = getTickLabelOffset({ tickLabelStyle, tickLength });
    const ticksJSON = JSON.stringify(ticks);
    const styleJSON = JSON.stringify(tickLabelStyle);

    useEffect(() => {
        const ticks = JSON.parse(ticksJSON);
        const style = JSON.parse(styleJSON);

        const longestFormattedValue = findLongestFormattedTickValue({
            ticks,
            tickLabelStyle: style as TextProps,
            tickLength: ticks.length,
            valueFormatter,
            maxLabelLength,
        });
        let marginLeft = longestFormattedValue + tickLabelOffset;
        if (firstLabelOverflowsBy > marginLeft) {
            marginLeft = firstLabelOverflowsBy;
        }
        // eslint-disable-next-line @eslint-react/set-state-in-effect
        setMargin({
            top: 10,
            right: 20,
            bottom: maxLabelHeight + 18,
            left: marginLeft,
        });
    }, [ticksJSON, styleJSON, valueFormatter, maxLabelHeight, firstLabelOverflowsBy, tickLabelOffset, maxLabelLength]);

    return margin;
};
