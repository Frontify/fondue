/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import React, { FC } from 'react';

export const ListItemContentElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <span {...attributes}>{children}</span>
);
