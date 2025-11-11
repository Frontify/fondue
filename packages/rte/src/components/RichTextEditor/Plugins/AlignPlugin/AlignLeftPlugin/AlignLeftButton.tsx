/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import IconTextAlignmentLeft16 from '@foundation/Icon/Generated/IconTextAlignmentLeft16';

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
