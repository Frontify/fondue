/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type TextProps } from '@visx/text';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { truncateTextLabel } from '@components/BarChart/helpers';
import { useMargin } from '@components/common/hooks/useMargin';

const TICK_LENGTH = 4;
const VALUE_FORMATTER = (value: number | string) => `${value}°C`;
const NUMERIC_TICKS = [-5, 0, 15, 745];
// @ts-expect-error Wrong typing in the original code
const NUMERIC_TICKS_LONGEST_FORMATTED = VALUE_FORMATTER(NUMERIC_TICKS[3]);
const NUMERIC_TICKS_LONGEST = NUMERIC_TICKS[3];
const STRING_TICKS = ['Chrome', 'Firefox', 'Safari', 'Edge', 'IE'];
const STRING_TICKS_LONGEST = STRING_TICKS[1];
const TICK_LABEL_STYLE: TextProps = {
    fontSize: 12,
    fontFamily: 'var(--fc-font-family)',
    fontWeight: '400',
    fill: 'var(--fc-font-color-weak)',
    textAnchor: 'end',
    verticalAnchor: 'middle',
    dx: -4,
};

const BASE_MARGIN = {
    top: 10,
    right: 20,
    bottom: 24,
    left: 0,
};

const DEFAULT_MARGIN = { bottom: 24, left: 52.265625, right: 20, top: 10 };

vi.mock('use-font-face-observer', () => ({
    default: vi.fn(),
}));

vi.mock('@components/LineChart/helpers', () => ({
    getSVGTextDimensions: vi.fn((text: string) => ({
        width: text.length,
    })),
}));

describe('useMargin', () => {
    let useFontFaceObserverMock: Mock<() => boolean>;
    beforeEach(async () => {
        // @ts-expect-error Wrong export of types
        const { default: useFontFaceObserver } = await import('use-font-face-observer');
        vi.mocked(useFontFaceObserver).mockReturnValue(true);
        useFontFaceObserverMock = vi.mocked(useFontFaceObserver);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns correct margin for formatted numeric ticks', () => {
        const { result } = renderHook(() =>
            useMargin({
                ticks: NUMERIC_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                valueFormatter: VALUE_FORMATTER,
                tickLength: TICK_LENGTH,
            }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                NUMERIC_TICKS_LONGEST_FORMATTED.length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });

    it('returns correct margin for unformatted numeric ticks', () => {
        const { result } = renderHook(() =>
            useMargin({ ticks: NUMERIC_TICKS, tickLabelStyle: TICK_LABEL_STYLE, tickLength: TICK_LENGTH }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                String(NUMERIC_TICKS_LONGEST).length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });

    it('returns correct margin for string ticks', () => {
        const { result } = renderHook(() =>
            useMargin({ ticks: STRING_TICKS, tickLabelStyle: TICK_LABEL_STYLE, tickLength: TICK_LENGTH }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                // @ts-expect-error Wrong typing in the original code
                BASE_MARGIN.left + STRING_TICKS_LONGEST.length + TICK_LENGTH + Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });

    it('returns correct margin for with maxLabelHeight and firstLabelOverflowsBy', () => {
        const { result } = renderHook(() =>
            useMargin({
                ticks: STRING_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                tickLength: TICK_LENGTH,
                maxLabelHeight: 45,
                firstLabelOverflowsBy: 30,
            }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            bottom: 63,
            left: 30,
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });

    it('returns correct margin for with maxLabelHeight and firstLabelOverflowsBy < tickLabelOffset', () => {
        const { result } = renderHook(() =>
            useMargin({
                ticks: STRING_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                tickLength: TICK_LENGTH,
                maxLabelHeight: 45,
                firstLabelOverflowsBy: 12,
            }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            bottom: 63,
            left: 15,
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });

    it('returns default margin when font is not loaded', () => {
        useFontFaceObserverMock.mockReturnValue(false);
        const { result, rerender } = renderHook(() =>
            useMargin({
                ticks: NUMERIC_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                valueFormatter: VALUE_FORMATTER,
                tickLength: TICK_LENGTH,
            }),
        );
        expect(result.current).toEqual(DEFAULT_MARGIN);
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(1);

        useFontFaceObserverMock.mockReturnValue(true);
        rerender();

        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                NUMERIC_TICKS_LONGEST_FORMATTED.length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(3);
    });

    it('updated value formatter updates results', () => {
        let valueFormatter = VALUE_FORMATTER;
        const { result, rerender } = renderHook(() =>
            useMargin({
                ticks: NUMERIC_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                valueFormatter,
                tickLength: TICK_LENGTH,
            }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                NUMERIC_TICKS_LONGEST_FORMATTED.length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);

        valueFormatter = (value: number | string) => `${value}°F`;
        rerender();

        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                // @ts-expect-error Wrong typing in the original code
                valueFormatter(NUMERIC_TICKS_LONGEST).length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(4);
    });

    it('long tick labels are truncated and truncation reflected in calculated margin', () => {
        const valueFormatter = (value: number | string) => `${value} degrees celsius`;
        const { result } = renderHook(() =>
            useMargin({
                ticks: STRING_TICKS,
                tickLabelStyle: TICK_LABEL_STYLE,
                tickLength: TICK_LENGTH,
                valueFormatter,
            }),
        );
        expect(result.current).toEqual({
            ...BASE_MARGIN,
            left:
                BASE_MARGIN.left +
                // @ts-expect-error Wrong typing in the original code
                truncateTextLabel(valueFormatter(STRING_TICKS_LONGEST)).length +
                TICK_LENGTH +
                Math.abs(TICK_LABEL_STYLE.dx as number),
        });
        expect(useFontFaceObserverMock).toHaveBeenCalledTimes(2);
    });
});
