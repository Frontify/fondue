/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Button, ButtonProps, ButtonSize } from '@components/Button';

export type DialogFooterProps = {
    buttons: ButtonProps[];
};

export const DialogFooter = ({ buttons }: DialogFooterProps): ReactElement => {
    return (
        <div
            data-test-id="fondue-dialog-footer"
            className="tw-p-4 tw-border-t tw-border-t-line tw-flex tw-items-center tw-justify-end tw-gap-x-3"
        >
            {buttons.map((button) => (
                <Button key={`dialog-footer-button-${button.children}`} {...button} size={ButtonSize.Medium} />
            ))}
        </div>
    );
};

DialogFooter.displayName = 'FondueDialogFooter';
