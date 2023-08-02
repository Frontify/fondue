/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

import { IconGrabHandle12 } from '@foundation/Icon';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

export type DragHandleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active?: boolean;
};

export const DragHandle = forwardRef(
    ({ active, className, ...props }: DragHandleProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                aria-label="Draggable item"
                {...props}
                ref={ref}
                className={merge([
                    FOCUS_VISIBLE_STYLE,
                    'tw-p-1 first:tw-ml-2 group-hover:tw-opacity-100 group-focus-within:tw-opacity-100 tw-rounded-sm hover:tw-cursor-grab',
                    active ? 'tw-opacity-100 tw-text-white' : 'tw-opacity-0 tw-text-text',
                    className,
                ])}
                data-test-id="fondue-tree-item-drag-handle"
            >
                <IconGrabHandle12 />
            </button>
        );
    },
);

DragHandle.displayName = 'FondueDragHandle';
