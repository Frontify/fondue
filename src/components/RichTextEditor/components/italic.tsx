/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderLeafProps } from "@udecode/plate";
import React, { FC } from "react";

export const ItalicMark: FC<PlateRenderLeafProps> = ({ attributes, children }) => (
    <span {...attributes} className="tw-italic">
        {children}
    </span>
);
