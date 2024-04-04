/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { merge } from '@utilities/merge';

import { type DialogBodyProps, dialogPaddingMap } from '../../types/dialog';

export const DialogBody = ({
    children,
    maxHeight = 'auto',
    padding = 'none',
    'data-test-id': dataTestId = 'fondue-dialog-body',
}: DialogBodyProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
            className={merge(['tw-overflow-auto', dialogPaddingMap[padding]])}
            style={{ maxHeight }}
        >
            {children}
        </div>
    );
};

DialogBody.displayName = 'FondueDialogBody';
