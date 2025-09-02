/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Label } from '../Label';

const LABEL_TEST_ID = 'fondue-label';
const LABEL_TEXT = 'sample label';

test('render with the correct text', async ({ mount }) => {
    const component = await mount(<Label htmlFor="random-id">{LABEL_TEXT}</Label>);

    await expect(component.getByText(LABEL_TEXT).last()).toBeVisible();
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
