/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import styles from '../styles/select.module.scss';

export type SelectSlotProps = {
    /**
     * The content to render in this slot — typically an icon, badge, or custom action.
     */
    children?: ReactNode;
    /**
     * Controls where the slot content appears. `'left'` and `'right'` sit beside the selected value,
     * `'clear'` renders a clear action, `'menu'` adds custom content at the bottom of the dropdown.
     */
    name: 'menu' | 'left' | 'right' | 'clear';
    'data-test-id'?: string;
};

export const SelectSlot = (
    { children, name, 'data-test-id': dataTestId = 'fondue-select-slot', ...props }: SelectSlotProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={forwardedRef} className={styles.slot} data-name={name} {...props}>
            {children}
        </div>
    );
};
SelectSlot.displayName = 'Select.Slot';

export const ForwardedRefSelectSlot = forwardRef<HTMLDivElement, SelectSlotProps>(SelectSlot);
