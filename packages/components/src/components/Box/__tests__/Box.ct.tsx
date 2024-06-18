/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Box } from '../Box';

const BOX_TEXT = 'sample box';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Box>
            <div style={{ border: '1px solid black' }}>{BOX_TEXT}</div>
        </Box>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(BOX_TEXT);
    await expect(component).toHaveScreenshot();
});

test('should render with more precise padding/margin', async ({ mount }) => {
    const component = await mount(
        <Box p="20px" px="40px" py="60px" m="80px" mx="100px" my="120px">
            <div style={{ border: '1px solid black' }}>{BOX_TEXT}</div>
        </Box>,
    );
    await expect(component).toHaveScreenshot();
});

test('should render with normal padding/margin', async ({ mount }) => {
    const component = await mount(
        <Box p="20px" m="80px">
            <div style={{ border: '1px solid black' }}>{BOX_TEXT}</div>
        </Box>,
    );
    await expect(component).toHaveScreenshot();
});

const responsiveTests = [
    [
        'should render with responsive padding/margin',
        '',
        async ({ mount }) => {
            const component = await mount(
                <Box p={{ sm: '20px', md: '40px', lg: '60px' }} m={{ sm: '80px', md: '100px', lg: '120px' }}>
                    <div style={{ border: '1px solid black' }}>{BOX_TEXT}</div>
                </Box>,
            );
            await expect(component).toHaveScreenshot();
        },
    ],
] as Parameters<typeof test>[];

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    responsiveTests.forEach((testContent) => test(...testContent));
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1201, height: 801 } });

    responsiveTests.forEach((testContent) => test(...testContent));
});
