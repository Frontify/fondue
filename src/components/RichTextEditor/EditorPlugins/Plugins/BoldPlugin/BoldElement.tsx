/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderLeafProps } from '@udecode/plate';

export const BOLD_CLASSES = 'tw-font-bold';

export const BoldElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={BOLD_CLASSES}>
        {children}
    </span>
);
