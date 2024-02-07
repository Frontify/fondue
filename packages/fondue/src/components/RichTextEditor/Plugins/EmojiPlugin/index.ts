/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EMOJI_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { EmojiButton } from './EmojiButton';
import { emojiPlugin } from './config';
import { Position } from '@components/RichTextEditor/components/EditorPositioningWrapper';
import { PlatePlugin, createComboboxPlugin } from '@udecode/plate';
import { createEmojiPlugin } from '@udecode/plate-emoji';

export class EmojiPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(EMOJI_PLUGIN, {
            button: EmojiButton,
            showIn: [Position.BOTTOM, Position.TOP],
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [createComboboxPlugin(), createEmojiPlugin(emojiPlugin)];
    }
}
