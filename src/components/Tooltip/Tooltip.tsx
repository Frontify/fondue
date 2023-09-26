/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Modality, OverlayProps } from '../../types';
import { Z_INDEX_TOOLTIP } from '@utilities/dialogs/constants';
import { Overlay } from '@utilities/dialogs/Overlay';
import { Trigger } from '@utilities/dialogs/Trigger';
import { Content } from '@utilities/dialogs/Content';

export type TooltipProps = { maxWidth?: string | number } & OverlayProps;

export const Tooltip = ({
    children,
    open,
    placement = 'bottom-start',
    offset = [0, 8],
    flip = false,
    enablePortal = true,
    maxWidth = 200,
    'data-test-id': dataTestId = 'fondue-tooltip',
}: TooltipProps) => {
    return (
        <Overlay
            open={open}
            placement={placement}
            offset={offset}
            flip={flip}
            enablePortal={enablePortal}
            role="tooltip"
            data-test-id={dataTestId}
            modality={Modality.NonModal}
            zIndex={Z_INDEX_TOOLTIP}
            theme="dark"
            maxWidth={maxWidth}
        >
            {children}
        </Overlay>
    );
};
Tooltip.displayName = 'FondueTooltip';
Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
