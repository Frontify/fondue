/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';

import styles from './styles/select.module.scss';

type SelectClearProps = {
    reset: () => void;
};

export const SelectClear = ({ reset }: SelectClearProps) => {
    return (
        <button
            aria-label="clear input"
            className={styles.clear}
            onClick={(e) => {
                e.stopPropagation();
                reset();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    reset();
                }
            }}
        >
            <IconCross size={16} />
        </button>
    );
};
