/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Table } from '../Table';

const renderSelectableTable = (focusable?: boolean) =>
    render(
        <Table.Root aria-label="Selectable rows">
            <Table.Body>
                <Table.Row focusable={focusable} data-test-id="row-1">
                    <Table.RowCell>
                        <input type="checkbox" aria-label="Select Test 1" />
                    </Table.RowCell>
                    <Table.RowCell>Test 1</Table.RowCell>
                </Table.Row>
                <Table.Row focusable={focusable} data-test-id="row-2">
                    <Table.RowCell>
                        <input type="checkbox" aria-label="Select Test 2" />
                    </Table.RowCell>
                    <Table.RowCell>Test 2</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );

describe('Table.Row', () => {
    it('should be a Tab stop by default', async () => {
        const { getByTestId, getByLabelText } = renderSelectableTable();

        expect(getByTestId('row-1')).toHaveAttribute('tabindex', '0');

        await userEvent.tab();
        expect(getByTestId('row-1')).toHaveFocus();

        await userEvent.tab();
        expect(getByLabelText('Select Test 1')).toHaveFocus();

        await userEvent.tab();
        expect(getByTestId('row-2')).toHaveFocus();
    });

    it('should leave the row out of the Tab order when it is not focusable', async () => {
        const { getByTestId, getByLabelText } = renderSelectableTable(false);

        expect(getByTestId('row-1')).not.toHaveAttribute('tabindex');

        await userEvent.tab();
        expect(getByLabelText('Select Test 1')).toHaveFocus();

        await userEvent.tab();
        expect(getByLabelText('Select Test 2')).toHaveFocus();
    });

    it('should skip rows that are not focusable when moving with the arrow keys', async () => {
        const { getByTestId } = render(
            <Table.Root aria-label="Mixed rows">
                <Table.Body>
                    <Table.Row data-test-id="row-1">
                        <Table.RowCell>Test 1</Table.RowCell>
                    </Table.Row>
                    <Table.Row focusable={false} data-test-id="row-2">
                        <Table.RowCell>Test 2</Table.RowCell>
                    </Table.Row>
                    <Table.Row data-test-id="row-3">
                        <Table.RowCell>Test 3</Table.RowCell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>,
        );

        await userEvent.tab();
        expect(getByTestId('row-1')).toHaveFocus();

        await userEvent.keyboard('{ArrowDown}');
        expect(getByTestId('row-3')).toHaveFocus();
    });
});
