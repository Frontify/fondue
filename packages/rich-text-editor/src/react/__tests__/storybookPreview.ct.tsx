/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ThemedStory } from './fixtures/ThemedStory';

const themeClass = (theme: string) => new RegExp(`(^|[_\\s-])${theme}([_\\s-]|$)`);
const providers = (page: Page) => page.getByTestId('themed-story').locator('.fondue-theme-provider');

// The preview wraps every story in a ThemeProvider driven by theme, direction and locale globals.
test.describe('storybook preview wrapper', () => {
    for (const theme of ['light', 'dark'] as const) {
        test(`renders the story once in the ${theme} theme`, async ({ mount, page }) => {
            await mount(<ThemedStory theme={theme} direction="ltr" locale="en-US" />);

            await expect(providers(page)).toHaveClass(themeClass(theme));
            await expect(page.getByRole('textbox')).toHaveCount(1);
        });
    }

    test('renders the story once in each theme for both', async ({ mount, page }) => {
        await mount(<ThemedStory theme="both" direction="ltr" locale="en-US" />);

        await expect(page.getByRole('textbox')).toHaveCount(2);
        await expect(providers(page).first()).toHaveClass(themeClass('light'));
        await expect(providers(page).last()).toHaveClass(themeClass('dark'));
        await expect(page.getByText('Light theme')).toBeVisible();
        await expect(page.getByText('Dark theme')).toBeVisible();
    });

    for (const direction of ['ltr', 'rtl'] as const) {
        test(`passes ${direction} as dir`, async ({ mount, page }) => {
            await mount(<ThemedStory theme="light" direction={direction} locale="en-US" />);

            await expect(providers(page)).toHaveAttribute('dir', direction);
        });
    }

    test('shows the editor label of the chosen locale', async ({ mount, page }) => {
        await mount(<ThemedStory theme="light" direction="ltr" locale="de-DE" />);

        await expect(page.getByRole('toolbar', { name: 'Textformatierung' })).toBeVisible();
    });
});
