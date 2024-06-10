/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactElement } from 'react';

import styles from './styles/select.module.scss';

export type SelectSlotProps = {
    children?: ReactElement;
    name: 'menu' | 'left' | 'right' | 'label';
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
