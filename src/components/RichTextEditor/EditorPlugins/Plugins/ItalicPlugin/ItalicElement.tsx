/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderLeafProps } from '@udecode/plate';

export const ITALIC_CLASSES = 'tw-italic';

export const ItalicElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={ITALIC_CLASSES}>
        {children}
    </span>
);
