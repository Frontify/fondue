/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses, useRichTextEditorContext } from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-heading2-plugin';

export class Heading2Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TextStyles.heading2, {
            label: 'Heading 2',
            markupElement: new Heading2MarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createHeading2Plugin()];
    }
}

class Heading2MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading2MarkupElementNode) {
        super(id, node);
    }
}

const Heading2MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { theme } = useRichTextEditorContext();
    return (
        <h2
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={theme.heading2}
        >
            {children}
        </h2>
    );
};

const createHeading2Plugin = createPluginFactory({
    key: TextStyles.heading2,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
