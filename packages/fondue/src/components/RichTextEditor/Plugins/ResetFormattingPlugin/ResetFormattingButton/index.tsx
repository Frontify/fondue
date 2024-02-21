/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ResetFormattingToolbarButton } from './ResetFormattingToolbarButton';
import { ButtonWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const ResetFormattingButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ResetFormattingToolbarButton id={id} />
    </ButtonWrapper>
);
