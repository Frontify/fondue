/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentJustify } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="justify" tooltip={getTooltip('Justify')}>
                <IconStylingWrapper icon={<IconTextAlignmentJustify size={16} />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
