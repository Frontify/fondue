/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDateRange } from '../useDateRange';

const MARCH_RANGE = {
    from: { year: 2025, month: 3, day: 1 },
    to: { year: 2025, month: 3, day: 15 },
};

describe('useDateRange', () => {
    describe('uncontrolled mode', () => {
        it('should return undefined selectedDateRange when initialized with undefined', () => {
            const { result } = renderHook(() => useDateRange(undefined));

            expect(result.current.selectedDateRange).toBeUndefined();
        });

        it('should convert initial DatePickerDateRange to InternalDayPickerDateRange', () => {
            const { result } = renderHook(() => useDateRange(MARCH_RANGE));

            expect(result.current.selectedDateRange).toStrictEqual({
                from: new Date(Date.UTC(2025, 2, 1)),
                to: new Date(Date.UTC(2025, 2, 15)),
            });
        });

        it('should update internal state when handleSelect is called with a valid range', () => {
            const { result } = renderHook(() => useDateRange(undefined));

            act(() => {
                result.current.handleSelect(
                    { from: new Date(Date.UTC(2025, 4, 1)), to: new Date(Date.UTC(2025, 4, 10)) },
                    new Date(Date.UTC(2025, 4, 10)),
                    {},
                    {} as React.MouseEvent,
                );
            });

            expect(result.current.selectedDateRange).toStrictEqual({
                from: new Date(Date.UTC(2025, 4, 1)),
                to: new Date(Date.UTC(2025, 4, 10)),
            });
        });
    });

    describe('controlled mode', () => {
        it('should call onSelect callback when handleSelect is invoked with a valid range', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useDateRange(undefined, onSelect));

            act(() => {
                result.current.handleSelect(
                    { from: new Date(Date.UTC(2025, 0, 5)), to: new Date(Date.UTC(2025, 0, 25)) },
                    new Date(Date.UTC(2025, 0, 25)),
                    {},
                    {} as React.MouseEvent,
                );
            });

            expect(onSelect).toHaveBeenCalledWith({
                from: { year: 2025, month: 1, day: 5 },
                to: { year: 2025, month: 1, day: 25 },
            });
        });

        it('should not call onSelect when the transformed range is incomplete', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useDateRange(undefined, onSelect));

            act(() => {
                result.current.handleSelect(
                    { from: new Date(Date.UTC(2025, 0, 5)) },
                    new Date(Date.UTC(2025, 0, 5)),
                    {},
                    {} as React.MouseEvent,
                );
            });

            expect(onSelect).not.toHaveBeenCalled();
        });

        it('should reflect updated selected prop on rerender', () => {
            const { result, rerender } = renderHook(({ selected }) => useDateRange(selected), {
                initialProps: { selected: MARCH_RANGE as typeof MARCH_RANGE | undefined },
            });

            expect(result.current.selectedDateRange).toStrictEqual({
                from: new Date(Date.UTC(2025, 2, 1)),
                to: new Date(Date.UTC(2025, 2, 15)),
            });

            rerender({
                selected: {
                    from: { year: 2025, month: 6, day: 1 },
                    to: { year: 2025, month: 6, day: 30 },
                },
            });

            expect(result.current.selectedDateRange).toStrictEqual({
                from: new Date(Date.UTC(2025, 5, 1)),
                to: new Date(Date.UTC(2025, 5, 30)),
            });
        });
    });
});
