/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useIndeterminateValues } from '../hooks/useIndeterminateValues';

const onItemSelect = vi.fn();

const renderIndeterminateValues = (indeterminateValues?: string[], selectedItemValues: string[] = []) =>
    renderHook(
        ({ indeterminate, selected }: { indeterminate?: string[]; selected: string[] }) =>
            useIndeterminateValues(indeterminate, selected, onItemSelect),
        { initialProps: { indeterminate: indeterminateValues, selected: selectedItemValues } },
    );

describe('useIndeterminateValues', () => {
    it('returns no values when none are provided', () => {
        const { result } = renderIndeterminateValues();

        expect(result.current.indeterminateItemValues).toEqual([]);
        expect(result.current.hasIndeterminateValues).toBe(false);
    });

    it('treats a value that is also selected as selected', () => {
        const { result } = renderIndeterminateValues(['a', 'b'], ['a']);

        expect(result.current.indeterminateItemValues).toEqual(['b']);
    });

    it('forwards every selection and stops reporting the selected value', () => {
        const { result } = renderIndeterminateValues(['a', 'b']);

        act(() => {
            result.current.handleItemSelect('a');
        });

        expect(onItemSelect).toHaveBeenCalledWith('a');
        expect(result.current.indeterminateItemValues).toEqual(['b']);
    });

    it('does not report a value again after it is selected and then deselected', () => {
        const { result, rerender } = renderIndeterminateValues(['a']);

        act(() => {
            result.current.handleItemSelect('a');
        });
        // Selected, so the checkmark takes over from the dash.
        rerender({ indeterminate: ['a'], selected: ['a'] });
        expect(result.current.indeterminateItemValues).toEqual([]);

        // Deselected again — this must not fall back to a dash.
        rerender({ indeterminate: ['a'], selected: [] });
        expect(result.current.indeterminateItemValues).toEqual([]);
    });

    it('drops every value when the field is cleared', () => {
        const { result } = renderIndeterminateValues(['a', 'b']);

        act(() => {
            result.current.clearIndeterminate();
        });

        expect(result.current.indeterminateItemValues).toEqual([]);
    });

    it('keeps the remaining values when the same set arrives in a new array', () => {
        const { result, rerender } = renderIndeterminateValues(['a', 'b']);

        act(() => {
            result.current.handleItemSelect('a');
        });
        // A consumer passing an inline array re-creates it on every render.
        rerender({ indeterminate: ['a', 'b'], selected: [] });

        expect(result.current.indeterminateItemValues).toEqual(['b']);
    });

    it('re-seeds when a different set of values is provided', () => {
        const { result, rerender } = renderIndeterminateValues(['a']);

        act(() => {
            result.current.handleItemSelect('a');
        });
        expect(result.current.indeterminateItemValues).toEqual([]);

        // A new set describes a different group of records, so 'a' is partially applied again.
        rerender({ indeterminate: ['a', 'c'], selected: [] });

        expect(result.current.indeterminateItemValues).toEqual(['a', 'c']);
    });

    it('ignores values that are not partially applied', () => {
        const { result } = renderIndeterminateValues(['a']);

        act(() => {
            result.current.handleItemSelect('unrelated');
        });

        expect(result.current.indeterminateItemValues).toEqual(['a']);
    });
});
