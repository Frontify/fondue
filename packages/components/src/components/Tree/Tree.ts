/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeFolder } from './components/TreeFolder';
import { TreeItem } from './components/TreeItem';
import { TreeRoot } from './components/TreeRoot';

export { TreeRoot } from './components/TreeRoot';
export { TreeItem } from './components/TreeItem';
export { TreeFolder } from './components/TreeFolder';
export type { TreeChangeState, TreeRootProps, TreeItemProps, TreeFolderProps } from './types';

export const Tree = {
    Root: TreeRoot,
    Item: TreeItem,
    Folder: TreeFolder,
};
