/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { HTMLAttributes } from 'react';

export type BoxProps = {
    'data-test-id'?: string;
} & HTMLAttributes<HTMLDivElement>;

export const BOX_TEST_ID = 'fondue-box';

export const Box = ({ children, 'data-test-id': dataTestId = BOX_TEST_ID, ...props }: BoxProps) => {
    return (
        <div data-test-id={dataTestId} {...props}>
            {children}
        </div>
    );
};
Box.displayName = 'FondueBox';
