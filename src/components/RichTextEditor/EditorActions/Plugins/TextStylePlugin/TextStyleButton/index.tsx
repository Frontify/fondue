/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { TextStyleDropdown } from '../TextStyleDropdown';

export const TextStyleButton = ({ editorId, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <TextStyleDropdown editorId={editorId} />
    </ButtonWrapper>
);
