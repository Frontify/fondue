/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

// The profile's module loads first, so the root waits until it appears and its session is ready.
export const ready = async (page: Page) => {
    const root = page.locator('[data-test-id="fondue-rich-text-editor"]');
    await expect(root).toHaveCount(1);
    await expect(root).not.toHaveAttribute('aria-busy');
};
