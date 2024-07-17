/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type AxisScale } from '@visx/axis';
import { DataContext, type DataContextType, TooltipContext, type TooltipContextType } from '@visx/xychart';
import { type ReactNode } from 'react';
import { type Mock, afterEach, describe, expect, it, vi } from 'vitest';

import { type BarChartDataPoint } from '@components/BarChart';
import { type LineChartDataPoint } from '@components/LineChart';
import { xAccessor } from '@components/LineChart/helpers';
import { usePositions } from '@components/common/components/Tooltip/hooks/usePositions';

type DataProviderProps = {
    children: ReactNode;
    dataContext: DataContextType<AxisScale, AxisScale, Record<string, unknown>>;
    tooltipContext: TooltipContextType<LineChartDataPoint | BarChartDataPoint>;
};

type ScaleMock = {
    bandwidth: Mock<() => number>;
} & Mock<() => number>;

const Providers = ({ children, dataContext, tooltipContext }: DataProviderProps) => {
    return (
        <DataContext.Provider value={dataContext}>
            <TooltipContext.Provider value={tooltipContext}>{children}</TooltipContext.Provider>
        </DataContext.Provider>
    );
};

const mockDataContext = (bandWidthX: number, bandWidthY: number) => {
    const xScale = vi.fn().mockImplementation((value) => value) as ScaleMock;
    xScale.bandwidth = vi.fn().mockReturnValue(bandWidthX);

    const yScale = vi.fn().mockImplementation((value) => value) as ScaleMock;
    yScale.bandwidth = vi.fn().mockReturnValue(bandWidthY);

    const xAccessor = vi.fn().mockImplementation((datum) => datum.value);
    const yAccessor = vi.fn().mockImplementation((datum) => datum.value);

    return {
        xScale,
        yScale,
        dataRegistry: {
            get: vi.fn().mockReturnValue({
                xAccessor,
                yAccessor,
            }),
        },
        accessorMocks: {
            xAccessor,
            yAccessor,
        },
    } as unknown as DataContextType<AxisScale, AxisScale, Record<string, unknown>> & {
        accessorMocks: {
            xAccessor: Mock<() => number>;
            yAccessor: Mock<() => number>;
        };
    };
};

const TOOLTIP_CONTEXT_MOCK = {
    tooltipOpen: true,
    tooltipLeft: 10,
    tooltipTop: 20,
    tooltipData: {
        nearestDatum: {
            key: 'nearestDatum',
            datum: {
                category: 'category',
                value: 5,
            },
        },
        datumByKey: {
            key1: {
                datum: {
                    category: 'key1',
                    value: 10,
                },
                key: 'key1',
            },
            key2: {
                datum: {
                    category: 'key2',
                    value: 20,
                },
                key: 'key2',
            },
        },
    },
} as unknown as TooltipContextType<LineChartDataPoint | BarChartDataPoint>;

vi.mock('@components/common/components/Tooltip/helpers', () => ({
    xAccessor: vi.fn().mockImplementation((datumCoords, tooltipCoords, datumKey) => {
        return {
            tooltipLeft: tooltipCoords.tooltipLeft,
            tooltipTop: tooltipCoords.tooltipTop,
            glyphProps: {
                key: datumKey,
                x: datumCoords.left,
                y: datumCoords.top,
            },
        };
    }),
}));

vi.mock('@components/LineChart/helpers', () => ({
    xAccessor: vi.fn().mockImplementation((datum) => datum.value),
}));

describe('usePositions', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return correct coordinates', () => {
        const bandWidthX = 20;
        const bandWidthY = 10;
        const { accessorMocks, ...dataContext } = mockDataContext(bandWidthX, bandWidthY);
        const tooltipContext = TOOLTIP_CONTEXT_MOCK;
        const wrapper = ({ children }: { children: ReactNode }) => (
            <Providers dataContext={dataContext} tooltipContext={tooltipContext}>
                {children}
            </Providers>
        );

        const { result } = renderHook(() => usePositions(false, true), { wrapper });
        expect(result.current).toEqual({
            glyphProps: [
                {
                    key: 'key1',
                    x: (tooltipContext.tooltipData?.datumByKey?.key1?.datum.value as number) + bandWidthX / 2,
                    y: (tooltipContext.tooltipData?.datumByKey?.key1?.datum.value as number) + bandWidthY / 2,
                },
                {
                    key: 'key2',
                    x: (tooltipContext.tooltipData?.datumByKey?.key2?.datum.value as number) + bandWidthX / 2,
                    y: (tooltipContext.tooltipData?.datumByKey?.key2?.datum.value as number) + bandWidthY / 2,
                },
            ],
            tooltipPosition: {
                tooltipLeft: tooltipContext.tooltipLeft,
                tooltipTop: (tooltipContext.tooltipData?.nearestDatum?.datum.value as number) + bandWidthY / 2,
            },
        });

        expect(dataContext.dataRegistry.get).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.key);
        expect(dataContext.dataRegistry.get).toHaveBeenCalledWith('key1');
        expect(dataContext.dataRegistry.get).toHaveBeenCalledWith('key2');
        expect(dataContext.xScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum.value);
        expect(dataContext.xScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum.value);
        expect(dataContext.xScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum.value);
        expect(dataContext.yScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum.value);
        expect(dataContext.yScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum.value);
        expect(dataContext.yScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum.value);
        expect(accessorMocks.xAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum);
        expect(accessorMocks.xAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum);
        expect(accessorMocks.xAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum);
        expect(accessorMocks.yAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum);
        expect(accessorMocks.yAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum);
        expect(accessorMocks.yAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum);
    });

    it('should return correct values when tooltip is not open', () => {
        const bandWidthX = 20;
        const bandWidthY = 10;
        const { accessorMocks, ...dataContext } = mockDataContext(bandWidthX, bandWidthY);
        const tooltipContext = {
            ...TOOLTIP_CONTEXT_MOCK,
            tooltipOpen: false,
        };
        const wrapper = ({ children }: { children: ReactNode }) => (
            <Providers dataContext={dataContext} tooltipContext={tooltipContext}>
                {children}
            </Providers>
        );

        const { result } = renderHook(() => usePositions(false, true), { wrapper });
        expect(result.current).toEqual({
            glyphProps: [],
            tooltipPosition: {
                tooltipLeft: tooltipContext.tooltipLeft,
                tooltipTop: tooltipContext.tooltipTop,
            },
        });

        expect(dataContext.dataRegistry.get).not.toHaveBeenCalled();
        expect(dataContext.xScale).not.toHaveBeenCalled();
        expect(dataContext.yScale).not.toHaveBeenCalled();
        expect(accessorMocks.xAccessor).not.toHaveBeenCalled();
        expect(accessorMocks.yAccessor).not.toHaveBeenCalled();
    });

    it('should return correct values when hideGlyphs is true', () => {
        const bandWidthX = 20;
        const bandWidthY = 10;
        const { accessorMocks, ...dataContext } = mockDataContext(bandWidthX, bandWidthY);
        const tooltipContext = TOOLTIP_CONTEXT_MOCK;
        const wrapper = ({ children }: { children: ReactNode }) => (
            <Providers dataContext={dataContext} tooltipContext={tooltipContext}>
                {children}
            </Providers>
        );

        const { result } = renderHook(() => usePositions(true, true), { wrapper });
        expect(result.current).toEqual({
            glyphProps: [],
            tooltipPosition: {
                tooltipLeft: tooltipContext.tooltipLeft,
                tooltipTop: (tooltipContext.tooltipData?.nearestDatum?.datum.value as number) + bandWidthY / 2,
            },
        });

        expect(dataContext.dataRegistry.get).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.key);
        expect(dataContext.dataRegistry.get).not.toHaveBeenCalledWith('key1');
        expect(dataContext.dataRegistry.get).not.toHaveBeenCalledWith('key2');
        expect(dataContext.xScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum.value);
        expect(dataContext.xScale).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum.value);
        expect(dataContext.xScale).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum.value);
        expect(dataContext.yScale).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum.value);
        expect(dataContext.yScale).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum.value);
        expect(dataContext.yScale).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum.value);
        expect(accessorMocks.xAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum);
        expect(accessorMocks.xAccessor).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum);
        expect(accessorMocks.xAccessor).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum);
        expect(accessorMocks.yAccessor).toHaveBeenCalledWith(tooltipContext.tooltipData?.nearestDatum?.datum);
        expect(accessorMocks.yAccessor).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key1?.datum);
        expect(accessorMocks.yAccessor).not.toHaveBeenCalledWith(tooltipContext.tooltipData?.datumByKey?.key2?.datum);
    });

    it('should return correct values for stacking dataPoints', () => {
        const bandWidthX = 0;
        const bandWidthY = 0;
        const dataContext = mockDataContext(bandWidthX, bandWidthY);
        const tooltipContext = TOOLTIP_CONTEXT_MOCK;
        const wrapper = ({ children }: { children: ReactNode }) => (
            <Providers dataContext={dataContext} tooltipContext={tooltipContext}>
                {children}
            </Providers>
        );

        const { result } = renderHook(() => usePositions(false, true, true), { wrapper });
        expect(result.current).toEqual({
            glyphProps: [
                {
                    key: 'key1',
                    x: (tooltipContext.tooltipData?.datumByKey?.key1?.datum.value as number) + bandWidthX / 2,
                    y: 10,
                },
                {
                    key: 'key2',
                    x: (tooltipContext.tooltipData?.datumByKey?.key2?.datum.value as number) + bandWidthX / 2,
                    y: 30,
                },
            ],
            tooltipPosition: {
                tooltipLeft: tooltipContext.tooltipLeft,
                tooltipTop: 0,
            },
        });

        expect(dataContext.yScale).toHaveBeenCalledWith(0);
        expect(dataContext.yScale).toHaveBeenCalledWith(10);
        expect(dataContext.yScale).toHaveBeenCalledWith(30);
        expect(dataContext.yScale).toHaveBeenCalledTimes(3);
        expect(xAccessor).toHaveBeenCalledTimes(3);
    });
});
