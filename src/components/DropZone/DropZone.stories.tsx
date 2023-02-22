/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { chain } from '@react-aria/utils';
import { Meta, StoryFn } from '@storybook/react';

import { OrderableList as DropZoneComponent, OrderableListProps } from '@components/OrderableList';
import { StoryListItem, renderContent, storyItems } from '@components/OrderableList/utils';
import type { OrderableListItem } from '@components/OrderableList/types';

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
