/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '../../../../../context/RichTextEditorContext';
import { alignmentClassnames } from '../alignment';

export const Heading2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h2 {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.heading2}>
            {children}
        </h2>
    );
};
