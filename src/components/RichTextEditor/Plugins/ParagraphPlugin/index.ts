/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ParagraphMarkupElement } from './ParagraphMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { createParagraphPlugin } from './createParagraphPlugin';
import { PARAGRAPH_PLUGIN } from './id';

export class ParagraphPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(PARAGRAPH_PLUGIN, {
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
