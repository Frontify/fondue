/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';

type Rte = NonNullable<Window['rte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
const stateOf = (page: Page) => page.evaluate(() => (window.rte as Rte).handle.getSaveStatus().state);
/** The text of each saved document's first text node. */
const savedTexts = (page: Page) =>
    page.evaluate(() =>
        (window.rte as Rte).saves.map(
            (request) => JSON.stringify(request.document.content).match(/"text":"([^"]*)"/)?.[1],
        ),
    );
/** Puts the caret in the surface after `text`. */
const caretAfter = async (page: Page, text: string) => {
    await surfaceOf(page).click();
    await page.evaluate((after) => {
        const rte = window.rte as Rte;
        rte.setSelection(rte.handle, { text: after, from: after.length, to: after.length });
    }, text);
};

test('SPEC-rich-text-persistence/AC-015 SPEC-rich-text-persistence/AC-016 holds the write offline and sends it after the online event', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');

    await page.context().setOffline(true);
    await page.keyboard.type('c');
    await expect.poll(() => stateOf(page)).toBe('offline');
    await page.waitForTimeout(1000);
    expect(await savedTexts(page)).toEqual([]);

    await page.context().setOffline(false);
    await expect.poll(() => stateOf(page)).toBe('clean');
    expect(await savedTexts(page)).toEqual(['abc']);
});

test('SPEC-rich-text-persistence/AC-057 waits past the autosave deadline for a composition to end, then saves the composed text', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');
    const cdp = await page.context().newCDPSession(page);

    await page.keyboard.type('c');
    await cdp.send('Input.imeSetComposition', { text: 'x', selectionStart: 1, selectionEnd: 1 });
    await page.waitForTimeout(1000);
    expect(await savedTexts(page)).toEqual([]);
    expect(await stateOf(page)).toBe('dirty');

    await cdp.send('Input.insertText', { text: 'xy' });
    await expect.poll(() => savedTexts(page)).toEqual(['abcxy']);
    await expect.poll(() => stateOf(page)).toBe('clean');
});
