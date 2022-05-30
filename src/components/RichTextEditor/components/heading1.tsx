/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { alignmentClassnames } from '../utils/alignment';
import { TextStyles, getTextStyles } from '../utils/getTextStyles';

export const Heading1Element: FC<PlateRenderElementProps> = ({ element, attributes, children, textStyles }) => (
    <h1
        {...attributes}
        className={merge([
            getTextStyles(TextStyles.ELEMENT_HEADING1, textStyles),
            element.align && alignmentClassnames[element.align],
        ])}
    >
        {children}
    </h1>
);
