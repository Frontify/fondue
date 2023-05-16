/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { TextareaField, TextareaFieldProps } from '@components/TextareaField';
import { TextareaInput, TextareaInputProps } from '@internal/inputs/Textarea/TextareaInput';

export type TextareaProps =
    | TextareaInputProps
    | ({
          label?: string;
      } & TextareaFieldProps);

export const Textarea = ({ label, ...props }: TextareaProps): ReactElement => {
    return label ? <TextareaInput label={label} {...props} /> : <TextareaField {...props} />;
};
Textarea.displayName = 'FondueTextarea';
