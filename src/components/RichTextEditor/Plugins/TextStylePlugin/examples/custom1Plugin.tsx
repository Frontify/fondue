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

const ID = 'textstyle-custom1-plugin';

export class Custom1Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.custom1, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.custom1, {
            markupElement: new Custom1MarkupElement(),
            label: 'Quote',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createCustom1Plugin()];
    }
}

class Custom1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom1MarkupElementNode) {
        super(id, node);
    }
}

const Custom1MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.custom1}
        >
            {children}
        </p>
    );
};

const createCustom1Plugin = createPluginFactory({
    key: TextStyles.custom1,
    isElement: true,
    component: Custom1MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: ID }],
    },
});
