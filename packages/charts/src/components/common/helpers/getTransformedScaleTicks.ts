/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getTransformedScaleTicks = (domain: [number, number], numTicks: number) => {
    const [min, max] = domain;
    const step = (max - min) / (numTicks - 1);
    const ticks = Array.from({ length: numTicks }).map((_, i) => Math.ceil(i * step));
    return ticks;
};
