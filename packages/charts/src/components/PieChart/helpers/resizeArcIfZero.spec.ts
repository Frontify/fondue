/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { describe, expect, it } from 'vitest';

import { type PieChartDatum } from '@components/PieChart';
import { resizeArcIfZero } from '@components/PieChart/helpers/resizeArcIfZero';

const NON_ZERO_ARC = {
    startAngle: 0.23,
    endAngle: 1.34,
    index: 0,
    data: { label: 'foo', value: 3 },
} as PieArcDatum<PieChartDatum>;

const ZERO_ARC = {
    startAngle: 0,
    endAngle: 0,
    index: 0,
    data: { label: 'foo', value: 3 },
} as PieArcDatum<PieChartDatum>;

describe('resizeArcIfZero', () => {
    it('returns original arc if startAngle and endAngle are not equal', () => {
        expect(resizeArcIfZero(NON_ZERO_ARC, 1)).toEqual(NON_ZERO_ARC);
        expect(resizeArcIfZero(NON_ZERO_ARC, 2)).toEqual(NON_ZERO_ARC);
        expect(resizeArcIfZero(NON_ZERO_ARC, 3)).toEqual(NON_ZERO_ARC);
        expect(resizeArcIfZero({ ...NON_ZERO_ARC, index: 1 }, 2)).toEqual({ ...NON_ZERO_ARC, index: 1 });
        expect(resizeArcIfZero({ ...NON_ZERO_ARC, index: 1 }, 3)).toEqual({ ...NON_ZERO_ARC, index: 1 });
        expect(resizeArcIfZero({ ...NON_ZERO_ARC, index: 2 }, 3)).toEqual({ ...NON_ZERO_ARC, index: 2 });
    });

    it('returns resized arc if startAngle and endAngle are equal, single arc', () => {
        const result = resizeArcIfZero(ZERO_ARC, 1);
        expect(result).toEqual({ ...ZERO_ARC, startAngle: 0, endAngle: 2 * Math.PI });
    });

    it('returns resized arc if startAngle and endAngle are equal, two arcs', () => {
        const firstArc = resizeArcIfZero(ZERO_ARC, 2);
        expect(firstArc).toEqual({ ...ZERO_ARC, startAngle: 0, endAngle: Math.PI });
        const secondArc = resizeArcIfZero({ ...ZERO_ARC, index: 1 }, 2);
        expect(secondArc).toEqual({ ...ZERO_ARC, index: 1, startAngle: Math.PI, endAngle: 2 * Math.PI });
    });

    it('returns resized arc if startAngle and endAngle are equal, three arcs', () => {
        const firstArc = resizeArcIfZero(ZERO_ARC, 3);
        expect(firstArc).toEqual({ ...ZERO_ARC, startAngle: 0, endAngle: (2 * Math.PI) / 3 });
        const secondArc = resizeArcIfZero({ ...ZERO_ARC, index: 1 }, 3);
        expect(secondArc).toEqual({
            ...ZERO_ARC,
            index: 1,
            startAngle: (2 * Math.PI) / 3,
            endAngle: (4 * Math.PI) / 3,
        });
        const thirdArc = resizeArcIfZero({ ...ZERO_ARC, index: 2 }, 3);
        expect(thirdArc).toEqual({ ...ZERO_ARC, index: 2, startAngle: (4 * Math.PI) / 3, endAngle: 2 * Math.PI });
    });
});
