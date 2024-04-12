/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getLineCoordinates } from '@components/PieChart/helpers/getLineCoordinates';

describe('getLineCoordinates', () => {
    it('returns expected coordinates for labelAngle < PI / 2', () => {
        const result = getLineCoordinates(Math.PI / 4, [100, -100], 200, false);
        expect(result).toEqual({
            x1: 173.53910524340094,
            x2: 194.75230867899737,
            x3: 209.75230867899737,
            y1: -173.53910524340097,
            y2: -194.7523086789974,
        });
    });

    it('returns expected coordinates for labelAngle === PI / 2', () => {
        const result = getLineCoordinates(Math.PI / 2, [100, 0], 200, false);
        expect(result).toEqual({
            x3: 249,
            x2: 234,
            y2: -8.205133554287266e-15,
            x1: 204,
            y1: -6.368163355566236e-15,
        });
    });

    it('returns expected coordinates for labelAngle > PI / 2 && labelAngle < PI', () => {
        const result = getLineCoordinates(Math.PI / 1.5, [100, 100], 200, false);
        expect(result).toEqual({
            x3: 231.0474041071148,
            x2: 216.0474041071148,
            y2: 166.99999999999997,
            x1: 190.06664199358164,
            y1: 152,
        });
    });

    it('returns expected coordinates for labelAngle === PI', () => {
        const result = getLineCoordinates(Math.PI, [0, 100], 200, false);
        expect(result).toEqual({
            x3: 15.000000000000009,
            x2: 8.205133554287266e-15,
            y2: 234,
            x1: 6.368163355566236e-15,
            y1: 204,
        });
    });

    it('returns expected coordinates for labelAngle > PI && labelAngle < 3 * PI / 2', () => {
        const result = getLineCoordinates(Math.PI * 1.3, [-100, 100], 200, false);
        expect(result).toEqual({
            x1: -184.13776741499453,
            x2: -208.40827724624296,
            x3: -223.40827724624296,
            y1: 161.1296662384172,
            y2: 178.7632238071914,
        });
    });

    it('returns expected coordinates for labelAngle  === 3 * PI / 2', () => {
        const result = getLineCoordinates(Math.PI * 1.5, [-100, 0], 200, false);
        expect(result).toEqual({
            x3: -249,
            x2: -234,
            y2: 0,
            x1: -204,
            y1: 0,
        });
    });

    it('returns expected coordinates for labelAngle > 3 * PI / 2 && labelAngle < 2 * PI', () => {
        const result = getLineCoordinates(Math.PI * 1.7, [-100, -100], 200, false);
        expect(result).toEqual({
            x3: -223.40827724624296,
            x2: -208.40827724624296,
            y2: -178.7632238071914,
            x1: -184.13776741499453,
            y1: -161.1296662384172,
        });
    });

    it('returns flipped orientation for labelAngle > 3 * PI / 2 && labelAngle < 2 * PI', () => {
        const result = getLineCoordinates(Math.PI * 1.7, [-100, -100], 200, true);
        expect(result).toEqual({
            x1: -184.13776741499453,
            x2: -208.40827724624296,
            x3: -193.40827724624296,
            y1: -161.1296662384172,
            y2: -178.76322380719137,
        });
    });
});
