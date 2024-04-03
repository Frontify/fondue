/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MARK_SUBSCRIPT } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';

import { getHotkeyByPlatform } from '@components/RichTextEditor';
import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconSuperscript16 from '@foundation/Icon/Generated/IconSuperscript16';

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
