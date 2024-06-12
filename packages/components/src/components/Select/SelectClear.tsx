/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';

import styles from './styles/select.module.scss';

type SelectClearProps = {
    onClick: () => void;
};

export const SelectClear = ({ onClick }: SelectClearProps) => {
    return (
        <button
            aria-label="clear input"
            className={styles.clear}
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.stopPropagation();
                    onClick();
                }
            }}
        >
            <IconCross size={16} />
        </button>
    );
};
