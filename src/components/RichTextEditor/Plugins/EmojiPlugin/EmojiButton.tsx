/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EmojiToolbarDropdown, KEY_EMOJI } from '@udecode/plate';
import { IconFaceHappy, IconSize } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const EmojiButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <EmojiToolbarDropdown
            pluginKey={KEY_EMOJI}
            icon={<IconStylingWrapper icon={<IconFaceHappy size={IconSize.Size16} />} />}
            styles={buttonStyles}
            classNames={buttonClassNames}
        />
    </ButtonWrapper>
);
