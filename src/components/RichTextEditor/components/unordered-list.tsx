/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate-core/dist/types/plate/PlateRenderElementProps';
import React, { FC } from 'react';

export const UnorderedListElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <ul className="tw-list-disc tw-pl-6" {...attributes}>
        {children}
    </ul>
);
