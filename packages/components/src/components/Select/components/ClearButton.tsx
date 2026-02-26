/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type MouseEvent, type ReactNode } from 'react';

import styles from '../styles/select.module.scss';

type ClearButtonProps = {
    /** The clear button element to render inside the slot. */
    children: ReactNode;
    /** Callback fired when the clear button is clicked. */
    onClear: () => void;
};

export const ClearButton = ({ children, onClear }: ClearButtonProps): ReactNode => {
    const handleClick = (event: MouseEvent): void => {
        event.stopPropagation();
        onClear();
    };

    return (
        <RadixSlot onClick={handleClick} className={styles.clear} role="button" aria-label="Clear selection">
            {children}
        </RadixSlot>
    );
};
