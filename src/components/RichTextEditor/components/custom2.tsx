/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Custom2Element: FC<PlateRenderElementProps> = ({ attributes, children, textStyles }) => (
    <p {...attributes} className={getTextStyles(TextStyles.ELEMENT_CUSTOM2, textStyles)}>
        {children}
    </p>
);
