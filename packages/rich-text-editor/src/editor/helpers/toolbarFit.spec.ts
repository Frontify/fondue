/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { fittingSlotCount, splitGroups } from './toolbarFit';

describe('fittingSlotCount', () => {
    // Three groups: 2 slots, 1 slot, 2 slots, all 30 wide; 8 between groups; More is 24.
    const groups = [[30, 30], [30], [30, 30]];
    const fit = (available: number): number => fittingSlotCount({ groups, gap: 8, itemGap: 0, more: 24, available });

    it('shows every slot, with no room kept for More, when they all fit', () => {
        // 150 of slots and two gaps.
        expect(fit(166)).toBe(5);
        expect(fit(1000)).toBe(5);
    });

    it('keeps room for More and the gap before it once one slot does not fit', () => {
        // 60 + 8 + 30 = 98 shown, plus 8 + 24 for More.
        expect(fit(165)).toBe(3);
        expect(fit(130)).toBe(3);
        expect(fit(129)).toBe(2);
    });

    it('counts the gap before a group only when something precedes it', () => {
        // 60 + 8 + 30 needs 98; at 97 the gap pushes the third slot out.
        expect(fittingSlotCount({ groups, gap: 8, itemGap: 0, more: 0, available: 97 + 8 })).toBe(2);
        expect(fittingSlotCount({ groups, gap: 8, itemGap: 0, more: 0, available: 98 + 8 })).toBe(3);
    });

    it('counts the gap between slots of one group, not before a group', () => {
        // 30 + 4 + 30 + 8 + 30 = 102 shown, plus 8 + 24 for More.
        const spaced = (available: number): number =>
            fittingSlotCount({ groups, gap: 8, itemGap: 4, more: 24, available });
        expect(spaced(134)).toBe(3);
        expect(spaced(133)).toBe(2);
        // 150 of slots, two item gaps and two group gaps.
        expect(spaced(174)).toBe(5);
        // 102 + 8 + 30 = 140 fits beside More at 173, not at 171.
        expect(spaced(173)).toBe(4);
        expect(spaced(171)).toBe(3);
    });

    it('shows nothing but More when not even the first slot fits', () => {
        expect(fit(40)).toBe(0);
    });

    it('takes a subpixel overshoot as a fit', () => {
        expect(fit(165.6)).toBe(5);
    });

    it('fits an empty toolbar', () => {
        expect(fittingSlotCount({ groups: [], gap: 8, itemGap: 0, more: 24, available: 0 })).toBe(0);
    });
});

describe('splitGroups', () => {
    const groups = [
        { key: 'marks', items: ['bold', 'italic'] },
        { key: 'link', items: ['link'] },
        { key: 'align', items: ['align'] },
    ];

    it('cuts a group in two when the row ends inside it', () => {
        expect(splitGroups(groups, 1)).toEqual({
            row: [{ key: 'marks', items: ['bold'] }],
            overflow: [
                { key: 'marks', items: ['italic'] },
                { key: 'link', items: ['link'] },
                { key: 'align', items: ['align'] },
            ],
        });
    });

    it('leaves nothing for More when every slot is shown', () => {
        expect(splitGroups(groups, 4)).toEqual({ row: groups, overflow: [] });
    });

    it('moves every group when none is shown', () => {
        expect(splitGroups(groups, 0)).toEqual({ row: [], overflow: groups });
    });
});
