/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Section } from '../Section';

const SECTION_TEXT = 'sample section';

test('should render without error', async ({ mount }) => {
    const component = await mount(
        <Section p="100px" m="40px" maxWidth="1000px">
            {SECTION_TEXT}
        </Section>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText(SECTION_TEXT);
    await expect(component).toHaveCSS('padding', '100px');
    await expect(component).toHaveCSS('margin', '40px');
    await expect(component).toHaveCSS('max-width', '1000px');
});

test('should not inherit parent props', async ({ mount }) => {
    const component = await mount(
        <Section p="20px" m="50px">
            <Section data-test-id="flex-child">{SECTION_TEXT}</Section>
        </Section>,
    );

    await expect(component).toHaveCSS('padding', '20px');
    await expect(component).toHaveCSS('margin', '50px');

    const child = component.getByTestId('flex-child');

    await expect(child).not.toHaveCSS('padding', '20px');
    await expect(child).not.toHaveCSS('margin', '50px');
});
