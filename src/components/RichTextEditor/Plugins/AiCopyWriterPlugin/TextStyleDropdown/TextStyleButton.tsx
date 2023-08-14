/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonWrapper } from '../../helper';
import { TextStyleDropdown } from '.';
import { TextStyleButtonProps } from './types';

export const TextStyleButton = ({ editorId, id, textStyles }: TextStyleButtonProps) => (
    <ButtonWrapper id={id}>
        <TextStyleDropdown editorId={editorId} textStyles={textStyles} />
    </ButtonWrapper>
);
