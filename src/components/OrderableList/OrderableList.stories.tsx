/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { OrderableList as OrderableListComponent } from './OrderableList';
import { OrderableListItem } from './types';
import { OrderableListProps } from '.';
import { chain } from '@react-aria/utils';
import { renderContent, storyItems } from '@components/OrderableList/utils';

export default {
    title: 'Components/Orderable List',
    component: OrderableListComponent,
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: 'onMove' },
    },
} as Meta<OrderableListProps<StoryListItem>>;

type StoryListItem = {
    textContent: JSX.Element;
};

export const OrderableList: StoryFn<OrderableListProps<StoryListItem>> = ({ onMove, dragDisabled }) => {
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
                <OrderableListComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
            <div className="tw-m-auto tw-w-[600px]">
                <OrderableListComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
        </>
    );
};
