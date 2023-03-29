/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

export type BoxProps = {
    'data-test-id'?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Box = ({ children, 'data-test-id': dataTestId, ...props }: BoxProps) => {
    return (
        <div data-test-id={dataTestId ? dataTestId : 'fondue-box'} {...props}>
            {children}
        </div>
    );
};
Box.displayName = 'FondueBox';
