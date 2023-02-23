/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconSize, IconTextAlignmentRight } from '@foundation/Icon';
import { AlignToolbarButton } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            tooltip={getTooltip('Align right')}
            value="right"
            icon={<IconStylingWrapper icon={<IconTextAlignmentRight size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
