/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getAreaFillColors } from '@components/LineChart/helpers/getAreaFillColors';
import { WEAK_COLORS, WEAK_COLOR_NO_DATA } from '@theme/consts';

describe('getAreaFillColors', () => {
    it('correct colors for three data sets and no missing data', () => {
        const colors = getAreaFillColors(3, 0);
        expect(colors).toEqual(WEAK_COLORS);
    });

    it('correct colors for two data sets and two missing data sets', () => {
        const colors = getAreaFillColors(2, 2);
        expect(colors).toEqual([WEAK_COLORS[0], WEAK_COLORS[1], WEAK_COLOR_NO_DATA, WEAK_COLOR_NO_DATA]);
    });

    it('correct colors for one data set and three missing data sets', () => {
        const colors = getAreaFillColors(1, 3);
        expect(colors).toEqual([WEAK_COLORS[0], WEAK_COLOR_NO_DATA, WEAK_COLOR_NO_DATA, WEAK_COLOR_NO_DATA]);
    });

    it('correct colors for five data sets and two missing data sets', () => {
        const colors = getAreaFillColors(5, 2);
        expect(colors).toEqual([
            WEAK_COLORS[0],
            WEAK_COLORS[1],
            WEAK_COLORS[2],
            WEAK_COLORS[0],
            WEAK_COLORS[1],
            WEAK_COLOR_NO_DATA,
            WEAK_COLOR_NO_DATA,
        ]);
    });
});
