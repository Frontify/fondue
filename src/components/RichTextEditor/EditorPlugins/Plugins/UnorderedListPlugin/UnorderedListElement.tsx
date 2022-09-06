/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderLeafProps } from '@udecode/plate';

export const UL_CLASSES = 'tw-list-disc tw-pl-6';

export const UnorderedListElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <ul className={UL_CLASSES} {...attributes}>
        {children}
    </ul>
);
