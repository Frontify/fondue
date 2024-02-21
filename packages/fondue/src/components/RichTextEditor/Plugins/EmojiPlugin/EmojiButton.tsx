/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconFaceHappy16 from '@foundation/Icon/Generated/IconFaceHappy16';
import { ButtonWrapper, IconStylingWrapper } from '../helper';
import { PluginButtonProps } from '../types';
import { EmojiPicker } from './EmojiPicker/EmojiPicker';
import { EmojiToolbarDropdown } from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiToolbarDropdown';
import { useEmojiDropdownMenuState } from '@udecode/plate-emoji';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { useEmojiSelect } from '@components/RichTextEditor/Plugins/EmojiPlugin/useEmojiSelect';

export const EmojiButton = ({ id }: PluginButtonProps) => {
    const { isOpen, setIsOpen, emojiPickerState } = useEmojiDropdownMenuState();
    const { selectEmojiFromDropdown } = useEmojiSelect();

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
                    onSelectEmoji={selectEmojiFromDropdown}
                />
            </EmojiToolbarDropdown>
        </ButtonWrapper>
    );
};
