/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { DialogBodyProps } from '../../types/dialog';

export const DialogBody = ({
    children,
    maxHeight = 'auto',
    'data-test-id': dataTestId = 'fondue-dialog-body',
}: DialogBodyProps): ReactElement => {
    return (
        <div data-test-id={dataTestId} className="tw-overflow-auto" style={{ maxHeight }}>
            {children}
        </div>
    );
};

DialogBody.displayName = 'FondueDialogBody';
