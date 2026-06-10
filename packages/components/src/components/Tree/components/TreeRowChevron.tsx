/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretRight } from '@frontify/fondue-icons';

import styles from '../styles/tree.module.scss';

type TreeRowChevronProps = {
    isFolder: boolean;
    isExpanded: boolean;
};

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => {
    return isExpanded ? <IconCaretDown size={12} /> : <IconCaretRight size={12} />;
};

export const TreeRowChevron = ({ isFolder, isExpanded }: TreeRowChevronProps) => (
    <span className={styles.chevron} aria-hidden>
        {isFolder ? <ChevronIcon isExpanded={isExpanded} /> : null}
    </span>
);
