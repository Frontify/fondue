/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const UNDERLINE_CLASSES = 'tw-underline';

export const UnderlineMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className={UNDERLINE_CLASSES}>
        {children}
    </span>
);
