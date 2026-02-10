/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSingleSelect } from '../hooks/useSingleSelect';

describe('useSingleSelect', () => {
    describe('uncontrolled mode', () => {
        it('initializes with empty selection when no defaultValue is provided', () => {
            const { result } = renderHook(() => useSingleSelect());

            expect(result.current.selectedItemValues).toEqual([]);
        });

        it('initializes with defaultValue when provided', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, undefined, 'a'));

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('selects an item', () => {
            const { result } = renderHook(() => useSingleSelect());

            act(() => {
                result.current.selectItem('a');
            });

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('deselects an item when selecting the same item again', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, undefined, 'a'));

            act(() => {
                result.current.selectItem('a');
            });

            expect(result.current.selectedItemValues).toEqual([]);
        });

        it('replaces the selected item when selecting a different item', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, undefined, 'a'));

            act(() => {
                result.current.selectItem('b');
            });

            expect(result.current.selectedItemValues).toEqual(['b']);
        });

        it('does nothing when selecting undefined', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, undefined, 'a'));

            act(() => {
                result.current.selectItem(undefined);
            });

            expect(result.current.selectedItemValues).toEqual(['a']);
        });

        it('clears the selection', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, undefined, 'a'));

            act(() => {
                result.current.clear();
            });

            expect(result.current.selectedItemValues).toEqual([]);
        });
    });

    describe('controlled mode', () => {
        it('uses the provided value', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, 'x'));

            expect(result.current.selectedItemValues).toEqual(['x']);
        });

        it('returns empty array when controlled value is null', () => {
            const { result } = renderHook(() => useSingleSelect(undefined, null));

            expect(result.current.selectedItemValues).toEqual([]);
        });

        it('does not update internal state when selecting in controlled mode', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect, 'x'));

            act(() => {
                result.current.selectItem('y');
            });

            // Value stays the same since it's controlled
            expect(result.current.selectedItemValues).toEqual(['x']);
        });

        it('calls onSelect with new value when selecting a different item', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect, 'x'));

            act(() => {
                result.current.selectItem('y');
            });

            expect(onSelect).toHaveBeenCalledWith('y');
        });

        it('calls onSelect with null when toggling the same item off', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect, 'x'));

            act(() => {
                result.current.selectItem('x');
            });

            expect(onSelect).toHaveBeenCalledWith(null);
        });

        it('calls onSelect with null on clear', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect, 'x'));

            act(() => {
                result.current.clear();
            });

            expect(onSelect).toHaveBeenCalledWith(null);
        });
    });

    describe('onSelect callback', () => {
        it('calls onSelect in uncontrolled mode when selecting', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect));

            act(() => {
                result.current.selectItem('a');
            });

            expect(onSelect).toHaveBeenCalledWith('a');
        });

        it('calls onSelect in uncontrolled mode when clearing', () => {
            const onSelect = vi.fn();
            const { result } = renderHook(() => useSingleSelect(onSelect, undefined, 'a'));

            act(() => {
                result.current.clear();
            });

            expect(onSelect).toHaveBeenCalledWith(null);
        });
    });
});
