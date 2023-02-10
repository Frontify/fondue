/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconSize, IconTextColumnBreak } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ColumnBreakToolbarButton } from './ColumnBreakToolbarButton';

export const ColumnBreakButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <ColumnBreakToolbarButton
                icon={<IconStylingWrapper icon={<IconTextColumnBreak size={IconSize.Size16} />} />}
                classNames={buttonClassNames}
                styles={buttonStyles}
            />
        </ButtonWrapper>
    );
};
