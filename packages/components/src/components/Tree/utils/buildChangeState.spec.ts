/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ROOT_ID } from '../constants';
import { type TreeItemData } from '../types';

import { buildChangeState, type FlatTreeState } from './buildChangeState';

const flatItems: TreeItemData[] = [
    { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'folder'] },
    { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID },
    { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['f1', 'f2'] },
    { id: 'f1', name: 'F1', isFolder: false, parentId: 'folder' },
    { id: 'f2', name: 'F2', isFolder: false, parentId: 'folder' },
];

const emptyState: FlatTreeState = { expandedItems: [], checkedItems: [] };

describe('buildChangeState', () => {
    it('builds a hierarchical state from the flat items', () => {
        const result = buildChangeState(flatItems, emptyState, ROOT_ID);
        expect(result).toHaveLength(2);
        expect(result[0]).toMatchObject({ id: 'a', isFolder: false });
        expect(result[1]).toMatchObject({ id: 'folder', isFolder: true });
        expect(result[1]?.isFolder && result[1].children?.map((child) => child.id)).toEqual(['f1', 'f2']);
    });

    it('reflects expandedItems on folders', () => {
        const result = buildChangeState(flatItems, { ...emptyState, expandedItems: ['folder'] }, ROOT_ID);
        const folder = result[1];
        expect(folder?.isFolder && folder.isExpanded).toBe(true);
    });

    it('reflects checkedItems on leaves only', () => {
        const result = buildChangeState(flatItems, { ...emptyState, checkedItems: ['f1'] }, ROOT_ID);
        const folder = result[1];
        const leaves = folder?.isFolder ? folder.children : undefined;
        expect(leaves?.[0]?.isSelected).toBe(true);
        expect(leaves?.[1]?.isSelected).toBe(false);
    });

    it('derives folder isSelected as "every leaf checked"', () => {
        const allChecked = buildChangeState(flatItems, { ...emptyState, checkedItems: ['f1', 'f2'] }, ROOT_ID);
        expect(allChecked[1]?.isSelected).toBe(true);

        const someChecked = buildChangeState(flatItems, { ...emptyState, checkedItems: ['f1'] }, ROOT_ID);
        expect(someChecked[1]?.isSelected).toBe(false);
    });

    it('marks an empty folder as not selected even when there are no leaves', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['empty'] },
            { id: 'empty', name: 'Empty', isFolder: true, parentId: ROOT_ID, children: [] },
        ];
        const result = buildChangeState(items, emptyState, ROOT_ID);
        expect(result[0]?.isSelected).toBe(false);
    });

    it('drops orphan ids referenced by parent.children silently', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'missing'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID },
        ];
        const result = buildChangeState(items, emptyState, ROOT_ID);
        expect(result.map((node) => node.id)).toEqual(['a']);
    });

    it('returns an empty array when the root id is unknown', () => {
        const result = buildChangeState(flatItems, emptyState, 'nope');
        expect(result).toEqual([]);
    });

    it('preserves isActive on both leaves and folders', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'folder'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID, isActive: true },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, isActive: true, children: [] },
        ];
        const result = buildChangeState(items, emptyState, ROOT_ID);
        expect(result[0]?.isActive).toBe(true);
        expect(result[1]?.isActive).toBe(true);
    });
});
