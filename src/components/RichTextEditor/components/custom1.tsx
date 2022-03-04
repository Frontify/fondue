/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { alignmentClassnames } from "../utils/alignment";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Custom1Element: FC<PlateRenderElementProps> = ({ element, attributes, children, textStyles }) => (
    <p
        {...attributes}
        className={merge([
            getTextStyles(TextStyles.ELEMENT_CUSTOM1, textStyles),
            element.align && alignmentClassnames[element.align],
        ])}
    >
        {children}
    </p>
);
