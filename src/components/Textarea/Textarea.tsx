/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { TextareaField, TextareaFieldProps } from '@components/TextareaField';

export type TextareaProps = TextareaFieldProps;

export const Textarea = ({ ...props }: TextareaProps): ReactElement => {
    return <TextareaField {...props} />;
};
Textarea.displayName = 'FondueTextarea';
