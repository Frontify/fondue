/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PositioningStrategy } from '@popperjs/core/lib/types';
import { ReactNode, RefObject } from 'react';

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
};

const POPPER_PLACEMENT = [
    'top',
    'bottom',
    'top-start',
    'bottom-start',
    'top-end',
    'bottom-end',
    'right',
    'left',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];
export const POPPER_STORY_ARGS = {
    placement: {
        options: POPPER_PLACEMENT,
        control: { type: 'select' },
    },
    flip: {
        control: { type: 'boolean' },
    },
    enablePortal: {
        control: { type: 'boolean' },
    },
};

export type PopperDimension = {
    width: number;
    height: number;
};

export type PrepareElementStyleProps = {
    dimension: PopperDimension;
    isVerticalAlignedToTop: boolean;
};
