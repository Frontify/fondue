/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useMultiselect } from '../hooks/useMultiselect';

describe('useMultiselect', () => {
    describe('uncontrolled mode', () => {
        it('initializes with empty array when no defaultValue is provided', () => {
            const { result } = renderHook(() => useMultiselect());

            expect(result.current.selectedItemValues).toEqual([]);
        });

        it('initializes with defaultValue when provided', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a', 'b']));

            expect(result.current.selectedItemValues).toEqual(['a', 'b']);
        });

        it('adds an item when toggling a new item', () => {
            const { result } = renderHook(() => useMultiselect());

            act(() => {
                result.current.toggleSelectedItem('a');
            });

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('removes an item when toggling an already-selected item', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a', 'b', 'c']));

            act(() => {
                result.current.toggleSelectedItem('b');
            });

            expect(result.current.selectedItemValues).toEqual(['a', 'c']);
        });

        it('removes the first item when toggling the item at index 0', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a', 'b', 'c']));

            act(() => {
                result.current.toggleSelectedItem('a');
            });

            expect(result.current.selectedItemValues).toEqual(['b', 'c']);
        });

        it('does nothing when toggling undefined', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a']));

            act(() => {
                result.current.toggleSelectedItem(undefined);
            });

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('adds an empty string when toggling it as a new item', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a']));

            act(() => {
                result.current.toggleSelectedItem('');
            });

            expect(result.current.selectedItemValues).toEqual(['a', '']);
        });

        it('removes an empty string when toggling it as an already-selected item', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['', 'a']));

            act(() => {
                result.current.toggleSelectedItem('');
            });

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('clears all selected items', () => {
            const { result } = renderHook(() => useMultiselect(undefined, undefined, ['a', 'b']));

            act(() => {
                result.current.clear();
            });

            expect(result.current.selectedItemValues).toEqual([]);
        });

        it('supports multiple sequential toggles', () => {
            const { result } = renderHook(() => useMultiselect());

            act(() => {
                result.current.toggleSelectedItem('a');
            });
            act(() => {
                result.current.toggleSelectedItem('b');
            });
            act(() => {
                result.current.toggleSelectedItem('c');
            });

            expect(result.current.selectedItemValues).toEqual(['a', 'b', 'c']);

            act(() => {
                result.current.toggleSelectedItem('b');
            });

            expect(result.current.selectedItemValues).toEqual(['a', 'c']);
        });
    });

    describe('controlled mode', () => {
        it('uses the provided value instead of internal state', () => {
            const { result } = renderHook(() => useMultiselect(undefined, ['x', 'y']));

            expect(result.current.selectedItemValues).toEqual(['x', 'y']);
        });

        it('does not update internal state when toggling in controlled mode', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect, ['x']));

            act(() => {
                result.current.toggleSelectedItem('y');
            });

            // Value stays the same since it's controlled
            expect(result.current.selectedItemValues).toEqual(['x']);
        });

        it('calls onSelect with updated array when adding an item', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect, ['x']));

            act(() => {
                result.current.toggleSelectedItem('y');
            });

            expect(onSelect).toHaveBeenCalledWith(['x', 'y']);
        });

        it('calls onSelect with updated array when removing an item', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect, ['x', 'y']));

            act(() => {
                result.current.toggleSelectedItem('y');
            });

            expect(onSelect).toHaveBeenCalledWith(['x']);
        });

        it('calls onSelect with empty array on clear', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect, ['x', 'y']));

            act(() => {
                result.current.clear();
            });

            expect(onSelect).toHaveBeenCalledWith([]);
        });
    });

    describe('onSelect callback', () => {
        it('calls onSelect in uncontrolled mode when toggling', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect));

            act(() => {
                result.current.toggleSelectedItem('a');
            });

            expect(onSelect).toHaveBeenCalledWith(['a']);
        });

        it('calls onSelect in uncontrolled mode when clearing', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useMultiselect(onSelect, undefined, ['a', 'b']));

            act(() => {
                result.current.clear();
            });

            expect(onSelect).toHaveBeenCalledWith([]);
        });
    });
});
