/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { getStructureKey } from './getStructureKey';

const items: TreeItemData[] = [
    { id: 'a', name: 'A', isFolder: true, children: ['a1', 'a2'] },
    { id: 'a1', name: 'A1', isFolder: false, parentId: 'a' },
    { id: 'a2', name: 'A2', isFolder: false, parentId: 'a' },
];

describe('getStructureKey', () => {
    it('returns the same key for the same structure', () => {
        expect(getStructureKey(items)).toBe(getStructureKey(items));
    });

    it('ignores per-node state (isExpanded / isSelected)', () => {
        const withState: TreeItemData[] = items.map((item) => ({
            ...item,
            isExpanded: true,
            isSelected: true,
        }));
        expect(getStructureKey(withState)).toBe(getStructureKey(items));
    });

    it('changes when child order changes', () => {
        const reordered: TreeItemData[] = [
            { id: 'a', name: 'A', isFolder: true, children: ['a2', 'a1'] },
            { id: 'a1', name: 'A1', isFolder: false, parentId: 'a' },
            { id: 'a2', name: 'A2', isFolder: false, parentId: 'a' },
        ];
        expect(getStructureKey(reordered)).not.toBe(getStructureKey(items));
    });

    it('changes when a child is added', () => {
        const added: TreeItemData[] = [
            { id: 'a', name: 'A', isFolder: true, children: ['a1', 'a2', 'a3'] },
            { id: 'a1', name: 'A1', isFolder: false, parentId: 'a' },
            { id: 'a2', name: 'A2', isFolder: false, parentId: 'a' },
            { id: 'a3', name: 'A3', isFolder: false, parentId: 'a' },
        ];
        expect(getStructureKey(added)).not.toBe(getStructureKey(items));
    });

    it('changes when a parent reference changes', () => {
        const reparented: TreeItemData[] = [
            { id: 'a', name: 'A', isFolder: true, children: ['a1'] },
            { id: 'a1', name: 'A1', isFolder: false, parentId: 'a' },
            { id: 'a2', name: 'A2', isFolder: false, parentId: 'other' },
        ];
        expect(getStructureKey(reparented)).not.toBe(getStructureKey(items));
    });
});
