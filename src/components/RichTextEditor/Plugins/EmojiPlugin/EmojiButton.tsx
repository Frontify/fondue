/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EmojiToolbarDropdown, KEY_EMOJI } from '@udecode/plate';
import { IconFaceHappy16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';
import { EmojiPicker } from './EmojiPicker';

export const EmojiButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <EmojiToolbarDropdown
            pluginKey={KEY_EMOJI}
            icon={<IconStylingWrapper icon={<IconFaceHappy16 />} />}
            styles={buttonStyles}
            classNames={buttonClassNames}
            EmojiPickerComponent={EmojiPicker}
        />
    </ButtonWrapper>
);
