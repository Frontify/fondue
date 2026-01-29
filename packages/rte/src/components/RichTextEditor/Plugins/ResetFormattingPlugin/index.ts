/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPluginFactory } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../Plugin';

import { ResetFormattingButton } from './ResetFormattingButton';
import { ELEMENT_RESET_FORMATTING, RESET_FORMATTING_PLUGIN } from './id';

export const createResetFormattingPlugin: ReturnType<typeof createPluginFactory<NonNullable<unknown>>> =
    createPluginFactory({
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

    plugins(): PlatePlugin[] {
        return [createResetFormattingPlugin()];
    }
}

export * from './id';
