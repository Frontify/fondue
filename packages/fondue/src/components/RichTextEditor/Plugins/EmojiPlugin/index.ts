/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin, createEmojiPlugin } from '@udecode/plate';
import { EMOJI_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { EmojiButton } from './EmojiButton';
import { emojiPlugin } from './config';
import { Position } from '@components/RichTextEditor/EditorPositioningWrapper';

export class EmojiPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(EMOJI_PLUGIN, {
            button: EmojiButton,
            showIn: [Position.BOTTOM, Position.TOP],
            ...props,
        });
    }

    plugins() {
        return [createComboboxPlugin(), createEmojiPlugin(emojiPlugin)];
    }
}
