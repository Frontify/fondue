/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { OrderableList as OrderableListComponent } from './OrderableList';
import { OrderableListItem, OrderableListItemStyle, OrderableListProps } from './types';
import { chain } from '@react-aria/utils';
import { renderContent, storyItems } from '@components/OrderableList/utils';
import {
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
} from '@components/Tree/types';

export default {
    title: 'Components/Orderable List',
    component: OrderableListComponent,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
        dragHandlerPosition: 'right',
        enableDragDelay: true,
        spacingY: 'small',
        contentHight: 'content-fit',
        shadow: 'small',
        borderRadius: 'medium',
        borderWidth: 'x-small',
        borderStyle: 'solid',
        activeColorStyle: 'soft',
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
        enableDragDelay: {
            table: { category: 'Item Options' },
            defaultValue: true,
            control: { type: 'boolean' },
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
            control: { type: 'inline-radio' },
        },
        borderRadius: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderRadius',
            options: [...Object.keys(TreeItemBorderRadiusClassMap)],
            mapping: [...Object.values(TreeItemBorderRadiusClassMap)],
            control: { type: 'inline-radio' },
        },
        borderWidth: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderWidth',
            options: [...Object.keys(TreeItemBorderClassMap)],
            mapping: [...Object.values(TreeItemBorderClassMap)],
            control: { type: 'inline-radio' },
        },
        borderStyle: {
            table: { category: 'Item Style' },
            name: 'itemStyle.borderStyle',
            options: [...Object.keys(TreeItemBorderStyleClassMap)],
            mapping: [...Object.values(TreeItemBorderStyleClassMap)],
            control: { type: 'inline-radio' },
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

export const OrderableList: StoryFn<OrderableListProps<StoryListItem> & OrderableListItemStyle> = ({
    onMove,
    selectedId,
    dragDisabled,
    dragHandlerPosition,
    enableDragDelay,
    spacingY,
    contentHight,
    shadow,
    borderRadius,
    borderWidth,
    borderStyle,
    activeColorStyle,
}) => {
    const [items, setItems] = useState(storyItems);
    const prevSelectedId = useRef(selectedId);
    const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);

    useEffect(() => {
        if (prevSelectedId.current !== selectedId) {
            prevSelectedId.current = selectedId;
            setCurrentSelectedId(selectedId);
        }
    }, [selectedId, prevSelectedId]);

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

    const handleSelect = (id: string) => {
        setCurrentSelectedId(id);
    };

    return (
        <div className="tw-m-auto tw-w-[600px] tw-pb-6">
            <OrderableListComponent
                items={items}
                onMove={chain(handleMove, onMove)}
                dragDisabled={dragDisabled}
                dragHandlerPosition={dragHandlerPosition}
                enableDragDelay={enableDragDelay}
                selectedId={currentSelectedId}
                itemStyle={{
                    spacingY,
                    contentHight,
                    shadow,
                    borderRadius,
                    borderWidth,
                    borderStyle,
                    activeColorStyle,
                }}
                renderContent={(...args) =>
                    renderContent({ textContent: args[0].textContent, id: args[0].id, onSelect: handleSelect })
                }
            />
        </div>
    );
};
