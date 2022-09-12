/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createItalicPlugin } from '@udecode/plate';
import { ITALIC_PLUGIN } from './id';
import { ItalicMarkupElement } from './ItalicMarkupElement';
import { ItalicButton } from './ItalicButton';
import { Plugin } from '../Plugin';

export class ItalicPlugin extends Plugin {
    constructor(id = ITALIC_PLUGIN, button = ItalicButton, markupElement = new ItalicMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createItalicPlugin()];
    }
}
