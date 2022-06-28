/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC, useContext } from 'react';
import { DesignTokensContext } from '../DesignTokensContext';
import { alignmentClassnames } from '../utils/alignment';

export const Heading4Element: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { designTokens } = useContext(DesignTokensContext);
    return (
        <h4
            {...attributes}
            className={merge([element.align && alignmentClassnames[element.align]])}
            style={designTokens.heading4}
        >
            {children}
        </h4>
    );
};
