/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { OrderableList as OrderableListComponent } from './OrderableList';
import { OrderableListItem } from './types';
import { OrderableListProps } from '.';
import { chain } from '@react-aria/utils';
import { renderContent, storyItems } from '@components/OrderableList/utils';
import { TreeItemColorsClassMap, TreeItemSpacingClassMap } from '..';

export default {
    title: 'Components/Orderable List',
    component: OrderableListComponent,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
        dragHandlerPosition: 'right',
        spacingY: 'medium',
        selectedId: '3',
        activeColorStyle: 'soft',
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
        activeColorStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.activeColorStyle',
            options: [...Object.keys(TreeItemColorsClassMap)],
            mapping: [...Object.values(TreeItemColorsClassMap)],
            control: { type: 'inline-radio' },
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
    activeColorStyle,
}) => {
    const [items, setItems] = useState(storyItems);

    const handleMove = (modifiedItems: OrderableListItem<StoryListItem>[]) => {
        if (modifiedItems.length === 0) {
            return;
        }

        const modifiedItem = modifiedItems[0];
        const modifiedArray: OrderableListItem<StoryListItem>[] = [];

        let sort = 1;
        let isPageOnLastPosition = true;

        for (const item of items) {
            if (item.id === modifiedItem.id) {
                continue;
            }

            if (modifiedArray.length - 1 === modifiedItem.sort) {
                modifiedArray.push(modifiedItem);
                sort++;
                isPageOnLastPosition = false;
            }

            modifiedArray.push({ ...item, sort });
            sort++;
        }

        if (isPageOnLastPosition) {
            modifiedArray.push(modifiedItem);
        }

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
                    activeColorStyle={activeColorStyle}
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
                    activeColorStyle={activeColorStyle}
                    renderContent={(...args) => renderContent(...args)}
                />
            </div>
        </>
    );
};
