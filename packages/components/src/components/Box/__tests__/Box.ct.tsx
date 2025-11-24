/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Box } from '../Box';

const BOX_TEXT = 'sample box';

test('should render with more precise padding/margin', async ({ mount }) => {
    const component = (
        await mount(
            <Box p="20px" px="40px" py="60px" m="80px" mx="100px" my="120px" data-test-id="box-root">
                {BOX_TEXT}
            </Box>,
        )
    ).getByTestId('box-root');
    await expect(component).toContainText(BOX_TEXT);
    await expect(component).toHaveCSS('padding', '60px 40px');
    await expect(component).toHaveCSS('margin', '120px 100px');
});

test('should render with normal padding/margin', async ({ mount }) => {
    const component = (
        await mount(
            <Box p="20px" m="80px" data-test-id="box-root">
                {BOX_TEXT}
            </Box>,
        )
    ).getByTestId('box-root');
    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '80px');
});

test('should render with size tokens', async ({ mount }) => {
    const component = (
        await mount(
            <Box
                p={6}
                m={20}
                minWidth={120}
                width={256}
                minHeight={18}
                height={20}
                bottom={16}
                top={15}
                right={14}
                left={13}
                data-test-id="box-root"
            >
                {BOX_TEXT}
            </Box>,
        )
    ).getByTestId('box-root');

    await expect(component).toHaveCSS('padding', '24px');
    await expect(component).toHaveCSS('margin', '80px');
    await expect(component).toHaveCSS('min-width', '480px');
    await expect(component).toHaveCSS('width', '1024px');
    await expect(component).toHaveCSS('min-height', '72px');
    await expect(component).toHaveCSS('height', '80px');
    await expect(component).toHaveCSS('bottom', '64px');
    await expect(component).toHaveCSS('top', '60px');
    await expect(component).toHaveCSS('right', '56px');
    await expect(component).toHaveCSS('left', '52px');
});

test('should not inherit parent props', async ({ mount }) => {
    const component = (
        await mount(
            <Box p="20px" m="50px" data-test-id="box-root">
                <Box data-test-id="flex-child">{BOX_TEXT}</Box>
            </Box>,
        )
    ).getByTestId('box-root');

    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '50px');

    const child = component.getByTestId('flex-child');

    await expect(child).not.toHaveCSS('padding', '20px');
    await expect(child).not.toHaveCSS('margin', '50px');
});

const ResponsiveComponent = (
    <Box p={{ base: '20px', md: '40px', lg: 15 }} m={{ base: '80px', md: '100px', lg: 30 }} data-test-id="box-root">
        {BOX_TEXT}
    </Box>
);

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    test('should render with responsive padding/margin', async ({ mount }) => {
        const component = (await mount(ResponsiveComponent)).getByTestId('box-root');
        await expect(component).toHaveCSS('padding', '20px');
        await expect(component).toHaveCSS('margin', '80px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive padding/margin', async ({ mount }) => {
        const component = (await mount(ResponsiveComponent)).getByTestId('box-root');
        await expect(component).toHaveCSS('padding', '60px');
        await expect(component).toHaveCSS('margin', '120px');
    });
});
