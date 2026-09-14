/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Tree } from '../Tree';

import { type LazyTreeNode, type RowRenderers } from './types';

/**
 * The anatomy parts shared by items and folder headers. Returned as an array rather than
 * a fragment: the Tree reads its parts from the JSX and flattens arrays, but a fragment
 * would be one opaque element in front of them.
 */
export const renderRowParts = (
    node: LazyTreeNode,
    { renderIcon, renderDecorator, renderAction }: RowRenderers,
): ReactNode[] => {
    const icon = renderIcon?.(node);
    const decorator = renderDecorator?.(node);
    const action = renderAction?.(node);
    return [
        icon ? <Tree.Icon key="icon">{icon}</Tree.Icon> : null,
        <Tree.Label key="label">{node.name}</Tree.Label>,
        decorator ? <Tree.Decorator key="decorator">{decorator}</Tree.Decorator> : null,
        action ? <Tree.Action key="action">{action}</Tree.Action> : null,
    ];
};
