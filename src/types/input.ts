/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputBaseProps = {
    decorator?: ReactElement;
    error?: boolean;
    errorText?: string;
    helperText?: string;
    onChange?: (value: string) => void;
    'data-test-id'?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange'>;
