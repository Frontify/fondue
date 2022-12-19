/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Combobox, EmojiItemData, KEY_EMOJI, TEmojiCombobox, useEmojiCombobox } from '@udecode/plate';
import { EmojiComboboxItem, EmojiComboboxStyles } from './';

export const EmojiCombobox = <TData extends EmojiItemData = EmojiItemData>({
    pluginKey = KEY_EMOJI,
    id = pluginKey,
}: TEmojiCombobox<TData>) => {
    const { trigger, onSelectItem } = useEmojiCombobox(pluginKey);

    return (
        <Combobox
            id={id}
            trigger={trigger}
            controlled
            onSelectItem={onSelectItem}
            onRenderItem={EmojiComboboxItem}
            styles={EmojiComboboxStyles}
        />
    );
};
