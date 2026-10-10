/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { Button } from '#/components/Button/Button';
import { MAX_HEIGHT_MARGIN } from '#/utilities/domUtilities';

import { Dropdown } from '../Dropdown';

import { DropdownWithContextMenu } from './DropdownWithContextMenu';
import { DropdownWithCustomContainer } from './DropdownWithCustomContainer';
import { DropdownWithScrollingAnchor } from './DropdownWithScrollingAnchor';
import { DropdownWithScrollingAnchorInHost } from './DropdownWithScrollingAnchorInHost';
import { DropdownWithVirtualAnchor } from './DropdownWithVirtualAnchor';

const DROPDOWN_TRIGGER_TEST_ID = 'fondue-dropdown-trigger';
const DROPDOWN_CONTENT_TEST_ID = 'fondue-dropdown-content';
const DROPDOWN_GROUP_TEST_ID = 'fondue-dropdown-group';
const DROPDOWN_SUB_TRIGGER_TEST_ID = 'fondue-dropdown-sub-trigger';
const DROPDOWN_SUB_CONTENT_TEST_ID = 'fondue-dropdown-sub-content';
const DROPDOWN_ITEM_TEST_ID = 'fondue-dropdown-item';
const DROPDOWN_ICON_TEST_ID = 'fondue-dropdown-icon';
const DROPDOWN_SHORTCUT_TEST_ID = 'fondue-dropdown-shortcut';

test('should render without error', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
});

test('should render with comfortable trigger distance', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} triggerOffset="comfortable">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    const triggerElementBoundingBox = await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).boundingBox();
    const contentElementBoundingBox = await page.getByTestId(DROPDOWN_CONTENT_TEST_ID).boundingBox();
    expect(triggerElementBoundingBox && contentElementBoundingBox).toBeTruthy();
    if (triggerElementBoundingBox && contentElementBoundingBox) {
        expect(contentElementBoundingBox.y).toBe(triggerElementBoundingBox.y + triggerElementBoundingBox.height + 12);
    }
});

test('should render with spacious trigger distance', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} triggerOffset="spacious">
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    const triggerElementBoundingBox = await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).boundingBox();
    const contentElementBoundingBox = await page.getByTestId(DROPDOWN_CONTENT_TEST_ID).boundingBox();
    expect(triggerElementBoundingBox && contentElementBoundingBox).toBeTruthy();
    if (triggerElementBoundingBox && contentElementBoundingBox) {
        expect(contentElementBoundingBox.y).toBe(triggerElementBoundingBox.y + triggerElementBoundingBox.height + 16);
    }
});

test('should call onSelect by keyboard', async ({ mount, page }) => {
    const onSelect = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={onSelect}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await page.keyboard.press('Enter');
    expect(onSelect.calledOnce).toBe(true);
});

test('should call onSelect by click', async ({ mount, page }) => {
    const onSelect = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item data-test-id={DROPDOWN_ITEM_TEST_ID} onSelect={onSelect}>
                    Item 1
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_ITEM_TEST_ID).click();
    expect(onSelect.calledOnce).toBe(true);
});

test('should call open and close callbacks', async ({ mount, page }) => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();
    const component = await mount(
        <Dropdown.Root
            onOpenChange={(isOpen) => {
                if (isOpen) {
                    onOpen();
                } else {
                    onClose();
                }
            }}
        >
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    sinon.assert.calledOnce(onOpen);
    await page.keyboard.press('Enter');
    sinon.assert.calledOnce(onClose);
});

test('should open submenu by keyboard', async ({ mount, page }) => {
    const onSelect = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger data-test-id={DROPDOWN_SUB_TRIGGER_TEST_ID}>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent data-test-id={DROPDOWN_SUB_CONTENT_TEST_ID}>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item data-test-id={DROPDOWN_ITEM_TEST_ID} onSelect={onSelect}>
                            Item 4.2
                        </Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    const menu = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const items = menu.getByRole('menuitem');
    await expect(menu.locator('[data-highlighted]')).toHaveCount(1);
    await page.locator(':focus').press('ArrowDown');
    await expect(items.nth(1)).toHaveAttribute('data-highlighted', '');
    await page.locator(':focus').press('ArrowDown');
    await expect(items.nth(2)).toHaveAttribute('data-highlighted', '');
    await page.locator(':focus').press('ArrowDown');
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveAttribute('data-highlighted', '');
    await page.locator(':focus').press('ArrowRight');
    await expect(page.getByTestId(DROPDOWN_SUB_CONTENT_TEST_ID)).toBeVisible();
    await page.locator(':focus').press('ArrowDown');
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveAttribute('data-highlighted', '');
    await page.keyboard.press('Enter');
    expect(onSelect.calledOnce).toBe(true);
});

test('should open submenu by mouse', async ({ mount, page, browserName }) => {
    test.skip(
        browserName === 'firefox',
        'Firefox does not properly trigger Radix UI submenu hover events with Playwright',
    );
    const onSelect = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger data-test-id={DROPDOWN_SUB_TRIGGER_TEST_ID}>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent data-test-id={DROPDOWN_SUB_CONTENT_TEST_ID}>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item data-test-id={DROPDOWN_ITEM_TEST_ID} onSelect={onSelect}>
                            Item 4.2
                        </Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID).hover();
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(240, 240, 235)');
    await expect(page.getByTestId(DROPDOWN_SUB_CONTENT_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_ITEM_TEST_ID).hover();
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(225, 225, 219)');
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveCSS('background-color', 'rgb(240, 240, 235)');
    await page.getByTestId(DROPDOWN_ITEM_TEST_ID).click();
    expect(onSelect.calledOnce).toBe(true);
});

test('should have max height equal to available space', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 4</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 7</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 8</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await page.setViewportSize({ width: 800, height: 300 });
    const windowHeight = page.viewportSize()?.height || 0;

    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();

    const dialog = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(dialog).toBeVisible();

    const boundingBox = await dialog.boundingBox();
    const expectedMaxHeight = windowHeight - (boundingBox?.y || 0) - MAX_HEIGHT_MARGIN;
    const actualMaxHeight = await dialog.evaluate((node) => parseFloat(window.getComputedStyle(node).maxHeight));
    expect(actualMaxHeight).toBe(expectedMaxHeight);
});

test('should render the dropdown content to the right side of the trigger', async ({ mount, page }) => {
    await mount(
        <Dropdown.Root open>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="right" data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    const dropdownContentElement = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const boundingBox = await dropdownContentElement.boundingBox();
    const triggerElement = page.getByTestId(DROPDOWN_TRIGGER_TEST_ID);
    const triggerBoundingBox = await triggerElement.boundingBox();

    expect(boundingBox?.x).toBeGreaterThan(triggerBoundingBox?.x || -1);
    expect(boundingBox?.y).toBe(triggerBoundingBox?.y || -1);
});

test('should render <a> as the dropdown item', async ({ mount, page }) => {
    await mount(
        <Dropdown.Root open>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content side="right" data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item asChild onSelect={() => {}}>
                    <a href="https://frontify.com">Item 1</a>
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    const dropdownContentElement = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(dropdownContentElement.getByRole('menuitem').first()).toHaveAttribute('href', 'https://frontify.com');
});

test('should not focus trigger on close', async ({ mount, page }) => {
    await mount(
        <div>
            <input type="text" id="dummy-input" placeholder="test" />
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
                </Dropdown.Trigger>
                <Dropdown.Content side="right" data-test-id={DROPDOWN_CONTENT_TEST_ID} preventTriggerFocusOnClose>
                    <Dropdown.Item
                        onSelect={() => {
                            document.getElementById('dummy-input')?.focus();
                        }}
                    >
                        <a href="https://frontify.com">Item 1</a>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </div>,
    );

    const dropdownContentElement = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const triggerElement = page.getByTestId(DROPDOWN_TRIGGER_TEST_ID);
    await triggerElement.focus();
    await page.keyboard.press('Enter');
    await expect(dropdownContentElement).toBeVisible();
    await dropdownContentElement.getByRole('menuitem').first().focus();
    await page.mouse.click(0, 0);
    await expect(triggerElement).not.toBeFocused();
});

test('should render group with heading', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Group data-test-id={DROPDOWN_GROUP_TEST_ID} heading="hello world">
                    <Dropdown.Item onSelect={() => {}}>Item 5</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {}}>Item 6</Dropdown.Item>
                </Dropdown.Group>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    const groupHeading = page.getByTestId(DROPDOWN_GROUP_TEST_ID).getByText('hello world');
    await expect(groupHeading).toBeVisible();
    await expect(groupHeading).toHaveAttribute('aria-label', 'hello world');
});

test('should not render group if it has no children', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
                <Dropdown.SubMenu>
                    <Dropdown.SubTrigger>Item 4</Dropdown.SubTrigger>
                    <Dropdown.SubContent>
                        <Dropdown.Item onSelect={() => {}}>Item 4.1</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.2</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {}}>Item 4.3</Dropdown.Item>
                    </Dropdown.SubContent>
                </Dropdown.SubMenu>
                <Dropdown.Group data-test-id={DROPDOWN_GROUP_TEST_ID} heading="hello world">
                    {null}
                </Dropdown.Group>
            </Dropdown.Content>
        </Dropdown.Root>,
    );
    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    const groupHeading = page.getByTestId(DROPDOWN_GROUP_TEST_ID).getByText('hello world');
    await expect(groupHeading).not.toBeVisible();
});

test('should close when clicking outside', async ({ mount, page }) => {
    const component = await mount(
        <div style={{ padding: '50px' }}>
            <input type="text" id="dummy-input" placeholder="test" />
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
                </Dropdown.Trigger>
                <Dropdown.Content side="right" data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                    <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </div>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();

    // Open the dropdown
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');

    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    // Click outside the dropdown
    await page.locator('body').click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).not.toBeVisible();
});

test('should render children in the DOM when `forceMount` is true', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} forceMount>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeAttached();
});

test('should open when clicked and `forceMount` is true', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} forceMount>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_TRIGGER_TEST_ID)).toBeVisible();

    // Open the dropdown
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).focus();
    await page.keyboard.press('Enter');

    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    // Click outside the dropdown
    await page.mouse.click(0, 0);
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).not.toBeVisible();
});

test('should close the first dropdown when opening the second one with forceMount', async ({ mount, page }) => {
    const component = await mount(
        <div style={{ display: 'flex', gap: 10 }}>
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <Button data-test-id="dropdown-trigger-1">Trigger 1</Button>
                </Dropdown.Trigger>
                <Dropdown.Content data-test-id="dropdown-content-1" forceMount>
                    <Dropdown.Item onSelect={() => ({})}>Item 1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <Button data-test-id="dropdown-trigger-2">Trigger 2</Button>
                </Dropdown.Trigger>
                <Dropdown.Content data-test-id="dropdown-content-2" forceMount>
                    <Dropdown.Item onSelect={() => ({})}>Item 1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
        </div>,
    );

    await expect(component).toBeVisible();
    const trigger1 = page.getByTestId('dropdown-trigger-1');
    const trigger2 = page.getByTestId('dropdown-trigger-2');
    const content1 = page.getByTestId('dropdown-content-1');
    const content2 = page.getByTestId('dropdown-content-2');

    await expect(content1).toBeAttached();
    await expect(content2).toBeAttached();
    await expect(content1).not.toBeVisible();
    await expect(content2).not.toBeVisible();

    await trigger1.click();
    await expect(content1).toBeVisible();
    await expect(content2).not.toBeVisible();

    await trigger2.click();
    await expect(content1).not.toBeVisible();
    await expect(content2).toBeVisible();
});

test('should open dropdown when clicking on icon inside trigger with forceMount', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>
                    Trigger
                    <IconCaretDown data-test-id={DROPDOWN_ICON_TEST_ID} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} forceMount>
                <Dropdown.Item onSelect={() => ({})}>Item 1</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    const trigger = page.getByTestId(DROPDOWN_TRIGGER_TEST_ID);
    const icon = page.getByTestId(DROPDOWN_ICON_TEST_ID);
    const content = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);

    await expect(trigger).toBeVisible();
    await expect(icon).toBeVisible();
    await expect(content).toBeAttached();
    await expect(content).not.toBeVisible();

    await icon.click();
    await expect(content).toBeVisible();

    await icon.click();
    await expect(content).not.toBeVisible();
});

test('should call onCloseAutoFocus when the dropdown closes', async ({ mount, page }) => {
    const onCloseAutoFocus = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} onCloseAutoFocus={onCloseAutoFocus}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    const content = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(content).toBeVisible();

    expect(onCloseAutoFocus.callCount).toBe(0);
    await page.keyboard.press('Escape');
    await expect(content).not.toBeVisible();
    await expect.poll(() => onCloseAutoFocus.callCount).toBe(1);
});

test('should call onEscapeKeyDown when escape is pressed', async ({ mount, page }) => {
    const onEscapeKeyDown = sinon.spy();
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} onEscapeKeyDown={onEscapeKeyDown}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => {}}>Item 2</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    expect(onEscapeKeyDown.callCount).toBe(0);
    await page.keyboard.press('Escape');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).not.toBeVisible();
    expect(onEscapeKeyDown.callCount).toBe(1);
});

test('should render Dropdown.Shortcut as a kbd element inside the item', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item data-test-id={DROPDOWN_ITEM_TEST_ID} onSelect={() => {}}>
                    Edit
                    <Dropdown.Shortcut data-test-id={DROPDOWN_SHORTCUT_TEST_ID}>K + E</Dropdown.Shortcut>
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    const shortcut = page.getByTestId(DROPDOWN_SHORTCUT_TEST_ID);
    await expect(shortcut).toBeVisible();
    await expect(shortcut).toHaveText('K + E');
    await expect(shortcut).toHaveJSProperty('tagName', 'KBD');
    await expect(shortcut).toHaveAttribute('aria-hidden', 'true');
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID).getByTestId(DROPDOWN_SHORTCUT_TEST_ID)).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveAccessibleName('Edit');
});

test('should forward aria-keyshortcuts to the underlying menuitem', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item data-test-id={DROPDOWN_ITEM_TEST_ID} aria-keyshortcuts="Meta+E" onSelect={() => {}}>
                    Edit
                    <Dropdown.Shortcut>⌘ + E</Dropdown.Shortcut>
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveAttribute('aria-keyshortcuts', 'Meta+E');
});

test('should keep the shortcut adjacent to a right slot', async ({ mount, page }) => {
    const component = await mount(
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>
                    Share
                    <Dropdown.Slot name="right" data-test-id="dropdown-right-slot">
                        <IconCaretDown size={16} />
                    </Dropdown.Slot>
                    <Dropdown.Shortcut data-test-id={DROPDOWN_SHORTCUT_TEST_ID}>S</Dropdown.Shortcut>
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(component).toBeVisible();
    await page.getByTestId(DROPDOWN_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();

    await expect(page.getByTestId('dropdown-right-slot')).toBeVisible();
    await expect(page.getByTestId(DROPDOWN_SHORTCUT_TEST_ID)).toHaveCSS('margin-inline-start', '0px');
});

test('should portal into document.body by default', async ({ mount, page }) => {
    await mount(
        <Dropdown.Root open>
            <Dropdown.Trigger>
                <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID}>
                <Dropdown.Item onSelect={() => {}}>Item 1</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>,
    );

    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await expect(page.locator('#root').getByTestId(DROPDOWN_CONTENT_TEST_ID)).toHaveCount(0);
});

test('should render content and submenu inside the given container', async ({ mount, page }) => {
    await mount(
        <DropdownWithCustomContainer
            containerTestId="custom-container"
            contentTestId={DROPDOWN_CONTENT_TEST_ID}
            subTriggerTestId={DROPDOWN_SUB_TRIGGER_TEST_ID}
            subContentTestId={DROPDOWN_SUB_CONTENT_TEST_ID}
        />,
    );

    const container = page.getByTestId('custom-container');
    await expect(container.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID).hover();
    await expect(container.getByTestId(DROPDOWN_SUB_CONTENT_TEST_ID)).toBeVisible();
});

test('should position at the virtual anchor and follow it', async ({ mount, page }) => {
    const component = await mount(<DropdownWithVirtualAnchor left={100} top={100} width={0} height={0} />);

    const dropdownContent = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(dropdownContent).toBeVisible();
    await expect.poll(() => dropdownContent.boundingBox()).toMatchObject({ x: 100, y: 108 });

    await component.update(<DropdownWithVirtualAnchor left={300} top={200} width={0} height={0} />);
    await expect.poll(() => dropdownContent.boundingBox()).toMatchObject({ x: 300, y: 208 });
});

test('should position at the virtual anchor inside a transformed ancestor', async ({ mount, page }) => {
    await mount(
        <div style={{ transform: 'translate(50px, 30px)' }}>
            <DropdownWithVirtualAnchor left={100} top={100} width={40} height={20} />
        </div>,
    );

    const dropdownContent = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(dropdownContent).toBeVisible();
    await expect.poll(() => dropdownContent.boundingBox()).toMatchObject({ x: 100, y: 128 });
});

test('should return focus to the element focused before opening at a virtual anchor', async ({ mount, page }) => {
    await mount(<DropdownWithContextMenu inputTestId="focus-origin" />);

    const input = page.getByTestId('focus-origin');
    await input.focus();
    await input.dispatchEvent('contextmenu');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    await expect(input).not.toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId(DROPDOWN_CONTENT_TEST_ID)).not.toBeVisible();
    await expect(input).toBeFocused();
});

test('should follow a stable virtual anchor when its scroll container scrolls', async ({ mount, page }) => {
    await mount(<DropdownWithScrollingAnchor scrollContainerTestId="scroll-container" anchorTestId="anchor" />);

    const content = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const anchor = page.getByTestId('anchor');
    const gapBelowAnchor = async () => {
        const contentBox = await content.boundingBox();
        const anchorBox = await anchor.boundingBox();
        if (!contentBox || !anchorBox) {
            return null;
        }
        return { x: contentBox.x - anchorBox.x, y: contentBox.y - anchorBox.y - anchorBox.height };
    };
    await expect(content).toBeVisible();
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });

    await page.getByTestId('scroll-container').evaluate((element) => {
        element.scrollTop = 50;
    });
    await expect.poll(() => anchor.boundingBox().then((box) => box?.y)).toBeLessThan(100);
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });
});

test('should name a virtual-anchor menu with aria-label', async ({ mount, page }) => {
    await mount(<DropdownWithContextMenu inputTestId="focus-origin" ariaLabel="Text actions" />);

    await page.getByTestId('focus-origin').dispatchEvent('contextmenu');
    await expect(page.getByRole('menu', { name: 'Text actions' })).toBeVisible();
});

test('should open at a stable virtual anchor that scrolled while closed', async ({ mount, page }) => {
    const component = await mount(
        <DropdownWithScrollingAnchor scrollContainerTestId="scroll-container" anchorTestId="anchor" open={false} />,
    );

    const content = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const anchor = page.getByTestId('anchor');
    await page.getByTestId('scroll-container').evaluate((element) => {
        element.scrollTop = 50;
    });
    await expect.poll(() => anchor.boundingBox().then((box) => box?.y)).toBeLessThan(100);

    await component.update(
        <DropdownWithScrollingAnchor scrollContainerTestId="scroll-container" anchorTestId="anchor" open />,
    );
    await expect(content).toBeVisible();
    const gapBelowAnchor = async () => {
        const contentBox = await content.boundingBox();
        const anchorBox = await anchor.boundingBox();
        if (!contentBox || !anchorBox) {
            return null;
        }
        return { x: contentBox.x - anchorBox.x, y: contentBox.y - anchorBox.y - anchorBox.height };
    };
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });
});

test('should not request animation frames while closed with forceMount at a virtual anchor', async ({
    mount,
    page,
}) => {
    await mount(<DropdownWithVirtualAnchor left={100} top={100} width={40} height={20} open={false} forceMount />);

    const frameRequests = await page.evaluate(async () => {
        let count = 0;
        const requestAnimationFrame = window.requestAnimationFrame.bind(window);
        window.requestAnimationFrame = (callback) => {
            count += 1;
            return requestAnimationFrame(callback);
        };
        await new Promise((resolve) => setTimeout(resolve, 300));
        window.requestAnimationFrame = requestAnimationFrame;
        return count;
    });
    // A frame loop requests one frame per frame; Floating UI's resize observer may request a single one.
    expect(frameRequests).toBeLessThanOrEqual(1);
});

test('should follow a stable virtual anchor when its scroll container scrolls inside an iframe', async ({
    mount,
    page,
}) => {
    await mount(
        <DropdownWithScrollingAnchorInHost
            host="iframe"
            scrollContainerTestId="scroll-container"
            anchorTestId="anchor"
        />,
    );

    const scope = page.frameLocator('iframe');
    const content = scope.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const anchor = scope.getByTestId('anchor');
    const gapBelowAnchor = async () => {
        const contentBox = await content.boundingBox();
        const anchorBox = await anchor.boundingBox();
        if (!contentBox || !anchorBox) {
            return null;
        }
        return { x: contentBox.x - anchorBox.x, y: contentBox.y - anchorBox.y - anchorBox.height };
    };
    await expect(content).toBeVisible();
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });

    await scope.getByTestId('scroll-container').evaluate((element) => {
        element.scrollTop = 50;
    });
    await expect.poll(() => anchor.boundingBox().then((box) => box?.y)).toBeLessThan(100);
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });
});

test('should follow a stable virtual anchor when its scroll container scrolls inside a shadow root', async ({
    mount,
    page,
}) => {
    await mount(
        <DropdownWithScrollingAnchorInHost
            host="shadowRoot"
            scrollContainerTestId="scroll-container"
            anchorTestId="anchor"
        />,
    );

    const scope = page;
    const content = scope.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    const anchor = scope.getByTestId('anchor');
    const gapBelowAnchor = async () => {
        const contentBox = await content.boundingBox();
        const anchorBox = await anchor.boundingBox();
        if (!contentBox || !anchorBox) {
            return null;
        }
        return { x: contentBox.x - anchorBox.x, y: contentBox.y - anchorBox.y - anchorBox.height };
    };
    await expect(content).toBeVisible();
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });

    await scope.getByTestId('scroll-container').evaluate((element) => {
        element.scrollTop = 50;
    });
    await expect.poll(() => anchor.boundingBox().then((box) => box?.y)).toBeLessThan(100);
    await expect.poll(gapBelowAnchor).toEqual({ x: 0, y: 8 });
});
