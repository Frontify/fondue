/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTextWidths } from '@components/PieChart/hooks/useTextWidths';
import { type getSVGTextDimensions } from '@components/common/helpers';

vi.mock('@components/common/helpers', () => ({
    getSVGTextDimensions: vi.fn(),
}));

describe('useTextWidths', () => {
    let getSVGTextDimensionsMock: Mock<typeof getSVGTextDimensions>;

    beforeEach(async () => {
        const { getSVGTextDimensions } = await import('@components/common/helpers');
        vi.mocked(getSVGTextDimensions).mockImplementation((value: string) => ({ width: value.length, height: 0 }));
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
        expect(getSVGTextDimensionsMock).toHaveBeenCalledTimes(3);
    });
});
