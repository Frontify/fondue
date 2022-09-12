/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createItalicPlugin } from '@udecode/plate';
import { ITALIC_PLUGIN } from './id';
import { ItalicMarkupElement } from './ItalicMarkupElement';
import { Plugin, PluginProps } from '../Plugin';

export class ItalicPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super({ id: ITALIC_PLUGIN, markupElement: new ItalicMarkupElement(), ...props });
    }

    plugins() {
        return [createItalicPlugin()];
    }
}
