/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Button, ButtonProps, ButtonSize } from '@components/Button';
import { Box } from '@components/Box';

export type DialogFooterProps = {
    buttons: ButtonProps[];
    'data-test-id'?: string;
};

export const DialogFooter = ({
    buttons,
    'data-test-id': dataTestId = 'fondue-dialog-footer',
}: DialogFooterProps): ReactElement => {
    return (
        <Box
            data-test-id={dataTestId}
            className="tw-p-4 tw-border-t tw-border-t-line tw-flex tw-items-center tw-justify-end tw-gap-x-3"
        >
            {buttons.map((button) => (
                <Button key={`${dataTestId}-button-${button.children}`} {...button} size={ButtonSize.Medium} />
            ))}
        </Box>
    );
};

DialogFooter.displayName = 'FondueDialogFooter';
