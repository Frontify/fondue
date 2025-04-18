/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, type PlateRenderElementProps, createPluginFactory } from '@udecode/plate-core';
import { type CSSProperties } from 'react';

import { defaultStyles } from '@components/RichTextEditor/utils/defaultStyles';
import { merge } from '@utilities/merge';

import { getColumnBreakClasses } from '../../ColumnBreakPlugin';
import { MarkupElement } from '../../MarkupElement';
import { Plugin, type PluginProps } from '../../Plugin';
import { alignmentClassnames } from '../../helper';
import { type TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-custom3-plugin';

export class Custom3Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.custom3, ...props }: PluginProps = {}) {
        super(TextStyles.custom3, {
            label: 'Custom 3',
            markupElement: new Custom3MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createCustom3Plugin(this.styles)];
    }
}

class Custom3MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom3MarkupElementNode) {
        super(id, node);
    }
}

const Custom3MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
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

const createCustom3Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.custom3,
        isElement: true,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.custom3 }],
        },
    })({
        component: (props: PlateRenderElementProps) => <Custom3MarkupElementNode {...props} styles={styles} />,
    });
