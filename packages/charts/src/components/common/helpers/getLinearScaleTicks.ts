/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createScale } from '@visx/scale';

export const getLinearScaleTicks = (
    domain: [number, number],
    maxNumberOfTicks: number,
    allowDecimalValues = true,
): number[] => {
    const min = domain[0] > 0 ? 0 : domain[0];
    const max = domain[1] < 0 ? 0 : domain[1];
    const scale = createScale({ type: 'linear', domain: [min, max] });
    const ticks = scale.ticks(maxNumberOfTicks);

    return allowDecimalValues ? ticks : getNonDecimalTickValues(ticks);
};

const getNonDecimalTickValues = (ticks: number[]): number[] => {
    return ticks.filter((tick) => tick % 1 === 0);
};
