/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AlignToolbarButton } from '@udecode/plate';
import { IconSize, IconTextAlignmentLeft } from '@foundation/Icon';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const AlignLeftButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            value="left"
            icon={<IconStylingWrapper icon={<IconTextAlignmentLeft size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
