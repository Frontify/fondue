/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconSize, IconTextAlignmentJustify } from '@foundation/Icon';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const AlignJustifyButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            value="justify"
            icon={<IconStylingWrapper icon={<IconTextAlignmentJustify size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
