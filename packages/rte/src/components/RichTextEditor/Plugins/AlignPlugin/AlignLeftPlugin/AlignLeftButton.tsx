/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentLeft as IconTextAlignmentLeft16 } from '@frontify/fondue-icons';

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignLeftButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="left" tooltip={getTooltip('Align left')}>
                <IconStylingWrapper icon={<IconTextAlignmentLeft16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
