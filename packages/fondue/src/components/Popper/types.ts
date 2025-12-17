/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PositioningStrategy } from '@popperjs/core/lib/types';
import { type ReactNode, type RefObject } from 'react';

/**
 * @deprecated Please use updated flyout component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
export type PopperPlacement =
    | 'top'
    | 'bottom'
    | 'top-start'
    | 'bottom-start'
    | 'top-end'
    | 'bottom-end'
    | 'right'
    | 'left'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';

/**
 * @deprecated Please use updated flyout component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
export type PopperProps = {
    children?: ReactNode;
    anchor: RefObject<Element>;
    open?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
    zIndex?: number | string;
    /** @description This property will detach the overlay from its trigger and will be relatively position to the body. example: Dialog compoennt. */
    isDetached?: boolean;
    /** @description This property will take effect only if isDetached is enabled. */
    verticalAlignment?: 'top' | 'centered';
    /** @description The property sets the way the modal is positioned on the view */
    strategy?: PositioningStrategy;
    withArrow?: boolean;
    arrowCustomColors?: string;
};

/**
 * @deprecated Please use updated flyout component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
export type PopperDimension = {
    width: number;
    height: number;
};

/**
 * @deprecated Please use updated flyout component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
export type PrepareElementStyleProps = {
    dimension: PopperDimension;
    isVerticalAlignedToTop: boolean;
};
