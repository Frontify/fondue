/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getDateTickLabel, getFirstDateTickLabel } from './getDateTickLabel';

const MAY_FIRST = new Date('2026-05-01T12:00:00Z');

describe('getDateTickLabel', () => {
    it('should show the day by default', () => {
        expect(getDateTickLabel(MAY_FIRST, 'en-US')).toBe('May 01');
    });

    it('should show the month and year for monthly data', () => {
        expect(getDateTickLabel(MAY_FIRST, 'en-US', 'month')).toBe('May 26');
    });

    it('should label the first date of the first series', () => {
        const series = [{ name: 'foo', dataPoints: [{ timestamp: MAY_FIRST, value: 1 }] }];

        expect(getFirstDateTickLabel(series, 'en-US', 'month')).toBe('May 26');
        expect(getFirstDateTickLabel([{ name: 'foo', dataPoints: [] }], 'en-US')).toBeUndefined();
    });
});
