/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate-core/dist/types/plate/PlateRenderElementProps';
import React, { FC } from 'react';

export const ListItemElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <li {...attributes}>{children}</li>
);
