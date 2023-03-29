/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';

export type InlineDialogProps = {
    children?: ReactNode;
};

export const InlineDialog = ({ children }: InlineDialogProps): ReactElement => {
    return (
        <div data-test-id="fondue-inlineDialog" className="tw-relative tw-w-[400px]">
            {children}
        </div>
    );
};
