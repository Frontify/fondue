/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

import { IconGrabHandle12 } from '@foundation/Icon';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

export type DragHandleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active?: boolean;
};

export const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(({ active, className, ...props }, ref) => {
    return (
        <button
            aria-label="Draggable item"
            {...props}
            ref={ref}
            className={merge([
                FOCUS_VISIBLE_STYLE,
                'tw-p-1 first:tw-ml-2 tw-rounded-sm hover:tw-cursor-grab group-hover:tw-opacity-100 group-focus-within:tw-opacity-100',
                active ? 'tw-opacity-100' : '',
                className,
            ])}
            data-test-id="fondue-tree-item-drag-handle"
        >
            <IconGrabHandle12 />
        </button>
    );
});

DragHandle.displayName = 'FondueDragHandle';
