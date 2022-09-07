/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconSize, IconTextAlignmentLeft } from '@foundation/Icon';
import { ButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const AlignLeftButton = ({ id }: ButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            value="left"
            icon={<IconStylingWrapper icon={<IconTextAlignmentLeft size={IconSize.Size24} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
