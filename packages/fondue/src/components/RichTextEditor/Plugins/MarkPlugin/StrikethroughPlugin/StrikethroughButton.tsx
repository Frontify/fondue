/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextFormatStrikethrough } from '@foundation/Icon/Generated';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const StrikethroughButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton tooltip={getTooltip('Strikethrough')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconTextFormatStrikethrough />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
