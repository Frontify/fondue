/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createComboboxPlugin } from '@udecode/plate-combobox';
import { type PlatePlugin } from '@udecode/plate-core';
import { createEmojiPlugin } from '@udecode/plate-emoji';

import { Position } from '@components/RichTextEditor/components/EditorPositioningWrapper';

import { Plugin, type PluginProps } from '../Plugin';

import { EmojiButton } from './EmojiButton';
import { emojiPlugin } from './config';
import { EMOJI_PLUGIN } from './id';

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
