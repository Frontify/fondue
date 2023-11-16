/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import type { AriaAttributes, InputHTMLAttributes, ReactElement } from 'react';

export type InputSharedBaseProps = {
    autocomplete?: boolean;
    clearable?: boolean;
    decorator?: ReactElement;
    hugWidth?: boolean;
    id?: string;
    status?: Validation;
    'data-test-id'?: string;
} & AriaAttributes;

export type InputBaseProps<TValue> = {
    size?: number;
    suffix?: string;
    value?: TValue;
    valueSelect?: boolean;
    onChange?: (value?: TValue) => void;
} & InputSharedBaseProps &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange' | 'value'>;

type InputType = 'Text' | 'Password' | 'Number';
export const InputTypes: Record<InputType, string> = {
    Text: 'text',
    Password: 'password',
    Number: 'number',
};
