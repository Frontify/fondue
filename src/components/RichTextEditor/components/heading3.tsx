/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Heading3Element: FC<PlateRenderElementProps> = ({ attributes, children, textStyles }) => (
    <h3 {...attributes} className={getTextStyles(TextStyles.ELEMENT_HEADING3, textStyles)}>
        {children}
    </h3>
);
