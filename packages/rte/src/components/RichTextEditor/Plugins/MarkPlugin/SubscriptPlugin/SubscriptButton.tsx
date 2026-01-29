/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSubscript } from '@frontify/fondue-icons';
import { MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const SubscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Subscript\n${getHotkeyByPlatform('Ctrl+.')}`)}
            nodeType={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        >
            <IconStylingWrapper icon={<IconSubscript size={16} />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
