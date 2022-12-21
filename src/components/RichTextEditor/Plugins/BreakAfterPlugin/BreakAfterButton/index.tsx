/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconSize, IconTextColumnBreak } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { BreakAfterToolbarButton } from './BreakAfterToolbarButton';

export const BreakAfterButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <BreakAfterToolbarButton
            icon={<IconStylingWrapper icon={<IconTextColumnBreak size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
