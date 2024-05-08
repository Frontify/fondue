/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useControllableState } from '../useControllableState';

describe('useControllableState', () => {
    it('should return default value when uncontrolled', () => {
        const { result } = renderHook(() => useControllableState({ defaultProp: 'default' }));

        expect(result.current[0]).toBe('default');
    });

    it('should return prop value when controlled', () => {
        const { result } = renderHook(() => useControllableState({ prop: 'controlled', defaultProp: 'default' }));

        expect(result.current[0]).toBe('controlled');
    });

    it('should call onChange callback when value changes', () => {
        const onChange = vi.fn();
        const { result } = renderHook(() => useControllableState({ defaultProp: 'default', onChange }));

        expect(result.current[0]).toBe('default');

        act(() => {
            result.current[1]('new value');
        });

        expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should update value when controlled prop changes', () => {
        const { result, rerender } = renderHook(({ prop }) => useControllableState({ prop, defaultProp: 'default' }), {
            initialProps: { prop: 'initial' },
        });

        expect(result.current[0]).toBe('initial');

        act(() => {
            rerender({ prop: 'updated' });
        });

        expect(result.current[0]).toBe('updated');
    });

    it('should update value when uncontrolled value changes', () => {
        const { result } = renderHook(() => useControllableState({ defaultProp: 'default' }));

        act(() => {
            result.current[1]('new value');
        });

        expect(result.current[0]).toBe('new value');
    });
});
