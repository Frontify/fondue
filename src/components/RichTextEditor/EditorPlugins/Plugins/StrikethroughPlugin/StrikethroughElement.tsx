/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React from 'react';

export const STRIKETHROUGH_CLASSES = 'tw-line-through';

export const StrikethroughElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={STRIKETHROUGH_CLASSES}>
        {children}
    </span>
);
