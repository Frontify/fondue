/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import React, { FC } from 'react';

export const UL_CLASSES = 'tw-list-disc tw-pl-6';

export const UnorderedListElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <ul className={UL_CLASSES} {...attributes}>
        {children}
    </ul>
);
