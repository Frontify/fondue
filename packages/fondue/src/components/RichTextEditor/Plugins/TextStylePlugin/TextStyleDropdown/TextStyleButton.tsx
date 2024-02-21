/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonWrapper } from '../../helper';
import { TextStyleDropdown } from './TextStyleDropdown';
import { TextStyleButtonProps } from './types';

export const TextStyleButton = ({ editorId, id, textStyles }: TextStyleButtonProps) => (
    <ButtonWrapper id={id}>
        <TextStyleDropdown editorId={editorId} textStyles={textStyles} />
    </ButtonWrapper>
);
