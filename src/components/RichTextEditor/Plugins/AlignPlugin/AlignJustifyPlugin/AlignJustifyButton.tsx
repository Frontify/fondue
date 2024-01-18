/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextAlignmentJustify16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { AlignmentToolbarButton } from '@components/RichTextEditor/components/Toolbar';
import { getTooltip } from '@components/RichTextEditor/helpers';

export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AlignmentToolbarButton editorId={editorId} value="justify" tooltip={getTooltip('Justify')} key={id}>
                <IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />{' '}
            </AlignmentToolbarButton>{' '}
        </ButtonWrapper>
    );
};
