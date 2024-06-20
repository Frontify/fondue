/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Box } from '../Box';

const BOX_TEXT = 'sample box';

test('should render with more precise padding/margin', async ({ mount }) => {
    const component = await mount(
        <Box p="20px" px="40px" py="60px" m="80px" mx="100px" my="120px">
            {BOX_TEXT}
        </Box>,
    );
    await expect(component).toContainText(BOX_TEXT);
    await expect(component).toHaveCSS('padding', '60px 40px');
    await expect(component).toHaveCSS('margin', '120px 100px');
});

test('should render with normal padding/margin', async ({ mount }) => {
    const component = await mount(
        <Box p="20px" m="80px">
            {BOX_TEXT}
        </Box>,
    );
    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '80px');
});

const ResponsiveComponent = (
    <Box p={{ base: '20px', md: '40px', lg: '60px' }} m={{ base: '80px', md: '100px', lg: '120px' }}>
        {BOX_TEXT}
    </Box>
);

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    test('should render with responsive padding/margin', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('padding', '20px');
        await expect(component).toHaveCSS('margin', '80px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive padding/margin', async ({ mount }) => {
        const component = await mount(ResponsiveComponent);
        await expect(component).toHaveCSS('padding', '60px');
        await expect(component).toHaveCSS('margin', '120px');
    });
});
