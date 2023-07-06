/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Button, ButtonEmphasis, ButtonSize } from '@components/Button';
import { Box } from '@components/Box';
import { DialogFooterProps, dialogPaddingMap } from '../../types/dialog';
import IconArrowLeft from '@foundation/Icon/Generated/IconArrowLeft';
import { merge } from '@utilities/merge';

export const DialogFooter = ({
    actionButtons,
    children,
    backButton,
    padding = 'small',
    'data-test-id': dataTestId = 'fondue-dialog-footer',
}: DialogFooterProps): ReactElement => {
    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-border-t tw-border-t-line tw-flex tw-items-center tw-justify-between tw-gap-x-3',
                dialogPaddingMap[padding],
            ])}
        >
            {backButton && <Button {...backButton} emphasis={ButtonEmphasis.Default} icon={<IconArrowLeft />} />}
            <Box className="tw-grow">{children}</Box>

            <Box className="tw-flex tw-gap-x-3">
                {actionButtons.map((button) => (
                    <Button key={`${dataTestId}-button-${button.children}`} {...button} size={ButtonSize.Medium} />
                ))}
            </Box>
        </Box>
    );
};

DialogFooter.displayName = 'FondueDialogFooter';
