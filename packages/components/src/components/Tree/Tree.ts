/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeAction } from './components/TreeAction';
import { TreeFolder } from './components/TreeFolder';
import { TreeFolderHeader } from './components/TreeFolderHeader';
import { TreeIcon } from './components/TreeIcon';
import { TreeItem } from './components/TreeItem';
import { TreeLabel } from './components/TreeLabel';
import { TreeLoading } from './components/TreeLoading';
import { TreeRoot } from './components/TreeRoot';

export { TreeRoot, type TreeRootProps } from './components/TreeRoot';
export { TreeItem } from './components/TreeItem';
export { TreeFolder } from './components/TreeFolder';
export { TreeFolderHeader } from './components/TreeFolderHeader';
export { TreeIcon } from './components/TreeIcon';
export { TreeLabel } from './components/TreeLabel';
export { TreeAction } from './components/TreeAction';
export { TreeLoading } from './components/TreeLoading';
export type {
    TreeActionProps,
    TreeChangeState,
    TreeDropCandidate,
    TreeFolderHeaderProps,
    TreeFolderProps,
    TreeIconProps,
    TreeItemProps,
    TreeLabelProps,
    TreeMoveInfo,
    TreeNodeState,
} from './types';

export const Tree = {
    Root: TreeRoot,
    Item: TreeItem,
    Folder: TreeFolder,
    FolderHeader: TreeFolderHeader,
    Icon: TreeIcon,
    Label: TreeLabel,
    Action: TreeAction,
    Loading: TreeLoading,
};
