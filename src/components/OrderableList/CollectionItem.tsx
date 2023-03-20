/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { useId } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focus';
import React from 'react';
import { merge } from '@utilities/merge';
import { CollectionItemProps, ItemDragState } from './types';
import { useDrag } from 'react-dnd';

export const CollectionItem = <T extends object>({
    item,
    renderContent,
    dragDisabled,
    listId,
}: CollectionItemProps<T>) => {
    const { isFocusVisible } = useFocusRing();
    const [{ componentDragState }, drag] = useDrag({
        item: { ...item },
        collect: (monitor) => ({
            componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
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
CollectionItem.displayName = 'FondueCollectionItem';
