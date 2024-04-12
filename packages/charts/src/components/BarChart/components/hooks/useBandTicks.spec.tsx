/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type AxisScale } from '@visx/axis';
import { DataContext, type DataContextType } from '@visx/xychart';
import { type ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { useBandTicks } from '@components/BarChart/components/hooks/useBandTicks';

const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
    'Pluto',
    'Tatooine',
    'Hoth',
    'Alderaan',
];

const characters = [
    'Han Solo',
    'Luke Skywalker',
    'Leia Organa',
    'R2-D2',
    'Obi-Wan Kenobi',
    'Darth Vader',
    'Yoda',
    'Chewbacca',
    'Boba Fett',
];

type DataProviderProps = {
    children: ReactNode;
    dataContext: DataContextType<AxisScale, AxisScale, Record<string, unknown>>;
};

const DataProvider = ({ children, dataContext }: DataProviderProps) => {
    return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};

const mockData = (innerWidth: number, innerHeight: number) => {
    return {
        xScale: {
            domain: vi.fn().mockReturnValue(planets),
        },
        yScale: {
            domain: vi.fn().mockReturnValue(characters),
        },
        innerWidth,
        innerHeight,
    } as unknown as DataContextType<AxisScale, AxisScale, Record<string, unknown>>;
};

describe('useBandTicks', () => {
    test('should return all planet labels when there is enough space', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(1000, 1000);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(false, updateTicks), { wrapper });
        expect(result.current).toEqual(planets);
        expect(updateTicks).toHaveBeenCalledWith(planets);
    });

    test('should return all character labels when there is enough space and is horizontal', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(1000, 1000);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(true, updateTicks), { wrapper });
        expect(result.current).toEqual(characters);
        expect(updateTicks).toHaveBeenCalledWith(characters);
    });

    test('should return even planet labels when there is not enough space', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(100, 100);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(false, updateTicks), { wrapper });
        expect(result.current).toEqual(planets.filter((_, i) => i % 2 === 0));
        expect(updateTicks).toHaveBeenCalledWith(planets.filter((_, i) => i % 2 === 0));
    });

    test('should return even character labels when there is not enough space and is horizontal', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(100, 100);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(true, updateTicks), { wrapper });
        expect(result.current).toEqual(characters.filter((_, i) => i % 2 === 0));
        expect(updateTicks).toHaveBeenCalledWith(characters.filter((_, i) => i % 2 === 0));
    });

    test('should return every fourth label when there is not enough space', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(45, 45);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(false, updateTicks), { wrapper });
        expect(result.current).toEqual(planets.filter((_, i) => i % 4 === 0));
        expect(updateTicks).toHaveBeenCalledWith(planets.filter((_, i) => i % 4 === 0));
    });

    test('should return every fourth label when there is not enough space and is horizontal', () => {
        const updateTicks = vi.fn();
        const dataContext = mockData(45, 45);
        const wrapper = ({ children }: { children: ReactNode }) => (
            <DataProvider dataContext={dataContext}>{children}</DataProvider>
        );
        const { result } = renderHook(() => useBandTicks(true, updateTicks), { wrapper });
        expect(result.current).toEqual(characters.filter((_, i) => i % 4 === 0));
        expect(updateTicks).toHaveBeenCalledWith(characters.filter((_, i) => i % 4 === 0));
    });
});
