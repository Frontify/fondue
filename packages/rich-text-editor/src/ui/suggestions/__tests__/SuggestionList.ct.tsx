/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { SuggestionProbe } from './fixtures/SuggestionProbe';

// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const listOf = (page: Page) => page.getByRole('listbox', { name: 'Suggestions' });
const activeOf = (page: Page) => listOf(page).locator('[role="option"][aria-selected="true"]');
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.suggestionRte !== undefined)).toBe(true);
};
// Radix places an overlay and the plugin dispatches results in frames after a key.
const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
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
const glyphOf = (option: Locator) => option.locator('[aria-hidden="true"]').textContent();
const boxOf = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error('No box');
    }
    return box;
};
/** The flyout around the list. A clipped trigger sets its transform to a zero scale. */
const popupTransform = (page: Page) =>
    listOf(page).evaluate((list) => {
        const popup = list.closest('[data-test-id="fondue-flyout-content"]');
        if (!(popup instanceof HTMLElement)) {
            return 'missing';
        }
        return getComputedStyle(popup).transform;
    });

test('opens on :smi with focus in the surface, moves with the arrows, accepts on Tab and closes on Shift+Tab', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);
    const surface = surfaceOf(page);

    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();
    await expect(surface).toBeFocused();
    const listId = await listOf(page).getAttribute('id');
    expect(listId).not.toBeNull();
    await expect(surface).toHaveAttribute('aria-controls', listId as string);
    const first = listOf(page).getByRole('option').nth(0);
    await expect(first).toHaveAttribute('aria-selected', 'true');
    await expect(surface).toHaveAttribute('aria-activedescendant', (await first.getAttribute('id')) as string);

    await page.keyboard.press('ArrowDown');
    const second = listOf(page).getByRole('option').nth(1);
    await expect(second).toHaveAttribute('aria-selected', 'true');
    await expect(activeOf(page)).toHaveCount(1);
    await expect(surface).toHaveAttribute('aria-activedescendant', (await second.getAttribute('id')) as string);
    await expect(surface).toHaveText('Hi :smi');

    const glyph = await glyphOf(second);
    await page.keyboard.press('Tab');
    await expect(listOf(page)).toHaveCount(0);
    await expect(surface).toHaveText(`Hi ${glyph}`);
    await expect(surface).toBeFocused();
    await expect(surface).not.toHaveAttribute('aria-controls');
    await expect(surface).not.toHaveAttribute('aria-activedescendant');

    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();
    await page.keyboard.press('Shift+Tab');
    await expect(listOf(page)).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Before' })).toBeFocused();
    await expect(surface).toHaveText(`Hi ${glyph} :smi`);
});

test('closes on Escape with the text kept, and opens no list for 12:30', async ({ mount, page }) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);
    const surface = surfaceOf(page);

    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(listOf(page)).toHaveCount(0);
    await expect(surface).toBeFocused();
    await expect(surface).toHaveText('Hi :smi');

    await page.keyboard.type(' 12:30');
    await frames(page);
    await frames(page);
    await expect(surface).toHaveText('Hi :smi 12:30');
    await expect(listOf(page)).toHaveCount(0);
    await expect(surface).not.toHaveAttribute('aria-controls');
});

test('keeps the active option inside the list while the arrows move through 30 results', async ({ mount, page }) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);

    await page.keyboard.type(' :face');
    await expect(listOf(page)).toBeVisible();
    await expect.poll(() => listOf(page).getByRole('option').count()).toBeGreaterThanOrEqual(30);
    expect(await listOf(page).evaluate((list) => list.scrollHeight > list.clientHeight)).toBe(true);

    for (let index = 1; index <= 25; index += 1) {
        await page.keyboard.press('ArrowDown');
        const option = listOf(page).getByRole('option').nth(index);
        await expect(option).toHaveAttribute('aria-selected', 'true');
        const list = await boxOf(listOf(page));
        const box = await boxOf(option);
        expect(box.y).toBeGreaterThanOrEqual(list.y - 0.5);
        expect(box.y + box.height).toBeLessThanOrEqual(list.y + list.height + 0.5);
    }
});

test('makes the hovered option active and inserts a clicked one with focus kept in the surface', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);
    const surface = surfaceOf(page);

    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();
    const third = listOf(page).getByRole('option').nth(2);
    await third.hover();
    await expect(third).toHaveAttribute('aria-selected', 'true');
    await expect(surface).toHaveAttribute('aria-activedescendant', (await third.getAttribute('id')) as string);

    const second = listOf(page).getByRole('option').nth(1);
    const glyph = await glyphOf(second);
    await second.click();
    await expect(listOf(page)).toHaveCount(0);
    await expect(surface).toHaveText(`Hi ${glyph}`);
    await expect(surface).toBeFocused();
});

test('hides the suggestion list while its trigger is scrolled out of view and shows it when scrolled back', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe scrollHeight={200} />);
    await ready(page);
    const paragraph = surfaceOf(page).locator('p').first();
    const line = await paragraph.boundingBox();
    if (line === null) {
        throw new Error('No paragraph');
    }
    await paragraph.click({ position: { x: line.width - 2, y: line.height / 2 } });
    await expect(surfaceOf(page)).toBeFocused();
    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();

    const scroller = page.locator('[data-scroller]');
    await scroller.evaluate((element) => {
        const paragraph = element.querySelector('p');
        if (paragraph === null) {
            throw new Error('No paragraph');
        }
        const line = paragraph.getBoundingClientRect();
        const box = element.getBoundingClientRect();
        element.scrollTop += line.bottom - box.top + 4;
    });

    await expect.poll(() => popupTransform(page)).toBe('matrix(0, 0, 0, 0, 0, 0)');

    await scroller.evaluate((element) => {
        element.scrollTop = 0;
    });

    await expect(listOf(page)).toBeVisible();
    await expect.poll(() => popupTransform(page)).not.toBe('matrix(0, 0, 0, 0, 0, 0)');
});

test('reports no axe violation with the list open', async ({ mount, page }) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);

    await page.keyboard.type(' :smi');
    await expect(page.locator('#root').getByRole('listbox', { name: 'Suggestions' })).toBeVisible();
    await frames(page);

    // The surface's arrows scroll the list through `aria-activedescendant`, but axe exempts the popup of a combobox
    // only, and the surface is a `textbox`.
    const { violations } = await new AxeBuilder({ page })
        .include('#root')
        .withTags(TAGS)
        .disableRules(['scrollable-region-focusable'])
        .analyze();
    expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html }) => html).join(' | ')}`)).toEqual([]);
});

test('announces the result count with the active option and its place on open, and the option after ArrowDown', async ({
    mount,
    page,
}) => {
    await mount(<SuggestionProbe />);
    await ready(page);
    await caretAtEnd(page);
    const announcer = page.locator('[aria-live="polite"]').first();

    await page.keyboard.type(' :smi');
    await expect(listOf(page)).toBeVisible();
    const total = await listOf(page).getByRole('option').count();
    const first = await activeOf(page).locator(':scope > span:last-child').textContent();

    await expect(announcer).toHaveText(`Results: ${total}. ${first}, 1 of ${total}`);

    await page.keyboard.press('ArrowDown');
    const second = await activeOf(page).locator(':scope > span:last-child').textContent();

    await expect(announcer).toHaveText(`${second}, 2 of ${total}`);
});
