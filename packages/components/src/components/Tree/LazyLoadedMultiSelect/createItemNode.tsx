/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Tree } from '../Tree';

import { renderRowParts } from './renderRowParts';
import { type LazyTreeNode, type NodeContext, type RowRenderers, type TreeNode } from './types';

export const createItemNode = (data: LazyTreeNode, { notify, onSelectChange }: NodeContext): TreeNode => {
    let isSelected = data.isSelected === true;

    /**
     * From the Tree (own checkbox or an ancestor's cascade) or from a parent's carry-over
     * after loading. A disabled item is frozen either way.
     */
    const setSelected = (next: boolean): void => {
        if (data.isDisabled || next === isSelected) {
            return;
        }
        isSelected = next;
        notify();
        onSelectChange?.(data, next);
    };

    const render = (renderers: RowRenderers): ReactNode => (
        <Tree.Item
            key={data.id}
            id={data.id}
            isSelected={isSelected}
            isDisabled={data.isDisabled}
            onSelectChange={setSelected}
        >
            {renderRowParts(data, renderers)}
        </Tree.Item>
    );

    return { setSelected, render };
};
