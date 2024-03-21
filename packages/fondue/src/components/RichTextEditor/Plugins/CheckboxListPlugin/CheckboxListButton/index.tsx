/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxListToolbarButton } from './CheckboxListToolbarButton';
import { ButtonWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const CheckboxListButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <CheckboxListToolbarButton id={id} />
    </ButtonWrapper>
);
