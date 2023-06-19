/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

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
    open?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
    zIndex?: number | string;
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
