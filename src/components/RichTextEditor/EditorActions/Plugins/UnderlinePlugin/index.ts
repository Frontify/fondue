/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createUnderlinePlugin } from '@udecode/plate';
import { UNDERLINE_PLUGIN } from './id';
import { UnderlineMarkupElement } from './UnderlineMarkupElement';
import { UnderlineButton } from './UnderlineButton';
import { Plugin } from '../Plugin';

export class UnderlinePlugin extends Plugin {
    constructor(id = UNDERLINE_PLUGIN, button = UnderlineButton, markupElement = new UnderlineMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createUnderlinePlugin()];
    }
}
