/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleButton';
import { Plugin, PluginProps } from '../Plugin';

export class TextStylePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super({
            id: TEXT_STYLE_PLUGIN,
            button: TextStyleButton,
            ...props,
        });
    }

    plugins() {
        return [];
    }
}
