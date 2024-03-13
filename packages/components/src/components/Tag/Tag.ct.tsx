/* (c) Copyright Frontify Ltd., all rights reserved. */

import { test, expect } from '@playwright/experimental-ct-react';

import { Tag } from './Tag';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Tag>Test</Tag>);
    await expect(component).toContainText('Test');
});

// TODO: This test should be a responsibility of a Visual Regression tool
test('should allow for the tag to have a border color and background color', async ({ mount }) => {
    const component = await mount(<Tag>Test</Tag>);
    await expect(component).toHaveCSS('background-color', 'rgb(240, 234, 250)');
    await expect(component).toHaveCSS('border-color', 'rgb(124, 87, 255)');
});
