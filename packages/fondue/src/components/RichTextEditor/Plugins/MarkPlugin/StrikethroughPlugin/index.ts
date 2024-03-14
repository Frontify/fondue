/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createStrikethroughPlugin } from '@udecode/plate-basic-marks';
import { PlatePlugin } from '@udecode/plate-core';

import { STRIKETHROUGH_PLUGIN } from './id';
import { StrikethroughMarkupElement } from './StrikethroughMarkupElement';
import { StrikethroughButton } from './StrikethroughButton';
import { Plugin, PluginProps } from '../../Plugin';

export class StrikethroughPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(STRIKETHROUGH_PLUGIN, {
            button: StrikethroughButton,
            markupElement: new StrikethroughMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [createStrikethroughPlugin()];
    }
}

export * from './StrikethroughMarkupElement';
