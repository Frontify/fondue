/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Heading4Element: FC<PlateRenderElementProps> = ({ attributes, children, textStyles }) => (
    <h4 {...attributes} className={getTextStyles(TextStyles.ELEMENT_HEADING4, textStyles)}>
        {children}
    </h4>
);
