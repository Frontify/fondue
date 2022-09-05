/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate';
import React from 'react';

export const UNDERLINE_CLASSES = 'tw-underline';

export const UnderlineElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <span {...attributes} className={UNDERLINE_CLASSES}>
        {children}
    </span>
);
