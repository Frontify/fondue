/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createCodePlugin } from '@udecode/plate';
import { CODE_PLUGIN } from './id';
import { CodeMarkupElement } from './CodeMarkupElement';
import { CodeButton } from './CodeButton';
import { Plugin, PluginProps } from '../Plugin';

export class CodePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(CODE_PLUGIN, {
            button: CodeButton,
            markupElement: new CodeMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createCodePlugin()];
    }
}

export * from './CodeMarkupElement';
