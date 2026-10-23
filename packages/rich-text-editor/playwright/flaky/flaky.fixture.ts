/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/test';

test('fails on its first attempt and passes on its retry', ({}, testInfo) => {
    expect(testInfo.retry, 'the first attempt fails on purpose').toBeGreaterThan(0);
});
