/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook, fireEvent } from '@testing-library/react';
import { type RefObject } from 'react';
import { describe, expect, it } from 'vitest';

import { type Padding } from '@components/PieChart';
import { useResponsiveChart } from '@components/PieChart/hooks/useResponsiveChart';

const ZERO_PADDING: Padding = { top: 0, right: 0, bottom: 0, left: 0 } as const;

const getExpectedResult = (labelStyle: 'label' | 'legend', expectedSize: number, expectedPadding: Padding | 'none') => {
    const padding = expectedPadding === 'none' ? ZERO_PADDING : expectedPadding;
    return {
        radius: expectedSize / 2,
        center: [padding.left + expectedSize / 2, padding.top + expectedSize / 2],
        width: expectedSize + padding.left + padding.right,
        height: expectedSize + padding.top + padding.bottom,
        labelStyle,
    };
};

describe('useResponsiveChart', () => {
    it('returns defaults when no containerRef is present', () => {
        const SIZE_PROP = 200;
        const CONTAINER_REF = {} as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));
    });

    it('returns defaults when container is bigger than chart', () => {
        const SIZE_PROP = 200;
        const CONTAINER_REF = { current: { clientWidth: 500 } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));
    });

    it('returns defaults when container is bigger than chart', () => {
        const SIZE_PROP = 200;
        const CONTAINER_REF = { current: { clientWidth: 500 } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));
    });

    it('adjusts chart size to fit container when container is smaller than chart', () => {
        const SIZE_PROP = 200;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('legend', CONTAINER_WIDTH, 'none'));
    });

    it('preserves chart size, displays legend and removes paddings when label padding prevents chart from fitting in container', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 50 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('legend', SIZE_PROP, 'none'));
    });

    it('updates correctly when sizeProp changes to smaller than container size', () => {
        const SIZE_PROP = 200;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result, rerender } = renderHook(
            ({ sizeProp }) => useResponsiveChart(sizeProp, CONTAINER_REF, LABEL_PADDING),
            { initialProps: { sizeProp: SIZE_PROP } },
        );

        expect(result.current).toEqual(getExpectedResult('legend', CONTAINER_WIDTH, 'none'));

        const NEW_SIZE_PROP = 50;
        rerender({ sizeProp: NEW_SIZE_PROP });

        expect(result.current).toEqual(getExpectedResult('label', NEW_SIZE_PROP, LABEL_PADDING));
    });

    it('updates correctly when sizeProp changes to bigger than container size', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result, rerender } = renderHook(
            ({ sizeProp }) => useResponsiveChart(sizeProp, CONTAINER_REF, LABEL_PADDING),
            { initialProps: { sizeProp: SIZE_PROP } },
        );

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));

        const NEW_SIZE_PROP = 200;
        rerender({ sizeProp: NEW_SIZE_PROP });

        expect(result.current).toEqual(getExpectedResult('legend', CONTAINER_WIDTH, 'none'));
    });

    it('updates correctly when labelPadding changes so that chart no longer fits in the container', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result, rerender } = renderHook(
            ({ labelPadding }) => useResponsiveChart(SIZE_PROP, CONTAINER_REF, labelPadding),
            { initialProps: { labelPadding: LABEL_PADDING } },
        );

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));

        const NEW_LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 50 };
        rerender({ labelPadding: NEW_LABEL_PADDING });

        expect(result.current).toEqual(getExpectedResult('legend', SIZE_PROP, 'none'));
    });

    it('updates correctly when container becomes too small to fit the chart', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));

        const NEW_CONTAINER_WIDTH = 30;
        (CONTAINER_REF as any).current.clientWidth = NEW_CONTAINER_WIDTH;
        fireEvent(window, new Event('resize'));

        expect(result.current).toEqual(getExpectedResult('legend', NEW_CONTAINER_WIDTH, 'none'));
    });

    it('updates correctly when container becomes too small to fit the chart with padding after padding has been updated', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 100;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const { result, rerender } = renderHook(
            ({ labelPadding }) => useResponsiveChart(SIZE_PROP, CONTAINER_REF, labelPadding),
            { initialProps: { labelPadding: ZERO_PADDING } },
        );

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, ZERO_PADDING));

        const NEW_LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        rerender({ labelPadding: NEW_LABEL_PADDING });
        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, NEW_LABEL_PADDING));

        const NEW_CONTAINER_WIDTH = 60;
        (CONTAINER_REF as any).current.clientWidth = NEW_CONTAINER_WIDTH;
        fireEvent(window, new Event('resize'));

        expect(result.current).toEqual(getExpectedResult('legend', SIZE_PROP, 'none'));
    });

    it('updates correctly when container becomes big enough to fit the chart', () => {
        const SIZE_PROP = 50;
        const CONTAINER_WIDTH = 30;
        const CONTAINER_REF = { current: { clientWidth: CONTAINER_WIDTH } } as RefObject<HTMLDivElement>;
        const LABEL_PADDING = { top: 10, right: 15, bottom: 20, left: 25 };
        const { result } = renderHook(() => useResponsiveChart(SIZE_PROP, CONTAINER_REF, LABEL_PADDING));

        expect(result.current).toEqual(getExpectedResult('legend', CONTAINER_WIDTH, 'none'));

        const NEW_CONTAINER_WIDTH = 100;
        (CONTAINER_REF as any).current.clientWidth = NEW_CONTAINER_WIDTH;
        fireEvent(window, new Event('resize'));

        expect(result.current).toEqual(getExpectedResult('label', SIZE_PROP, LABEL_PADDING));
    });
});
