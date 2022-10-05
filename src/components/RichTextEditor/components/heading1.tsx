/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { alignmentClassnames } from './alignment';

export const Heading1Element: FC<PlateRenderElementProps> = ({ element, attributes, children }) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <h1 {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.heading1}>
            {children}
        </h1>
    );
};
