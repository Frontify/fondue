/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps<T> = {
    decorator?: ReactElement;
    error?: boolean;
    errorText?: string;
    helperText?: string;
    validation?: Validation;
    onChange?: (value: T) => void;
    'data-test-id'?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange'>;
