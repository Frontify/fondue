/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ButtonHTMLAttributes, type DetailedHTMLProps, forwardRef } from 'react';

import IconGrabHandle12 from '@foundation/Icon/Generated/IconGrabHandle12';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type TreeItemColors, TreeItemColorsClassMap } from '../types';

export type DragHandleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active?: boolean;
    showDragHandlerOnHoverOnly?: boolean;
    activeColorStyle?: TreeItemColors;
};

export const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(
    ({ active, showDragHandlerOnHoverOnly, activeColorStyle, ...props }, ref) => {
        const { selectedDragHanlderTextColor, dragHanlderTextColor } =
            TreeItemColorsClassMap[activeColorStyle ?? 'neutral'];

        return (
            <button
                type="button"
                aria-label="Draggable item"
                {...props}
                ref={ref}
                className={merge([
                    FOCUS_VISIBLE_STYLE,
                    'tw-p-1 first:tw-ml-2 tw-rounded-sm hover:tw-cursor-grab group-hover:tw-opacity-100 group-focus-within:tw-opacity-100',
                    props.disabled ? 'tw-invisible tw-pointer-events-none' : 'tw-visible',
                    showDragHandlerOnHoverOnly ? !active && 'tw-opacity-0' : 'tw-opacity-100',
                    active ? selectedDragHanlderTextColor : dragHanlderTextColor,
                ])}
                data-test-id="fondue-tree-item-drag-handle"
            >
                <IconGrabHandle12 />
            </button>
        );
    },
);

DragHandle.displayName = 'FondueDragHandle';
