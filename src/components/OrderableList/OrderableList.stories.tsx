/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { OrderableList as OrderableListComponent } from './OrderableList';
import { OrderableListItem } from './types';
import { OrderableListProps } from '.';
import { chain } from '@react-aria/utils';
import { renderContent, storyItems } from '@components/OrderableList/utils';
import { TreeItemSpacingClassMap } from '..';

export default {
    title: 'Components/Orderable List',
    component: OrderableListComponent,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
        dragHandlerPosition: 'right',
        spacingY: 'medium',
        selectedId: '3',
    },
    argTypes: {
        onMove: { action: 'onMove' },
        selectedId: { type: 'string' },
        dragHandlerPosition: {
            table: { category: 'Item Options' },
            options: ['left', 'right', 'none'],
            control: { type: 'inline-radio' },
        },
        spacingY: {
            table: { category: 'Item Options' },
            options: [...Object.keys(TreeItemSpacingClassMap)],
            mapping: [...Object.values(TreeItemSpacingClassMap)],
            control: { type: 'select' },
        },
    },
} as Meta<OrderableListProps<StoryListItem>>;

type StoryListItem = {
    textContent: JSX.Element;
};

export const OrderableList: StoryFn<OrderableListProps<StoryListItem>> = ({
    onMove,
    dragDisabled,
    dragHandlerPosition,
    spacingY,
    selectedId,
}) => {
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
                    dragHandlerPosition={dragHandlerPosition}
                    spacingY={spacingY}
                    selectedId={selectedId}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>

            <div className="tw-m-auto tw-w-[600px]">
                <OrderableListComponent
                    items={items}
                    onMove={chain(handleMove, onMove)}
                    dragDisabled={dragDisabled}
                    dragHandlerPosition={dragHandlerPosition}
                    spacingY={spacingY}
                    selectedId={selectedId}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
        </>
    );
};
