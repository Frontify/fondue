/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { Table } from '../Table';

test('should render basic table structure', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Test Table" data-test-id="table-root">
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
    const component = wrapper.getByTestId('table-root');

    await expect(component).toBeVisible();
    await expect(component.getByRole('columnheader')).toHaveCount(2);
});

test('should handle table layout modes', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root layout="fixed" aria-label="Table" data-test-id="table-root">
            <Table.Caption>Table Caption</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-layout', 'fixed');
    await expect(component.locator('caption')).toHaveText('Table Caption');
});

test('should handle table font size small', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Caption>Table Caption</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-font-size', 'medium');
});

test('should handle table font size medium', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root fontSize="small" aria-label="Table" data-test-id="table-root">
            <Table.Caption>Table Caption</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-font-size', 'small');
});

test('should handle ARIA attributes', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Test Table" aria-describedby="table-desc" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('aria-label', 'Test Table');
    await expect(component).toHaveAttribute('aria-describedby', 'table-desc');
});

test('should handle sticky header and ARIA attributes', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header sticky aria-label="Header Section" aria-busy>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('thead')).toHaveAttribute('data-sticky', 'true');
    await expect(component.locator('thead')).toHaveAttribute('aria-label', 'Header Section');
    await expect(component.locator('thead')).toHaveAttribute('aria-busy', 'true');
});

test('should handle header with loading state', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell state="loading">Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('thead')).toHaveAttribute('data-sticky', 'true');
    await expect(component.locator('th').getByTestId('fondue-loading-circle')).toBeVisible();
});

test('should handle sticky first column', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Body firstColumnSticky aria-busy>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('tbody')).toHaveAttribute('data-first-column-sticky', 'true');
    await expect(component.locator('tbody')).toHaveAttribute('aria-busy', 'true');
});

test('should handle sticky first column and head', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('thead')).toHaveAttribute('data-sticky', 'true');
    await expect(component.locator('tbody')).toHaveAttribute('data-first-column-sticky', 'true');
});

test('should handle sticky right column', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Body lastColumnSticky>
                <Table.Row>
                    <Table.RowCell>Test 1</Table.RowCell>
                    <Table.RowCell>Test 2</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('tbody')).toHaveAttribute('data-last-column-sticky', 'true');
});

test('should handle all sticky combinations', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header sticky>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body firstColumnSticky lastColumnSticky>
                <Table.Row>
                    <Table.RowCell>Test 1</Table.RowCell>
                    <Table.RowCell>Test 2</Table.RowCell>
                    <Table.RowCell>Test 3</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component.locator('thead')).toHaveAttribute('data-sticky', 'true');
    await expect(component.locator('tbody')).toHaveAttribute('data-first-column-sticky', 'true');
    await expect(component.locator('tbody')).toHaveAttribute('data-last-column-sticky', 'true');
});

test('should handle all HeaderCell configurations', async ({ mount }) => {
    const onSortChange = sinon.spy();
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        scope="col"
                        width="100px"
                        align="right"
                        truncate
                        noShrink
                        sortDirection="ascending"
                        onSortChange={onSortChange}
                        sortTranslations={{
                            sortAscending: 'Sort {column} up',
                            sortDescending: 'Sort {column} down',
                        }}
                    >
                        Name
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    const headerCell = component.locator('th');
    await expect(headerCell).toHaveAttribute('scope', 'col');
    await expect(headerCell).toHaveAttribute('style', /width: 100px/);
    await expect(headerCell).toHaveAttribute('data-align', 'right');
    await expect(headerCell).toHaveAttribute('data-truncate', 'true');
    await expect(headerCell).toHaveAttribute('data-no-shrink', 'true');
});

test('should handle all row states and interactions', async ({ mount }) => {
    const onClick = sinon.spy();
    const onButtonClick = sinon.spy();
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Body>
                <Table.Row disabled aria-label="Test Row">
                    <Table.RowCell>Test</Table.RowCell>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
                <Table.Row selected>
                    <Table.RowCell>Test</Table.RowCell>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
                <Table.Row onClick={onClick}>
                    <Table.RowCell>Test</Table.RowCell>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                    <Table.RowCell>
                        <button type="button" onClick={onButtonClick}>
                            Test
                        </button>
                    </Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    const firstRow = component.locator('tr').nth(0);
    await expect(firstRow).toHaveAttribute('data-disabled', 'true');
    await expect(firstRow).toHaveAttribute('aria-label', 'Test Row');

    const secondRow = component.locator('tr').nth(1);
    await expect(secondRow).toHaveAttribute('data-selected', 'true');

    const thirdRow = component.locator('tr').nth(2);
    await expect(thirdRow).toHaveAttribute('role', 'button');
    await thirdRow.click();
    sinon.assert.calledOnce(onClick);

    const fourthRow = component.locator('tr').nth(3);
    const button = fourthRow.locator('button');
    await button.click();
    sinon.assert.calledOnce(onButtonClick);
});

test('should handle all cell configurations', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Body>
                <Table.Row>
                    <Table.RowCell truncate align="center" aria-label="Test Cell">
                        Very long content that should be truncated
                    </Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    const cell = component.locator('td');
    await expect(cell).toHaveAttribute('data-truncate', 'true');
    await expect(cell).toHaveAttribute('data-align', 'center');
    await expect(cell).toHaveAttribute('aria-label', 'Test Cell');
});

test('should cycle through sort directions', async ({ mount }) => {
    const onSortChange = sinon.spy();

    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell onSortChange={onSortChange}>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    const sortButton = component.getByRole('button');

    await sortButton.click();
    sinon.assert.calledWith(onSortChange, 'ascending');
});

test('should handle sorting functionality', async ({ mount }) => {
    const onSortChange = sinon.spy();
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell sortDirection="ascending" onSortChange={onSortChange}>
                        Name
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await component.getByRole('button').click();
    sinon.assert.calledOnceWithExactly(onSortChange, 'descending');
});

test('should handle keyboard navigation', async ({ mount, page }) => {
    const wrapper = await mount(
        <Table.Root aria-label="Table" data-test-id="table-root">
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
                        <button type="button" data-test-id="action-btn-1">
                            Action
                        </button>
                    </Table.RowCell>
                </Table.Row>
                <Table.Row data-test-id="action-row">
                    <Table.RowCell>Test 2</Table.RowCell>
                    <Table.RowCell>
                        <button type="button" data-test-id="action-btn-2">
                            Action
                        </button>
                        <button type="button" data-test-id="action-btn-3">
                            Action
                        </button>
                    </Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await page.keyboard.press('Tab');
    await expect(component.getByRole('row').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByRole('button').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByRole('row').nth(1)).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(component.getByRole('row').nth(0)).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(component.getByRole('row').nth(2)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByTestId('action-btn-2')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(component.getByTestId('action-btn-3')).toBeFocused();
});

test('should set title when content is truncated', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: '200px' }}>
            <Table.Root layout="fixed" aria-label="Table" data-test-id="table-root">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px" truncate>
                            This is a very long header cell content that should definitely get truncated
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.RowCell truncate>
                            This is a very long row cell content that should definitely get truncated
                        </Table.RowCell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>,
    );
    const component = wrapper.getByTestId('table-root');

    const headerCell = component.locator('th');
    await expect(headerCell).toHaveAttribute(
        'title',
        'This is a very long header cell content that should definitely get truncated',
    );

    const rowCell = component.locator('td');
    await expect(rowCell).toHaveAttribute(
        'title',
        'This is a very long row cell content that should definitely get truncated',
    );
});

test('should support legacy sticky="head" prop', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root sticky="head" aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-sticky-header', 'true');
    await expect(component).toHaveAttribute('data-sticky-left-column', 'false');
});

test('should support legacy sticky="col" prop', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root sticky="col" aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-sticky-header', 'false');
    await expect(component).toHaveAttribute('data-sticky-left-column', 'true');
});

test('should support legacy sticky="both" prop', async ({ mount }) => {
    const wrapper = await mount(
        <Table.Root sticky="both" aria-label="Table" data-test-id="table-root">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.RowCell>Test</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-sticky-header', 'true');
    await expect(component).toHaveAttribute('data-sticky-left-column', 'true');
});

test('should set data-has-horizontal-overflow when content overflows', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: '100px', overflow: 'auto' }}>
            <Table.Root aria-label="Test Table" data-test-id="table-root">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Column 1</Table.HeaderCell>
                        <Table.HeaderCell>Column 2</Table.HeaderCell>
                        <Table.HeaderCell>Column 3</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.RowCell>This is some long content</Table.RowCell>
                        <Table.RowCell>This is some more long content</Table.RowCell>
                        <Table.RowCell>This is even more long content</Table.RowCell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-has-horizontal-overflow', 'true');
});

test('should not set data-has-horizontal-overflow when content does not overflow', async ({ mount }) => {
    const wrapper = await mount(
        <div style={{ width: '1200px', overflow: 'auto' }}>
            <Table.Root aria-label="Test Table" data-test-id="table-root">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Column 1</Table.HeaderCell>
                        <Table.HeaderCell>Column 2</Table.HeaderCell>
                        <Table.HeaderCell>Column 3</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.RowCell>Short</Table.RowCell>
                        <Table.RowCell>Content</Table.RowCell>
                        <Table.RowCell>Here</Table.RowCell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>,
    );
    const component = wrapper.getByTestId('table-root');

    await expect(component).toHaveAttribute('data-has-horizontal-overflow', 'false');
});
