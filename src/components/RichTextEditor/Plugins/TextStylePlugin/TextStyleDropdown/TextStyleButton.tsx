/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';
import { TextStyleDropdown } from '.';

export const TextStyleButton = ({ editorId, id, selectableStyles }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <TextStyleDropdown editorId={editorId} selectableStyles={selectableStyles} />
    </ButtonWrapper>
);
