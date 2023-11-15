/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Modality, OverlayProps } from '../../types';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_POPOVER } from '@utilities/dialogs/constants';

export const Popover = ({
    children,
    open,
    anchor,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = false,
    enablePortal = true,
    'data-test-id': dataTestId = 'fondue-popover',
    role = 'region',
    theme,
}: OverlayProps) => {
    return (
        <Overlay
            open={open}
            theme={theme}
            anchor={anchor}
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
