/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretUp } from '@frontify/fondue-icons';

import styles from './styles/select.module.scss';

export const SelectCaret = () => {
    return <IconCaretUp size={16} className={styles.caret} />;
};
