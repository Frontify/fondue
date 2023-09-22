/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { IconDocument } from '@foundation/Icon';

import type { TreeItemStyling, TreeProps } from '@components/Tree/types';
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

export default {
    title: 'Components/Tree',
    component: TreeView,
    tags: ['autodocs'],
    args: {
        id: 'storybook-tree',
        multiselect: true,
        draggable: true,
        selectedIds: ['2'],
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

const getSelectedChildrenItems = (tree: TreeItemMockMultiselect[], selectedIds: string[]) => {
    return tree.filter((item) => selectedIds.includes(item.id)).map((item) => item.id);
};

const getSelectedTreeItem = (tree: TreeItemMockMultiselect[], id: string): TreeItemMockMultiselect | null => {
    for (const item of tree) {
        if (item.id === id) {
            return item;
        }
        if (item.nodes && item.nodes?.length > 0) {
            const deepItem = getSelectedTreeItem(item.nodes, id);
            if (deepItem) {
                return deepItem;
            }
        }
    }

    return null;
};

const getParentSelectedTreeItem = (
    tree: TreeItemMockMultiselect[],
    id: string,
    parent: TreeItemMockMultiselect | null,
): TreeItemMockMultiselect | null => {
    for (const item of tree) {
        if (parent !== null && item.id === id) {
            return parent;
        }
        if (item.nodes && item.nodes?.length > 0) {
            const deepItem = getParentSelectedTreeItem(item.nodes, id, item);
            if (deepItem) {
                return deepItem;
            }
        }
    }
    return null;
};

const convertToPartialSelectedId = (ids: string[]) => ids.map((id) => `*${id}`);

const removeSelectedIds = (ids: string[], idsToRemove: string[], partial: boolean): string[] => {
    idsToRemove = partial ? convertToPartialSelectedId(idsToRemove) : idsToRemove;
    return [...new Set(idsToRemove.length > 0 ? ids.filter((itemId: string) => !idsToRemove.includes(itemId)) : ids)];
};
const addSelectedIds = (ids: string[], idsToAdd: string[], partial: boolean) => {
    idsToAdd = (partial ? convertToPartialSelectedId(idsToAdd) : idsToAdd).filter((id) => id !== '');
    return [...new Set(idsToAdd.length > 0 ? [...ids, ...idsToAdd] : ids)];
};

export const MultiselectWithBasicItem = ({ ...args }: TreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(args.selectedIds ?? []);
    const [treeItems, setTreeItems] = useState<TreeItemMockMultiselect[]>([]);

    useEffect(() => {
        setTreeItems(treeItemsMockMultiseclect);
    }, []);

    const handleItemSelected = (id: string) => {
        setSelectedIds(getNewSelectedItems(id));
    };

    // TODO: needs to be recursive going up in tree for the partial selection
    const getNewSelectedItems = (id: string) => {
        let newSelectedItems = [];

        if (selectedIds.includes(id)) {
            newSelectedItems = removeSelectedIds(selectedIds, [id], false);
        } else {
            newSelectedItems = addSelectedIds(selectedIds, [id], false);
        }

        const itemChecked = getSelectedTreeItem(treeItems, id);
        const parentItemChecked = getParentSelectedTreeItem(treeItems, id, null);
        const isParentSelected = selectedIds.includes(parentItemChecked?.id ?? '');
        const childrenSelectedItems = getSelectedChildrenItems(itemChecked?.nodes ?? [], newSelectedItems);
        const siblingsSelectedItems = getSelectedChildrenItems(parentItemChecked?.nodes ?? [], newSelectedItems);
        const childrenCount = itemChecked?.nodes?.length ?? 0;
        const siblingsCount = parentItemChecked?.nodes?.length ?? 0;

        // Select/unselect children
        if (siblingsSelectedItems.length === 0) {
            newSelectedItems = isParentSelected
                ? removeSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], false)
                : newSelectedItems;
            newSelectedItems = removeSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], true);
        } else if (siblingsSelectedItems.length === siblingsCount) {
            newSelectedItems = !isParentSelected
                ? addSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], false)
                : newSelectedItems;

            newSelectedItems = removeSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], true);
        } else if (parentItemChecked?.id) {
            // flag parent as partial checked and unselect it
            newSelectedItems = addSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], true);
            newSelectedItems = removeSelectedIds(newSelectedItems, [parentItemChecked?.id ?? ''], false);
        }

        // Select/unselect parent
        if (childrenCount) {
            const childrenIds = itemChecked?.nodes?.map((item) => item.id) ?? [];

            newSelectedItems = newSelectedItems.includes(id)
                ? addSelectedIds(newSelectedItems, childrenIds, false)
                : removeSelectedIds(newSelectedItems, childrenIds, false);

            if (childrenSelectedItems.length === 0) {
                newSelectedItems = removeSelectedIds(newSelectedItems, [id], true);
            }
        }

        return newSelectedItems;
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
