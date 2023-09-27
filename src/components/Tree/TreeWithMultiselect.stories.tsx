/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconDocument } from '@foundation/Icon';

import type { TreeItemStyling, TreeNodeWithoutElements, TreeProps } from '@components/Tree/types';
import {
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
    Tree as TreeView,
} from '@components/Tree';
import { TreeItemMockMultiselect, treeItemsMockMultiseclect } from '@components/Tree/utils';
import { Container } from '@components/Container';
import { TreeItemMultiselect } from './TreeItem/TreeItemMultiselect';
import { getNewSelectedItems } from './helpers';

export default {
    title: 'Components/Tree',
    component: TreeView,
    tags: ['autodocs'],
    args: {
        id: 'storybook-tree',
        multiselect: true,
        draggable: true,
        selectedIds: ['1'],
        dragHandlerPosition: 'left',
        spacingY: 'none',
        contentHight: 'single-line',
        shadow: 'none',
        borderRadius: 'small',
        borderWidth: 'none',
        borderStyle: 'none',
        activeColorStyle: 'neutral',
    },
    argTypes: {
        multiselect: {
            control: { type: 'boolean' },
        },
        draggable: {
            control: { type: 'boolean' },
        },
        dragHandlerPosition: {
            table: { category: 'Item Options' },
            options: ['left', 'right', 'none'],
            control: { type: 'inline-radio' },
        },
        spacingY: {
            table: { category: 'Item Style' },
            name: 'itemStyle.spacingY',
            options: [...Object.keys(TreeItemSpacingClassMap)],
            mapping: [...Object.values(TreeItemSpacingClassMap)],
            control: { type: 'inline-radio' },
        },
        contentHight: {
            table: { category: 'Item Style' },
            name: 'itemStyle.contentHight',
            options: ['content-fit', 'single-line'],
            control: { type: 'inline-radio' },
        },
        shadow: {
            table: { category: 'Item Style' },
            name: 'itemStyle.shadow',
            options: [...Object.keys(TreeItemShadowClassMap)],
            mapping: [...Object.values(TreeItemShadowClassMap)],
            control: { type: 'select' },
        },
        borderRadius: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderRadius',
            options: [...Object.keys(TreeItemBorderRadiusClassMap)],
            mapping: [...Object.values(TreeItemBorderRadiusClassMap)],
            control: { type: 'select' },
        },
        borderWidth: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderWidth',
            options: [...Object.keys(TreeItemBorderClassMap)],
            mapping: [...Object.values(TreeItemBorderClassMap)],
            control: { type: 'select' },
        },
        borderStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderStyle',
            options: [...Object.keys(TreeItemBorderStyleClassMap)],
            mapping: [...Object.values(TreeItemBorderStyleClassMap)],
            control: { type: 'select' },
        },
        activeColorStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.activeColorStyle',
            options: [...Object.keys(TreeItemColorsClassMap)],
            mapping: [...Object.values(TreeItemColorsClassMap)],
            control: { type: 'inline-radio' },
        },
        selectedIds: {
            control: { type: 'object' },
        },
        expandedIds: {
            control: { type: 'object' },
        },
    },
} as Meta<TreeProps & TreeItemStyling>;

const TreeItemContentComponent = ({ title }: { title: string }) => {
    return (
        <div className="tw-flex tw-space-x-1.5 tw-w-full">
            <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{<IconDocument />}</span>
            <span>{title}</span>
        </div>
    );
};

const renderTreeItemComponent = (
    { nodes, label, numChildNodes, onSelect, ...treeItem }: TreeItemMockMultiselect,
    selectedIds: string[],
) => {
    const nodesLength = nodes?.length ?? 0;
    const showCaret = numChildNodes !== undefined ? !!numChildNodes : nodesLength > 0;

    return (
        <TreeItemMultiselect
            {...treeItem}
            key={treeItem.id}
            contentComponent={<TreeItemContentComponent title={label || 'NO TITLE'} />}
            onSelect={onSelect ?? action('onSelect')}
            showCaret={showCaret}
        >
            {nodes?.map((node) => renderTreeItemComponent(node, selectedIds))}
        </TreeItemMultiselect>
    );
};

export const MultiselectWithBasicItem = ({ ...args }: TreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(args.selectedIds ?? []);
    const [treeItems, setTreeItems] = useState<TreeItemMockMultiselect[]>([]);

    useEffect(() => {
        setTreeItems(treeItemsMockMultiseclect);
    }, []);

    const handleItemSelected = (id: string, ignoreRemoveSelected = false, nodes: TreeNodeWithoutElements[]) => {
        if (nodes.length === 0) {
            return;
        }

        setSelectedIds((currentSelectedIds) =>
            getNewSelectedItems(id, currentSelectedIds, nodes, ignoreRemoveSelected),
        );
    };

    return (
        <Container maxWidth="400px">
            <TreeView id={args.id} {...cleanProps(args)} selectedIds={selectedIds} onSelect={handleItemSelected}>
                {treeItems.map((treeItem) => renderTreeItemComponent(treeItem, selectedIds))}
            </TreeView>
        </Container>
    );
};

const cleanProps = ({ ...args }) => {
    const itemStyle = {
        spacingY: args.spacingY,
        contentHight: args.contentHight,
        shadow: args.shadow,
        borderRadius: args.borderRadius,
        borderWidth: args.borderWidth,
        borderStyle: args.borderStyle,
        activeColorStyle: args.activeColorStyle,
        ...args.itemStyle,
    };

    delete args.spacingY;
    delete args.contentHight;
    delete args.shadow;
    delete args.borderRadius;
    delete args.borderWidth;
    delete args.borderStyle;
    delete args.activeColorStyle;

    return { ...args, itemStyle };
};
