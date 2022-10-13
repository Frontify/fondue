/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createUnderlinePlugin } from '@udecode/plate';
import { UNDERLINE_PLUGIN } from './id';
import { UnderlineMarkupElement } from './UnderlineMarkupElement';
import { UnderlineButton } from './UnderlineButton';
import { Plugin, PluginProps } from '../Plugin';

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
