/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { BaseDialogProps, Modality, OverlayProps } from '../../types/dialog';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_MODAL } from '@utilities/dialogs/constants';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';

export type DialogProps = Omit<OverlayProps, 'placement, flip, offset'> & BaseDialogProps;

export const Dialog = ({
    children,
    open,
    enablePortal = true,
    maxHeight = 'auto',
    maxWidth,
    minHeight = 200,
    minWidth = 600,
    modality = Modality.Modal,
    handleClose,
    'data-test-id': dataTestId = 'fondue-dialog',
    darkUnderlay = false,
    autoHeight = false,
    verticalAlignment = 'centered',
}: DialogProps) => {
    return (
        <Overlay
            data-test-id={dataTestId}
            open={open}
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
            isDetached={true}
            verticalAlignment={verticalAlignment}
        >
            {children}
        </Overlay>
    );
};
Dialog.displayName = 'FondueDialog';
Dialog.Trigger = Trigger;
Dialog.Content = Content;
