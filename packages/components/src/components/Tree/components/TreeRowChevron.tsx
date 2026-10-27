/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretRight } from '@frontify/fondue-icons';
import { type MouseEventHandler } from 'react';

import styles from '../styles/tree.module.scss';

type TreeRowChevronProps = {
    isFolder: boolean;
    isExpanded: boolean;
    onClick?: MouseEventHandler<HTMLSpanElement>;
};

const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => {
    return isExpanded ? <IconCaretDown size={12} /> : <IconCaretRight size={12} />;
};

// Pointer-only toggle: keyboard users expand/collapse with the arrow keys on the row.
export const TreeRowChevron = ({ isFolder, isExpanded, onClick }: TreeRowChevronProps) => (
    // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
    <span className={styles.chevron} aria-hidden onClick={onClick}>
        {isFolder ? <ChevronIcon isExpanded={isExpanded} /> : null}
    </span>
);
