/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const ITALIC_CLASSES = 'tw-italic';

export const ItalicMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className={ITALIC_CLASSES}>
        {children}
    </span>
);
