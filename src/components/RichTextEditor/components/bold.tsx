/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React, { FC } from 'react';

export const BOLD_CLASSES = 'tw-font-bold';

export const BoldMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className={BOLD_CLASSES}>
        {children}
    </span>
);
