/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta } from '@storybook/react';

import { IconDocument } from '@foundation/Icon';

import { TreeItemMock, treeItemsMock } from '@components/Tree/utils';
import type { TreeProps } from '@components/Tree/types';
import { Tree, Tree as TreeComponent, TreeItem } from '@components/Tree';

export default {
    title: 'Components/Tree',
    component: TreeComponent,
    tags: ['autodocs'],
    args: {
        id: 'storybook-tree',
        draggable: true,
    },
    argTypes: {
        draggable: {
            control: { type: 'boolean' },
        },
        selectedIds: {
            control: { type: 'object' },
        },
        expandedIds: {
            control: { type: 'object' },
        },
    },
} as Meta<TreeProps>;

const TreeItemContentComponent = ({ title }: { title: string }) => {
    return (
        <div className="tw-flex tw-space-x-1.5 tw-w-full">
            <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{<IconDocument />}</span>
            <span>{title}</span>
        </div>
    );
};

const renderTreeItemLabel = ({ nodes, ...treeItem }: TreeItemMock) => {
    return (
        <TreeItem {...treeItem} key={treeItem.id}>
            {nodes?.map((node) => renderTreeItemLabel({ ...node, nodes: node.nodes }))}
        </TreeItem>
    );
};

const renderTreeItemComponent = ({ nodes, label, ...treeItem }: TreeItemMock) => (
    <TreeItem
        {...treeItem}
        key={treeItem.id}
        contentComponent={() => <TreeItemContentComponent title={label || 'NO TITLE'} />}
    >
        {nodes?.map(renderTreeItemComponent)}
    </TreeItem>
);

export const TreeWithLabel = ({ ...args }: TreeProps) => {
    return (
        <div style={{ width: 800 }}>
            <Tree {...args}>{treeItemsMock.map(renderTreeItemLabel)}</Tree>
        </div>
    );
};

export const ScrollableTreeWithLabel = ({ ...args }: TreeProps) => {
    return (
        <div style={{ position: 'fixed', height: '800px', width: '800px', backgroundColor: 'white' }}>
            <div style={{ width: '800px', height: '300px', overflow: 'auto', position: 'absolute' }}>
                <Tree {...args}>{treeItemsMock.map(renderTreeItemLabel)}</Tree>
            </div>
        </div>
    );
};

export const TreeWithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Tree {...args}>{treeItemsMock.map(renderTreeItemComponent)}</Tree>
        </div>
    );
};
