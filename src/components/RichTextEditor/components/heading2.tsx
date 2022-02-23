/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Heading2Element: FC<PlateRenderElementProps> = ({ attributes, children, textStyles }) => (
    <h2 {...attributes} className={getTextStyles(TextStyles.ELEMENT_HEADING2, textStyles)}>
        {children}
    </h2>
);
