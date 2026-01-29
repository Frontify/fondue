/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentLeft } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignLeftButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="left" tooltip={getTooltip('Align left')}>
                <IconStylingWrapper icon={<IconTextAlignmentLeft size={16} />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
