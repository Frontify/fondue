/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type LegacyDragProperties,
    LegacyItemDragState,
    type LegacyOrderableListItem,
} from '@components/LegacyOrderableList';
import { type StoryListItem } from '@components/LegacyOrderableList/utils/types';
import { merge } from '@utilities/merge';

const dragStoryStyles: Record<LegacyItemDragState, string> = {
    [LegacyItemDragState.Dragging]: 'tw-bg-black-10 tw-border-black-20 tw-opacity-75',
    [LegacyItemDragState.Idle]: 'tw-border-black-20',
    [LegacyItemDragState.Preview]: 'tw-bg-white tw-border-violet-70 tw-border-2',
};

export const renderContent = (
    { textContent }: LegacyOrderableListItem<StoryListItem>,
    { componentDragState, isFocusVisible }: LegacyDragProperties,
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
