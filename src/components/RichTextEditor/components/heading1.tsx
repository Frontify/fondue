/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TElement } from '@udecode/plate-core';
import { PlateRenderElementProps } from '@udecode/plate-core/dist/types/plate/PlateRenderElementProps';
import { merge } from '@utilities/merge';
import React, { FC, useContext } from 'react';
import { DesignTokensContext } from '../context/DesignTokensContext';
import { alignmentClassnames } from '../utils/alignment';

export const Heading1Element: FC<PlateRenderElementProps & { element: TElement & { align?: string } }> = ({
    element,
    attributes,
    children,
}) => {
    const { designTokens } = useContext(DesignTokensContext);
    return (
        <h1
            {...attributes}
            className={merge([element.align && alignmentClassnames[element.align]])}
            style={designTokens.heading1}
        >
            {children}
        </h1>
    );
};
