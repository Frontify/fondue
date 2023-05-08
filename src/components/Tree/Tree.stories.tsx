/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconDocument } from '@foundation/Icon';

import type { TreeProps } from '@components/Tree/types';
import { TreeItem, Tree as TreeView } from '@components/Tree';
import { type TreeItemMock, treeItemsMock } from '@components/Tree/utils';

export default {
    title: 'Components/Tree',
    component: TreeView,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTreeItem = ({ label, contentComponent, nodes, ...otherProps }: TreeItemMock) => {
    const customLabel = `${label} CUSTOM`;

    return (
        <TreeItem label={customLabel} {...otherProps} onDrop={action('onDrop')}>
            {nodes?.map((node) => renderCustomTreeItem({ ...node, nodes: node.nodes }))}
        </TreeItem>
    );
};

const renderCustomTreeItem = ({ id, ...treeItem }: TreeItemMock) => {
    return <CustomTreeItem key={`${id}-custom`} id={`${id}-custom`} onDrop={action('onDrop')} {...treeItem} />;
};

const renderTreeItemLabel = ({ nodes, ...treeItem }: TreeItemMock) => {
    return (
        <TreeItem {...treeItem} key={treeItem.id} onDrop={action('onDrop')}>
            {nodes?.map((node) => renderTreeItemLabel({ ...node, nodes: node.nodes }))}
        </TreeItem>
    );
};

const renderTreeItemComponent = ({ nodes, label, ...treeItem }: TreeItemMock) => (
    <TreeItem
        {...treeItem}
        key={treeItem.id}
        contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
        onDrop={action('onDrop')}
    >
        {nodes?.map(renderTreeItemComponent)}
    </TreeItem>
);

export const TreeWithLabel = ({ ...args }: TreeProps) => {
    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>{treeItemsMock.map(renderTreeItemLabel)}</TreeView>
        </div>
    );
};

export const TreeWithCustomTreeItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>{treeItemsMock.map(renderCustomTreeItem)}</TreeView>
        </div>
    );
};

export const ScrollableTreeWithLabel = ({ ...args }: TreeProps) => {
    return (
        <div style={{ position: 'fixed', height: '800px', width: '800px', backgroundColor: 'white' }}>
            <div style={{ width: '800px', height: '300px', overflow: 'auto', position: 'absolute' }}>
                <TreeView {...args}>{treeItemsMock.map(renderTreeItemLabel)}</TreeView>
            </div>
        </div>
    );
};

export const TreeWithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <TreeView {...args}>{treeItemsMock.map(renderTreeItemComponent)}</TreeView>
        </div>
    );
};

export const TreeWithAwaitedItem = ({ ...args }: TreeProps) => {
    const [awaitedItems, setAwaitedItems] = useState<TreeItemMock[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setAwaitedItems([
                {
                    id: '2-1',
                    label: 'Document Category 2',
                    nodes: [
                        {
                            id: '2-1-1',
                            label: 'Home',
                        },
                        {
                            id: '2-1-2',
                            label: 'Members',
                        },
                        {
                            id: '2-1-3',
                            label: 'About us',
                        },
                    ],
                    type: 'document-category',
                    accepts: ['document-page', 'document-page-within', 'document-category'].join(', '),
                },
            ]);
        }, 500);
    }, []);

    return (
        <div style={{ maxWidth: '800px' }}>
            <TreeView {...args}>
                {treeItemsMock.map(renderTreeItemComponent)}
                {awaitedItems.map(renderTreeItemComponent)}
            </TreeView>
        </div>
    );
};
