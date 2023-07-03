/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_MODAL } from '@utilities/dialogs/constants';

export type InlineDialogProps = OverlayProps & BaseDialogProps;

export const InlineDialog = ({
    children,
    open,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = false,
    enablePortal = true,
    maxHeight = 'auto',
    maxWidth = 400,
    minHeight = 0,
    minWidth = 0,
    modality = Modality.Modal,
    handleClose,
    'data-test-id': dataTestId = 'fondue-inlineDialog',
    darkUnderlay = false,
    autoHeight = false,
}: InlineDialogProps) => {
    return (
        <Overlay
            data-test-id={dataTestId}
            open={open}
            placement={placement}
            offset={offset}
            flip={flip}
            enablePortal={enablePortal}
            minWidth={minWidth}
            minHeight={minHeight}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            modality={modality}
            handleClose={handleClose}
            role={modality === Modality.NonModal ? 'region' : 'dialog'}
            darkUnderlay={darkUnderlay}
            autoHeight={autoHeight}
            zIndex={Z_INDEX_MODAL}
        >
            {children}
        </Overlay>
    );
};
InlineDialog.displayName = 'FondueInlineDialog';
InlineDialog.Trigger = Trigger;
InlineDialog.Content = Content;
