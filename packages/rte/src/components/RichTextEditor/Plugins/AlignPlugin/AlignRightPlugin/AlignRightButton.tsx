/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentRight } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="right" tooltip={getTooltip('Align right')}>
                <IconStylingWrapper icon={<IconTextAlignmentRight size={16} />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
