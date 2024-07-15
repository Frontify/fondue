/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTextWidths } from '@components/PieChart/hooks/useTextWidths';
import { getSVGTextDimensions } from '@components/common/helpers';

vi.mock('use-font-face-observer', () => ({
    default: vi.fn(),
}));

vi.mock('@components/common/helpers', () => ({
    getSVGTextDimensions: vi.fn(),
}));

describe('useTextWidths', () => {
    let useFontFaceObserverMock: Mock<() => boolean>;
    let getSVGTextDimensionsMock: Mock<typeof getSVGTextDimensions>;

    beforeEach(async () => {
        // @ts-expect-error Wrong export of types
        const { default: useFontFaceObserver } = await import('use-font-face-observer');
        const { getSVGTextDimensions } = await import('@components/common/helpers');
        vi.mocked(useFontFaceObserver).mockReturnValue(true);
        vi.mocked(getSVGTextDimensions).mockImplementation((value: string) => ({ width: value.length, height: 0 }));
        useFontFaceObserverMock = vi.mocked(useFontFaceObserver);
        getSVGTextDimensionsMock = vi.mocked(getSVGTextDimensions);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return the correct widths', () => {
        const { result } = renderHook(() => useTextWidths('label', 'someValue', 'percentage'));

        expect(result.current).toEqual({
            labelWidth: 5,
            valueWidth: 9,
            percentageWidth: 10,
        });
        expect(useFontFaceObserverMock).toHaveBeenCalled();
        expect(getSVGTextDimensionsMock).toHaveBeenCalledTimes(3);
    });

    it('should return the correct widths when font is not loaded and update once it is loaded', () => {
        useFontFaceObserverMock.mockReturnValue(false);
        const { result, rerender } = renderHook(() => useTextWidths('label', 'someValue', 'percentage'));

        expect(result.current).toEqual({
            labelWidth: 0,
            valueWidth: 0,
            percentageWidth: 0,
        });
        expect(useFontFaceObserverMock).toHaveBeenCalled();
        expect(getSVGTextDimensionsMock).toHaveBeenCalledTimes(0);

        useFontFaceObserverMock.mockReturnValue(true);
        rerender();

        expect(result.current).toEqual({
            labelWidth: 5,
            valueWidth: 9,
            percentageWidth: 10,
        });
        expect(getSVGTextDimensions).toHaveBeenCalledTimes(3);
    });
});
