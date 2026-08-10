/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';
import { describe, expect, it } from 'vitest';

import { type TreeItemData } from '../types';

import { computeLoadingInsertions } from './computeLoadingInsertions';

type ItemFixture = {
    id: string;
    level: number;
    isExpanded?: boolean;
    isLoading?: boolean;
};

/**
 * Builds a minimal shape that matches the subset of `ItemInstance` the function uses:
 * `getId()`, `getItemData()`, `isExpanded()`, and `getItemMeta().level`. Other ItemInstance
 * surface area is irrelevant here — using a partial cast keeps the test focused on the
 * function's actual contract.
 */
const makeItem = (fixture: ItemFixture): ItemInstance<TreeItemData> =>
    ({
        getId: () => fixture.id,
        getItemData: (): TreeItemData => ({
            id: fixture.id,
            name: fixture.id,
            isFolder: true,
            isLoading: fixture.isLoading,
        }),
        isExpanded: () => Boolean(fixture.isExpanded),
        getItemMeta: () => ({ level: fixture.level }),
    }) as unknown as ItemInstance<TreeItemData>;

describe('computeLoadingInsertions', () => {
    it('returns empty insertions when nothing is loading', () => {
        const result = computeLoadingInsertions(
            [makeItem({ id: 'a', level: 0 }), makeItem({ id: 'b', level: 0 })],
            false,
        );
        expect(result.byIndex.size).toBe(0);
        expect(result.rootLoading).toBe(null);
    });

    it('inserts after the last descendant of a loading folder', () => {
        const items = [
            makeItem({ id: 'folder', level: 0, isExpanded: true, isLoading: true }),
            makeItem({ id: 'child1', level: 1 }),
            makeItem({ id: 'child2', level: 1 }),
            makeItem({ id: 'sibling', level: 0 }),
        ];
        const result = computeLoadingInsertions(items, false);
        expect(result.byIndex.get(2)).toEqual({ level: 1, key: 'folder__loading' });
    });

    it('inserts immediately after the folder header when the folder is empty', () => {
        const items = [
            makeItem({ id: 'folder', level: 0, isExpanded: true, isLoading: true }),
            makeItem({ id: 'sibling', level: 0 }),
        ];
        const result = computeLoadingInsertions(items, false);
        expect(result.byIndex.get(0)).toEqual({ level: 1, key: 'folder__loading' });
    });

    it('skips loading folders that are collapsed', () => {
        const items = [makeItem({ id: 'folder', level: 0, isExpanded: false, isLoading: true })];
        const result = computeLoadingInsertions(items, false);
        expect(result.byIndex.size).toBe(0);
    });

    it('emits rootLoading at level 0 when the root is loading', () => {
        const result = computeLoadingInsertions([], true);
        expect(result.rootLoading).toEqual({ level: 0, key: '__root_loading' });
    });
});
