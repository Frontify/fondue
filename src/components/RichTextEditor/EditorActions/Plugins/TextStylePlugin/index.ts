/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin, PluginProps } from '../Plugin';
import {
    createCustom1Plugin,
    createCustom2Plugin,
    createCustom3Plugin,
    createHeading1Plugin,
    createHeading2Plugin,
    createHeading3Plugin,
    createHeading4Plugin,
    createQuotePlugin,
} from './TextStyles';

export class TextStylePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super({
            id: TEXT_STYLE_PLUGIN,
            button: TextStyleButton,
            ...props,
        });
    }

    plugins() {
        return [
            createHeading1Plugin(),
            createHeading2Plugin(),
            createHeading3Plugin(),
            createHeading4Plugin(),
            createCustom1Plugin(),
            createCustom2Plugin(),
            createCustom3Plugin(),
            createQuotePlugin(),
        ];
    }
}
