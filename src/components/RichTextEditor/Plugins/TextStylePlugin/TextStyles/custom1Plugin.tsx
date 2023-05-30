/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-custom1-plugin';

export class Custom1Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.custom1, ...props }: PluginProps = {}) {
        super(TextStyles.custom1, {
            label: 'Custom 1',
            markupElement: new Custom1MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins() {
        return [createCustom1Plugin(this.styles)];
    }
}

class Custom1MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom1MarkupElementNode) {
        super(id, node);
    }
}

const Custom1MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
    const align = element.align as string;
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles}
        >
            {children}
        </p>
    );
};

const createCustom1Plugin = (styles: CSSProperties) =>
    createPluginFactory({
        key: TextStyles.custom1,
        isElement: true,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.custom1 }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Custom1MarkupElementNode {...props} styles={styles} />,
    });
