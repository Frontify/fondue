/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { alignmentClassnames } from '../utils/alignment';

export const Heading3Element: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { designTokens } = useRichTextEditorContext();
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
