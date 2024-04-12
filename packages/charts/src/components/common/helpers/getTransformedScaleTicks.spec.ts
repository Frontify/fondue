/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { getTransformedScaleTicks } from './getTransformedScaleTicks';

describe('getTransformedScaleTicks', () => {
    it('should get linear scale ticks for normal linear scale', () => {
        const domain1: [number, number] = [0, 100];
        const numTicks1 = 5;
        const result1 = getTransformedScaleTicks(domain1, numTicks1);
        expect(result1).toEqual([0, 25, 50, 75, 100]);

        const domain2: [number, number] = [0, 6000];
        const numTicks2 = 3;
        const result2 = getTransformedScaleTicks(domain2, numTicks2);
        expect(result2).toEqual([0, 3000, 6000]);

        const domain3: [number, number] = [0, 9000];
        const numTicks3 = 6;
        const result3 = getTransformedScaleTicks(domain3, numTicks3);
        expect(result3).toEqual([0, 1800, 3600, 5400, 7200, 9000]);
    });

    it('should get linear scale ticks for storage linear scale', () => {
        const domain1: [number, number] = [0, 10240];
        const numTicks1 = 5;
        const result1 = getTransformedScaleTicks(domain1, numTicks1);
        expect(result1).toEqual([0, 2560, 5120, 7680, 10240]);

        const domain2: [number, number] = [0, 2048];
        const numTicks2 = 3;
        const result2 = getTransformedScaleTicks(domain2, numTicks2);
        expect(result2).toEqual([0, 1024, 2048]);

        const domain3: [number, number] = [0, 614400];
        const numTicks3 = 6;
        const result3 = getTransformedScaleTicks(domain3, numTicks3);
        expect(result3).toEqual([0, 122880, 245760, 368640, 491520, 614400]);
    });
});
