/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconTextColumnBreak16 from '@foundation/Icon/Generated/IconTextColumnBreak16';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ColumnBreakToolbarButton } from './ColumnBreakToolbarButton';

export const ColumnBreakButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <ColumnBreakToolbarButton
                icon={<IconStylingWrapper icon={<IconTextColumnBreak16 />} />}
                classNames={getButtonClassNames()}
                styles={buttonStyles}
            />
        </ButtonWrapper>
    );
};
