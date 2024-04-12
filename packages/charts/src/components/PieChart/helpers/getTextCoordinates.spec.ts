/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getTextCoordinates } from './getTextCoordinates';

describe('getTextCoordinates', () => {
    it('returns expected coordinates for labelAngle < PI', () => {
        const result = getTextCoordinates(2, 25, [300, 300], false);
        expect(result).toEqual({ textAnchorX: 305, textAnchorY: 300 });
    });

    it('returns expected coordinates for labelAngle === PI', () => {
        const result = getTextCoordinates(Math.PI, 25, [0, 300], false);
        expect(result).toEqual({ textAnchorX: 5, textAnchorY: 300 });
    });

    it('returns expected coordinates for labelAngle > PI', () => {
        const result = getTextCoordinates(4, 25, [-300, 300], false);
        expect(result).toEqual({ textAnchorX: -330, textAnchorY: 300 });
    });

    it('returns flipped coordinates for labelAngle > PI', () => {
        const result = getTextCoordinates(4, 25, [-300, 300], true);
        expect(result).toEqual({
            textAnchorX: -295,
            textAnchorY: 300,
        });
    });
});
