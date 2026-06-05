/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { diffSelection } from './diffSelection';

describe('diffSelection', () => {
    it('reports no changes when lists are identical', () => {
        const result = diffSelection(['a', 'b'], ['a', 'b']);
        expect(result).toEqual({ added: [], removed: [] });
    });

    it('reports no changes when only the order differs', () => {
        const result = diffSelection(['a', 'b'], ['b', 'a']);
        expect(result).toEqual({ added: [], removed: [] });
    });

    it('reports added ids that appear only in next', () => {
        const result = diffSelection(['a'], ['a', 'b', 'c']);
        expect(result.added.sort()).toEqual(['b', 'c']);
        expect(result.removed).toEqual([]);
    });

    it('reports removed ids that appear only in prev', () => {
        const result = diffSelection(['a', 'b', 'c'], ['b']);
        expect(result.added).toEqual([]);
        expect(result.removed.sort()).toEqual(['a', 'c']);
    });

    it('reports both adds and removes in a single diff', () => {
        const result = diffSelection(['a', 'b'], ['b', 'c']);
        expect(result.added).toEqual(['c']);
        expect(result.removed).toEqual(['a']);
    });

    it('handles empty inputs', () => {
        expect(diffSelection([], [])).toEqual({ added: [], removed: [] });
        expect(diffSelection([], ['a'])).toEqual({ added: ['a'], removed: [] });
        expect(diffSelection(['a'], [])).toEqual({ added: [], removed: ['a'] });
    });
});
