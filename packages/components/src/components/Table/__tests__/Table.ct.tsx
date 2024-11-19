/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Table } from '../Table';

test('should render basic table structure', async ({ mount }) => {
    const component = await mount(
        <Table.Root aria-label="Test Table">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                    <Table.RowCell>123</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );

    await expect(component).toBeVisible();
    await expect(component.getByRole('table')).toBeVisible();
    await expect(component.getByRole('columnheader')).toHaveCount(2);
});

test('should handle sorting functionality', async ({ mount }) => {
    const onSortChange = sinon.spy();
    const component = await mount(
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell sortDirection="ascending" onSortChange={onSortChange}>
                        Name
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );

    await component.getByRole('button').click();
    sinon.assert.calledOnceWithExactly(onSortChange, 'descending');
});

test('should handle row selection', async ({ mount }) => {
    const onClick = sinon.spy();
    const component = await mount(
        <Table.Root>
            <Table.Body>
                <Table.Row selected={false} onClick={onClick}>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );

    await component.getByRole('button').click();
    sinon.assert.calledOnce(onClick);
    await expect(component.getByRole('button')).toHaveAttribute('aria-selected', 'false');
});

test('should handle keyboard navigation', async ({ mount, page }) => {
    const onRowClick = sinon.spy();
    const onActionClick = sinon.spy();

    const component = await mount(
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell sortDirection="ascending" onSortChange={sinon.spy()}>
                        Name
                    </Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell>Test 1</Table.RowCell>
                    <Table.RowCell>
                        <button onClick={onActionClick} data-test-id="action-btn-1">
                            Action
                        </button>
                    </Table.RowCell>
                </Table.Row>
                <Table.Row onClick={onRowClick} data-test-id="action-row">
                    <Table.RowCell>Test 2</Table.RowCell>
                    <Table.RowCell>
                        <button onClick={onActionClick} data-test-id="action-btn-2">
                            Action
                        </button>
                        <button onClick={onActionClick} data-test-id="action-btn-3">
                            Action
                        </button>
                    </Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );

    await page.keyboard.press('Tab');
    await expect(component.getByRole('button').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByTestId('action-btn-1')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByTestId('action-row')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByTestId('action-btn-2')).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(component.getByTestId('action-btn-3')).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(component.getByTestId('action-btn-2')).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(component.getByTestId('action-btn-1')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(component.getByTestId('action-btn-2')).toBeFocused();
});

test('should apply sticky header', async ({ mount }) => {
    const component = await mount(
        <Table.Root>
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );

    await expect(component.locator('thead')).toHaveAttribute('data-sticky', 'true');
});

test('should handle cell dimentions', async ({ mount }) => {
    const component = await mount(
        <Table.Root>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell align="right" truncate>
                        Test
                    </Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );

    await expect(component.locator('td')).toHaveAttribute('style', /text-align: right/);
    await expect(component.locator('td')).toHaveAttribute('data-truncate', 'true');
});
