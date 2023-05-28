/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateRenderElementProps, createPluginFactory } from '@udecode/plate';
import React, { CSSProperties } from 'react';
import { MarkupElement, Plugin, PluginProps, getColumnBreakClasses, useRichTextEditorContext } from '../../../';
import { alignmentClassnames } from '../../helper';
import { merge } from '@utilities/merge';
import { TextStyles } from '../types';

const ID = 'textstyle-imageCaption-plugin';

export class ImageCaptionPlugin extends Plugin {
    public styles: CSSProperties = {};
    constructor({ styles = defaultImageCaptionStyles, ...pluginProps }: PluginProps = {}) {
        super(TextStyles.imageCaption, {
            markupElement: new ImageCaptionMarkupElement(),
            label: 'Image Caption',
            ...pluginProps,
        });
        this.styles = styles;
    }

    plugins() {
        return [createImageCaptionPlugin()];
    }
}

class ImageCaptionMarkupElement extends MarkupElement {
    constructor(id = ID, node = ImageCaptionMarkupElementNode) {
        super(id, node);
    }
}
const ImageCaptionMarkupElementNode = ({ element, attributes, children }: PlateRenderElementProps) => {
    const align = element.align as string;
    const { styles } = useRichTextEditorContext();
    return (
        <p
            {...attributes}
            className={merge([align && alignmentClassnames[align], getColumnBreakClasses(element)])}
            style={styles.imageCaption}
        >
            {children}
        </p>
    );
};

const createImageCaptionPlugin = createPluginFactory({
    key: TextStyles.imageCaption,
    isElement: true,
    component: ImageCaptionMarkupElementNode,
    deserializeHtml: {
        rules: [{ validClassName: 'imageCaption' }],
    },
});

const defaultImageCaptionStyles = {
    color: 'rgb(153, 153, 153)',
    fontFamily: 'Droid Sans',
    fontSize: '13.5px',
    lineHeight: '1.5',
};
