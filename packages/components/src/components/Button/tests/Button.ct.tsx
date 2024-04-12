/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from '../Button.tsx';

test.use({ viewport: { width: 500, height: 500 } });

test('should render without error', async ({ mount }) => {
    const component = await mount(<Button>Test</Button>);
    await expect(component).toContainText('Test');
    console.log('run');
});
