/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Label } from '../Label';

const LABEL_TEST_ID = 'fondue-label';
const LABEL_TEXT = 'sample label';

test('render with the correct text', async ({ mount }) => {
    const component = await mount(<Label htmlFor="random-id">{LABEL_TEXT}</Label>);

    await expect(component.getByText(LABEL_TEXT).last()).toBeVisible();
});

test('render with default variant data attribute', async ({ mount }) => {
    const component = await mount(<Label htmlFor="random-id">{LABEL_TEXT}</Label>);
    const label = component.getByTestId(LABEL_TEST_ID);

    await expect(label).toHaveAttribute('data-variant', 'default');
});

test('render with strong variant data attribute', async ({ mount }) => {
    const component = await mount(
        <Label htmlFor="random-id" variant="strong">
            {LABEL_TEXT}
        </Label>,
    );
    const label = component.getByTestId(LABEL_TEST_ID);

    await expect(label).toHaveAttribute('data-variant', 'strong');
});

test('render with required data attribute when required', async ({ mount }) => {
    const component = await mount(
        <Label htmlFor="random-id" required>
            {LABEL_TEXT}
        </Label>,
    );
    const label = component.getByTestId(LABEL_TEST_ID);

    await expect(label).toHaveAttribute('data-required', 'true');
});

test('not have required data attribute when not required', async ({ mount }) => {
    const component = await mount(<Label htmlFor="random-id">{LABEL_TEXT}</Label>);
    const label = component.getByTestId(LABEL_TEST_ID);

    await expect(label).not.toHaveAttribute('data-required', 'true');
});

test('render with custom className', async ({ mount }) => {
    const customClass = 'custom-test-class';
    const component = await mount(
        <Label htmlFor="random-id" className={customClass}>
            {LABEL_TEXT}
        </Label>,
    );
    const label = component.getByTestId(LABEL_TEST_ID);

    await expect(label).toHaveClass(new RegExp(customClass));
});

test('focus the input linked to the label on click', async ({ mount }) => {
    const component = await mount(
        <div>
            <Label htmlFor="random-id">{LABEL_TEXT}</Label>
            <input id="random-id" data-test-id="input" />
        </div>,
    );

    const label = component.getByTestId(LABEL_TEST_ID);
    const input = component.getByTestId('input');

    await label.click();
    await expect(input).toBeFocused();
});

test('focus the input linked to the label when pressing enter', async ({ mount }) => {
    const component = await mount(
        <div>
            <Label htmlFor="random-id">{LABEL_TEXT}</Label>
            <input id="random-id" data-test-id="input" />
        </div>,
    );

    const label = component.getByTestId(LABEL_TEST_ID);
    const input = component.getByTestId('input');

    await label.press('Enter');
    await expect(input).toBeFocused();
});

test('focus the input linked to the label when pressing space', async ({ mount }) => {
    const component = await mount(
        <div>
            <Label htmlFor="random-id">{LABEL_TEXT}</Label>
            <input id="random-id" data-test-id="input" />
        </div>,
    );

    const label = component.getByTestId(LABEL_TEST_ID);
    const input = component.getByTestId('input');

    await label.press('Space');
    await expect(input).toBeFocused();
});
