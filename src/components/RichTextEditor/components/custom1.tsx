/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";

export const Custom1Element: FC<PlateRenderElementProps> = ({ attributes, children }) => (
    <p {...attributes} className="tw-text-violet-70">
        {children}
    </p>
);
