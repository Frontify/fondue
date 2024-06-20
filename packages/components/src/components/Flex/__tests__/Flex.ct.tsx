/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Flex } from '../Flex';

const FLEX_TEXT = 'sample flex';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Flex>{FLEX_TEXT}</Flex>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLEX_TEXT);
});

const ResponsiveComponent = (
    <Flex
        direction={{ base: 'row', md: 'column' }}
        gap={{ base: '80px', md: '120px' }}
        p={{ base: '10px', md: '100px' }}
    >
        {FLEX_TEXT}
    </Flex>
);

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    test('should render with responsive flex directions', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('flex-direction', 'row');
        await expect(component).toHaveCSS('gap', '80px');
        await expect(component).toHaveCSS('padding', '10px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive flex directions', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('flex-direction', 'column');
        await expect(component).toHaveCSS('gap', '120px');
        await expect(component).toHaveCSS('padding', '100px');
    });
});
