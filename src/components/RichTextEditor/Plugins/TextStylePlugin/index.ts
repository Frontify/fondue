/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin, PluginProps } from '../Plugin';
import { createHeading1Plugin } from './TextStyles/Heading1Plugin/createHeading1Plugin';
import { createHeading2Plugin } from './TextStyles/Heading2Plugin/createHeading2Plugin';
import { createHeading3Plugin } from './TextStyles/Heading3Plugin/createHeading3Plugin';
import { createHeading4Plugin } from './TextStyles/Heading4Plugin/createHeading4Plugin';
// import { createCustom1Plugin } from './TextStyles/Custom1Plugin/createCustom1Plugin';
import { createCustom2Plugin } from './TextStyles/Custom2Plugin/createCustom2Plugin';
import { createCustom3Plugin } from './TextStyles/Custom3Plugin/createCustom3Plugin';
import { createQuotePlugin } from './TextStyles/Quote/createQuotePlugin';

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
            // createCustom1Plugin(),
            createCustom2Plugin(),
            createCustom3Plugin(),
            createQuotePlugin(),
        ];
    }
}
