/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { ScrollWrapper } from '@components/ScrollWrapper';

export type DialogBodyProps = { children?: ReactNode };

export const DialogBody = ({ children }: DialogBodyProps) => {
    return (
        <div data-test-id="fondue-dialog-body">
            <ScrollWrapper>{children}</ScrollWrapper>
        </div>
    );
};
DialogBody.displayName = 'FondueDialogBody';
