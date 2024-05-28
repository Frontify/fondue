/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { dropdownStyles } from './styles/dropdownStyles';

export type DropdownProps = { children?: ReactNode };

export const Dropdown = ({ children }: DropdownProps) => {
    return (
        <div className={dropdownStyles()} data-test-id="dropdown">
            {children}
        </div>
    );
};
Dropdown.displayName = 'Dropdown';
