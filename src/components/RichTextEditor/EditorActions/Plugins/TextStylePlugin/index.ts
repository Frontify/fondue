/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createParagraphPlugin } from '@udecode/plate';
import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin, PluginProps } from '../Plugin';
import { createHeading1Plugin, createHeading2Plugin, createHeading3Plugin, createHeading4Plugin } from './TextStyles';

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
            createParagraphPlugin(),
            createHeading1Plugin(),
            createHeading2Plugin(),
            createHeading3Plugin(),
            createHeading4Plugin(),
        ];
    }
}
