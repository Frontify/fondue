/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonWrapper } from '../../helper';
import { TextStyleDropdown } from '.';
import { TextStyleButtonProps } from './types';

export const TextStyleButton = ({ editorId, id, selectableStyles }: TextStyleButtonProps) => (
    <ButtonWrapper id={id}>
        <TextStyleDropdown editorId={editorId} selectableStyles={selectableStyles} />
    </ButtonWrapper>
);
