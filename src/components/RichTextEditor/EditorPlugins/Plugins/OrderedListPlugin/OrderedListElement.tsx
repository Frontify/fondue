/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderLeafProps } from '@udecode/plate';

export const OL_CLASSES = 'tw-list-decimal tw-pl-6';

export const OrderedListElement = ({ attributes, children }: PlateRenderLeafProps) => (
    <ol className={OL_CLASSES} {...attributes}>
        {children}
    </ol>
);
