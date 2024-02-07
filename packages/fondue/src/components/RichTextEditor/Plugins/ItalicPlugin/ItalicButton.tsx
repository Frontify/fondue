/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import IconTextFormatItalic16 from '@foundation/Icon/Generated/IconTextFormatItalic16';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';

export const ItalicButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Italic\n${getHotkeyByPlatform('Ctrl+I')}`)}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextFormatItalic16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
