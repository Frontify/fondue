/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import IconTextAlignmentCentre16 from '@foundation/Icon/Generated/IconTextAlignmentCentre16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignCenterButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="center" tooltip={getTooltip('Align center')}>
                <IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
