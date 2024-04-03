/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconTextFormatUnderline16 from '@foundation/Icon/Generated/IconTextFormatUnderline16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const UnderlineButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Underline\n${getHotkeyByPlatform('Ctrl+U')}`)}
            nodeType={getPluginType(editor, id)}
        >
            <IconStylingWrapper icon={<IconTextFormatUnderline16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
