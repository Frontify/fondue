/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { Children } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { useAddCustomValueSupport } from '../useAddCustomValueSupport';

describe('useAddCustomValueSupport', () => {
    const initialItems = [
        { value: 'item1', label: 'Item 1' },
        { value: 'item2', label: 'Item 2' },
    ];

    it('should return initial menuSlots when custom value is not allowed', () => {
        const menuSlots = [<div key="test">Test Slot</div>];
        const setItems = vi.fn();

        const { result } = renderHook(() =>
            useAddCustomValueSupport(initialItems, menuSlots, 'New Item', false, setItems),
        );

        expect(result.current.valueExists).toBe(false);
        expect(result.current.allMenuSlots).toEqual(menuSlots);
        expect(setItems).toHaveBeenCalledWith(initialItems);
    });

    it('should add custom item when allowCustomValue is true and input does not exist', () => {
        const menuSlots = [<div key="test">Test Slot</div>];
        const setItems = vi.fn();

        const { result } = renderHook(() =>
            useAddCustomValueSupport(initialItems, menuSlots, 'New Item', true, setItems),
        );

        expect(result.current.valueExists).toBe(false);
        expect(result.current.allMenuSlots).toHaveLength(2);
        expect(setItems).toHaveBeenCalledWith([...initialItems, { label: 'New Item', value: 'New Item' }]);
    });

    it('should not add custom item when input already exists', () => {
        const menuSlots = [<div key="test">Test Slot</div>];
        const setItems = vi.fn();

        const { result } = renderHook(() =>
            useAddCustomValueSupport(initialItems, menuSlots, 'Item 1', true, setItems),
        );

        expect(result.current.valueExists).toBe(true);
        expect(result.current.allMenuSlots).toEqual(menuSlots);
        expect(setItems).toHaveBeenCalledWith(initialItems);
    });

    it('should handle non-array menuSlots correctly', () => {
        const menuSlots = <div key="test">Test Slot</div>;
        const setItems = vi.fn();

        const { result } = renderHook(() =>
            useAddCustomValueSupport(initialItems, menuSlots, 'New Item', true, setItems),
        );

        expect(result.current.valueExists).toBe(false);
        expect(Children.toArray(result.current.allMenuSlots)).toHaveLength(2);
        expect(setItems).toHaveBeenCalledWith([...initialItems, { label: 'New Item', value: 'New Item' }]);
    });

    it('should not add custom item when input is empty', () => {
        const menuSlots = [<div key="test">Test Slot</div>];
        const setItems = vi.fn();

        const { result } = renderHook(() => useAddCustomValueSupport(initialItems, menuSlots, '', true, setItems));

        expect(result.current.valueExists).toBe(false);
        expect(result.current.allMenuSlots).toEqual(menuSlots);
        expect(setItems).toHaveBeenCalledWith(initialItems);
    });

    it('should update when input changes', () => {
        const menuSlots = [<div key="test">Test Slot</div>];
        const setItems = vi.fn();

        const { result, rerender } = renderHook(
            ({ inputValue }) => useAddCustomValueSupport(initialItems, menuSlots, inputValue, true, setItems),
            { initialProps: { inputValue: '' } },
        );

        expect(result.current.valueExists).toBe(false);
        expect(result.current.allMenuSlots).toEqual(menuSlots);

        rerender({ inputValue: 'New Item' });

        expect(result.current.valueExists).toBe(false);
        expect(result.current.allMenuSlots).toHaveLength(2);
        expect(setItems).toHaveBeenCalledWith([...initialItems, { label: 'New Item', value: 'New Item' }]);
    });
});
