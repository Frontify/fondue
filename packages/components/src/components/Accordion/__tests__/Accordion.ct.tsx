/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Accordion } from '../Accordion';

const ACCORDION_TEST_ID = 'test-accordion';
const ACCORDION_TEXT = 'sample accordion';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Accordion data-test-id={ACCORDION_TEST_ID}>{ACCORDION_TEXT}</Accordion>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(ACCORDION_TEXT);
});
