/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_RESET_FORMATTING, RESET_FORMATTING_PLUGIN } from './id';
import { ResetFormattingButton } from './ResetFormattingButton';
import { Plugin, PluginProps } from '../Plugin';

export const createResetFormattingPlugin = createPluginFactory({
    key: ELEMENT_RESET_FORMATTING,
    isElement: false,
});

export class ResetFormattingPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(RESET_FORMATTING_PLUGIN, {
            button: ResetFormattingButton,
            ...props,
        });
    }

    plugins() {
        return [createResetFormattingPlugin()];
    }
}

export * from './id';
