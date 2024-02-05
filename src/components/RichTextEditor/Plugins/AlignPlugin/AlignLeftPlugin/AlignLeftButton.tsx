/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentLeft16 } from '@foundation/Icon';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignLeftButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="left" tooltip={getTooltip('Align left')} key={id}>
                <IconStylingWrapper icon={<IconTextAlignmentLeft16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
