/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getFormattedTooltipDate } from './getFormattedTooltipDate';

const MAY_FIRST = new Date('2026-05-01T12:00:00Z');

describe('getFormattedTooltipDate', () => {
    it('should show the full date by default', () => {
        expect(getFormattedTooltipDate(MAY_FIRST, 'en-US')).toBe('May 01, 2026');
    });

    it('should show the month and year for monthly data', () => {
        expect(getFormattedTooltipDate(MAY_FIRST, 'en-US', 'month')).toBe('May 2026');
    });
});
