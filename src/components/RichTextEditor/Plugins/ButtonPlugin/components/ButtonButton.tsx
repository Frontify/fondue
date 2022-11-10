/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { LinkToolbarButton } from '@udecode/plate';
import { IconButton, IconSize } from '@foundation/Icon';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const ButtonButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <LinkToolbarButton
            icon={<IconStylingWrapper icon={<IconButton size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
