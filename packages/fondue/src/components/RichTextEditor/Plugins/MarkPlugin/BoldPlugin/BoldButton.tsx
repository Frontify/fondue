/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconTextFormatBold16 from '@foundation/Icon/Generated/IconTextFormatBold16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const BoldButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Bold\n${getHotkeyByPlatform('Ctrl+B')}`)}
            nodeType={getPluginType(editor, id)}
        >
            <IconStylingWrapper icon={<IconTextFormatBold16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
