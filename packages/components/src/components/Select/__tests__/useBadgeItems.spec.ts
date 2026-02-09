/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useBadgeItems } from '../hooks/useBadgeItems';

const createGetItemByValue =
    (items: Record<string, { value: string; label: string }>) =>
    (value?: string): { value: string; label: string } | undefined => {
        if (!value) {
            return undefined;
        }
        return items[value];
    };

describe('useBadgeItems', () => {
    it('returns empty array when no items are selected', () => {
        const getItemByValue = vi.fn().mockReturnValue(undefined);
        const { result } = renderHook(() => useBadgeItems([], getItemByValue));

        expect(result.current).toEqual([]);
    });

    it('maps selected values to badge items with labels', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
            b: { value: 'b', label: 'Beta' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useBadgeItems(['a', 'b'], getItemByValue));

        expect(result.current).toEqual([
            { value: 'a', displayValue: 'Alpha' },
            { value: 'b', displayValue: 'Beta' },
        ]);
    });

    it('falls back to value string when item is not found', () => {
        const getItemByValue = vi.fn().mockReturnValue(undefined);

        const { result } = renderHook(() => useBadgeItems(['unknown'], getItemByValue));

        expect(result.current).toEqual([{ value: 'unknown', displayValue: 'unknown' }]);
    });

    it('uses label from item when available', () => {
        const items = {
            x: { value: 'x', label: 'Custom Label' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useBadgeItems(['x'], getItemByValue));

        expect(result.current[0].displayValue).toBe('Custom Label');
    });

    it('handles mixed found and not-found items', () => {
        const items = {
            a: { value: 'a', label: 'Found' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useBadgeItems(['a', 'missing'], getItemByValue));

        expect(result.current).toEqual([
            { value: 'a', displayValue: 'Found' },
            { value: 'missing', displayValue: 'missing' },
        ]);
    });

    it('memoizes result when inputs do not change', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
        };
        const getItemByValue = createGetItemByValue(items);
        const selectedValues = ['a'];

        const { result, rerender } = renderHook(() => useBadgeItems(selectedValues, getItemByValue));

        const firstResult = result.current;
        rerender();
        const secondResult = result.current;

        expect(firstResult).toBe(secondResult);
    });
});
