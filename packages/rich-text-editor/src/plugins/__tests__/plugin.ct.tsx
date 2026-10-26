/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { SpotlightProbe } from './fixtures/spotlight/SpotlightProbe';

const ready = async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.spotlightRte !== undefined)).toBe(true);
};

const documentOf = (page: Page) => page.evaluate(() => window.spotlightRte?.document() ?? '');

test('reaches the plugin control with Alt+F10 and the arrow keys, and toggles its mark on the selection', async ({
    mount,
    page,
}) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await surface.getByText('Read the').dblclick();
    await page.keyboard.press('Alt+F10');
    const control = page.getByTestId('fixture-spotlight-control');

    await expect(control).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button', { name: 'Spotlit passages' })).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(control).toBeFocused();
    await expect(control).toHaveAttribute('aria-pressed', 'false');
    await page.keyboard.press('Enter');

    await expect(control).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => documentOf(page)).toContain('"fixture_spotlight"');
});

test('returns focus to the surface after its control runs the command, so typing reaches the document', async ({
    mount,
    page,
}) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await surface.getByText('Read the').dblclick();
    await page.keyboard.press('Alt+F10');
    await expect(page.getByTestId('fixture-spotlight-control')).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(surface).toBeFocused();
    await page.keyboard.type('Z');
    await expect.poll(() => documentOf(page)).toContain('"text":"Z"');
});

test('focuses its control before the command opens an overlay, so dismissing the overlay returns focus there', async ({
    mount,
    page,
}) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    const control = page.getByTestId('fixture-spotlight-note-control');
    // A press that does not focus the control, as a click on macOS Safari or Firefox.
    await control.evaluate((button) => {
        button.addEventListener('mousedown', (event) => {
            event.preventDefault();
            (document.activeElement as HTMLElement | null)?.blur();
        });
    });

    await control.click();
    const note = page.getByRole('dialog', { name: 'Spotlight note' });
    await expect(note).toBeVisible();
    await note.getByRole('button', { name: 'Noted' }).focus();
    await page.keyboard.press('Escape');

    await expect(note).toBeHidden();
    await expect(control).toBeFocused();
});

test('shows the key binding of its command in its control tooltip and as aria-keyshortcuts', async ({
    mount,
    page,
}) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    await page.getByRole('textbox', { name: 'Notes' }).focus();
    await page.keyboard.press('Alt+F10');
    const control = page.getByTestId('fixture-spotlight-control');

    await expect(control).toBeFocused();
    await expect(control).toHaveAttribute('aria-keyshortcuts', /^(Meta|Control)\+Shift\+L$/);
    await expect(page.getByRole('tooltip').locator('kbd')).toHaveText(/L$/);
});

test.describe('from 1000 to 100 CSS pixels', () => {
    test.use({ viewport: { width: 1000, height: 640 } });

    test('moves focus to More when a refit moves the focused plugin control into it', async ({ mount, page }) => {
        await mount(<SpotlightProbe />);
        await ready(page);
        await page.getByRole('textbox', { name: 'Notes' }).focus();
        await page.keyboard.press('Alt+F10');
        await expect(page.getByTestId('fixture-spotlight-control')).toBeFocused();

        await page.setViewportSize({ width: 100, height: 640 });

        await expect(page.getByTestId('fixture-spotlight-control')).toHaveCount(0);
        await expect(
            page.getByTestId('fondue-rich-text-editor-toolbar').getByRole('button', { name: 'More' }),
        ).toBeFocused();
    });
});

test('opens its panel from its toolbar toggle and closes it on Escape, with focus back on the surface', async ({
    mount,
    page,
}) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    const toggle = page
        .getByTestId('fondue-rich-text-editor-toolbar')
        .getByRole('button', { name: 'Spotlit passages' });

    await toggle.click();
    const panel = page.getByRole('region', { name: 'Spotlit passages' });
    await expect(panel).toContainText('1 spotlit passages');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await panel.getByRole('button').focus();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(page.getByRole('textbox', { name: 'Notes' })).toBeFocused();
});

test('pastes a `mark` as its mark unless another editor’s search left it there', async ({ mount, page }) => {
    await mount(<SpotlightProbe />);
    await ready(page);
    const surface = page.getByRole('textbox', { name: 'Notes' });
    await surface.getByText('part.').click();
    await page.keyboard.press('End');
    await surface.evaluate(async (element) => {
        // The view reads the caret on `selectionchange`, which input events can outrun, so a paste sent at once lands at the old caret.
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/html', '<mark>kept</mark> <mark data-search-hit="">found</mark>');
        clipboardData.setData('text/plain', 'kept found');
        element.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
    });

    await expect
        .poll(() => documentOf(page))
        .toContain(
            '{"type":"text","text":"kept","marks":[{"type":"fixture_spotlight"}]},{"type":"text","text":" found"}',
        );
});
