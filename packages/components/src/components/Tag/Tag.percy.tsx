/* (c) Copyright Frontify Ltd., all rights reserved. */

import percySnapshot from '@percy/playwright';
import { test, expect } from '@playwright/experimental-ct-react';

import { Tag } from './Tag';

test('percy visual regression', async ({ mount, page }) => {
    const component = await mount(<Tag>Test</Tag>);

    await expect(component).toContainText('Test');
    await percySnapshot(page, 'Tag');
});
