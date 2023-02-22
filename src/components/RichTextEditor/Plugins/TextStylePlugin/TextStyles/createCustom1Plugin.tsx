/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import React from 'react';
import { getColumnBreakClasses } from '../../ColumnBreakPlugin/utils/getColumnBreakClasses';
import { alignmentClassnames } from './alignment';
import { TextStyles } from './textStyles';

export const Custom1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;

    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={designTokens.custom1}
        >
            {children}
        </p>
    );
};

export const createCustom1Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM1,
    isElement: true,
    component: Custom1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom1' }],
    },
});
