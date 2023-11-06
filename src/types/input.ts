/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps<TValue> = {
    autocomplete?: boolean;
    id?: string;
    clearable?: boolean;
    decorator?: ReactElement;
    suffix?: string;
    status?: Validation;
    size?: number;
    valueSelect?: boolean;
    onChange?: (value?: TValue) => void;
    'data-test-id'?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange'>;

type InputType = 'Text' | 'Password' | 'Number';
export const InputTypes: Record<InputType, string> = {
    Text: 'text',
    Password: 'password',
    Number: 'number',
};
