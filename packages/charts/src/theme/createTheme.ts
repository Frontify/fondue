/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type XYChartTheme, lightTheme } from '@visx/xychart';

import { BODY_FONT_FAMILY, TICK_LABEL_WEIGHT } from './consts';

const TICK_LENGTH = 6;
const TICK_OFFSET = 4;

export const TICK_LABEL_STYLE = {
    fontSize: 'var(--body-size-x-small)',
    fontFamily: `var(${BODY_FONT_FAMILY})`,
    fontWeight: TICK_LABEL_WEIGHT,
    fill: 'var(--fc-font-color-weak)',
};

export const getAxisStyles = (axisOrientation: 'x' | 'y') => ({
    axisLabel: {},
    axisLine: {
        stroke: axisOrientation === 'x' ? 'var(--fc-axis-x-stroke-color)' : 'var(--fc-axis-y-stroke-color)',
    },
    tickLine: {
        stroke: 'var(--fc-tick-stroke-color)',
    },
    tickLabel: {
        ...TICK_LABEL_STYLE,
        textAnchor: axisOrientation === 'x' ? ('middle' as const) : ('end' as const),
        verticalAnchor: axisOrientation === 'x' ? ('end' as const) : ('middle' as const),
        dx: axisOrientation === 'x' ? 0 : -TICK_OFFSET,
        dy: axisOrientation === 'x' ? TICK_OFFSET : 0,
    },
    tickLength: TICK_LENGTH,
});

export const createTheme = (colors: string[]): XYChartTheme => ({
    ...lightTheme,
    backgroundColor: 'var(--fc-base-color)',
    colors,
    gridStyles: {
        stroke: 'var(--fc-grid-stroke-color)',
    },
    axisStyles: {
        x: {
            bottom: getAxisStyles('x'),
            top: getAxisStyles('x'),
        },
        y: {
            left: getAxisStyles('y'),
            right: getAxisStyles('y'),
        },
    },
});
