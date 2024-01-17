/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { getPluginType } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper } from '../helper';
import { PluginButtonProps } from '../types';
import IconSubscript16 from '@foundation/Icon/Generated/IconSubscript16';
import { getHotkeyByPlatform } from '@components/RichTextEditor';
import { MarkToolbarButton } from '@components/RichTextEditor/components/Toolbar';

export const SubscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Subscript\n${getHotkeyByPlatform('Ctrl+.')}`)}
            key={id}
            nodeType={getPluginType(editor, id)}
        >
            <IconStylingWrapper icon={<IconSubscript16 />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
