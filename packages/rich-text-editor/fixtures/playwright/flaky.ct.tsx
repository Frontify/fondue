import { expect, test } from '@playwright/experimental-ct-react';

test('fails on its first attempt and passes on a retry', ({ page }, testInfo) => {
    expect(page).toBeDefined();
    expect(testInfo.retry).toBeGreaterThan(0);
});
