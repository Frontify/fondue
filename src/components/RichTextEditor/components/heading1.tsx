/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import React, { FC } from "react";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Heading1Element: FC<PlateRenderElementProps> = ({ attributes, children, textStyles }) => (
    <h1 {...attributes} className={getTextStyles(TextStyles.ELEMENT_HEADING1, textStyles)}>
        {children}
    </h1>
);
