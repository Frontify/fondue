/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@components/Button/Button';
import { TextInput } from '@components/TextInput/TextInput';
import { Key, useEffect, useState } from 'react';
import { Column, Row, SelectionMode, SortDirection, Table } from './Table';

const TABLE_COLUMNS: Column[] = [
    { name: 'User', key: 'user' },
    { name: 'Active Sessions', key: 'activeSessions', sortable: true },
    { name: 'Regions', key: 'regions' },
];

const TABLE_ROWS: Row[] = [
    {
        key: 'row-1',
        cells: {
            user: {
                sortId: 'anna',
                value: 'Anna',
            },
            activeSessions: {
                sortId: 108,
                value: 108,
            },
            regions: {
                sortId: 'europe',
                value: 'Europe',
            },
        },
    },
    {
        key: 'row-2',
        cells: {
            user: {
                sortId: 'bobby',
                value: 'Bobby',
            },
            activeSessions: {
                sortId: 125,
                value: 125,
            },
            regions: {
                sortId: 'asia',
                value: 'Asia',
            },
        },
    },
    {
        key: 'row-3',
        cells: {
            user: {
                sortId: 'chris',
                value: 'Chris',
            },
            activeSessions: {
                sortId: 112,
                value: 112,
            },
            regions: {
                sortId: 'africa',
                value: 'Africa',
            },
        },
    },
];

const TABLE_ROW_ID = '[data-test-id=table-row]';
const TABLE_COLUMN_ID = '[data-test-id=table-column';
const TABLE_SELECT_CELL_ID = '[data-test-id=table-select-cell]';
const TABLE_ACTIONS_ID = '[data-test-id=table-actions]';
const CHECKBOX_ID = '[data-test-id=checkbox]';
const CHECKBOX_INPUT_ID = '[data-test-id=checkbox-input]';

const SortableTable = () => {
    const [sortedRows, setfilteredRows] = useState<Row[]>(TABLE_ROWS);
    const onSortChange = (key: string, direction?: SortDirection) => {
        const sortRows = () => {
            const clonedRows = [...sortedRows];

            clonedRows.sort((a, b) => {
                const keyA: Key = a.cells[key].sortId;
                const keyB: Key = b.cells[key].sortId;

                if (direction === SortDirection.Descending) {
                    return keyA < keyB ? -1 : 1;
                } else {
                    return keyA < keyB ? 1 : -1;
                }
            });
            setfilteredRows(clonedRows);
        };
        sortRows();
    };

    return <Table columns={TABLE_COLUMNS} rows={sortedRows} onSortChange={onSortChange} />;
};

describe('Table Component', () => {
    it('should render read only table', () => {
        cy.mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} />);

        cy.get(TABLE_SELECT_CELL_ID).should('not.exist');
        cy.get(TABLE_COLUMN_ID).should('have.length', 3);
        for (const { name } of TABLE_COLUMNS) {
            cy.get(TABLE_COLUMN_ID).contains(name);
        }
        cy.get(TABLE_ROW_ID).should('have.length', 3);
        for (const { cells } of TABLE_ROWS) {
            for (const { value } of Object.values(cells)) {
                cy.get(TABLE_ROW_ID).should('contain', value);
            }
        }
    });

    it('should render single-select table', () => {
        cy.mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} selectionMode={SelectionMode.SingleSelect} />);
        cy.get(CHECKBOX_INPUT_ID).first().as('firstCheckbox');

        cy.get(TABLE_SELECT_CELL_ID).children(CHECKBOX_ID).should('have.length', 3);
        cy.get(TABLE_ROW_ID).first().click();
        cy.get('@firstCheckbox').invoke('attr', 'aria-checked').should('eq', 'true');
        cy.get(TABLE_ROW_ID).last().click();
        cy.get('@firstCheckbox').invoke('attr', 'aria-checked').should('eq', 'false');
        cy.get(CHECKBOX_INPUT_ID).last().invoke('attr', 'aria-checked').should('eq', 'true');
    });

    it('should render multi-select table', () => {
        cy.mount(<Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} selectionMode={SelectionMode.MultiSelect} />);
        cy.get(CHECKBOX_INPUT_ID).first().as('headerCheckbox');

        cy.get(TABLE_SELECT_CELL_ID).children(CHECKBOX_ID).should('have.length', 4);
        cy.get(TABLE_ROW_ID).first().click();
        cy.get('@headerCheckbox').invoke('attr', 'aria-checked').should('eq', 'mixed');
        cy.get(TABLE_SELECT_CELL_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).each(($el) => cy.wrap($el).invoke('attr', 'aria-checked').should('eq', 'true'));
        cy.get(TABLE_SELECT_CELL_ID).first().click();
        cy.get(CHECKBOX_INPUT_ID).each(($el) => cy.wrap($el).invoke('attr', 'aria-checked').should('eq', 'false'));
    });

    it('should render table with actions', () => {
        const onClickStub = cy.stub().as('onClickStub');
        const ROWS_WITH_ACTIONS = TABLE_ROWS.map((row) => ({
            ...row,
            actions: <Button onClick={onClickStub} />,
        }));

        cy.mount(<Table columns={TABLE_COLUMNS} rows={ROWS_WITH_ACTIONS} />);

        cy.get(TABLE_ACTIONS_ID).should('have.length', 3);
        cy.get('@onClickStub').should('not.be.called');
        cy.get(TABLE_ACTIONS_ID).first().click();
        cy.get('@onClickStub').should('be.calledOnce');
    });

    it.only('should sort table', () => {
        cy.mount(<SortableTable />);

        cy.get(TABLE_ROW_ID).first().eq(0).contains('Anna');
        cy.get(TABLE_COLUMN_ID).eq(1).click();
        cy.get(TABLE_ROW_ID).first().eq(0).contains('Bobby');
        cy.get(TABLE_COLUMN_ID).eq(1).click();
        cy.get(TABLE_ROW_ID).first().eq(0).contains('Anna');
    });

    it('should rerender if rows change', () => {
        const WrappingFilterComponent = () => {
            const [filteredRows, setfilteredRows] = useState<Row[]>(TABLE_ROWS);
            const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

            const [filter, setfilter] = useState('');

            useEffect(() => {
                if (filter === '') {
                    setfilteredRows(TABLE_ROWS);
                }
                const newFilteredRowsValue = TABLE_ROWS.filter((row) => {
                    const cells = Object.values(row.cells);
                    return cells.some((cell) => String(cell.sortId).includes(filter));
                });
                setfilteredRows(newFilteredRowsValue);
            }, [filter]);

            return (
                <>
                    <TextInput id="searchInput" onChange={(val) => setfilter(val)} value={filter} />
                    <Table
                        columns={TABLE_COLUMNS}
                        rows={filteredRows}
                        selectedRowIds={selectedRows}
                        onSelectionChange={(ids) => setSelectedRows((ids as (string | number)[]) || [])}
                    />
                </>
            );
        };
        cy.mount(<WrappingFilterComponent />);

        cy.get(TABLE_ROW_ID).get('td').contains('Anna');
        cy.get(TABLE_ROW_ID).get('td').contains('Chris');

        cy.get('#searchInput').type('anna');

        cy.get(TABLE_ROW_ID).get('td').contains('Anna');
        cy.get(TABLE_ROW_ID).get('td').should('not.contain', 'Chris');
    });
});
