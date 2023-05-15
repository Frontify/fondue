/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses } from '../../../';
import { alignmentClassnames, getTextStyleCssProperties } from '../../helper';
import { merge } from '@utilities/merge';

const ID = 'heading2';

export class Heading2Plugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ID, {
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

    return (
        <h2
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={getTextStyleCssProperties(element.type)}
        >
            {children}
        </h2>
    );
};

const createHeading2Plugin = createPluginFactory({
    key: ID,
    isElement: true,
    component: Heading2MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h2', 'H2'] }],
    },
});
