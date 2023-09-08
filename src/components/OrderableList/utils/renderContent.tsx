/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DragProperties, ItemDragState, OrderableListItem } from '@components/OrderableList';
import { merge } from '@utilities/merge';
import { StoryListItem } from '@components/OrderableList/utils/types';

const dragStoryStyles: Record<ItemDragState, string> = {
    [ItemDragState.Dragging]: 'tw-bg-black-10 tw-border-black-20 tw-opacity-75',
    [ItemDragState.Idle]: 'tw-border-black-20',
    [ItemDragState.Preview]: 'tw-bg-white tw-border-violet-70 tw-border-2',
};

export const renderContent = (
    { textContent }: OrderableListItem<StoryListItem>,
    { componentDragState, isFocusVisible }: DragProperties,
) => {
    return (
        <div
            className={merge([
                'tw-break-word tw-border tw-border-black-40 tw-border-solid tw-p-3',
                dragStoryStyles[componentDragState],
                isFocusVisible && 'tw-bg-violet-20',
            ])}
        >
            <div className="tw-text-xs tw-text-black-60">Position: Foo</div>
            <hr className="tw-mt-2 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div>{textContent}</div>
            <hr className="tw-mt-3 tw-mb-2 tw-border-black-20 tw-bg-black-20" />
            <div className="tw-flex tw-justify-between tw-text-s">
                {isFocusVisible && <span className="tw-font-medium">Im in keyboard focus</span>}
                <span>Drag State: {componentDragState}</span>
            </div>
        </div>
    );
};
