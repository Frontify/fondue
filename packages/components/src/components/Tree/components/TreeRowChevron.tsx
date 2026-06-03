/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretRight } from '@frontify/fondue-icons';

import styles from '../styles/tree.module.scss';

type TreeRowChevronProps = {
    isFolder: boolean;
    isExpanded: boolean;
};

export const TreeRowChevron = ({ isFolder, isExpanded }: TreeRowChevronProps) => (
    <span className={styles.chevron} aria-hidden>
        {isFolder ? isExpanded ? <IconCaretDown size={12} /> : <IconCaretRight size={12} /> : null}
    </span>
);
