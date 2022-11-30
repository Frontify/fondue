/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmojiPlugin, PlatePlugin } from '@udecode/plate';
import { EmojiCombobox } from './EmojiCombobox';

export const emojiPlugin: Partial<PlatePlugin<EmojiPlugin>> = {
    // needed Plate type troubles
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    renderAfterEditable: EmojiCombobox,
};
