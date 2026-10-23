/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { StoryProbe } from '#/react/__tests__/fixtures/StoryProbe';

// The Authoring stories, mounted with their definitions and arguments as Storybook composes them.
const FILE = 'docs/authoring/authoring.stories.tsx';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: /formatting/i });

const ready = (page: Page) => expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');

test('toggles strike-through with Mod+Shift+X and the toolbar in the strike plugin story', async ({ mount, page }) => {
    await mount(<StoryProbe file={FILE} name="StrikePlugin" />);
    await ready(page);
    const surface = surfaceOf(page);
    await surface.click();
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.press('ControlOrMeta+Shift+x');

    await expect(surface.locator('s')).toHaveText('Select this text and press Mod+Shift+X.');

    await page.getByRole('button', { name: 'Strikethrough' }).click();

    await expect(surface.locator('s')).toHaveCount(0);
});

test('renders the callout node view, switches its tone, and wraps the caret block from the toolbar in the custom block story', async ({
    mount,
    page,
}) => {
    await mount(<StoryProbe file={FILE} name="CustomBlock" />);
    await ready(page);

    await expect(page.getByRole('toolbar', { name: 'Note callout' })).toBeVisible();

    await page.getByRole('button', { name: 'Switch to warning' }).click();

    await expect(page.getByRole('toolbar', { name: 'Warning callout' })).toBeVisible();
    await expect(page.getByRole('toolbar', { name: 'Note callout' })).toHaveCount(0);

    await surfaceOf(page).getByText('Put the caret here and press Callout.').click();
    await page.getByRole('button', { name: 'Callout', exact: true }).click();

    await expect(page.getByRole('toolbar', { name: 'Note callout' })).toBeVisible();
    await expect(page.getByRole('toolbar', { name: /callout$/ })).toHaveCount(2);
});

test('shows the host Strong entry in place of the shipped Bold entry, which bolds the selection, in the replaced toolbar entry story', async ({
    mount,
    page,
}) => {
    await mount(<StoryProbe file={FILE} name="ReplacedToolbarEntry" />);
    await ready(page);
    const toolbar = toolbarOf(page);

    await expect(toolbar.getByRole('button', { name: 'Strong' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Bold' })).toHaveCount(0);

    await surfaceOf(page).click();
    await page.keyboard.press('ControlOrMeta+a');
    await toolbar.getByRole('button', { name: 'Strong' }).click();

    await expect(surfaceOf(page).locator('strong')).toHaveText('Select this text and press Strong.');
});
