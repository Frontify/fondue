/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/table.module.scss';

const TableRoot = ({ children }: { children: ReactNode }) => {
    return <table className={styles.table}>{children}</table>;
};

const TableHeader = ({ children }: { children: ReactNode }) => {
    return <thead className={styles.header}>{children}</thead>;
};

const TableHeaderCell = ({ children }: { children: ReactNode }) => {
    return <th className={styles.headerCell}>{children}</th>;
};

type TableRowProps = {
    stickyFirstColumn?: boolean;
    children: ReactNode;
};

const TableBody = ({ stickyFirstColumn, children }: TableRowProps) => {
    return (
        <tbody className={styles.body} data-sticky-first-column={stickyFirstColumn}>
            {children}
        </tbody>
    );
};

const TableRow = ({ children }: { children: ReactNode }) => {
    return <tr className={styles.row}>{children}</tr>;
};

const TableRowCell = ({ children }: { children: ReactNode }) => {
    return <td className={styles.rowCell}>{children}</td>;
};

export const Table = {
    Root: TableRoot,
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    RowCell: TableRowCell,
};
