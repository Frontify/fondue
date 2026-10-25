/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';
import { type ReactElement } from 'react';

import { ready, surfaceOf } from '#/react/__tests__/fixtures/layout';
import { ProfileProbe } from '#/react/__tests__/fixtures/ProfileProbe';

// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const listOf = (page: Page) => page.getByRole('listbox', { name: 'Suggestions' });
const optionsOf = (page: Page) => listOf(page).getByRole('option');
// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const focusSurface = async (page: Page) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
};
const announced = (page: Page) => page.locator('[aria-live="polite"]').textContent();
const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

const openIn = async (
    mount: (component: ReactElement) => Promise<unknown>,
    page: Page,
    profile: 'document' | 'inline' | 'comment' = 'document',
) => {
    await mount(<ProfileProbe profile={profile} />);
    await ready(page);
    await focusSurface(page);
};

test.describe('the slash menu', () => {
    test('opens on / at the start of an empty paragraph with Turn into and Insert groups', async ({ mount, page }) => {
        await openIn(mount, page);

        await page.keyboard.type('/');

        await expect(listOf(page)).toBeVisible();
        await expect(surfaceOf(page)).toBeFocused();
        await expect(listOf(page).getByRole('group', { name: 'Turn into' })).toHaveCount(1);
        await expect(listOf(page).getByRole('group', { name: 'Insert' })).toHaveCount(1);
        await expect(listOf(page).getByRole('group', { name: 'Turn into' }).getByRole('option').first()).toHaveText(
            'Heading 1',
        );
        await expect(listOf(page).getByRole('group', { name: 'Insert' }).getByRole('option')).toHaveText([
            'Divider',
            'Image',
        ]);
    });

    test('opens no list in the middle of text', async ({ mount, page }) => {
        await openIn(mount, page);

        await page.keyboard.type('Hi/');
        await frames(page);

        await expect(listOf(page)).toHaveCount(0);
    });

    for (const profile of ['inline', 'comment'] as const) {
        test(`opens no list in the ${profile} profile`, async ({ mount, page }) => {
            await openIn(mount, page, profile);

            await page.keyboard.type('/');
            await frames(page);

            await expect(listOf(page)).toHaveCount(0);
        });
    }

    test('narrows as the author types', async ({ mount, page }) => {
        await openIn(mount, page);

        await page.keyboard.type('/head');
        await expect(optionsOf(page)).toHaveCount(6);
        await page.keyboard.type('ing 3');

        await expect(optionsOf(page)).toHaveText(['Heading 3']);
        await expect(listOf(page).getByRole('group')).toHaveCount(1);
    });

    test('runs a Turn into entry on Enter after removing the typed / and query, as one undo step', async ({
        mount,
        page,
    }) => {
        await openIn(mount, page);
        await page.keyboard.type('/head');
        await expect(optionsOf(page)).toHaveCount(6);
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');

        await expect(listOf(page)).toHaveCount(0);
        await expect(surfaceOf(page).locator('h2')).toHaveCount(1);
        await expect(surfaceOf(page)).not.toContainText('/head');
        await page.keyboard.press('ControlOrMeta+z');
        await expect(surfaceOf(page).locator('h2')).toHaveCount(0);
        await expect(surfaceOf(page)).toHaveText('/head');
    });

    test('runs an Insert entry on Tab after removing the typed / and query', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/divi');
        await expect(optionsOf(page)).toHaveText(['Divider']);

        await page.keyboard.press('Tab');

        await expect(listOf(page)).toHaveCount(0);
        await expect(surfaceOf(page).locator('hr')).toHaveCount(1);
        await expect(surfaceOf(page)).not.toContainText('/divi');
        await expect(surfaceOf(page)).toBeFocused();
    });

    test('closes on Escape and keeps the text', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/head');
        await expect(listOf(page)).toBeVisible();

        await page.keyboard.press('Escape');

        await expect(listOf(page)).toHaveCount(0);
        await expect(surfaceOf(page)).toHaveText('/head');
    });

    test('closes on Backspace over the /', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/');
        await expect(listOf(page)).toBeVisible();

        await page.keyboard.press('Backspace');

        await expect(listOf(page)).toHaveCount(0);
        await expect(surfaceOf(page)).toHaveText('');
    });

    test('closes on a space with no match and keeps the text', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/zz');
        await expect(page.locator('[data-row="empty"]')).toBeVisible();

        await page.keyboard.type(' ');

        await expect(page.locator('[data-row="empty"]')).toHaveCount(0);
        await expect(surfaceOf(page)).toHaveText('/zz ');
    });

    test('stays open on a space with a match', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/heading');
        await expect(optionsOf(page)).toHaveCount(6);

        await page.keyboard.type(' ');
        await page.keyboard.type('4');

        await expect(optionsOf(page)).toHaveText(['Heading 4']);
    });

    test('announces the result count through the live region', async ({ mount, page }) => {
        await openIn(mount, page);

        await page.keyboard.type('/divi');

        await expect(listOf(page)).toBeVisible();
        await expect.poll(() => announced(page)).toContain('Results: 1');
    });

    test('has no accessibility violation with the list open', async ({ mount, page }) => {
        await openIn(mount, page);
        await page.keyboard.type('/');
        await expect(optionsOf(page).first()).toBeVisible();

        // The surface's arrows scroll the list through `aria-activedescendant`, but axe exempts the popup of a combobox only.
        const results = await new AxeBuilder({ page })
            .withTags(TAGS)
            .disableRules(['scrollable-region-focusable'])
            .analyze();

        expect(results.violations.map(({ id }) => id)).toEqual([]);
    });
});
