/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EmojiCombobox as EmojiComboboxPlate } from '@udecode/plate';
import { EmojiComboboxItem, EmojiComboboxStyles } from '.';

export const EmojiCombobox = () => <EmojiComboboxPlate onRenderItem={EmojiComboboxItem} styles={EmojiComboboxStyles} />;
