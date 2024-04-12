/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AxisScale } from '@visx/axis';
import { describe, expect, test } from 'vitest';

import { getCrosshairBarWidth } from './getCrosshairBarWidth';

const BANDWIDTH = 10;
const PADDING_INNER = 0.1;
const PADDING_OUTER = 0.2;
const SCALE_PADDING = 0.15;

const BAND_SCALE = {
    bandwidth: () => BANDWIDTH,
    paddingInner: () => PADDING_INNER,
    paddingOuter: () => PADDING_OUTER,
} as AxisScale;

const NON_BAND_SCALE = {} as AxisScale;

describe('getCrosshairBarWidth', () => {
    test('returs correct value with band scale', () => {
        let xScale = BAND_SCALE;
        let yScale = NON_BAND_SCALE;
        const expected = BANDWIDTH * (1 + PADDING_INNER + PADDING_OUTER);

        const resultVertical = getCrosshairBarWidth(false, SCALE_PADDING, xScale, yScale);
        expect(resultVertical).toBe(expected);

        xScale = NON_BAND_SCALE;
        yScale = BAND_SCALE;
        const resultHorizontal = getCrosshairBarWidth(true, SCALE_PADDING, xScale, yScale);
        expect(resultHorizontal).toBe(expected);
    });

    test('returs zero with non-band scale', () => {
        let xScale = NON_BAND_SCALE;
        let yScale = BAND_SCALE;

        const resultVertical = getCrosshairBarWidth(false, SCALE_PADDING, xScale, yScale);
        expect(resultVertical).toBe(0);

        xScale = BAND_SCALE;
        yScale = NON_BAND_SCALE;
        const resultHorizontal = getCrosshairBarWidth(true, SCALE_PADDING, xScale, yScale);
        expect(resultHorizontal).toBe(0);
    });
});
