/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from "@udecode/plate";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { alignmentClassnames } from "../utils/alignment";
import { getTextStyles, TextStyles } from "../utils/getTextStyles";

export const Heading4Element: FC<PlateRenderElementProps> = ({ element, attributes, children, textStyles }) => (
    <h4
        {...attributes}
        className={merge([
            getTextStyles(TextStyles.ELEMENT_HEADING4, textStyles),
            element.align && alignmentClassnames[element.align],
        ])}
    >
        {children}
    </h4>
);
