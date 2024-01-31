/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KEY_EMOJI, TEmojiCombobox, useEmojiComboboxState } from '@udecode/plate-emoji';

import { EmojiComboboxItem } from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiCombobox/EmojiComboboxItem';
import { Combobox } from '@components/RichTextEditor/components/combobox';

export function EmojiCombobox({ pluginKey = KEY_EMOJI, id = pluginKey, ...props }: TEmojiCombobox) {
    const { trigger, onSelectItem } = useEmojiComboboxState({ pluginKey });

    return (
        <Combobox
            id={id}
            trigger={trigger}
            controlled
            onSelectItem={onSelectItem as any}
            onRenderItem={EmojiComboboxItem}
            {...props}
        />
    );
}
