/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type FormHTMLAttributes, type ReactNode } from 'react';

/**
 * @deprecated Please use a custom component instead.
 */
export type FormProps = {
    children: ReactNode;
    'data-test-id'?: string;
} & FormHTMLAttributes<HTMLFormElement>;

/**
 * @deprecated Please use a custom component instead.
 */
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
