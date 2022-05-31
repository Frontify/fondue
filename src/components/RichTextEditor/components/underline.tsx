/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const UnderlineMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className="tw-underline">
        {children}
    </span>
);
