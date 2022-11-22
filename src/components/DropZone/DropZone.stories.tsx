/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { OrderableList as DropZoneComponent, OrderableListProps } from '../OrderableList';
import { OrderableListItem } from '../OrderableList/types';
import { chain } from '@react-aria/utils';
import { Tree as TreeComponent, TreeProps } from '@components/Tree';
import { getReorderedNodes, mockNodesFlat } from '@components/Tree/utils';
import { StoryListItem, renderContent, storyItems } from '@components/OrderableList/utils';

export default {
    title: 'Components/Drop Zone',
    component: DropZoneComponent,
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: 'onMove' },
    },
} as Meta<OrderableListProps<StoryListItem>>;

export const DropZoneWithOrderableList: StoryFn<OrderableListProps<StoryListItem>> = ({ onMove, dragDisabled }) => {
    const [items, setItems] = useState(storyItems);

    const handleMove = (modifiedItems: OrderableListItem<StoryListItem>[]) => {
        const modifiedArray = items.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setItems(modifiedArray);
    };

    return (
        <>
            <div className="tw-m-auto tw-w-[600px] tw-pb-6">
                <DropZoneComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
            <div className="tw-m-auto tw-w-[600px]">
                <DropZoneComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
        </>
    );
};

export const DropZoneWithTree: StoryFn<TreeProps> = (args: TreeProps) => {
    const [nodesState, setNodes] = useState(mockNodesFlat);

    const handleMove = (sourceItemId: string, parentId: NullableString, positionBeforeId: NullableString): void => {
        const modifiedItems = getReorderedNodes(sourceItemId, parentId, positionBeforeId, nodesState);

        const modifiedArray = nodesState.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setNodes(modifiedArray);
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <TreeComponent {...args} nodes={nodesState} onDragAndDrop={handleMove} />
        </div>
    );
};
