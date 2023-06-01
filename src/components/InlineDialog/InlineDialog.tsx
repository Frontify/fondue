/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, cloneElement } from 'react';
import { Popover } from '@components/Popover';
import { PopperProps } from '@components/Popper/types';
import { Modality } from '../../types/dialog';

export type InlineDialogProps = {
    triggerElement: ReactElement;
    open: boolean;
    modality?: Modality;
    maxWidth?: string | number;
    maxHeight?: string | number;
    handleClose: () => void;
} & PopperProps;

export const InlineDialog = ({
    children,
    triggerElement,
    open = false,
    maxWidth = 400,
    maxHeight,
}: InlineDialogProps): ReactElement => {
    return (
        <div data-test-id="fondue-inlineDialog">
            <Popover open={open} role="dialog">
                <Popover.Trigger>{triggerElement && cloneElement(triggerElement)}</Popover.Trigger>
                <Popover.Content>
                    <div style={{ maxWidth, maxHeight }}>{children}</div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
