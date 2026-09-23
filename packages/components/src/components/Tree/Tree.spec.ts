/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    type TreeActionProps,
    type TreeChangeState,
    type TreeDecoratorProps,
    type TreeDropCandidate,
    type TreeFolderHeaderProps,
    type TreeFolderProps,
    type TreeIconProps,
    type TreeItemProps,
    type TreeLabelProps,
    type TreeMoveInfo,
    type TreeNodeState,
    type TreeRootProps,
} from '../../index';

import {
    Tree,
    TreeAction,
    TreeDecorator,
    TreeFolder,
    TreeFolderHeader,
    TreeIcon,
    TreeItem,
    TreeLabel,
    TreeLoading,
    TreeRoot,
} from './Tree';

/**
 * The Tree namespace is the public API surface. This test pins it: any accidental rename
 * or removal of a key (e.g. dropping `Tree.Loading`) will surface here rather than as a
 * silent breaking change.
 */

const dropCandidate: TreeDropCandidate = { id: '1', label: 'One', isFolder: false, tags: [] };
const moveInfo: TreeMoveInfo = { parentId: 'root', index: 0 };

type PublicTreeTypes = [
    TreeActionProps,
    TreeChangeState,
    TreeDecoratorProps,
    TreeDropCandidate,
    TreeFolderHeaderProps,
    TreeFolderProps,
    TreeIconProps,
    TreeItemProps,
    TreeLabelProps,
    TreeMoveInfo,
    TreeNodeState,
    TreeRootProps,
];
const publicTreeTypeCount: PublicTreeTypes['length'] = 12;

describe('Tree namespace', () => {
    it('exposes Root / Item / Folder / FolderHeader / Icon / Label / Decorator / Action / Loading on the namespace', () => {
        expect(Tree).toEqual({
            Root: TreeRoot,
            Item: TreeItem,
            Folder: TreeFolder,
            FolderHeader: TreeFolderHeader,
            Icon: TreeIcon,
            Label: TreeLabel,
            Decorator: TreeDecorator,
            Action: TreeAction,
            Loading: TreeLoading,
        });
    });

    it('re-exports the Tree prop and callback types from the package entry', () => {
        expect(dropCandidate.id).toBe('1');
        expect(moveInfo.parentId).toBe('root');
        expect(publicTreeTypeCount).toBe(12);
    });

    it('aliases each namespace key to the same component as the named export', () => {
        expect(Tree.Root).toBe(TreeRoot);
        expect(Tree.Item).toBe(TreeItem);
        expect(Tree.Folder).toBe(TreeFolder);
        expect(Tree.FolderHeader).toBe(TreeFolderHeader);
        expect(Tree.Icon).toBe(TreeIcon);
        expect(Tree.Label).toBe(TreeLabel);
        expect(Tree.Decorator).toBe(TreeDecorator);
        expect(Tree.Action).toBe(TreeAction);
        expect(Tree.Loading).toBe(TreeLoading);
    });
});
