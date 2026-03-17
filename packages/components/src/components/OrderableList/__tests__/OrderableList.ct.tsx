/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { OrderableList } from '../OrderableList';

const LIST_TEST_ID = 'fondue-orderable-list';
const ITEM_TEST_ID = 'fondue-orderable-list-item';

test.describe('OrderableList', () => {
    test.describe('rendering', () => {
        test('should render all items', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1', '2', '3']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByText('Item 1')).toBeVisible();
            await expect(component.getByText('Item 2')).toBeVisible();
            await expect(component.getByText('Item 3')).toBeVisible();
        });

        test('should render items in the given order', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['3', '1', '2']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const items = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(items.nth(0)).toContainText('Item 3');
            await expect(items.nth(1)).toContainText('Item 1');
            await expect(items.nth(2)).toContainText('Item 2');
        });

        test('should render descriptions', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Description 1</OrderableList.ItemDescription>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByText('Description 1')).toBeVisible();
        });

        test('should render drag handles', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1', '2']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const handles = component.getByRole('button', { name: /Reorder/ });
            await expect(handles).toHaveCount(2);
        });

        test('should render decorator content', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemDecorator>A</OrderableList.ItemDecorator>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByText('A')).toBeVisible();
        });

        test('should render action items', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemAction>
                            <button type="button">Delete</button>
                        </OrderableList.ItemAction>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByRole('button', { name: 'Delete' })).toBeVisible();
        });
    });

    test.describe('accessibility', () => {
        test('should have sortable list role description', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const list = component.locator(`[data-test-id="${LIST_TEST_ID}"]`);
            await expect(list).toHaveAttribute('aria-roledescription', 'sortable list');
            await expect(list).toHaveAttribute('aria-label', 'Sortable list');
        });

        test('should have sortable item role description', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1', '2']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const items = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(items.nth(0)).toHaveAttribute('aria-roledescription', 'sortable item');
            await expect(items.nth(1)).toHaveAttribute('aria-roledescription', 'sortable item');
        });

        test('should label drag handles with item title', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const handle = component.getByRole('button', { name: /Reorder/ });
            await expect(handle).toHaveAccessibleName('Reorder Item 1');
        });

        test('should set title and description ids for aria references', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.ItemDescription>Description 1</OrderableList.ItemDescription>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const title = component.locator('#orderable-item-1-title');
            const description = component.locator('#orderable-item-1-description');
            await expect(title).toHaveText('Item 1');
            await expect(description).toHaveText('Description 1');
        });
    });

    test.describe('selection', () => {
        test('should render content as a button when selectable', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected={false} onSelect={() => {}}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const contentButton = component.locator('div[role="button"]');
            await expect(contentButton).toBeVisible();
            await expect(contentButton).toHaveAttribute('aria-pressed', 'false');
        });

        test('should call onSelect on click', async ({ mount }) => {
            let selectValue: boolean | null = null;
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected={false} onSelect={(v) => (selectValue = v)}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await component.locator('div[role="button"]').click();
            expect(selectValue).toBe(true);
        });

        test('should call onSelect on Enter key', async ({ mount }) => {
            let selectValue: boolean | null = null;
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected={false} onSelect={(v) => (selectValue = v)}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const contentButton = component.locator('div[role="button"]');
            await contentButton.focus();
            await contentButton.press('Enter');
            expect(selectValue).toBe(true);
        });

        test('should call onSelect on Space key', async ({ mount }) => {
            let selectValue: boolean | null = null;
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected={false} onSelect={(v) => (selectValue = v)}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const contentButton = component.locator('div[role="button"]');
            await contentButton.focus();
            await contentButton.press('Space');
            expect(selectValue).toBe(true);
        });

        test('should show selected state', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected onSelect={() => {}}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const item = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(item).toHaveAttribute('data-selected', 'true');
            await expect(item.locator('div[role="button"]')).toHaveAttribute('aria-pressed', 'true');
        });
    });

    test.describe('disabled', () => {
        test('should render disabled state', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" disabled>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const item = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(item).toHaveAttribute('data-disabled', 'true');
        });

        test('should apply disabled visual styles', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" disabled>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const item = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(item).toHaveCSS('opacity', '0.5');
        });

        test('should not be draggable from content area when disabled', async ({ mount, page }) => {
            const orderChanges: string[][] = [];
            const component = await mount(
                <OrderableList.Root order={['1', '2', '3']} onOrderChange={(order) => orderChanges.push(order)}>
                    <OrderableList.Item id="1" disabled>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="2">
                        <OrderableList.ItemTitle>Item 2</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                    <OrderableList.Item id="3">
                        <OrderableList.ItemTitle>Item 3</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const disabledItem = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`).nth(0);
            const targetItem = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`).nth(2);

            const disabledBox = await disabledItem.boundingBox();
            const targetBox = await targetItem.boundingBox();

            if (!disabledBox || !targetBox) {
                throw new Error('Could not get bounding boxes');
            }

            // Attempt to drag the disabled item's content area
            await page.mouse.move(disabledBox.x + disabledBox.width / 2, disabledBox.y + disabledBox.height / 2);
            await page.mouse.down();
            await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, {
                steps: 10,
            });
            await page.mouse.up();

            expect(orderChanges).toHaveLength(0);
        });
    });

    test.describe('spacing', () => {
        test('should set tight spacing', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']} spacing="tight">
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.locator(`[data-test-id="${LIST_TEST_ID}"]`)).toHaveAttribute(
                'data-spacing',
                'tight',
            );
        });

        test('should set compact spacing', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']} spacing="compact">
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.locator(`[data-test-id="${LIST_TEST_ID}"]`)).toHaveAttribute(
                'data-spacing',
                'compact',
            );
        });

        test('should set comfortable spacing', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']} spacing="comfortable">
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.locator(`[data-test-id="${LIST_TEST_ID}"]`)).toHaveAttribute(
                'data-spacing',
                'comfortable',
            );
        });
    });

    test.describe('direction', () => {
        test('should default to vertical', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.locator(`[data-test-id="${LIST_TEST_ID}"]`)).toHaveAttribute(
                'data-direction',
                'vertical',
            );
        });

        test('should support horizontal direction', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']} direction="horizontal">
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.locator(`[data-test-id="${LIST_TEST_ID}"]`)).toHaveAttribute(
                'data-direction',
                'horizontal',
            );
        });
    });

    test.describe('keyboard navigation', () => {
        test('should make content area focusable for non-selectable items with a drag handle', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const content = component.locator(`[data-test-id="${ITEM_TEST_ID}"] > div[tabindex="0"]`);
            await content.focus();
            await expect(content).toBeFocused();
        });

        test('should not double-focus when no drag handle is present', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const content = component.locator(`[data-test-id="${ITEM_TEST_ID}"] > div[tabindex="0"]`);
            await expect(content).toHaveCount(0);
        });
    });

    test.describe('custom handle', () => {
        test('should render custom handle content', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.CustomHandle>
                            <span>Drag here</span>
                        </OrderableList.CustomHandle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByText('Drag here')).toBeVisible();
        });

        test('should not render default drag handle when custom handle is used', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.CustomHandle>
                            <span>Drag here</span>
                        </OrderableList.CustomHandle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const defaultHandles = component.getByRole('button', { name: /Reorder/ });
            await expect(defaultHandles).toHaveCount(0);
        });

        test('should render custom handle with asChild', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.CustomHandle asChild>
                            <button type="button">Custom drag</button>
                        </OrderableList.CustomHandle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await expect(component.getByRole('button', { name: 'Custom drag' })).toBeVisible();
        });
    });

    test.describe('live region announcements', () => {
        test('should render a live region for screen reader announcements', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const liveRegion = component.locator('[aria-live="polite"]');
            await expect(liveRegion).toHaveCount(1);
            await expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
        });
    });

    test.describe('aria-label', () => {
        test('should use default aria-label', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const list = component.locator(`[data-test-id="${LIST_TEST_ID}"]`);
            await expect(list).toHaveAttribute('aria-label', 'Sortable list');
        });

        test('should support custom aria-label', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']} aria-label="Reorder layers">
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const list = component.locator(`[data-test-id="${LIST_TEST_ID}"]`);
            await expect(list).toHaveAttribute('aria-label', 'Reorder layers');
        });
    });

    test.describe('selection state', () => {
        test('should not have data-selected attribute when item is not selectable', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const item = component.locator(`[data-test-id="${ITEM_TEST_ID}"]`);
            await expect(item).not.toHaveAttribute('data-selected');
        });

        test('should not render role="button" when item is not selectable', async ({ mount }) => {
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1">
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            const contentButton = component.locator('div[role="button"]');
            await expect(contentButton).toHaveCount(0);
        });

        test('should toggle selection on click when already selected', async ({ mount }) => {
            let selectValue: boolean | null = null;
            const component = await mount(
                <OrderableList.Root order={['1']}>
                    <OrderableList.Item id="1" selected onSelect={(v) => (selectValue = v)}>
                        <OrderableList.ItemTitle>Item 1</OrderableList.ItemTitle>
                        <OrderableList.DragHandle />
                    </OrderableList.Item>
                </OrderableList.Root>,
            );

            await component.locator('div[role="button"]').click();
            expect(selectValue).toBe(false);
        });
    });
});
