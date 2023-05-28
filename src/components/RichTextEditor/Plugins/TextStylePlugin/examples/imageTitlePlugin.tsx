/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses, useRichTextEditorContext } from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-imageTitle-plugin';

export class ImageTitlePlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultImageTitleStyles, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.imageTitle, {
            markupElement: new ImageTitleMarkupElement(),
            label: 'Image Title',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createImageTitlePlugin()];
    }
}

class ImageTitleMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageTitleMarkupElementNode) {
        super(id, node);
    }
}
const ImageTitleMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.imageTitle}
        >
            {children}
        </p>
    );
};

const createImageTitlePlugin = createPluginFactory({
    key: TextStyles.imageTitle,
    isElement: true,
    component: ImageTitleMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageTitle' }],
    },
});

const defaultImageTitleStyles = {
    color: 'rgb(0, 0, 0)',
    fontFamily: 'Droid Sans',
    fontSize: '15px',
    fontStyle: '',
    fontWeight: '400',
    letterSpacing: 'normal',
    lineHeight: '1.4',
    marginBottom: '3px',
    marginTop: '0',
    textDecoration: '',
    textTransform: 'none' as CSSProperties['textTransform'],
};
