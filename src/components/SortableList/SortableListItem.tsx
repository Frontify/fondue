/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useSortable } from '@dnd-kit/sortable';

import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { CollectionItemProps, ItemDragState } from './types';

export const SortableListItem = <T extends object>({
    id,
    item,
    type,
    accepts,
    content,
    draggable,
}: CollectionItemProps<T>) => {
    const { isFocusVisible } = useFocusRing();

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        disabled: !draggable,
        data: { type, supports: accepts },
    });

    return (
        <li
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            className={merge([
                'tw-relative tw-outline-none',
                isFocusVisible ? 'tw-z-30' : 'tw-z-0',
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id="draggable-item"
        >
            {/* {content(item, { componentDragState: {}, isFocusVisible })} */}
        </li>
    );
};

SortableListItem.displayName = 'FondueSortableListItem';
