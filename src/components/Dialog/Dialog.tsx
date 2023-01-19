/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, ReactElement } from 'react';
import { merge } from '@utilities/merge';
import { CONTAINER_CLASSES } from '@utilities/borderStyle';

export type DialogProps = PropsWithChildren<{
    position?: DialogPosition;
    flip?: boolean;
}>;

export enum DialogPosition {
    TopStart = 'top-start',
    TopEnd = 'top-end',
    BottomStart = 'bottom-start',
    BottomEnd = 'bottom-end',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
    RightStart = 'right-start',
    RightEnd = 'right-end',
    TopMiddle = 'top',
    RightMiddle = 'right',
    BottomMiddle = 'bottom',
    LeftMiddle = 'left',
}

export const Dialog = ({ children }: DialogProps): ReactElement => {
    return (
        <div data-test-id="flyout" className={merge(['tw-relative tw-w-[400px]', CONTAINER_CLASSES])}>
            {children}
        </div>
    );
};
