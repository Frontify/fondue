/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextFormatStrikethrough } from '@foundation/Icon/Generated';
import { getPluginType } from '@udecode/plate-core';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';

export const StrikethroughButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton tooltip={getTooltip('Strikethrough')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconTextFormatStrikethrough />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
