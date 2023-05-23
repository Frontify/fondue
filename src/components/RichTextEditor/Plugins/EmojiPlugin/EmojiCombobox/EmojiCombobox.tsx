/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EmojiCombobox as EmojiComboboxPlate } from '@udecode/plate';
import { EmojiComboboxItem, EmojiComboboxStyles } from './';

export const EmojiCombobox = () => <EmojiComboboxPlate onRenderItem={EmojiComboboxItem} styles={EmojiComboboxStyles} />;
