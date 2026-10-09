/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeFolderProps } from '../types';

import { COLLECT_ATTR, TreeParentContext, useCollectedEntry } from './TreeCollector';

export const TreeFolder = (props: TreeFolderProps) => {
    const { key, isCollecting } = useCollectedEntry((parentId) => ({ kind: 'folder', parentId, props }));
    if (!isCollecting) {
        return null;
    }
    return (
        <>
            <span {...{ [COLLECT_ATTR]: key }} />
            <TreeParentContext.Provider value={props.id}>{props.children}</TreeParentContext.Provider>
        </>
    );
};
TreeFolder.displayName = 'Tree.Folder';
