/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DialogBodyProps, dialogPaddingMap } from '../../types/dialog';
import { merge } from '@utilities/merge';

export const DialogBody = ({
    children,
    maxHeight = 'auto',
    padding,
    'data-test-id': dataTestId = 'fondue-dialog-body',
}: DialogBodyProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
            className={merge(['tw-overflow-auto', padding ? dialogPaddingMap[padding] : 'tw-p-0'])}
            style={{ maxHeight }}
        >
            {children}
        </div>
    );
};

DialogBody.displayName = 'FondueDialogBody';
