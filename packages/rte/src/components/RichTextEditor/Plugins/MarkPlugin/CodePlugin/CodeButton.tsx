/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextBrackets } from '@frontify/fondue-icons';
import { getPluginType } from '@udecode/plate-core';

import { MarkToolbarButton } from '@components/RichTextEditor/Plugins/MarkPlugin/MarkToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const CodeButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton tooltip={getTooltip('Code')} nodeType={getPluginType(editor, id)}>
            <IconStylingWrapper icon={<IconTextBrackets size={16} />} />
        </MarkToolbarButton>
    </ButtonWrapper>
);
