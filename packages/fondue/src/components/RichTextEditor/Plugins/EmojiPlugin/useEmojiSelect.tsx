/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TComboboxItemBase } from '@udecode/plate';
import {
    deleteText,
    focusEditor,
    getPlugin,
    insertText,
    useEditorRef,
    withoutMergingHistory,
    withoutNormalizing,
} from '@udecode/plate';
import { Emoji, KEY_EMOJI, useEmojiDropdownMenuState } from '@udecode/plate-emoji';

export const useEmojiSelect = () => {
    const editorRef = useEditorRef();

    const {
        options: { createEmoji, emojiTriggeringController },
    } = getPlugin(editorRef, KEY_EMOJI);
    const { emojiPickerState } = useEmojiDropdownMenuState();

    const selectEmojiFromDropdown = (emoji: Emoji) => {
        withoutNormalizing(editorRef, () => {
            focusEditor(editorRef);
            const value = createEmoji({
                key: emoji.id,
                text: emoji.name,
                data: {
                    id: emoji.id,
                    emoji: emoji.skins[0].native,
                    name: emoji.name,
                    text: emoji.name,
                },
            });
            emojiPickerState.emojiLibrary.updateFrequentCategory(emoji.id);
            insertText(editorRef, value);
        });
    };

    const selectEmojiFromCombobox = (emojiData: TComboboxItemBase) => {
        withoutNormalizing(editorRef, () => {
            withoutMergingHistory(editorRef, () =>
                deleteText(editorRef, {
                    distance: emojiTriggeringController!.setIsTriggering(false).getTextSize(),
                    reverse: true,
                }),
            );

            const value = createEmoji(emojiData);
            insertText(editorRef, value);
            emojiPickerState.emojiLibrary.updateFrequentCategory(emojiData.key);
        });
    };

    return { selectEmojiFromDropdown, selectEmojiFromCombobox };
};
