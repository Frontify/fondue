/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuperscript as IconSuperscript16 } from '@frontify/fondue-icons';
import { MARK_SUBSCRIPT } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const SuperscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Superscript\n${getHotkeyByPlatform('Ctrl+,')}`)}
            nodeType={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUBSCRIPT)}
        >
            <IconStylingWrapper icon={<IconSuperscript16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
