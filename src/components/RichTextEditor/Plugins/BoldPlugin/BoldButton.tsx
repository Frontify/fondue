/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconTextFormatBold16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';

export const BoldButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Bold\n${getHotkeyByPlatform('Ctrl+B')}`)}
            key={id}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextFormatBold16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
