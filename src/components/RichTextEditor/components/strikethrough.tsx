/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const STRIKETHROUGH_CLASSES = 'tw-line-through';

export const StrikethroughMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className={STRIKETHROUGH_CLASSES}>
        {children}
    </span>
);
