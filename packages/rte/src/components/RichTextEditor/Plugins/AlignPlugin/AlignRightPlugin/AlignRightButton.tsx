/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentRight as IconTextAlignmentRight16 } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="right" tooltip={getTooltip('Align right')}>
                <IconStylingWrapper icon={<IconTextAlignmentRight16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
