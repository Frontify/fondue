/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonWrapper } from '../../helper';
import { type PluginButtonProps } from '../../types';

import { CheckboxListToolbarButton } from './CheckboxListToolbarButton';

export const CheckboxListButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <CheckboxListToolbarButton id={id} />
    </ButtonWrapper>
);
