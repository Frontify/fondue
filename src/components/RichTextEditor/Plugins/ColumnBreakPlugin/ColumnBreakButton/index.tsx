/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextColumnBreak16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ColumnBreakToolbarButton } from '../../../components/Toolbar/Buttons/ColumnBreakToolbarButton';

export const ColumnBreakButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <ColumnBreakToolbarButton key={id}>
                <IconStylingWrapper icon={<IconTextColumnBreak16 />} />
            </ColumnBreakToolbarButton>
        </ButtonWrapper>
    );
};
