/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DialogBodyProps, dialogPaddingMap } from '../../types/dialog';
import { merge } from '@utilities/merge';

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
