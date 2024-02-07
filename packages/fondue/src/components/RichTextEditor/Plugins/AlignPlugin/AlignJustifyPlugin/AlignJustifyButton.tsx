/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconTextAlignmentJustify16 from '@foundation/Icon/Generated/IconTextAlignmentJustify16';
import { getTooltip } from '@components/RichTextEditor/helpers';
import { AlignmentToolbarButton } from '@components/RichTextEditor/Plugins/AlignPlugin/AlignmentToolbarbutton';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="justify" tooltip={getTooltip('Justify')} key={id}>
                <IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />{' '}
            </AlignmentToolbarButton>{' '}
        </ButtonWrapper>
    );
};
