/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KEY_EMOJI, TEmojiCombobox, useEmojiComboboxState } from '@udecode/plate-emoji';

import { EmojiComboboxItem } from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiCombobox/EmojiComboboxItem';
import { useEmojiSelect } from '@components/RichTextEditor/Plugins/EmojiPlugin/useEmojiSelect';
import { Combobox } from '@components/RichTextEditor/components/ComboBox/Combobox';

export function EmojiCombobox({ pluginKey = KEY_EMOJI, id = pluginKey, ...props }: TEmojiCombobox) {
    const { trigger } = useEmojiComboboxState({ pluginKey });
    const { selectEmojiFromCombobox } = useEmojiSelect();

    return (
        <Combobox
            id={id}
            trigger={trigger}
            controlled
            onSelectItem={(_, item) => selectEmojiFromCombobox(item)}
            onRenderItem={EmojiComboboxItem}
            {...props}
        />
    );
}
