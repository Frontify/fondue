/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';

export const QuoteMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <p {...attributes} className={merge([align && alignmentClassnames[align]])} style={designTokens.quote}>
            {children}
        </p>
    );
};

export const createQuotePlugin = createPluginFactory({
    key: TextStyles.ELEMENT_QUOTE,
    isElement: true,
    component: QuoteMarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['blockquote', 'BLOCKQUOTE'] }],
    },
});
