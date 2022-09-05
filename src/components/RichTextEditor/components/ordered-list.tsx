/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import React, { FC } from 'react';

export const OL_CLASSES = 'tw-list-decimal tw-pl-6';

export const OrderedListElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <ol className={OL_CLASSES} {...attributes}>
        {children}
    </ol>
);
