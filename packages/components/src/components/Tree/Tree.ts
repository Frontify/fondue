/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeFolder } from './components/TreeFolder';
import { TreeItem } from './components/TreeItem';
import { TreeLoading } from './components/TreeLoading';
import { TreeRoot } from './components/TreeRoot';

export { TreeRoot, type TreeRootProps } from './components/TreeRoot';
export { TreeItem } from './components/TreeItem';
export { TreeFolder } from './components/TreeFolder';
export { TreeLoading } from './components/TreeLoading';
export type {
    TreeChangeState,
    TreeFolderProps,
    TreeItemProps,
    TreeLoadingProps,
    TreeMoveInfo,
    TreeNodeState,
} from './types';

export const Tree = {
    Root: TreeRoot,
    Item: TreeItem,
    Folder: TreeFolder,
    Loading: TreeLoading,
};
