/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from '@udecode/plate-core/dist/types/plate/PlateRenderLeafProps';
import React, { FC } from 'react';

export const StrikethroughMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className="tw-line-through">
        {children}
    </span>
);
