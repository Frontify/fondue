/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconDocument } from '@foundation/Icon';

import type { TreeProps } from '@components/Tree/types';
import { TreeItem, Tree as TreeView, useTreeItem } from '@components/Tree';
import {
    type TreeItemMock,
    treeItemsMock,
    useDynamicNavigationMock,
    useNavigationWithLazyLoadedItemsMock,
} from '@components/Tree/utils';

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

    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeItem label={customLabel} {...otherProps} onDrop={onDrop}>
            {nodes?.map((node) => renderCustomTreeItem({ ...node, nodes: node.nodes }))}
        </TreeItem>
    );
};

const renderCustomTreeItem = ({ id, onDrop, ...treeItem }: TreeItemMock) => {
    return (
        <CustomTreeItem key={`${id}-custom`} id={`${id}-custom`} onDrop={onDrop ?? action('onDrop')} {...treeItem} />
    );
};

const renderTreeItemLabel = ({
    nodes,
    onDrop,
    cancelSelectionOnDoubleClick,
    expandOnSelect,
    ...treeItem
}: TreeItemMock) => {
    return (
        <TreeItem
            {...treeItem}
            cancelSelectionOnDoubleClick={cancelSelectionOnDoubleClick}
            expandOnSelect={expandOnSelect}
            key={treeItem.id}
            onDrop={onDrop ?? action('onDrop')}
        >
            {nodes?.map((node) =>
                renderTreeItemLabel({
                    ...node,
                    nodes: node.nodes,
                    onDrop,
                    cancelSelectionOnDoubleClick,
                    expandOnSelect,
                }),
            )}
        </TreeItem>
    );
};

const renderTreeItemComponent = ({ nodes, label, numChildNodes, onDrop, ...treeItem }: TreeItemMock) => (
    <TreeItem
        {...treeItem}
        key={treeItem.id}
        contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
        onDrop={onDrop ?? action('onDrop')}
        showCaret={!!numChildNodes}
    >
        {nodes?.map(renderTreeItemComponent)}
    </TreeItem>
);

export const WithLabel = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>{treeItemsMock.map((item) => renderTreeItemLabel({ ...item, onDrop }))}</TreeView>
        </div>
    );
};

export const WithCustomTreeItem = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);
    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>{treeItemsMock.map((item) => renderCustomTreeItem({ ...item, onDrop }))}</TreeView>
        </div>
    );
};

export const ScrollableWithLabel = ({ ...args }: TreeProps) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const handleItemExpand = useCallback((id: string) => {
        setExpandedIds((ids) => [...ids, id]);
    }, []);

    const handleItemShrink = useCallback((id: string) => {
        setExpandedIds((ids) => ids.filter((itemId: string) => itemId !== id));
    }, []);

    return (
        <div style={{ position: 'fixed', height: '800px', width: '800px', backgroundColor: 'white' }}>
            <div style={{ width: '800px', height: '300px', overflow: 'auto', position: 'absolute' }}>
                <TreeView {...args} expandedIds={expandedIds} onExpand={handleItemExpand} onShrink={handleItemShrink}>
                    {treeItemsMock.map(renderTreeItemLabel)}
                </TreeView>
            </div>
        </div>
    );
};

export const WithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <TreeView {...args}>{treeItemsMock.map(renderTreeItemComponent)}</TreeView>
        </div>
    );
};

export const WithAwaitedItem = ({ ...args }: TreeProps) => {
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

const DynamicNavigation = () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(['1']);
    const [nodes] = useDynamicNavigationMock(expandedIds);

    const handleItemExpand = (id: string) => {
        setExpandedIds([...expandedIds, id]);
    };

    const handleItemShrink = (id: string) => {
        setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
    };

    return (
        <TreeView
            id="dynamic-navigation"
            draggable
            expandedIds={expandedIds}
            onExpand={handleItemExpand}
            onShrink={handleItemShrink}
        >
            {renderTreeItemComponent({ id: 'first-fixed-tree-item', draggable: false, label: 'First Fixed TreeItem' })}
            {nodes.length > 0 && (nodes as TreeItemMock[]).map(renderTreeItemComponent)}
            {renderTreeItemComponent({ id: 'last-fixed-tree-item', draggable: false, label: 'Last Fixed TreeItem' })}
        </TreeView>
    );
};

export const WithDynamicNavigation = () => {
    return (
        <div>
            <DynamicNavigation />
        </div>
    );
};

const LazyLoadingTreeItem = memo(({ label, numChildNodes, onDrop, ...otherProps }: TreeItemMock) => {
    const { isExpanded } = useTreeItem(otherProps.id);

    const { nodes } = useNavigationWithLazyLoadedItemsMock(otherProps.id, isExpanded);

    const nodesToRender = useMemo(() => {
        return nodes.map((n) => n);
    }, [nodes]);

    const handleDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeItem
            contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
            onDrop={onDrop ?? handleDrop}
            showCaret={!!numChildNodes}
            {...otherProps}
        >
            {nodesToRender.map(renderLazyLoadingTreeItem)}
        </TreeItem>
    );
});
LazyLoadingTreeItem.displayName = 'FondueStoryLazyLoadingTreeItem';

const renderLazyLoadingTreeItem = ({ id, ...treeItem }: TreeItemMock) => {
    return <LazyLoadingTreeItem key={`${id}-lazyloaded`} id={`${id}-lazyloaded`} {...treeItem} />;
};

const LazyLoadingTreeRoot = memo(() => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const { nodes: rootNodesData } = useNavigationWithLazyLoadedItemsMock(undefined, true, true);

    const handleItemExpand = useCallback(
        (id: string) => {
            setExpandedIds([...expandedIds, id]);
        },
        [expandedIds],
    );

    const handleItemShrink = useCallback(
        (id: string) => {
            setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
        },
        [expandedIds],
    );

    const onRootDrop = useCallback(() => action('onDrop'), []);

    return (
        <TreeView
            id="dynamic-navigation"
            draggable
            expandedIds={expandedIds}
            onExpand={handleItemExpand}
            onShrink={handleItemShrink}
        >
            {renderTreeItemComponent({
                id: 'first-fixed-tree-item',
                draggable: false,
                label: 'First Fixed TreeItem',
                onDrop: onRootDrop,
            })}
            {...rootNodesData.map(renderLazyLoadingTreeItem)}
            {renderTreeItemComponent({
                id: 'last-fixed-tree-item',
                draggable: false,
                label: 'Last Fixed TreeItem',
                onDrop: onRootDrop,
            })}
        </TreeView>
    );
});
LazyLoadingTreeRoot.displayName = 'FondueStoryLazyLoadingTreeRoot';

export const CustomItemsWithLazyLoadedChildren = () => {
    return <LazyLoadingTreeRoot />;
};

export const WithCancelSelectionOnDoubleClick = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>
                {treeItemsMock.map((item) =>
                    renderTreeItemLabel({ ...item, onDrop, cancelSelectionOnDoubleClick: true }),
                )}
            </TreeView>
        </div>
    );
};

export const WithExpandOnSelect = ({ ...args }: TreeProps) => {
    const onDrop = useCallback(() => action('onDrop'), []);

    return (
        <div style={{ width: 800 }}>
            <TreeView {...args}>
                {treeItemsMock.map((item) => renderTreeItemLabel({ ...item, onDrop, expandOnSelect: true }))}
            </TreeView>
        </div>
    );
};
