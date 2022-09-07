/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconSize, IconTextAlignmentRight } from '@foundation/Icon';
import { ButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const AlignRightButton = ({ id }: ButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            value="right"
            icon={<IconStylingWrapper icon={<IconTextAlignmentRight size={IconSize.Size24} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
