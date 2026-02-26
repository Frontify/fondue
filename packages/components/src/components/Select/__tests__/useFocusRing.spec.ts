/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type FocusEvent, type MouseEvent } from 'react';
import { describe, expect, it } from 'vitest';

import { useFocusRing } from '../hooks/useFocusRing';

const createMockMouseEvent = (currentTarget: Partial<HTMLElement> = {}): MouseEvent<HTMLElement> => {
    return {
        currentTarget: {
            dataset: {},
            ...currentTarget,
        },
    } as unknown as MouseEvent<HTMLElement>;
};

const createMockFocusEvent = (target: Partial<HTMLElement> = {}): FocusEvent<HTMLElement> => {
    return {
        target: {
            dataset: {},
            ...target,
        },
    } as unknown as FocusEvent<HTMLElement>;
};

describe('useFocusRing', () => {
    it('initializes wasClickedRef as false', () => {
        const { result } = renderHook(() => useFocusRing());

        expect(result.current.wasClickedRef.current).toBe(false);
    });

    it('sets wasClickedRef to true and hides focus ring on mouseDown', () => {
        const { result } = renderHook(() => useFocusRing());
        const dataset: Record<string, string> = {};
        const event = createMockMouseEvent({ dataset });

        result.current.onMouseDown(event);

        expect(result.current.wasClickedRef.current).toBe(true);
        expect(dataset.showFocusRing).toBe('false');
    });

    it('shows focus ring on keyboard focus (when not clicked)', () => {
        const { result } = renderHook(() => useFocusRing());
        const dataset: Record<string, string> = {};
        const event = createMockFocusEvent({ dataset });

        result.current.onFocus(event);

        expect(dataset.showFocusRing).toBe('true');
    });

    it('does not show focus ring on focus after mouse click', () => {
        const { result } = renderHook(() => useFocusRing());
        const mouseDataset: Record<string, string> = {};
        const focusDataset: Record<string, string> = {};

        result.current.onMouseDown(createMockMouseEvent({ dataset: mouseDataset }));
        result.current.onFocus(createMockFocusEvent({ dataset: focusDataset }));

        expect(focusDataset.showFocusRing).toBeUndefined();
    });

    it('hides focus ring and resets wasClickedRef on blur', () => {
        const { result } = renderHook(() => useFocusRing());
        const dataset: Record<string, string> = {};

        // First click to set wasClickedRef
        result.current.onMouseDown(createMockMouseEvent({ dataset: {} }));
        expect(result.current.wasClickedRef.current).toBe(true);

        result.current.onBlur(createMockFocusEvent({ dataset }));

        expect(dataset.showFocusRing).toBe('false');
        expect(result.current.wasClickedRef.current).toBe(false);
    });

    it('allows keyboard focus ring after blur resets click state', () => {
        const { result } = renderHook(() => useFocusRing());
        const mouseDataset: Record<string, string> = {};
        const blurDataset: Record<string, string> = {};
        const focusDataset: Record<string, string> = {};

        // Click, then blur, then keyboard focus
        result.current.onMouseDown(createMockMouseEvent({ dataset: mouseDataset }));
        result.current.onBlur(createMockFocusEvent({ dataset: blurDataset }));
        result.current.onFocus(createMockFocusEvent({ dataset: focusDataset }));

        expect(focusDataset.showFocusRing).toBe('true');
    });
});
