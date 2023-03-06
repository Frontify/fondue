/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconTextColumnBreak16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ColumnBreakToolbarButton } from './ColumnBreakToolbarButton';

export const ColumnBreakButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <ColumnBreakToolbarButton
                icon={<IconStylingWrapper icon={<IconTextColumnBreak16 />} />}
                classNames={buttonClassNames}
                styles={buttonStyles}
            />
        </ButtonWrapper>
    );
};
