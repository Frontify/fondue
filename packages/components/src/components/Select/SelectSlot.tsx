/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/select.module.scss';

export type SelectSlotProps = {
    children?: ReactNode;
    name: 'menu' | 'left' | 'right' | 'label' | 'clear';
};

export const SelectSlot = (
    { children, name, ...props }: SelectSlotProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={forwardedRef} className={styles.slot} data-name={name} {...props}>
            {children}
        </div>
    );
};
SelectSlot.displayName = 'Select.Slot';

export const ForwardedRefSelectSlot = forwardRef<HTMLDivElement, SelectSlotProps>(SelectSlot);
