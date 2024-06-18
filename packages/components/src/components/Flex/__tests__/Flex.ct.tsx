/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Flex } from '../Flex';

const FLEX_TEXT = 'sample flex';

test('should render without error', async ({ mount }) => {
    const component = await mount(<Flex>{FLEX_TEXT}</Flex>);
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLEX_TEXT);
    await expect(component).toHaveScreenshot();
});

const responsiveTests = [
    [
        'should render with responsive flex directions',
        '',
        async ({ mount }) => {
            const component = await mount(<Flex direction={{ base: 'row', md: 'column' }}>{FLEX_TEXT}</Flex>);
            await expect(component).toHaveScreenshot();
        },
    ],
] as Parameters<typeof test>[];

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    for (const testContent of responsiveTests) {
        test(...testContent);
    }
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1201, height: 801 } });

    for (const testContent of responsiveTests) {
        test(...testContent);
    }
});
