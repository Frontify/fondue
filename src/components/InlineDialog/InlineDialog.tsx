/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect } from 'react';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { PopperPlacement } from '@components/Popper/types';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { Overlay } from '@utilities/dialogs/Overlay';

export type InlineDialogProps = OverlayProps & BaseDialogProps;

export const InlineDialog = ({
    children,
    open,
    placement = PopperPlacement.BottomStart,
    offset = [0, 8],
    flip = false,
    enablePortal = false,
    maxHeight = 'auto',
    maxWidth = 400,
    modality = Modality.Modal,
    handleClose,
    'data-test-id': dataTestId = 'fondue-inlineDialog',
    darkUnderlay = false,
    autoHeight = false,
}: InlineDialogProps) => {
    useEffect(() => {
        if (open && modality !== Modality.NonModal) {
            document.body.style.pointerEvents = 'none';
        }
        if (!open) {
            document.body.style.pointerEvents = 'auto';
        }
    }, [open, modality]);

    return (
        <Overlay
            data-test-id={dataTestId}
            open={open}
            placement={placement}
            offset={offset}
            flip={flip}
            enablePortal={enablePortal}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            modality={modality}
            handleClose={handleClose}
            role={modality === Modality.NonModal ? 'region' : 'dialog'}
            darkUnderlay={darkUnderlay}
            autoHeight={autoHeight}
        >
            {children}
        </Overlay>
    );
};
InlineDialog.displayName = 'FondueInlineDialog';
InlineDialog.Trigger = Trigger;
InlineDialog.Content = Content;
