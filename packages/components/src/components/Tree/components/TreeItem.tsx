/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeItemProps } from '../types';

import { COLLECT_ATTR, useCollectedEntry } from './TreeCollector';

export const TreeItem = (props: TreeItemProps) => {
    const { key, isCollecting } = useCollectedEntry((parentId) => ({ kind: 'item', parentId, props }));
    if (!isCollecting) {
        return null;
    }
    return <span {...{ [COLLECT_ATTR]: key }} />;
};
TreeItem.displayName = 'Tree.Item';
