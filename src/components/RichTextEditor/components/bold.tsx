/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React, { FC } from "react";

export const BoldMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className="tw-font-bold">
        {children}
    </span>
);
