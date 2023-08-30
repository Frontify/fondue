/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import type { FormHTMLAttributes, ReactNode } from 'react';

export type FormProps = {
    children: ReactNode;
    'data-test-id'?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ children, 'data-test-id': dataTestId = 'fondue-form', ...props }, ref) => {
        return (
            <form data-test-id={dataTestId} ref={ref} {...props}>
                {children}
            </form>
        );
    },
);
Form.displayName = 'FondueForm';
