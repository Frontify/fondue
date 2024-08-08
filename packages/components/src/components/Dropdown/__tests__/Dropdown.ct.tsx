/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import * as sinon from 'sinon';

import { Button } from '#/components/Button/Button';
import { MAX_HEIGHT_MARGIN } from '#/utilities/domUtilities';

import { Dropdown } from '../Dropdown';

const DROPDOWN_TRIGGER_TEST_ID = 'fondue-dropdown-trigger';
const DROPDOWN_CONTENT_TEST_ID = 'fondue-dropdown-content';
const DROPDOWN_SUB_TRIGGER_TEST_ID = 'fondue-dropdown-sub-trigger';
const DROPDOWN_SUB_CONTENT_TEST_ID = 'fondue-dropdown-sub-content';
const DROPDOWN_ITEM_TEST_ID = 'fondue-dropdown-item';

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
        <Dropdown.Root>
            <Dropdown.Trigger>
                <Button data-test-id={DROPDOWN_TRIGGER_TEST_ID}>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content data-test-id={DROPDOWN_CONTENT_TEST_ID} onOpen={onOpen} onClose={onClose}>
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
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(66, 71, 71)');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByTestId(DROPDOWN_SUB_CONTENT_TEST_ID)).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(241, 241, 241)');
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveCSS('background-color', 'rgb(66, 71, 71)');
    await page.keyboard.press('Enter');
    expect(onSelect.calledOnce).toBe(true);
});

test('should open submenu by mouse', async ({ mount, page }) => {
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
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(66, 71, 71)');
    await expect(page.getByTestId(DROPDOWN_SUB_CONTENT_TEST_ID)).toBeVisible();
    await page.getByTestId(DROPDOWN_ITEM_TEST_ID).hover();
    await expect(page.getByTestId(DROPDOWN_SUB_TRIGGER_TEST_ID)).toHaveCSS('background-color', 'rgb(241, 241, 241)');
    await expect(page.getByTestId(DROPDOWN_ITEM_TEST_ID)).toHaveCSS('background-color', 'rgb(66, 71, 71)');
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

    await expect(component).toBeVisible();
    await component.click();

    const dialog = page.getByTestId(DROPDOWN_CONTENT_TEST_ID);
    await expect(dialog).toBeVisible();
    await page.setViewportSize({ width: 800, height: 300 });
    const windowHeight = page.viewportSize()?.height || 0;
    const boundingBox = await dialog.boundingBox();
    const expectedMaxHeight = windowHeight - (boundingBox?.y || 0) - MAX_HEIGHT_MARGIN;
    const actualMaxHeight = await dialog.evaluate((node) => parseFloat(window.getComputedStyle(node).maxHeight));
    expect(actualMaxHeight).toBe(expectedMaxHeight);
});
