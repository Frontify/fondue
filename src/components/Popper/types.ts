/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';

export enum PopperPlacement {
    Top = 'top',
    Bottom = 'bottom',
    TopStart = 'top-start',
    BottomStart = 'bottom-start',
    TopEnd = 'top-end',
    BottomEnd = 'bottom-end',
    Right = 'right',
    Left = 'left',
    RightStart = 'right-start',
    RightEnd = 'right-end',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
}

export type PopperProps = {
    children?: ReactNode;
    open?: boolean;
    placement?: PopperPlacement;
    offset?: [number, number];
    flip?: boolean;
    enablePortal?: boolean;
};

export const POPPER_STORY_ARGS = {
    placement: {
        options: Object.values(PopperPlacement),
        control: { type: 'select' },
    },
    flip: {
        control: { type: 'boolean' },
    },
    enablePortal: {
        control: { type: 'boolean' },
    },
};
