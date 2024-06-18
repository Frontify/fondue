/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Section } from '../Section';

const SECTION_TEXT = 'sample section';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Section>{SECTION_TEXT}</Section>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(SECTION_TEXT);
    await expect(component).toHaveScreenshot();
});
