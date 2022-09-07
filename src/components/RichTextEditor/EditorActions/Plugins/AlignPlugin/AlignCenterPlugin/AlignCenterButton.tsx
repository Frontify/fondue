/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconSize, IconTextAlignmentCentre } from '@foundation/Icon';
import { ButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const AlignCenterButton = ({ id }: ButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            value="center"
            icon={<IconStylingWrapper icon={<IconTextAlignmentCentre size={IconSize.Size24} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
