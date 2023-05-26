/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses, useRichTextEditorContext } from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-heading4-plugin';

export class Heading4Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TextStyles.heading4, {
            label: 'Heading 4',
            markupElement: new Heading4MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createHeading4Plugin()];
    }
}

class Heading4MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading4MarkupElementNode) {
        super(id, node);
    }
}

const Heading4MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { theme } = useRichTextEditorContext();
    return (
        <h4
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={theme.heading4}
        >
            {children}
        </h4>
    );
};

const createHeading4Plugin = createPluginFactory({
    key: TextStyles.heading4,
    isElement: true,
    component: Heading4MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h4', 'H4'] }],
    },
});
