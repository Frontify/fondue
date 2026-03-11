/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { EditableText } from '../EditableText';

const EDITABLE_TEXT_TEST_ID = 'fondue-editable-text';
const EDITABLE_TEXT_TEXT = 'sample editable-text';

test('should render without error', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(EDITABLE_TEXT_TEXT);
});

test('should render with custom data-test-id', async ({ mount }) => {
    const customTestId = 'custom-editable';
    const component = await mount(<EditableText data-test-id={customTestId}>{EDITABLE_TEXT_TEXT}</EditableText>);
    await expect(component.getByTestId(customTestId)).toBeVisible();
});

test('should render as child element with asChild', async ({ mount, page }) => {
    const component = await mount(
        <EditableText asChild>
            <h1>{EDITABLE_TEXT_TEXT}</h1>
        </EditableText>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(EDITABLE_TEXT_TEXT);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(EDITABLE_TEXT_TEXT);
});

test('should not have role textbox before focus', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await expect(text).not.toHaveAttribute('role');
});

test('should have role textbox on focus', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await expect(text).toHaveAttribute('role', 'textbox');
});

test('should remove role textbox on blur', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await expect(text).toHaveAttribute('role', 'textbox');
    await text.blur();
    await expect(text).not.toHaveAttribute('role');
});

test('should have aria-live off', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await expect(text).toHaveAttribute('aria-live', 'off');
});

test('should apply aria-label when editing', async ({ mount }) => {
    const component = await mount(<EditableText aria-label="Edit title">{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await expect(text).not.toHaveAttribute('aria-label');
    await text.focus();
    await expect(text).toHaveAttribute('aria-label', 'Edit title');
});

test('should not be contentEditable before focus', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await expect(text).not.toHaveAttribute('contenteditable');
});

test('should become contentEditable on focus', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await expect(text).toHaveAttribute('contenteditable', 'plaintext-only');
});

test('should lose contentEditable on blur', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await expect(text).toHaveAttribute('contenteditable', 'plaintext-only');
    await text.blur();
    await expect(text).not.toHaveAttribute('contenteditable');
});

test('should set data-editing to true on focus', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const root = component.getByTestId(EDITABLE_TEXT_TEST_ID);
    await expect(root).toHaveAttribute('data-editing', 'false');
    await component.locator('[tabindex="0"]').focus();
    await expect(root).toHaveAttribute('data-editing', 'true');
});

test('should set data-editing to false on blur', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const root = component.getByTestId(EDITABLE_TEXT_TEST_ID);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await expect(root).toHaveAttribute('data-editing', 'true');
    await text.blur();
    await expect(root).toHaveAttribute('data-editing', 'false');
});

test('should not show focus ring on mouse click', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const root = component.getByTestId(EDITABLE_TEXT_TEST_ID);
    await component.locator('[tabindex="0"]').click();
    await expect(root).toHaveAttribute('data-show-focus-ring', 'false');
});

test('should call onChange with text content on blur', async ({ mount }) => {
    const onChange = sinon.spy();
    const component = await mount(<EditableText onChange={onChange}>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await text.blur();
    expect(onChange.calledOnce).toBe(true);
    expect(onChange.firstCall.args[0]).toBe(EDITABLE_TEXT_TEXT);
});

test('should call onChange with updated text on blur', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const component = await mount(<EditableText onChange={onChange}>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.click();
    await page.keyboard.type(' appended');
    await text.blur();
    expect(onChange.calledOnce).toBe(true);
    expect(onChange.firstCall.args[0]).toBe(`${EDITABLE_TEXT_TEXT} appended`);
});

test('should blur on Enter key', async ({ mount, page }) => {
    const onChange = sinon.spy();
    const component = await mount(<EditableText onChange={onChange}>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await page.keyboard.press('Enter');
    await expect(text).not.toBeFocused();
    expect(onChange.calledOnce).toBe(true);
});

test('should not insert newline on Enter key', async ({ mount, page }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.click();
    await page.keyboard.type('hello');
    await page.keyboard.press('Enter');
    await expect(text).toContainText(`${EDITABLE_TEXT_TEXT}hello`);
    const textContent = await text.textContent();
    expect(textContent).not.toContain('\n');
});

test('should set data-hug-width based on hugWidth prop', async ({ mount }) => {
    const component = await mount(<EditableText hugWidth>{EDITABLE_TEXT_TEXT}</EditableText>);
    const root = component.getByTestId(EDITABLE_TEXT_TEST_ID);
    await expect(root).toHaveAttribute('data-hug-width', 'true');
});

test('should default data-hug-width to false', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const root = component.getByTestId(EDITABLE_TEXT_TEST_ID);
    await expect(root).toHaveAttribute('data-hug-width', 'false');
});

test('should hide pen icon from screen readers', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const icon = component.locator('[aria-hidden="true"]');
    await expect(icon).toBeVisible();
});

test('should not call onChange when no onChange is provided', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    const text = component.locator('[tabindex="0"]');
    await text.focus();
    await text.blur();
    // No error should be thrown - this test passes if it completes without error
});

test('should not have role textbox on asChild heading before focus', async ({ mount, page }) => {
    await mount(
        <EditableText asChild>
            <h1>{EDITABLE_TEXT_TEXT}</h1>
        </EditableText>,
    );
    const heading = page.locator('h1');
    await expect(heading).not.toHaveAttribute('role');
});

test('should switch asChild heading to textbox role on focus', async ({ mount, page }) => {
    await mount(
        <EditableText asChild>
            <h1>{EDITABLE_TEXT_TEXT}</h1>
        </EditableText>,
    );
    const heading = page.locator('h1');
    await heading.focus();
    await expect(heading).toHaveAttribute('role', 'textbox');
});
