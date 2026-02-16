/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin } from '@udecode/plate-core';
import { createFontColorPlugin } from '@udecode/plate-font';

import { Plugin, type PluginProps } from '../Plugin';

import { FontColorButton } from './FontColorButton';

export class FontColorPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super('font-color-plugin', { button: FontColorButton, ...props });
    }

    plugins(): PlatePlugin[] {
        return [createFontColorPlugin()];
    }
}
