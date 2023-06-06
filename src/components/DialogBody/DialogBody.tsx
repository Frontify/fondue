/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { DialogBodyProps } from '../../types/dialog';

const SCROLL_SHADOW_STYLE = {
    background:
        'linear-gradient(white 30%,rgba(232, 233, 233, 0)) top,linear-gradient(rgba(232, 233, 233, 0),white 70%) bottom,' +
        'linear-gradient(180deg,#E8E9E9,rgba(232, 233, 233, 0)) center top,linear-gradient(180deg,rgba(232, 233, 233, 0),#E8E9E9) center bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 40px, 100% 12px, 100% 12px',
    backgroundAttachment: 'local, local, scroll, scroll',
};

export const DialogBody = ({
    children,
    maxHeight = 'auto',
    scrollShadows = true,
    'data-test-id': dataTestId = 'fondue-dialog-body',
}: DialogBodyProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
            className="tw-overflow-auto"
            style={{
                maxHeight,
                ...(scrollShadows ? SCROLL_SHADOW_STYLE : {}),
            }}
        >
            {children}
        </div>
    );
};

DialogBody.displayName = 'FondueDialogBody';
