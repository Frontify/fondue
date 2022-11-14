/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';

export const Custom3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <p {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.custom3}>
            {children}
        </p>
    );
};

export const createCustom3Plugin = () =>
    createPluginFactory({
        key: TextStyles.ELEMENT_CUSTOM3,
        isElement: true,
        component: Custom3MarkupElementNode,
    });
