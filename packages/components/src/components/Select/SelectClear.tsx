/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';

import styles from './styles/select.module.scss';

export const SelectClear = () => {
    return (
        <button aria-label="clear input" className={styles.clear} type="button">
            <IconCross size={16} />
        </button>
    );
};
