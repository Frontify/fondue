/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextFormatUnderline16 } from '@foundation/Icon/Generated';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const UnderlineButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Underline\n${getHotkeyByPlatform('Ctrl+U')}`)}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextFormatUnderline16 />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);

export { MarkToolbarButton, getPluginType };
