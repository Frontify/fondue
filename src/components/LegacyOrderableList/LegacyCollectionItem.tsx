/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useId } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { LegacyCollectionItemProps, LegacyItemDragState } from './types';
import { useDrag } from 'react-dnd';

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
    const id = useId();

    return (
        <div
            ref={drag}
            className={merge(['tw-relative tw-outline-none', isFocusVisible ? 'tw-z-30' : 'tw-z-0'])}
            aria-labelledby={id}
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
