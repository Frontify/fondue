import { expect, test } from '@playwright/experimental-ct-react';

test.only('focused test', () => {
    expect(true).toBe(true);
});

test('skipped by the focus', () => {
    expect(true).toBe(true);
});
