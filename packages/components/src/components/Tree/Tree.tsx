/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/tree.module.scss';

export type TreeProps = { children?: ReactNode };

export const Tree = ({ children }: TreeProps) => {
    return (
        <div className={styles.root} data-test-id="fondue-tree">
            {children}
        </div>
    );
};
Tree.displayName = 'Tree';
