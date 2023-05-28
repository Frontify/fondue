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

const ID = 'textstyle-custom3-plugin';

export class Custom3Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.custom3, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.custom3, {
            markupElement: new Custom3MarkupElement(),
            label: 'Custom 3',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createCustom3Plugin()];
    }
}

class Custom3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom3MarkupElementNode) {
        super(id, node);
    }
}

const Custom3MarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.custom3}
        >
            {children}
        </p>
    );
};

const createCustom3Plugin = createPluginFactory({
    key: TextStyles.custom3,
    isElement: true,
    component: Custom3MarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'custom3' }],
    },
});
