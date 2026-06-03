/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSingleDate } from '../useSingleDate';

describe('useSingleDate', () => {
    describe('uncontrolled mode', () => {
        it('should return undefined selectedDate when no initial value is provided', () => {
            const { result } = renderHook(() => useSingleDate());

            expect(result.current.selectedDate).toBeUndefined();
        });

        it('should return a Date for the initial selected value', () => {
            const { result } = renderHook(() => useSingleDate({ year: 2025, month: 3, day: 15 }));

            expect(result.current.selectedDate).toStrictEqual(new Date(Date.UTC(2025, 2, 15)));
        });

        it('should update internal state when handleSelect is called', () => {
            const { result } = renderHook(() => useSingleDate());
            const newDate = new Date(Date.UTC(2025, 5, 10));

            act(() => {
                result.current.handleSelect(newDate, newDate, {}, {} as React.MouseEvent);
            });

            expect(result.current.selectedDate).toStrictEqual(newDate);
        });
    });

    describe('controlled mode', () => {
        it('should use the provided selected prop over internal state', () => {
            const selected = { year: 2025, month: 1, day: 1 };
            const { result } = renderHook(() => useSingleDate(selected));

            expect(result.current.selectedDate).toStrictEqual(new Date(Date.UTC(2025, 0, 1)));
        });

        it('should call onSelect callback when handleSelect is invoked', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleDate(undefined, onSelect));
            const newDate = new Date(Date.UTC(2025, 7, 20));

            act(() => {
                result.current.handleSelect(newDate, newDate, {}, {} as React.MouseEvent);
            });

            expect(onSelect).toHaveBeenCalledWith({ year: 2025, month: 8, day: 20 });
        });

        it('should reflect updated selected prop on rerender', () => {
            const { result, rerender } = renderHook(({ selected }) => useSingleDate(selected), {
                initialProps: {
                    selected: { year: 2025, month: 1, day: 1 },
                },
            });

            expect(result.current.selectedDate).toStrictEqual(new Date(Date.UTC(2025, 0, 1)));

            rerender({ selected: { year: 2025, month: 6, day: 15 } });

            expect(result.current.selectedDate).toStrictEqual(new Date(Date.UTC(2025, 5, 15)));
        });
    });
});
