/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { getTooltipCoordinates } from '@components/common/components/Tooltip/helpers/getTooltipCoordinates';

describe('getTooltipDetails', () => {
    test('should return tooltip details', () => {
        const result = getTooltipCoordinates({ left: 10, top: 20 }, { left: 30, top: 40 });
        expect(result).toEqual({
            tooltipLeft: 10,
            tooltipTop: 40,
        });
    });

    test('should return tooltip details with horizontal', () => {
        const result = getTooltipCoordinates({ left: 10, top: 20 }, { left: 30, top: 40 }, true);
        expect(result).toEqual({
            tooltipLeft: 30,
            tooltipTop: 20,
        });
    });

    test('should return tooltip details with missing datum coords', () => {
        const result = getTooltipCoordinates({}, { left: 30, top: 40 }, true);
        expect(result).toEqual({
            tooltipLeft: 30,
            tooltipTop: 40,
        });
    });
});
