/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak } from '@frontify/fondue-icons';

import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';
import { ColumnBreakToolbarButton } from '../ColumnBreakToolbarButton';

export const ColumnBreakButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <ColumnBreakToolbarButton>
                <IconStylingWrapper icon={<IconTextColumnBreak size={16} />} />
            </ColumnBreakToolbarButton>
        </ButtonWrapper>
    );
};
