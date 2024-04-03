/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useDrag } from 'react-dnd';

import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type LegacyCollectionItemProps, LegacyItemDragState } from './types';

export const LegacyCollectionItem = <T extends object>({
    item,
    renderContent,
    dragDisabled,
    listId,
}: LegacyCollectionItemProps<T>) => {
    const { isFocusVisible } = useFocusRing();
    const [{ componentDragState }, drag] = useDrag({
        item: { ...item },
        collect: (monitor) => ({
            componentDragState: monitor.isDragging() ? LegacyItemDragState.Dragging : LegacyItemDragState.Idle,
        }),
        type: listId,
        canDrag: !dragDisabled,
    });

    return (
        <div
            ref={drag}
            className={merge(['tw-relative tw-outline-none', isFocusVisible ? 'tw-z-30' : 'tw-z-0'])}
            data-test-id="draggable-item"
            aria-disabled={dragDisabled}
        >
            <div className={merge(['tw-outline-none', isFocusVisible && FOCUS_STYLE])}>
                {renderContent(item, { componentDragState, isFocusVisible })}
            </div>
        </div>
    );
};
LegacyCollectionItem.displayName = 'FondueLegacyCollectionItem';
