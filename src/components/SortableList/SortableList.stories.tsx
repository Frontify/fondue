/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { chain } from '@react-aria/utils';
import { Meta, StoryFn } from '@storybook/react';

import { renderContent, storyItems } from '@components/SortableList/utils';

import { SortableListProps } from '.';
import { OrderableListItem } from './types';
import { SortableList as List } from './SortableList';

export default {
    title: 'Components/Sortable List',
    component: List,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: 'onMove' },
    },
} as Meta<SortableListProps<StoryListItem>>;

type StoryListItem = {
    textContent: JSX.Element;
};

export const SortableList: StoryFn<SortableListProps<StoryListItem>> = ({ onMove, dragDisabled }) => {
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
        <div className="tw-m-auto tw-w-[600px] tw-pb-6">
            <List
                items={items}
                onMove={chain(handleMove, onMove)}
                dragDisabled={dragDisabled}
                renderContent={(...args) => renderContent(...args)}
            />
        </div>
    );
};
