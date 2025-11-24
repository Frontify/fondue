/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Flex } from '../Flex';

const FLEX_TEXT = 'sample flex';

test('should render without error', async ({ mount }) => {
    const component = (await mount(<Flex data-test-id="flex-root">{FLEX_TEXT}</Flex>)).getByTestId('flex-root');
    await expect(component).toBeVisible();
    await expect(component).toContainText(FLEX_TEXT);
});

test('should not inherit parent props', async ({ mount }) => {
    const component = (
        await mount(
            <Flex p="20px" gap="50px" data-test-id="flex-root">
                <Flex data-test-id="flex-child">{FLEX_TEXT}</Flex>
            </Flex>,
        )
    ).getByTestId('flex-root');

    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('gap', '50px');

    const child = component.getByTestId('flex-child');

    await expect(child).not.toHaveCSS('padding', '20px');
    await expect(child).not.toHaveCSS('gap', '50px');
});

test('should render with size tokens', async ({ mount }) => {
    const component = (
        await mount(
            <Flex
                p={8}
                my={10}
                gap={16}
                minWidth={120}
                width={256}
                minHeight={18}
                height={20}
                bottom={16}
                top={15}
                right={14}
                left={13}
                data-test-id="flex-root"
            >
                {FLEX_TEXT}
            </Flex>,
        )
    ).getByTestId('flex-root');

    await expect(component).toHaveCSS('padding', '32px');
    await expect(component).toHaveCSS('margin', '40px 0px');
    await expect(component).toHaveCSS('gap', '64px');
    await expect(component).toHaveCSS('min-width', '480px');
    await expect(component).toHaveCSS('width', '1024px');
    await expect(component).toHaveCSS('min-height', '72px');
    await expect(component).toHaveCSS('height', '80px');
    await expect(component).toHaveCSS('bottom', '64px');
    await expect(component).toHaveCSS('top', '60px');
    await expect(component).toHaveCSS('right', '56px');
    await expect(component).toHaveCSS('left', '52px');
});

const ResponsiveComponent = (
    <Flex
        direction={{ base: 'row', md: 'column' }}
        gap={{ base: '80px', md: 30 }}
        p={{ base: '10px', md: 25 }}
        data-test-id="flex-root"
    >
        {FLEX_TEXT}
    </Flex>
);

test.describe('Responsiveness (base)', () => {
    test.use({ viewport: { width: 200, height: 200 } });

    test('should render with responsive flex directions', async ({ mount }) => {
        const component = (await mount(ResponsiveComponent)).getByTestId('flex-root');
        await expect(component).toHaveCSS('flex-direction', 'row');
        await expect(component).toHaveCSS('gap', '80px');
        await expect(component).toHaveCSS('padding', '10px');
    });
});

test.describe('Responsiveness (lg)', () => {
    test.use({ viewport: { width: 1600, height: 900 } });

    test('should render with responsive flex directions', async ({ mount }) => {
        const component = (await mount(ResponsiveComponent)).getByTestId('flex-root');
        await expect(component).toHaveCSS('flex-direction', 'column');
        await expect(component).toHaveCSS('gap', '120px');
        await expect(component).toHaveCSS('padding', '100px');
    });
});
