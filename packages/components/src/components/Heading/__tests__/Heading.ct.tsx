/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Heading } from '../Heading';

const HEADING_TEST_ID = 'test-heading';
const HEADING_TEXT = 'sample heading';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Heading data-test-id={HEADING_TEST_ID}>{HEADING_TEXT}</Heading>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(HEADING_TEXT);
});
