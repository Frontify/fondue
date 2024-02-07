/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, createPluginFactory } from '@udecode/plate';
import { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, defaultStyles, getColumnBreakClasses } from '../../..';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyleRenderElementProps, TextStyles } from '../types';

const ID = 'textstyle-custom2-plugin';

export class Custom2Plugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultStyles.custom2, ...props }: PluginProps = {}) {
        super(TextStyles.custom2, {
            label: 'Custom 2',
            markupElement: new Custom2MarkupElement(),
            ...props,
        });
        this.styles = styles;
    }

    plugins(): PlatePlugin[] {
        return [createCustom2Plugin(this.styles)];
    }
}

class Custom2MarkupElement extends MarkupElement {
    constructor(id = ID, node = Custom2MarkupElementNode) {
        super(id, node);
    }
}

const Custom2MarkupElementNode = ({ element, attributes, children, styles }: TextStyleRenderElementProps) => {
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

const createCustom2Plugin = (styles: CSSProperties): PlatePlugin =>
    createPluginFactory({
        key: TextStyles.custom2,
        isElement: true,
        deserializeHtml: {
            rules: [{ validClassName: TextStyles.custom2 }],
        },
    })({
        component: (props: TextStyleRenderElementProps) => <Custom2MarkupElementNode {...props} styles={styles} />,
    });
