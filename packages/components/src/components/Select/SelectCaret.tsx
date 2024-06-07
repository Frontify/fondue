/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretUp } from '@frontify/fondue-icons';

import styles from './styles/select.module.scss';

type SelectCaretProps = {
    isOpen: boolean;
};
export const SelectCaret = ({ isOpen }: SelectCaretProps) => {
    if (isOpen) {
        return <IconCaretUp size={16} className={styles.caret} />;
    } else {
        return <IconCaretDown size={16} className={styles.caret} />;
    }
};
