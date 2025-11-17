/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { IconTextAlignmentJustify as IconTextAlignmentJustify16 } from '@frontify/fondue-icons';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="justify" tooltip={getTooltip('Justify')}>
                <IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
