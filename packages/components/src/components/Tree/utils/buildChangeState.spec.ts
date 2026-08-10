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
    });

    it("reports 'indeterminate' on a folder when only some leaves are checked", () => {
        const someChecked = buildChangeState(flatItems, { ...emptyState, checkedItems: ['f1'] }, ROOT_ID);
        expect(someChecked[1]?.isSelected).toBe('indeterminate');
    });

    it("propagates 'indeterminate' to ancestors of a partially checked nested folder", () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['outer'] },
            { id: 'outer', name: 'Outer', isFolder: true, parentId: ROOT_ID, children: ['inner', 'leaf'] },
            { id: 'inner', name: 'Inner', isFolder: true, parentId: 'outer', children: ['i1', 'i2'] },
            { id: 'i1', name: 'I1', isFolder: false, parentId: 'inner' },
            { id: 'i2', name: 'I2', isFolder: false, parentId: 'inner' },
            { id: 'leaf', name: 'Leaf', isFolder: false, parentId: 'outer' },
        ];
        const result = buildChangeState(items, { ...emptyState, checkedItems: ['i1'] }, ROOT_ID);
        const outer = result[0];
        expect(outer?.isSelected).toBe('indeterminate');
        expect(outer?.children?.[0]?.isSelected).toBe('indeterminate');
    });

    it('marks an empty folder as not selected even when there are no leaves', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['empty'] },
            { id: 'empty', name: 'Empty', isFolder: true, parentId: ROOT_ID, children: [] },
        ];
        const result = buildChangeState(items, emptyState, ROOT_ID);
        expect(result[0]?.isSelected).toBe(false);
    });

    it('counts leafless subfolders as units when deriving an ancestor folder state', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['folder'] },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['empty', 'f1'] },
            { id: 'empty', name: 'Empty', isFolder: true, parentId: 'folder', children: [] },
            { id: 'f1', name: 'F1', isFolder: false, parentId: 'folder' },
        ];
        // The empty subfolder is its own checkable unit: unchecked it holds the ancestor
        // at 'indeterminate'; checked alongside the leaf the ancestor reads fully checked.
        const partial = buildChangeState(items, { ...emptyState, checkedItems: ['f1'] }, ROOT_ID);
        expect(partial[0]?.isSelected).toBe('indeterminate');

        const full = buildChangeState(items, { ...emptyState, checkedItems: ['f1', 'empty'] }, ROOT_ID);
        expect(full[0]?.isSelected).toBe(true);
    });

    it('reports a checked leafless folder as selected (checkable entity)', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['lazy'] },
            { id: 'lazy', name: 'Lazy', isFolder: true, parentId: ROOT_ID, children: [], isLoading: true },
        ];
        const result = buildChangeState(items, { ...emptyState, checkedItems: ['lazy'] }, ROOT_ID);
        expect(result[0]?.isSelected).toBe(true);
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

    it('reflects selectedItems on leaves and folders (single-select)', () => {
        const result = buildChangeState(flatItems, { ...emptyState, selectedItems: ['folder'] }, ROOT_ID);
        expect(result[0]?.isSelected).toBe(false);
        expect(result[1]?.isSelected).toBe(true);

        const leafSelected = buildChangeState(flatItems, { ...emptyState, selectedItems: ['f1'] }, ROOT_ID);
        const folder = leafSelected[1];
        const leaves = folder?.isFolder ? folder.children : undefined;
        expect(leaves?.[0]?.isSelected).toBe(true);
        expect(leaves?.[1]?.isSelected).toBe(false);
        // Single-select never derives folder state from contents — strictly false, not 'indeterminate'.
        expect(folder?.isSelected).toBe(false);
    });

    it('echoes tags back on both leaves and folders', () => {
        const items: TreeItemData[] = [
            { id: ROOT_ID, name: 'Root', isFolder: true, children: ['a', 'folder'] },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID, tags: ['image'] },
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, tags: ['bin'], children: [] },
        ];
        const result = buildChangeState(items, emptyState, ROOT_ID);
        expect(result[0]?.tags).toEqual(['image']);
        expect(result[1]?.tags).toEqual(['bin']);
    });
});
