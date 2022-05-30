/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { alignmentClassnames } from '../utils/alignment';
import { TextStyles, getTextStyles } from '../utils/getTextStyles';

export const Custom2Element: FC<PlateRenderElementProps> = ({ element, attributes, children, textStyles }) => (
    <p
        {...attributes}
        className={merge([
            getTextStyles(TextStyles.ELEMENT_CUSTOM2, textStyles),
            element.align && alignmentClassnames[element.align],
        ])}
    >
        {children}
    </p>
);
