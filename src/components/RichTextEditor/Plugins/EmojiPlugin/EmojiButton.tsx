/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconFaceHappy16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper } from '../helper';
import { PluginButtonProps } from '../types';
import { EmojiPicker } from './EmojiPicker/EmojiPicker';
import { EmojiToolbarDropdown } from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiToolbarDropdown';
import { KEY_EMOJI, useEmojiDropdownMenuState } from '@udecode/plate-emoji';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/Toolbar';
import { focusEditor, getPlugin, insertText, useEditorRef, withoutNormalizing } from '@udecode/plate-common';

export const EmojiButton = ({ id }: PluginButtonProps) => {
    const { isOpen, setIsOpen, emojiPickerState } = useEmojiDropdownMenuState();
    const editorRef = useEditorRef();
    const {
        options: { createEmoji },
    } = getPlugin(editorRef, KEY_EMOJI);
    return (
        <ButtonWrapper id={id}>
            <EmojiToolbarDropdown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                control={
                    <ToolbarButton pressed={isOpen}>
                        <IconStylingWrapper icon={<IconFaceHappy16 />} />
                    </ToolbarButton>
                }
            >
                <EmojiPicker
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    {...emojiPickerState}
                    onSelectEmoji={(emoji) => {
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
                    }}
                />
            </EmojiToolbarDropdown>
        </ButtonWrapper>
    );
};
