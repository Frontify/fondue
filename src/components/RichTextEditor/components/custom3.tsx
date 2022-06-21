/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { alignmentClassnames } from '../utils/alignment';

export const Custom3Element: FC<PlateRenderElementProps> = ({ element, attributes, children, designTokens }) => (
    <p
        {...attributes}
        className={merge([element.align && alignmentClassnames[element.align]])}
        style={designTokens.custom3}
    >
        {children}
    </p>
);
