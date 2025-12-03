/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentCentre } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignCenterButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="center" tooltip={getTooltip('Align center')}>
                <IconStylingWrapper icon={<IconTextAlignmentCentre size={16} />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
