/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

import { ResetFormattingToolbarButton } from './ResetFormattingToolbarButton';

export const ResetFormattingButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ResetFormattingToolbarButton id={id} />
    </ButtonWrapper>
);
