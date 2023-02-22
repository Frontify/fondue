/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import { merge } from '@utilities/merge';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { TextStyles } from './textStyles';
import { alignmentClassnames } from './alignment';
import { breakAfterClassNames } from '../../../utils/constants';

export const Custom3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const { designTokens } = useRichTextEditorContext();
    const align = element.align as string;
    const hasColumn = element.breakAfterColumn as boolean;

    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], hasColumn && breakAfterClassNames])}
            style={designTokens.custom3}
        >
            {children}
        </p>
    );
};

export const createCustom3Plugin = createPluginFactory({
    key: TextStyles.ELEMENT_CUSTOM3,
    isElement: true,
    component: Custom3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom3' }],
    },
});
