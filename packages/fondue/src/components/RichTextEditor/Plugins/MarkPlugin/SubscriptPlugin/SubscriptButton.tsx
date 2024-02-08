/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import IconSubscript16 from '@foundation/Icon/Generated/IconSubscript16';
import { getHotkeyByPlatform } from '@components/RichTextEditor';
import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';

export const SubscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Subscript\n${getHotkeyByPlatform('Ctrl+.')}`)}
            nodeType={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        >
            <IconStylingWrapper icon={<IconSubscript16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
