/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createItalicPlugin } from '@udecode/plate';
import { EMOJI_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { EmojiButton } from './EmojiButton';

export class EmojiPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(EMOJI_PLUGIN, {
            button: EmojiButton,
            ...props,
        });
    }

    plugins() {
        return [createItalicPlugin()];
    }
}
