/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '../../../../context/RichTextEditorContext';
import { alignmentClassnames } from '../alignment';

export const QuoteMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <blockquote {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.quote}>
            {children}
        </blockquote>
    );
};
