/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTextTruncation } from '../useTextTruncation';

describe('useTextTruncation', () => {
    let mockElement: HTMLElement;
    let mockRef: { current: HTMLElement | null };
    let resizeCallback: (entries: ResizeObserverEntry[]) => void;

    beforeEach(() => {
        mockElement = document.createElement('div');
        mockElement.textContent = 'Test content';

        mockRef = { current: mockElement };

        global.ResizeObserver = vi.fn().mockImplementation((callback) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            resizeCallback = callback;
            return {
                observe: vi.fn(),
                disconnect: vi.fn(),
                unobserve: vi.fn(),
            };
        });
    });

    it('should not set up observer when ref is null', () => {
        const nullRef = { current: null };
        renderHook(() => useTextTruncation(nullRef));

        expect(ResizeObserver).not.toHaveBeenCalled();
    });

    it('should set up observer when ref is valid', () => {
        renderHook(() => useTextTruncation(mockRef));

        expect(ResizeObserver).toHaveBeenCalled();
    });

    it('should set title when content is truncated', () => {
        vi.spyOn(mockElement, 'scrollWidth', 'get').mockReturnValue(200);
        vi.spyOn(mockElement, 'clientWidth', 'get').mockReturnValue(100);

        renderHook(() => useTextTruncation(mockRef));

        resizeCallback([{ target: mockElement } as unknown as ResizeObserverEntry]);

        expect(mockElement.title).toBe('Test content');
    });

    it('should not set title when content is not truncated', () => {
        vi.spyOn(mockElement, 'scrollWidth', 'get').mockReturnValue(100);
        vi.spyOn(mockElement, 'clientWidth', 'get').mockReturnValue(200);

        renderHook(() => useTextTruncation(mockRef));

        resizeCallback([{ target: mockElement } as unknown as ResizeObserverEntry]);

        expect(mockElement.title).toBe('');
    });

    it('should handle empty text content', () => {
        mockElement.textContent = '';

        vi.spyOn(mockElement, 'scrollWidth', 'get').mockReturnValue(200);
        vi.spyOn(mockElement, 'clientWidth', 'get').mockReturnValue(100);

        renderHook(() => useTextTruncation(mockRef));

        resizeCallback([{ target: mockElement } as unknown as ResizeObserverEntry]);

        expect(mockElement.title).toBe('');
    });

    it('should clean up observer on unmount', () => {
        const disconnect = vi.fn();
        global.ResizeObserver = vi.fn().mockImplementation(() => ({
            observe: vi.fn(),
            disconnect,
            unobserve: vi.fn(),
        }));

        const { unmount } = renderHook(() => useTextTruncation(mockRef));
        unmount();

        expect(disconnect).toHaveBeenCalled();
    });

    it('should update title when dimensions change', () => {
        const scrollWidthSpy = vi.spyOn(mockElement, 'scrollWidth', 'get');
        const clientWidthSpy = vi.spyOn(mockElement, 'clientWidth', 'get');

        renderHook(() => useTextTruncation(mockRef));

        scrollWidthSpy.mockReturnValue(100);
        clientWidthSpy.mockReturnValue(200);
        resizeCallback([{ target: mockElement } as unknown as ResizeObserverEntry]);
        expect(mockElement.title).toBe('');

        scrollWidthSpy.mockReturnValue(200);
        clientWidthSpy.mockReturnValue(100);
        resizeCallback([{ target: mockElement } as unknown as ResizeObserverEntry]);
        expect(mockElement.title).toBe('Test content');
    });
});
