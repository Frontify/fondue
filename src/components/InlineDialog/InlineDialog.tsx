/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BaseDialogProps, Modality, OverlayProps } from '../../types';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_MODAL } from '@utilities/dialogs/constants';

export type InlineDialogProps = Omit<
    OverlayProps,
    'theme' | 'isDetached' | 'verticalAlignment' | 'withArrow' | 'arrowCustomColors'
> &
    Omit<BaseDialogProps, 'darkUnderlay'>;

export const InlineDialog = ({
    children,
    open,
    anchor,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = false,
    enablePortal = true,
    maxHeight = 'auto',
    maxWidth = 360,
    minHeight = 0,
    minWidth = 360,
    modality = Modality.Modal,
    handleClose,
    'data-test-id': dataTestId = 'fondue-inlineDialog',
    autoHeight = false,
    roundedCorners,
}: InlineDialogProps) => {
    return (
        <Overlay
            data-test-id={dataTestId}
            open={open}
            anchor={anchor}
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
            autoHeight={autoHeight}
            zIndex={Z_INDEX_MODAL}
            roundedCorners={roundedCorners}
        >
            {children}
        </Overlay>
    );
};
InlineDialog.displayName = 'FondueInlineDialog';
