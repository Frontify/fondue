/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TextProps } from '@visx/text';
import { type Margin } from '@visx/xychart';
import { useEffect, useState } from 'react';
// @ts-expect-error Wrong export of types
import useFontFaceObserver from 'use-font-face-observer';

import { truncateTextLabel } from '@components/BarChart/helpers';
import { getSVGTextDimensions } from '@components/LineChart/helpers';
import { type ValueFormatter } from '@components/common/types';
import { BODY_FONT_FAMILY, TICK_LABEL_WEIGHT } from '@theme/consts';

type TickType<T> = T extends undefined ? string | number : number;
type UseMarginProps = {
    ticks: TickType<undefined | ValueFormatter>[];
    valueFormatter?: ValueFormatter;
    tickLabelStyle: TextProps;
    tickLength: number;
    maxLabelHeight?: number;
    firstLabelOverflowsBy?: number;
};

const DEFAULT_MARGIN = { bottom: 24, left: 52.265625, right: 20, top: 10 };

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
    const [margin, setMargin] = useState<Margin>(DEFAULT_MARGIN);
    const isFontLoaded = useFontFaceObserver([
        {
            family: getComputedStyle(document.documentElement).getPropertyValue(BODY_FONT_FAMILY).trim(),
            weight: TICK_LABEL_WEIGHT,
        },
    ]);

    const tickLabelOffset = getTickLabelOffset({ tickLabelStyle, tickLength });
    const ticksJSON = JSON.stringify(ticks);
    const styleJSON = JSON.stringify(tickLabelStyle);

    useEffect(() => {
        const ticks = JSON.parse(ticksJSON);
        const style = JSON.parse(styleJSON);
        if (isFontLoaded) {
            const longestFormattedValue = findLongestFormattedTickValue({
                ticks,
                tickLabelStyle: style as TextProps,
                tickLength: ticks.length,
                valueFormatter,
            });
            let marginLeft = longestFormattedValue + tickLabelOffset;
            if (firstLabelOverflowsBy > marginLeft) {
                marginLeft = firstLabelOverflowsBy;
            }
            setMargin({
                top: 10,
                right: 20,
                bottom: maxLabelHeight + 18,
                left: marginLeft,
            });
        }
    }, [ticksJSON, isFontLoaded, styleJSON, valueFormatter, maxLabelHeight, firstLabelOverflowsBy, tickLabelOffset]);

    return margin;
};
