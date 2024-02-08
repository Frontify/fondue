/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconTextAlignmentCentre16 from '@foundation/Icon/Generated/IconTextAlignmentCentre16';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignCenterButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="center" tooltip={getTooltip('Align center')}>
                <IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
