/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MAX_HEIGHT_MARGIN, setMaxHeight, useMaxHeight } from '../useMaxHeight';

describe('setMaxHeight', () => {
    it('should set maxHeight based on viewport size and top offset', () => {
        const dialog = document.createElement('div');
        document.body.appendChild(document.createElement('div'));

        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
        Object.defineProperty(dialog, 'getBoundingClientRect', {
            writable: true,
            value: () => ({
                top: 150,
            }),
        });

        setMaxHeight(dialog);
        const expectedMaxHeight = `${800 - (150 + MAX_HEIGHT_MARGIN)}px`;
        expect(dialog.style.maxHeight).toBe(expectedMaxHeight);
    });
});

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
