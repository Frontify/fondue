/* (c) Copyright Frontify Ltd., all rights reserved. */

import { chain } from '@react-aria/utils';
import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import { renderContent, storyItems } from '@components/LegacyOrderableList/utils';

import { LegacyOrderableList as OrderableListComponent } from './LegacyOrderableList';
import { type LegacyOrderableListItem, type LegacyOrderableListProps } from './types';

export default {
    title: 'Deprecated/Legacy Orderable List',
    component: OrderableListComponent,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: 'onMove' },
    },
} as Meta<LegacyOrderableListProps<StoryListItem>>;

type StoryListItem = {
    textContent: JSX.Element;
};

export const LegacyOrderableList: StoryFn<LegacyOrderableListProps<StoryListItem>> = ({ onMove, dragDisabled }) => {
    const [items, setItems] = useState(storyItems);

    const handleMove = (modifiedItems: LegacyOrderableListItem<StoryListItem>[]) => {
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
