/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Section } from '../Section';

const SECTION_TEXT = 'sample section';

test('should render without error', async ({ mount }) => {
    const component = (
        await mount(
            <Section p="100px" m="40px" maxWidth="1000px" data-test-id="section-root">
                {SECTION_TEXT}
            </Section>,
        )
    ).getByTestId('section-root');
    await expect(component).toBeVisible();
    await expect(component).toContainText(SECTION_TEXT);
    await expect(component).toHaveCSS('padding', '100px');
    await expect(component).toHaveCSS('margin', '40px');
    await expect(component).toHaveCSS('max-width', '1000px');
});

test('should not inherit parent props', async ({ mount }) => {
    const component = (
        await mount(
            <Section p="20px" m="50px">
                <Section data-test-id="flex-child">{SECTION_TEXT}</Section>
            </Section>,
        )
    ).getByTestId('section-root');

    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '50px');

    const child = component.getByTestId('flex-child');

    await expect(child).not.toHaveCSS('padding', '20px');
    await expect(child).not.toHaveCSS('margin', '50px');
});

test('should render with size tokens', async ({ mount }) => {
    const component = (
        await mount(
            <Section
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
            >
                {SECTION_TEXT}
            </Section>,
        )
    ).getByTestId('section-root');

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
