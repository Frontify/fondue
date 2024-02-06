/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { IconTextAlignmentRight16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="right" tooltip={getTooltip('Align right')} key={id}>
                <IconStylingWrapper icon={<IconTextAlignmentRight16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
