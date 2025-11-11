/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { type CSSProperties } from 'react';

import { defaultStyles } from '@components/RichTextEditor/utils/defaultStyles';
import { merge } from '@utilities/merge';

import { getColumnBreakClasses } from '../../ColumnBreakPlugin';
import { MarkupElement } from '../../MarkupElement';
import { Plugin, type PluginProps } from '../../Plugin';
import { alignmentClassnames } from '../../helper';
import { type TextStyleRenderElementProps, TextStyles } from '../types';

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

    plugins(): PlatePlugin[] {
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

const createCustom1Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.custom1,
        isElement: true,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.custom1 }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Custom1MarkupElementNode {...props} styles={styles} />,
    });
