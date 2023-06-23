/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { Modality, OverlayProps } from '../../types/dialog';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_POPOVER } from '@utilities/dialogs/constants';

export type PopoverComponentProps = OverlayProps;

export const Popover = ({
    children,
    open,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = false,
    enablePortal = true,
    'data-test-id': dataTestId = 'fondue-popover',
    role,
}: PopoverComponentProps) => {
    return (
        <Overlay
            open={open}
            placement={placement}
            offset={offset}
            flip={flip}
            enablePortal={enablePortal}
            role={role}
            data-test-id={dataTestId}
            modality={Modality.NonModal}
            zIndex={Z_INDEX_POPOVER}
        >
            {children}
        </Overlay>
    );
};
Popover.displayName = 'FonduePopover';
Popover.Trigger = Trigger;
Popover.Content = Content;
