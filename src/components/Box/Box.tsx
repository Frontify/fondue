/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';

export const Box: FC<JSX.IntrinsicElements['div']> = ({ children, ...props }) => {
    return (
        <div data-test-id="fondue-box" {...props}>
            {children}
        </div>
    );
};
Box.displayName = 'FondueBox';
