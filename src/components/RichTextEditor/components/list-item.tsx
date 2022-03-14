/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const ListItemElement: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <li {...attributes}>{children}</li>
);
