/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { SuggestionProbe } from './fixtures/SuggestionProbe';

// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const pickerOf = (page: Page) => page.getByRole('dialog', { name: 'Emoji' });
const fieldOf = (page: Page) => pickerOf(page).getByRole('combobox', { name: 'Search emoji' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.suggestionRte !== undefined)).toBe(true);
};

/** Puts the caret at the end of the paragraph with a click, as an author does. */
const caretAtEnd = async (page: Page) => {
    const paragraph = surfaceOf(page).locator('p');
    const box = await paragraph.boundingBox();
    if (box === null) {
        throw new Error('No paragraph');
    }

    await paragraph.click({ position: { x: box.width - 2, y: box.height / 2 } });
    await expect(surfaceOf(page)).toBeFocused();
};

/** The requests for emoji data from now on: its JSON files and any chunk named after it. */
const watchEmojiRequests = (page: Page) => {
    const requested: string[] = [];
    page.on('request', (request) => {
        const url = request.url();
        if (url.includes('compact') || url.includes('emojibase')) {
            requested.push(url);
        }
    });

    return requested;
};

const openPicker = async (page: Page) => {
    await page.getByRole('button', { name: 'Emoji', exact: true }).click();
    await expect(pickerOf(page)).toBeVisible();
    await expect(fieldOf(page)).toBeFocused();
};

test('loads the German emoji data on first open, finds a German name and inserts it on Enter', async ({
    mount,
    page,
}) => {
    const requested = watchEmojiRequests(page);
    await mount(<SuggestionProbe lang="de-DE" toolbar />);
    await ready(page);
    await caretAtEnd(page);
    await page.keyboard.type(' ');
    expect(requested).toEqual([]);

    await openPicker(page);
    await expect.poll(() => requested.length).toBeGreaterThan(0);
    const options = pickerOf(page).getByRole('option');
    await expect(options.first()).toBeVisible();
    await page.keyboard.type('Katze');
    await expect(options.first()).toHaveAccessibleName(/^Katze/);
    await expect(fieldOf(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(fieldOf(page)).toHaveAttribute(
        'aria-activedescendant',
        (await options.first().getAttribute('id')) as string,
    );
    const glyph = await options.first().locator('[aria-hidden="true"]').textContent();

    await page.keyboard.press('Enter');
    await expect(pickerOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    await page.keyboard.type('!');
    await expect(surfaceOf(page)).toHaveText(`Hi ${glyph}!`);
});

test('moves the active option with the arrows, wrapping, and closes on Escape back to the surface', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe toolbar />);
    await ready(page);
    await caretAtEnd(page);

    await openPicker(page);
    const options = pickerOf(page).getByRole('option');
    await expect(options.first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowUp');
    await expect(options.last()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(options.first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(fieldOf(page)).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(pickerOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page)).toHaveText('Hi');
});

test('inserts a clicked emoji and shows the empty status for a query with no match', async ({ mount, page }) => {
    await mount(<SuggestionProbe toolbar />);
    await ready(page);
    await caretAtEnd(page);

    await openPicker(page);
    await page.keyboard.type('zzzzqx');
    await expect(pickerOf(page).getByRole('status')).toHaveText('No emoji found');
    await expect(pickerOf(page).getByRole('listbox')).toHaveCount(0);
    await expect(fieldOf(page)).toHaveAttribute('aria-expanded', 'false');

    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('rocket');
    const rocket = pickerOf(page).getByRole('option', { name: 'rocket' });
    await rocket.click();
    await expect(pickerOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page)).toHaveText('Hi🚀');
});

test('inserts nothing when Enter follows a composition and inserts the active emoji on the next Enter', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe toolbar />);
    await ready(page);
    await caretAtEnd(page);
    await openPicker(page);
    const options = pickerOf(page).getByRole('option');
    await expect(options.first()).toBeVisible();
    const glyph = await options.first().locator('[aria-hidden="true"]').textContent();
    if (glyph === null) {
        throw new Error('The active option has no emoji.');
    }

    const before = await surfaceOf(page).textContent();
    if (before === null) {
        throw new Error('The surface has no text.');
    }

    await page.evaluate(() => {
        const field = document.activeElement;
        if (!(field instanceof HTMLInputElement)) {
            throw new Error('The emoji search field is not focused.');
        }

        field.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
    });
    await page.keyboard.press('Enter');

    await expect(pickerOf(page)).toBeVisible();
    await expect(surfaceOf(page)).toHaveText(before);

    await page.waitForTimeout(600);
    await page.keyboard.press('Enter');

    await expect.poll(() => surfaceOf(page).textContent()).toBe(`${before}${glyph}`);
    await expect(pickerOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
});

test('reports no axe violation with the picker open', async ({ mount, page }) => {
    await mount(<SuggestionProbe toolbar />);
    await ready(page);
    await caretAtEnd(page);

    await openPicker(page);
    await expect(
        page.locator('#root').getByRole('dialog', { name: 'Emoji' }).getByRole('option').first(),
    ).toBeVisible();

    const { violations } = await new AxeBuilder({ page }).include('#root').withTags(TAGS).analyze();
    expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html }) => html).join(' | ')}`)).toEqual([]);
});
