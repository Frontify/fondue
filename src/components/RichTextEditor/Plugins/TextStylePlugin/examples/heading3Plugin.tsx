/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import {
    MarkupElement,
    Plugin,
    PluginProps,
    defaultStyles,
    getColumnBreakClasses,
    useRichTextEditorContext,
} from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-heading3-plugin';

export class Heading3Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.heading3, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.heading3, {
            markupElement: new Heading3MarkupElement(),
            label: 'Heading 3',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createHeading3Plugin()];
    }
}

class Heading3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Heading3MarkupElementNode) {
        super(id, node);
    }
}
const Heading3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <h3
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.heading3}
        >
            {children}
        </h3>
    );
};

const createHeading3Plugin = createPluginFactory({
    key: TextStyles.heading3,
    isElement: true,
    component: Heading3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validNodeName: ['h3', 'H3'] }],
    },
});
