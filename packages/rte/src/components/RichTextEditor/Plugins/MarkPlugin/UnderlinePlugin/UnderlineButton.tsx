/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';
import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const UnderlineButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Underline\n${getHotkeyByPlatform('Ctrl+U')}`)}
            nodeType={getPluginType(editor, id)}
        >
            <IconStylingWrapper icon={<IconTextFormatUnderline size={16} />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
