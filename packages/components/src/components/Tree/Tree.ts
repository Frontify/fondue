/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeFolder } from './components/TreeFolder';
import { TreeItem } from './components/TreeItem';
import { TreeRoot } from './components/TreeRoot';

export { TreeRoot, type TreeRootProps } from './components/TreeRoot';
export { TreeItem } from './components/TreeItem';
export { TreeFolder } from './components/TreeFolder';
export type { TreeChangeState, TreeFolderProps, TreeItemProps, TreeMoveInfo, TreeNodeState } from './types';

export const Tree = {
    Root: TreeRoot,
    Item: TreeItem,
    Folder: TreeFolder,
};
