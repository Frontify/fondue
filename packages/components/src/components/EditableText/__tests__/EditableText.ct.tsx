/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { EditableText } from '../EditableText';

const EDITABLE_TEXT_TEST_ID = 'fondue-editable-text';
const EDITABLE_TEXT_TEXT = 'sample editable-text';

test('should render without error', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(EDITABLE_TEXT_TEXT);
});

test('should have contentEditable attribute', async ({ mount }) => {
    const component = await mount(<EditableText>{EDITABLE_TEXT_TEXT}</EditableText>);
    await expect(component).toHaveAttribute('contenteditable', 'plaintext-only');
});

test('should render as child element with asChild', async ({ mount }) => {
    const component = await mount(
        <EditableText asChild>
            <h1>{EDITABLE_TEXT_TEXT}</h1>
        </EditableText>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(EDITABLE_TEXT_TEXT);
    const tagName = await component.evaluate((el) => el.tagName);
    expect(tagName).toBe('H1');
});
