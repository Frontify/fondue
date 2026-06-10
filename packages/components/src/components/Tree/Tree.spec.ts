/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { Tree, TreeFolder, TreeItem, TreeItemAction, TreeLoading, TreeRoot } from './Tree';

/**
 * The Tree namespace is the public API surface. This test pins it: any accidental rename
 * or removal of a key (e.g. dropping `Tree.Loading`) will surface here rather than as a
 * silent breaking change.
 */

describe('Tree namespace', () => {
    it('exposes Root / Item / Folder / ItemAction / Loading on the namespace', () => {
        expect(Tree).toEqual({
            Root: TreeRoot,
            Item: TreeItem,
            ItemAction: TreeItemAction,
            Folder: TreeFolder,
            Loading: TreeLoading,
        });
    });

    it('aliases each namespace key to the same component as the named export', () => {
        expect(Tree.Root).toBe(TreeRoot);
        expect(Tree.Item).toBe(TreeItem);
        expect(Tree.Folder).toBe(TreeFolder);
        expect(Tree.ItemAction).toBe(TreeItemAction);
        expect(Tree.Loading).toBe(TreeLoading);
    });
});
