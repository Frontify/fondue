/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createBoldPlugin } from '@udecode/plate';
import { BOLD_PLUGIN } from './id';
import { BoldMarkupElement } from './BoldMarkupElement';
import { BoldButton } from './BoldButton';
import { Plugin } from '../Plugin';

export class BoldPlugin extends Plugin {
    constructor(id = BOLD_PLUGIN, button = BoldButton, markupElement = new BoldMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createBoldPlugin()];
    }
}
