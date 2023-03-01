/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconTextAlignmentJustify16 } from '@foundation/Icon/Generated';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

export const AlignJustifyButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            tooltip={getTooltip('Justify')}
            value="justify"
            icon={<IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
