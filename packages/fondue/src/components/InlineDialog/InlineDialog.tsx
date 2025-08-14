/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_MODAL } from '@utilities/dialogs/constants';
import { type WithRequired } from 'src/types/withRequired';

import { Modality, type BaseDialogProps, type OverlayProps } from '../../types';

export type InlineDialogProps = Omit<
    OverlayProps,
    'theme' | 'isDetached' | 'verticalAlignment' | 'withArrow' | 'arrowCustomColors' | 'shadow' | 'isDialog'
> &
    Omit<BaseDialogProps, 'darkUnderlay'> & { unsafe_zIndex?: number };

/**
 * @deprecated Use `Flyout` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
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
    roundedCorners = true,
    width = 360,
    /**
     * This property is used to override the default zIndex of the overlay.
     * This is needed to support the legacy Terrific Modal, which dynamically compounds z-indexes to create a "stacked" modal approach.
     * Once the legacy Terrific Modal is removed/refactored to a pre-determined set of z-indexes, this property can be removed as well.
     */
    unsafe_zIndex = Z_INDEX_MODAL,
}: WithRequired<InlineDialogProps, 'handleClose'>) => {
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
            roundedCorners={roundedCorners}
            borderRadius="small"
            shadow="medium"
            width={width}
            isDialog
            zIndex={unsafe_zIndex}
        >
            {children}
        </Overlay>
    );
};
InlineDialog.displayName = 'FondueInlineDialog';
