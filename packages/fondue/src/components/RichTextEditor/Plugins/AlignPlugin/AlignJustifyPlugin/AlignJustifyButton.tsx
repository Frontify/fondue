/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { getTooltip } from '@components/RichTextEditor/helpers';
import IconTextAlignmentJustify16 from '@foundation/Icon/Generated/IconTextAlignmentJustify16';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="justify" tooltip={getTooltip('Justify')}>
                <IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />
            </AlignmentToolbarButton>
        </ButtonWrapper>
    );
};
