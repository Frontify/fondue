/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { alignmentClassnames } from '../utils/alignment';

export const Heading2Element: FC<PlateRenderElementProps> = ({ element, attributes, children, designTokens }) => (
    <h2
        {...attributes}
        className={merge([element.align && alignmentClassnames[element.align]])}
        style={designTokens.heading2}
    >
        {children}
    </h2>
);
