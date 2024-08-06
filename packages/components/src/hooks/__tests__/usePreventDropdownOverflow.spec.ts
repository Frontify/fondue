/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { usePreventDropdownOverflow } from '../usePreventDropdownOverflow';

describe('usePreventDropdownOverflow', () => {
    it('sets up and tears down the resize event listener correctly', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => usePreventDropdownOverflow({ current: document.createElement('div') }));

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        act(() => {
            unmount();
        });

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('does not crash if ref is null', () => {
        const { result } = renderHook(() => usePreventDropdownOverflow({ current: null }));

        act(() => {
            result.current.setMaxHeight();
        });

        expect(true).toBe(true);
    });
});
