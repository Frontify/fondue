/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmojiPlugin, PlatePlugin } from '@udecode/plate';
import { EmojiCombobox } from './EmojiCombobox';

export const emojiPlugin: Partial<PlatePlugin<EmojiPlugin>> = {
    renderAfterEditable: EmojiCombobox,
};
