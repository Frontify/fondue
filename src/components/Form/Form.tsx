/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FormHTMLAttributes, ReactNode } from 'react';

export type FormProps = {
    children?: ReactNode;
    'data-test-id'?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, 'data-test-id': dataTestId = 'fondue-form' }: FormProps) => {
    return <form data-test-id={dataTestId}>{children}</form>;
};
Form.displayName = 'FondueForm';
