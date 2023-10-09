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
    { nodes, label, numChildNodes, onSelect, onBeforeUnregisterChildren, ...treeItem }: TreeItemMockMultiselect,
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
            onBeforeUnregisterChildren={onBeforeUnregisterChildren ?? action('onBeforeUnregisterChildren')}
            showCaret={showCaret}
        >
            {nodes?.map((node) => renderTreeItemComponent({ ...node, onBeforeUnregisterChildren }, selectedIds))}
        </TreeItemMultiselect>
    );
};

export const MultiselectWithBasicItem = ({ ...args }: TreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(args.selectedIds ?? []);
    const [treeItems, setTreeItems] = useState<TreeItemMockMultiselect[]>([]);

    useEffect(() => {
        setTreeItems(treeItemsMockMultiseclect);
    }, []);

    const handleItemSelected = (id: string, ignoreRemoveSelected = false, nodes: TreeNodeWithoutElements[] = []) => {
        if (nodes.length === 0) {
            return;
        }

        setSelectedIds((currentSelectedIds) =>
            getNewSelectedItems(id, currentSelectedIds, nodes, ignoreRemoveSelected),
        );
    };

    // // TODO - move to helpers file
    const getSelectedIdsToRemoveFromNodes = (nodes: TreeNodeWithoutElements[] = []): string[] => {
        if (nodes.length === 0) {
            return [];
        }
        // const ids = nodes.filter(({ id }) => selectedIds.includes(id)).map(({ id }) => id);
        let ids = nodes.map(({ id }) => id);

        for (const node of nodes) {
            ids = [...ids, ...getSelectedIdsToRemoveFromNodes(node.nodes)];
        }

        return ids;
    };

    const handleItemShrink = (id: string, node?: TreeNodeWithoutElements) => {
        if (!selectedIds.includes(id) && !selectedIds.includes(`*${id}`) && node && node.nodes.length > 0) {
            // const idsToRemove = node.nodes.map(({ id }) => id);
            const idsToRemove = getSelectedIdsToRemoveFromNodes(node.nodes);
            console.log('SelectedIds when shrinking', selectedIds);
            console.log('Ids to remove', idsToRemove);
            if (selectedIds.find((selectedId) => idsToRemove.includes(selectedId))) {
                console.log('-----------------------------');
                console.log('Should remove children from selected ids', {
                    id,
                    idsToRemove,
                    selectedIds,
                });
                console.log('-----------------------------');
                setSelectedIds((currentSelected) =>
                    currentSelected.filter((selectedId) => !idsToRemove.includes(selectedId)),
                );
            }
        }
    };

    const handleItemExpand = (id: string, node?: TreeNodeWithoutElements) => {
        console.log('When expanding', { id, selectedIds, node });
        // if (!selectedIds.includes(id) && !selectedIds.includes(`*${id}`) && node && node.nodes.length > 0) {
        //     // const idsToRemove = node.nodes.map(({ id }) => id);
        //     const idsToRemove = getSelectedIdsToRemoveFromNodes(node.nodes);
        //     if (selectedIds.find((selectedId) => idsToRemove.includes(selectedId))) {
        //         console.log('-----------------------------');
        //         console.log('Should remove children from selected ids', {
        //             id,
        //             idsToRemove,
        //             selectedIds,
        //             node,
        //         });
        //         console.log('-----------------------------');
        //         setSelectedIds((currentSelected) =>
        //             currentSelected.filter((selectedId) => !idsToRemove.includes(selectedId)),
        //         );
        //     }
        // }
    };

    return (
        <Container maxWidth="400px">
            <TreeView
                id={args.id}
                {...cleanProps(args)}
                selectedIds={selectedIds}
                onSelect={handleItemSelected}
                onShrink={handleItemShrink}
                onExpand={handleItemExpand}
                ignoreInternalStateUpdateIfOnShrink={false}
                ignoreInternalStateUpdateIfOnExpand={false}
            >
                {treeItems.map((treeItem) => renderTreeItemComponent({ ...treeItem }, selectedIds))}
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
