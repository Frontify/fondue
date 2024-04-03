/* (c) Copyright Frontify Ltd., all rights reserved. */

import { chain } from '@react-aria/utils';
import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import {
    LegacyOrderableList as DropZoneComponent,
    type LegacyOrderableListProps,
} from '@components/LegacyOrderableList';
import { type LegacyOrderableListItem } from '@components/LegacyOrderableList/types';
import { type StoryListItem, renderContent, storyItems } from '@components/LegacyOrderableList/utils';

export default {
    title: 'Components/Drop Zone',
    component: DropZoneComponent,
    tags: ['autodocs'],
    args: {
        dragDisabled: false,
    },
    argTypes: {
        onMove: { action: 'onMove' },
    },
} as Meta<LegacyOrderableListProps<StoryListItem>>;

export const DropZoneWithOrderableList: StoryFn<LegacyOrderableListProps<StoryListItem>> = ({
    onMove,
    dragDisabled,
}) => {
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
