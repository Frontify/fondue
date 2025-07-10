/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getTextCoordinates } from './getTextCoordinates';

describe('getTextCoordinates', () => {
    it('returns expected coordinates for labelAngle < PI', () => {
        const result = getTextCoordinates(2, 25, [300, 300], false);
        expect(result).toEqual({ textAnchorX: 310, textAnchorY: 300 });
    });

    it('returns expected coordinates for labelAngle === PI', () => {
        const result = getTextCoordinates(Math.PI, 25, [0, 300], false);
        expect(result).toEqual({ textAnchorX: 10, textAnchorY: 300 });
    });

    it('returns expected coordinates for labelAngle > PI', () => {
        const result = getTextCoordinates(4, 25, [-300, 300], false);
        expect(result).toEqual({ textAnchorX: -335, textAnchorY: 300 });
    });

    it('returns flipped coordinates for labelAngle > PI', () => {
        const result = getTextCoordinates(4, 25, [-300, 300], true);
        expect(result).toEqual({
            textAnchorX: -290,
            textAnchorY: 300,
        });
    });
});
