/* (c) Copyright Frontify Ltd., all rights reserved. */

import createLinearScale from '@visx/scale/lib/scales/linear';

export const getLinearScaleTicks = (
    domain: [number, number],
    maxNumberOfTicks: number,
    allowDecimalValues = true,
): number[] => {
    const min = domain[0] > 0 ? 0 : domain[0];
    const max = domain[1] < 0 ? 0 : domain[1];
    const scale = createLinearScale({ domain: [min, max] });
    const ticks = scale.ticks(maxNumberOfTicks);

    return allowDecimalValues ? ticks : getNonDecimalTickValues(ticks);
};

const getNonDecimalTickValues = (ticks: number[]): number[] => {
    return ticks.filter((tick) => tick % 1 === 0);
};
