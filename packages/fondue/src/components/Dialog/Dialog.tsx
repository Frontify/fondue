/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_MODAL } from '@utilities/dialogs/constants';
import { type WithRequired } from 'src/types/withRequired';

import { type BaseDialogProps, Modality, type OverlayProps } from '../../types';

export type DialogProps = Omit<
    OverlayProps,
    'placement' | 'flip' | 'offset' | 'theme' | 'withArrow' | 'arrowCustomColors' | 'shadow' | 'isDialog'
> &
    Omit<BaseDialogProps, 'width'>;

export const Dialog = ({
    id,
    children,
    open,
    anchor,
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
    roundedCorners = true,
}: WithRequired<DialogProps, 'handleClose'>) => {
    return (
        <Overlay
            id={id}
            data-test-id={dataTestId}
            open={open}
            anchor={anchor}
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
            strategy={modality === Modality.NonModal ? 'absolute' : 'fixed'}
            roundedCorners={roundedCorners}
            borderRadius="large"
        >
            {children}
        </Overlay>
    );
};
Dialog.displayName = 'FondueDialog';
