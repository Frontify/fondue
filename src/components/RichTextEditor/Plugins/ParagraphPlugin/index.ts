/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ParagraphMarkupElement } from './ParagraphMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { createParagraphPlugin } from './createParagraphPlugin';
import { ELEMENT_PARAGRAPH } from '@udecode/plate';

export class ParagraphPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ELEMENT_PARAGRAPH, {
            markupElement: new ParagraphMarkupElement(),
            label: 'Body Text',
            ...props,
        });
    }

    plugins() {
        return [createParagraphPlugin()];
    }
}

export * from './ParagraphMarkupElement';
export * from './createParagraphPlugin';
