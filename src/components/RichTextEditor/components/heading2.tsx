/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { alignmentClassnames } from '../utils/alignment';

export const Heading2Element: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h2 {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.heading2}>
            {children}
        </h2>
    );
};
