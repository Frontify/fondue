/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonWrapper } from '../helper';
import { AiCopywriterDropdown } from './AiCopywriterDropdown';
import { AiCopywriterButtonProps } from './AiCopywriterDropdown/types';

export const AiCopywriterButton = ({ editor, id, aiCopywriters }: AiCopywriterButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <AiCopywriterDropdown id={id} editor={editor} aiCopywriters={aiCopywriters} />
        </ButtonWrapper>
    );
};
