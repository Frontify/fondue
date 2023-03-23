/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';

export const Box: FC<JSX.IntrinsicElements['div']> = (props) => {
    return <div data-test-id="fondue-box" {...props} />;
};
Box.displayName = 'FondueBox';
