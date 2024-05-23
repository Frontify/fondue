/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Dialog } from '../Dialog';

const DIALOG_TEST_ID = 'test-dialog';
const DIALOG_TEXT = 'sample dialog';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Dialog data-test-id={DIALOG_TEST_ID}>{DIALOG_TEXT}</Dialog>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(DIALOG_TEXT);
});
