/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FormHTMLAttributes, ReactNode } from 'react';

export type FormProps = {
    children?: ReactNode;
    'data-test-id'?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, 'data-test-id': dataTestId = 'fondue-form', ...attributes }: FormProps) => {
    return (
        <form data-test-id={dataTestId} {...attributes}>
            {children}
        </form>
    );
};
Form.displayName = 'FondueForm';
