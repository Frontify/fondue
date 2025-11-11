/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEmojiDropdownMenuState } from '@udecode/plate-emoji';

import { EmojiToolbarDropdown } from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiToolbarDropdown';
import { useEmojiSelect } from '@components/RichTextEditor/Plugins/EmojiPlugin/useEmojiSelect';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import IconFaceHappy16 from '@foundation/Icon/Generated/IconFaceHappy16';

import { ButtonWrapper, IconStylingWrapper } from '../helper';
import { type PluginButtonProps } from '../types';

import { EmojiPicker } from './EmojiPicker/EmojiPicker';

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
