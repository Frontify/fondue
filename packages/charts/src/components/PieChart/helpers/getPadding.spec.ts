/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getPadding } from '@components/PieChart/helpers/getPadding';

describe('getPadding', () => {
    it('returns expected padding for labelAngle < PI/2', () => {
        const result = getPadding(0.3, 200, 23, [300, -300], 20, 20);
        expect(result).toEqual({ paddingTop: 120, paddingRight: 133, paddingLeft: 0, paddingBottom: 0 });
    });

    it('returns expected padding for labelAngle > PI/2 && labelAngle < PI', () => {
        const result = getPadding(1.9, 200, 23, [300, 300], 20, 20);
        expect(result).toEqual({ paddingTop: 0, paddingRight: 133, paddingLeft: 0, paddingBottom: 120 });
    });

    it('returns expected padding for labelAngle > PI && labelAngle < PI*1.5', () => {
        const result = getPadding(3.6, 200, 23, [300, -300], 20, 20);
        expect(result).toEqual({ paddingTop: 0, paddingRight: 0, paddingLeft: 110, paddingBottom: 120 });
    });

    it('returns expected padding for labelAngle > PI*1.5', () => {
        const result = getPadding(5, 200, 23, [-300, -300], 20, 20);
        expect(result).toEqual({ paddingTop: 120, paddingRight: 0, paddingLeft: 110, paddingBottom: 0 });
    });

    it('returns expected padding for labelAngle === PI/2', () => {
        const result = getPadding(Math.PI / 2, 200, 23, [300, 0], 20, 20);
        expect(result).toEqual({ paddingTop: 0, paddingRight: 133, paddingLeft: 0, paddingBottom: 0 });
    });

    it('returns expected padding for labelAngle === PI', () => {
        const result = getPadding(Math.PI, 200, 23, [0, 300], 20, 20);
        expect(result).toEqual({ paddingTop: 0, paddingRight: 0, paddingLeft: 0, paddingBottom: 120 });
    });

    it('returns expected padding for labelAngle === PI*1.5', () => {
        const result = getPadding(Math.PI * 1.5, 200, 23, [-300, 0], 20, 20);
        expect(result).toEqual({ paddingTop: 0, paddingRight: 0, paddingLeft: 110, paddingBottom: 0 });
    });
});
