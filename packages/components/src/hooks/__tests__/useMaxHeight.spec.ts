/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useMaxHeight } from '../useMaxHeight';

describe('useMaxHeight', () => {
    it('sets up and tears down the resize event listener correctly', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useMaxHeight({ current: document.createElement('div') }));

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        act(() => {
            unmount();
        });

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('does not crash if ref is null', () => {
        const { result } = renderHook(() => useMaxHeight({ current: null }));

        act(() => {
            result.current.triggerMaxHeightDefinition();
        });

        expect(true).toBe(true);
    });
});
