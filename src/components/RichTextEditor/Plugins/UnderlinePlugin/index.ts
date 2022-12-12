/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UNDERLINE_PLUGIN } from './id';
import { UnderlineMarkupElement } from './UnderlineMarkupElement';
import { UnderlineButton } from './UnderlineButton';
import { Plugin, PluginProps } from '../Plugin';
import { createUnderlinePlugin } from './createUnderlinePlugin';

export class UnderlinePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(UNDERLINE_PLUGIN, {
            button: UnderlineButton,
            markupElement: new UnderlineMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createUnderlinePlugin()];
    }
}

export * from './UnderlineMarkupElement';
