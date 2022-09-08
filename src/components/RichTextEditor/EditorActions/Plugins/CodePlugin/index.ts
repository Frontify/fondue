/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CODE_PLUGIN } from './id';
import { CodeMarkupElement } from './CodeMarkupElement';
import { CodeButton } from './CodeButton';
import { Plugin } from '../Plugin';
import { createCodePlugin } from '@udecode/plate';

export class CodePlugin extends Plugin {
    constructor(id = CODE_PLUGIN, button = CodeButton, markupElement = new CodeMarkupElement()) {
        super(id, button, markupElement);
    }

    plugins() {
        return [createCodePlugin()];
    }
}
