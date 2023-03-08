/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';

export type DialogProps = {
    children?: ReactNode;
};

export const Dialog = ({ children }: DialogProps): ReactElement => {
    return (
        <div data-test-id="fondue-dialog" className="tw-relative tw-w-[400px]">
            {children}
        </div>
    );
};
