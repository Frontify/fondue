/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useRangeHover } from '../useRangeHover';

const DISABLED_MODIFIERS = {
    hoverBefore: false,
    hoverAfter: false,
    hoverSelected: false,
};

describe('useRangeHover', () => {
    it('should return disabled modifiers when no range is provided', () => {
        const { result } = renderHook(() => useRangeHover(undefined));

        expect(result.current.hoverModifiers).toStrictEqual(DISABLED_MODIFIERS);
    });

    it('should return disabled modifiers when from is missing', () => {
        const { result } = renderHook(() => useRangeHover({ from: undefined, to: new Date(Date.UTC(2025, 2, 15)) }));

        expect(result.current.hoverModifiers).toStrictEqual(DISABLED_MODIFIERS);
    });

    it('should return disabled modifiers when to is missing', () => {
        const { result } = renderHook(() => useRangeHover({ from: new Date(Date.UTC(2025, 2, 1)) }));

        expect(result.current.hoverModifiers).toStrictEqual(DISABLED_MODIFIERS);
    });

    it('should return disabled modifiers when range is valid (to > from)', () => {
        const from = new Date(Date.UTC(2025, 2, 1));
        const to = new Date(Date.UTC(2025, 2, 15));
        const { result } = renderHook(() => useRangeHover({ from, to }));

        expect(result.current.hoverModifiers).toStrictEqual(DISABLED_MODIFIERS);
    });

    it('should return active modifiers when to equals from (same day selection)', () => {
        const date = new Date(Date.UTC(2025, 2, 10));
        const { result } = renderHook(() => useRangeHover({ from: date, to: date }));

        expect(result.current.hoverModifiers).toStrictEqual({
            hoverBefore: { before: date },
            hoverAfter: { after: date },
            hoverSelected: date,
        });
    });

    it('should return active modifiers when to is before from (reversed range)', () => {
        const from = new Date(Date.UTC(2025, 2, 15));
        const to = new Date(Date.UTC(2025, 2, 1));
        const { result } = renderHook(() => useRangeHover({ from, to }));

        expect(result.current.hoverModifiers).toStrictEqual({
            hoverBefore: { before: from },
            hoverAfter: { after: to },
            hoverSelected: from,
        });
    });

    it('should update modifiers when the range changes', () => {
        const from = new Date(Date.UTC(2025, 2, 10));
        const to = new Date(Date.UTC(2025, 2, 10));

        const { result, rerender } = renderHook(({ range }) => useRangeHover(range), {
            initialProps: { range: { from, to } as { from: Date; to: Date } | undefined },
        });

        expect(result.current.hoverModifiers.hoverSelected).toStrictEqual(from);

        rerender({
            range: {
                from: new Date(Date.UTC(2025, 2, 1)),
                to: new Date(Date.UTC(2025, 2, 20)),
            },
        });

        expect(result.current.hoverModifiers).toStrictEqual(DISABLED_MODIFIERS);
    });
});
