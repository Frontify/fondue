/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconTextFormatItalic16 from '@foundation/Icon/Generated/IconTextFormatItalic16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const ItalicButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Italic\n${getHotkeyByPlatform('Ctrl+I')}`)}
            nodeType={getPluginType(editor, id)}
        >
            <IconStylingWrapper icon={<IconTextFormatItalic16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
