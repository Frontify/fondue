/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate-core';
import { EmojiPlugin, KEY_EMOJI } from '@udecode/plate-emoji';
import { EmojiCombobox } from './EmojiCombobox';

export const emojiPlugin: Partial<PlatePlugin<EmojiPlugin>> = {
    renderAfterEditable: EmojiCombobox,
    key: KEY_EMOJI,
};
