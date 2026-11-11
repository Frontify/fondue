/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { getFocusFallback, getVisibleIds } from './getFocusFallback';

const folder = (id: string, children: string[], isExpanded = true, parentId?: string): TreeItemData => ({
    id,
    name: id,
    isFolder: true,
    isExpanded,
    children,
    parentId,
});
const leaf = (id: string, parentId?: string): TreeItemData => ({ id, name: id, isFolder: false, parentId });

describe('getVisibleIds', () => {
    it('lists root rows, then expanded folder children in `children` order', () => {
        const items = [folder('f', ['b', 'a']), leaf('a', 'f'), leaf('b', 'f'), leaf('x')];

        expect(getVisibleIds(items)).toEqual(['f', 'b', 'a', 'x']);
    });

    it('hides every descendant of a collapsed folder', () => {
        const items = [folder('f', ['g'], false), folder('g', ['c'], true, 'f'), leaf('c', 'g'), leaf('x')];

        expect(getVisibleIds(items)).toEqual(['f', 'x']);
    });
});

describe('getFocusFallback', () => {
    const flat = [leaf('1'), leaf('2'), leaf('3')];

    it('returns undefined when no row was focused', () => {
        expect(getFocusFallback(undefined, flat, flat)).toBeUndefined();
    });

    it('keeps a row that is still visible', () => {
        expect(getFocusFallback('2', flat, flat)).toBe('2');
    });

    it('moves a removed row to the next visible row', () => {
        expect(getFocusFallback('2', flat, [leaf('1'), leaf('3')])).toBe('3');
    });

    it('moves a removed last row to the previous visible row', () => {
        expect(getFocusFallback('3', flat, [leaf('1'), leaf('2')])).toBe('2');
    });

    it('returns undefined when no row is left', () => {
        expect(getFocusFallback('1', flat, [])).toBeUndefined();
    });

    it('moves a row hidden by a collapse to the collapsed folder', () => {
        const before = [folder('f', ['c']), leaf('c', 'f'), leaf('x')];
        const after = [folder('f', ['c'], false), leaf('c', 'f'), leaf('x')];

        expect(getFocusFallback('c', before, after)).toBe('f');
    });

    it('moves a deeply hidden row to the nearest visible collapsed ancestor', () => {
        const before = [folder('f', ['g']), folder('g', ['c'], true, 'f'), leaf('c', 'g')];
        const after = [folder('f', ['g'], false), folder('g', ['c'], true, 'f'), leaf('c', 'g')];

        expect(getFocusFallback('c', before, after)).toBe('f');
    });

    it('moves a row dropped from a folder that collapsed in the same update to that folder', () => {
        const before = [folder('f', ['c']), leaf('c', 'f'), leaf('x')];
        const after = [folder('f', [], false), leaf('x')];

        expect(getFocusFallback('c', before, after)).toBe('f');
    });

    it('moves a row removed from an expanded folder to its next visible row', () => {
        const before = [folder('f', ['c', 'd']), leaf('c', 'f'), leaf('d', 'f')];
        const after = [folder('f', ['d']), leaf('d', 'f')];

        expect(getFocusFallback('c', before, after)).toBe('d');
    });

    it('moves a row removed with its folder past the folder subtree', () => {
        const before = [folder('f', ['c']), leaf('c', 'f'), leaf('x')];

        expect(getFocusFallback('c', before, [leaf('x')])).toBe('x');
    });
});
