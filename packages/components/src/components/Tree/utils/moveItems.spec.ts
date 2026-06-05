/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { moveItems } from './moveItems';

const makeItems = (): TreeItemData[] => [
    { id: 'root', name: 'Root', isFolder: true, children: ['a', 'b'] },
    { id: 'a', name: 'A', isFolder: false, parentId: 'root' },
    { id: 'b', name: 'B', isFolder: true, parentId: 'root', children: ['b1', 'b2'] },
    { id: 'b1', name: 'B1', isFolder: false, parentId: 'b' },
    { id: 'b2', name: 'B2', isFolder: false, parentId: 'b' },
];

const childrenOf = (items: TreeItemData[], id: string): string[] =>
    items.find((item) => item.id === id)?.children ?? [];

const parentOf = (items: TreeItemData[], id: string): string | undefined =>
    items.find((item) => item.id === id)?.parentId;

describe('moveItems', () => {
    it('returns the original list when the target parent does not exist', () => {
        const items = makeItems();
        const result = moveItems(items, ['a'], 'missing', 0);
        expect(result).toBe(items);
    });

    it('reparents an item and removes it from its previous parent', () => {
        const next = moveItems(makeItems(), ['a'], 'b', 0);
        expect(childrenOf(next, 'root')).toEqual(['b']);
        expect(childrenOf(next, 'b')).toEqual(['a', 'b1', 'b2']);
        expect(parentOf(next, 'a')).toBe('b');
    });

    it('inserts at the requested index within the new parent', () => {
        const next = moveItems(makeItems(), ['a'], 'b', 1);
        expect(childrenOf(next, 'b')).toEqual(['b1', 'a', 'b2']);
    });

    it('appends when the requested index exceeds the children length', () => {
        const next = moveItems(makeItems(), ['a'], 'b', 99);
        expect(childrenOf(next, 'b')).toEqual(['b1', 'b2', 'a']);
    });

    it('clamps a negative index to zero', () => {
        const next = moveItems(makeItems(), ['a'], 'b', -5);
        expect(childrenOf(next, 'b')).toEqual(['a', 'b1', 'b2']);
    });

    it('reorders within the same parent without duplicating', () => {
        const next = moveItems(makeItems(), ['b1'], 'b', 2);
        expect(childrenOf(next, 'b')).toEqual(['b2', 'b1']);
    });

    it('moves multiple ids preserving their relative order', () => {
        const next = moveItems(makeItems(), ['b1', 'b2'], 'root', 0);
        expect(childrenOf(next, 'root')).toEqual(['b1', 'b2', 'a', 'b']);
        expect(childrenOf(next, 'b')).toEqual([]);
        expect(parentOf(next, 'b1')).toBe('root');
        expect(parentOf(next, 'b2')).toBe('root');
    });

    it('does not mutate the input array or item objects', () => {
        const items = makeItems();
        const snapshot = structuredClone(items);
        moveItems(items, ['a'], 'b', 0);
        expect(items).toEqual(snapshot);
    });
});
