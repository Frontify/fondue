/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/components/Toolbar';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { IconTextAlignmentCentre16 } from '@foundation/Icon';
import { getTooltip } from '@components/RichTextEditor/helpers';

export const AlignCenterButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="center" tooltip={getTooltip('Align center')} key={id}>
                <IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
