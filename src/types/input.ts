/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps = {
    decorator?: ReactElement;
    error?: boolean;
    errorText?: string;
    helperText?: string;
    onChange?: (value: string) => void;
    'data-test-id'?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'>;

export type InputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
