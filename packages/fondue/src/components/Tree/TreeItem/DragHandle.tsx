/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconGrabHandle } from '@frontify/fondue-icons';
import { type ButtonHTMLAttributes, type DetailedHTMLProps, forwardRef } from 'react';

import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type TreeItemColors, TreeItemColorsClassMap } from '../types';

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
export type DragHandleProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active?: boolean;
    showDragHandlerOnHoverOnly?: boolean;
    activeColorStyle?: TreeItemColors;
};

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
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
                <IconGrabHandle size={12} />
            </button>
        );
    },
);

DragHandle.displayName = 'FondueDragHandle';
