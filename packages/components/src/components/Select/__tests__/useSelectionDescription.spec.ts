/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSelectionDescription } from '../hooks/useSelectionDescription';

const createGetItemByValue =
    (items: Record<string, { value: string; label: string }>) =>
    (value?: string): { value: string; label: string } | undefined => {
        if (!value) {
            return undefined;
        }
        return items[value];
    };

describe('useSelectionDescription', () => {
    it('returns a unique selectionDescriptionId', () => {
        const getItemByValue = vi.fn().mockReturnValue(undefined);
        const { result } = renderHook(() => useSelectionDescription(true, [], getItemByValue));

        expect(result.current.selectionDescriptionId).toBeDefined();
        expect(typeof result.current.selectionDescriptionId).toBe('string');
    });

    it('returns empty string when isMultiple is false', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useSelectionDescription(false, ['a'], getItemByValue));

        expect(result.current.selectionDescription).toBe('');
    });

    it('returns empty string when no items are selected in multiple mode', () => {
        const getItemByValue = vi.fn().mockReturnValue(undefined);

        const { result } = renderHook(() => useSelectionDescription(true, [], getItemByValue));

        expect(result.current.selectionDescription).toBe('');
    });

    it('returns description with count and labels for selected items', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
            b: { value: 'b', label: 'Beta' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useSelectionDescription(true, ['a', 'b'], getItemByValue));

        expect(result.current.selectionDescription).toBe('2 selected: Alpha, Beta');
    });

    it('returns description with single selected item', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useSelectionDescription(true, ['a'], getItemByValue));

        expect(result.current.selectionDescription).toBe('1 selected: Alpha');
    });

    it('falls back to value when item is not found by getItemByValue', () => {
        const getItemByValue = vi.fn().mockReturnValue(undefined);

        const { result } = renderHook(() => useSelectionDescription(true, ['unknown'], getItemByValue));

        expect(result.current.selectionDescription).toBe('1 selected: unknown');
    });

    it('handles mix of found and not-found items', () => {
        const items = {
            a: { value: 'a', label: 'Alpha' },
        };
        const getItemByValue = createGetItemByValue(items);

        const { result } = renderHook(() => useSelectionDescription(true, ['a', 'missing'], getItemByValue));

        expect(result.current.selectionDescription).toBe('2 selected: Alpha, missing');
    });
});
