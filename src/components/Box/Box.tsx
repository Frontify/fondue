/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';

interface DataProps extends React.HTMLAttributes<HTMLDivElement> {
    'data-test-id'?: string;
}

export const Box = ({ children, ...props }: DataProps) => {
    return (
        <div data-test-id={props['data-test-id'] ? props['data-test-id'] : 'fondue-box'} {...props}>
            {children}
        </div>
    );
};
Box.displayName = 'FondueBox';
