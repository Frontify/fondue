/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Validation } from '@utilities/validation';
import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps<TValue> = {
    clearable?: boolean;
    decorator?: ReactElement;
    suffix?: string;
    status?: Validation;
    valueSelect?: boolean;
    onChange?: (value?: TValue) => void;
    'data-test-id'?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange'>;
