/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { LinkToolbarButton } from '@udecode/plate';
import { IconLink, IconSize } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const LinkButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <LinkToolbarButton
            icon={<IconStylingWrapper icon={<IconLink size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
