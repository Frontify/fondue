/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PieArcDatum } from 'd3-shape';

import { type PieChartDatum } from '@components/PieChart';

export const resizeArcIfZero = (arc: PieArcDatum<PieChartDatum>, numArcs: number) => ({
    ...arc,
    startAngle: arc.startAngle === arc.endAngle ? arc.index * ((2 * Math.PI) / numArcs) : arc.startAngle,
    endAngle: arc.startAngle === arc.endAngle ? (arc.index + 1) * ((2 * Math.PI) / numArcs) : arc.endAngle,
});
