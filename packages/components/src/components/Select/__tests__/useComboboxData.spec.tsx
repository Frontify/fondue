/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ForwardedRefSelectItem } from '../SelectItem';
import { useComboboxData } from '../useComboboxData';

describe('useComboboxData', () => {
    const initialItems = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
    ];

    const initialMenuSlots = [
        <ForwardedRefSelectItem key="apple" value="apple">
            Apple
        </ForwardedRefSelectItem>,
        <ForwardedRefSelectItem key="banana" value="banana">
            Banana
        </ForwardedRefSelectItem>,
        <ForwardedRefSelectItem key="cherry" value="cherry">
            Cherry
        </ForwardedRefSelectItem>,
    ];

    it('should return all items when filterText is empty', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, '', false));
        expect(result.current.items).toEqual(initialItems);
        expect(result.current.menuSlots).toEqual(initialMenuSlots);
    });

    it('should filter items based on filterText', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'ba', false));
        expect(result.current.items).toEqual([{ label: 'Banana', value: 'banana' }]);
    });

    it('should add custom item when allowCustomValue is true and value does not exist', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'Grape', true));
        expect(result.current.items).toContainEqual({ label: 'Grape', value: 'Grape' });
        expect(result.current.menuSlots.length).toBe(initialMenuSlots.length + 1);
    });

    it('should not add custom item when allowCustomValue is false', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'Grape', false));
        expect(result.current.items).toEqual([]);
        expect(result.current.menuSlots).toEqual(initialMenuSlots);
    });

    it('should set valueExists to true when filterText matches an existing item', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'Apple', true));
        expect(result.current.valueExists).toBe(true);
        expect(result.current.existingValueItem).toEqual({ label: 'Apple', value: 'apple' });
    });

    it('should set valueExists to false when filterText does not match any existing item', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'Grape', true));
        expect(result.current.valueExists).toBe(false);
        expect(result.current.existingValueItem).toBeUndefined();
    });

    it('should be case-insensitive when filtering and checking for existing values', () => {
        const { result } = renderHook(() => useComboboxData(initialItems, initialMenuSlots, 'bAnAnA', true));
        expect(result.current.items).toEqual([{ label: 'Banana', value: 'banana' }]);
        expect(result.current.valueExists).toBe(true);
        expect(result.current.existingValueItem).toEqual({ label: 'Banana', value: 'banana' });
    });
});
