/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { MARK_SUBSCRIPT, getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import IconSuperscript16 from '@foundation/Icon/Generated/IconSuperscript16';
import { getHotkeyByPlatform } from '@components/RichTextEditor';
import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';

export const SuperscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Superscript\n${getHotkeyByPlatform('Ctrl+,')}`)}
            key={id}
            nodeType={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUBSCRIPT)}
        >
            <IconStylingWrapper icon={<IconSuperscript16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
