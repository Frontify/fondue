/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin, PluginProps } from '../Plugin';
import { createHeading1Plugin } from './TextStyles/createHeading1Plugin';
import { createHeading2Plugin } from './TextStyles/createHeading2Plugin';
import { createHeading3Plugin } from './TextStyles/createHeading3Plugin';
import { createHeading4Plugin } from './TextStyles/createHeading4Plugin';
import { createCustom1Plugin } from './TextStyles/createCustom1Plugin';
import { createCustom2Plugin } from './TextStyles/createCustom2Plugin';
import { createCustom3Plugin } from './TextStyles/createCustom3Plugin';
import { createQuotePlugin } from './TextStyles/createQuotePlugin';

export class TextStylePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(TEXT_STYLE_PLUGIN, {
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
