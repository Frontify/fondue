/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Overlay } from '@utilities/dialogs/Overlay';
import { Z_INDEX_POPOVER } from '@utilities/dialogs/constants';
import { ARROW_DARK_THEME, ARROW_LIGHT_THEME } from '@utilities/overlayStyle';
import { type WithRequired } from 'src/types/withRequired';

import { Modality, type OverlayProps } from '../../types/dialog';

type PopoverProps = Omit<
    OverlayProps,
    'isDetached' | 'arrowCustomColors' | 'verticalAlignment' | 'shadow' | 'isDialog'
>;

/**
 * @deprecated Please use updated flyout component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#flyout-old-inlinedialog the migration guide}.
 */
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
    withArrow = false,
    theme,
    handleClose,
}: WithRequired<PopoverProps, 'handleClose'>) => {
    const arrowTheme = theme === 'dark' ? ARROW_DARK_THEME : ARROW_LIGHT_THEME;
    return (
        <Overlay
            open={open}
            theme={theme}
            withArrow={withArrow}
            arrowCustomColors={arrowTheme}
            anchor={anchor}
            placement={placement}
            offset={offset}
            flip={flip}
            enablePortal={enablePortal}
            role={role}
            data-test-id={dataTestId}
            modality={Modality.NonModal}
            zIndex={Z_INDEX_POPOVER}
            handleClose={handleClose}
            shadow="small"
            isDialog={false}
        >
            {children}
        </Overlay>
    );
};
Popover.displayName = 'FonduePopover';
