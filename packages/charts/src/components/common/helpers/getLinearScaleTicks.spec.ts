/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getLinearScaleTicks } from '@components/common/helpers/getLinearScaleTicks';

vi.mock('@visx/scale/lib/scales/linear', () => ({
    default: vi.fn(),
}));

const getTicksWithEqualSteps = ({ domain }: { domain: [number, number] }) => {
    return {
        ticks: vi.fn().mockImplementation((maxNumberOfTicks: number) => {
            const step = (domain[1] - domain[0]) / (maxNumberOfTicks - 1);
            const ticks = [];
            for (let i = 0; i < maxNumberOfTicks; i++) {
                ticks.push(domain[0] + i * step);
            }
            return ticks;
        }),
    };
};

describe('getLinearScaleTicks', () => {
    let createLinearScaleMock: Mock<any[], any>;
    beforeEach(async () => {
        const { default: createLinearScale } = await import('@visx/scale/lib/scales/linear');
        vi.mocked(createLinearScale).mockImplementation(getTicksWithEqualSteps as any);
        createLinearScaleMock = vi.mocked(createLinearScale);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('passes correct values for positive domain', () => {
        const ticks = getLinearScaleTicks([0, 100], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [0, 100] });
        expect(ticks).toEqual([0, 25, 50, 75, 100]);
    });

    it('passes correct values for positive domain above zero', () => {
        const ticks = getLinearScaleTicks([10, 100], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [0, 100] });
        expect(ticks).toEqual([0, 25, 50, 75, 100]);
    });

    it('passes correct values for negative domain', () => {
        const ticks = getLinearScaleTicks([-100, 0], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [-100, 0] });
        expect(ticks).toEqual([-100, -75, -50, -25, 0]);
    });

    it('passes correct values for negative domain below zero', () => {
        const ticks = getLinearScaleTicks([-100, -10], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [-100, 0] });
        expect(ticks).toEqual([-100, -75, -50, -25, 0]);
    });

    it('passes correct values for mixed domain', () => {
        const ticks = getLinearScaleTicks([-100, 100], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [-100, 100] });
        expect(ticks).toEqual([-100, -50, 0, 50, 100]);
    });

    it('returns decimal tick values by default', () => {
        const ticks = getLinearScaleTicks([0, 2], 5);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [0, 2] });
        expect(ticks).toEqual([0, 0.5, 1, 1.5, 2]);
    });

    it('returns only non-decimal tick values when allowDecimalValues is false', () => {
        const ticks = getLinearScaleTicks([0, 2], 5, false);
        expect(createLinearScaleMock).toHaveBeenCalledWith({ domain: [0, 2] });
        expect(ticks).toEqual([0, 1, 2]);
    });
});
