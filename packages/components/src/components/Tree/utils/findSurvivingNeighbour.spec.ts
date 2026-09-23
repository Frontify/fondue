/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { findSurvivingNeighbour } from './findSurvivingNeighbour';

describe('findSurvivingNeighbour', () => {
    it('picks the first survivor below the removed id', () => {
        expect(findSurvivingNeighbour(['1', '2', '3'], '2', ['1', '3'])).toBe('3');
    });

    it('picks the closest survivor above when nothing below survives', () => {
        expect(findSurvivingNeighbour(['1', '2', '3'], '3', ['1', '2'])).toBe('2');
    });

    it('falls back to the first surviving id when the removed id is unknown', () => {
        expect(findSurvivingNeighbour([], 'gone', ['7', '8'])).toBe('7');
    });

    it('seeds the first surviving id when no id was focused', () => {
        expect(findSurvivingNeighbour(['1', '2'], undefined, ['1', '2'])).toBe('1');
    });

    it('returns undefined when no id survives', () => {
        expect(findSurvivingNeighbour(['1', '2'], '1', [])).toBeUndefined();
    });
});
