/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ITALIC_PLUGIN } from './id';
import { ItalicMarkupElement } from './ItalicMarkupElement';
import { Plugin, PluginProps } from '../Plugin';
import { ItalicButton } from './ItalicButton';
import { createItalicPlugin } from './createItalicPlugin';

export class ItalicPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ITALIC_PLUGIN, {
            button: ItalicButton,
            markupElement: new ItalicMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createItalicPlugin()];
    }
}

export * from './ItalicMarkupElement';
