/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate-core/dist/types/plate/PlateRenderElementProps';
import { merge } from '@utilities/merge';
import React, { FC, useContext } from 'react';
import { DesignTokensContext } from '../context/DesignTokensContext';
import { alignmentClassnames } from '../utils/alignment';

export const Heading3Element: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { designTokens } = useContext(DesignTokensContext);
    return (
        <h3
            {...attributes}
            className={merge([element.align && alignmentClassnames[element.align]])}
            style={designTokens.heading3}
        >
            {children}
        </h3>
    );
};
