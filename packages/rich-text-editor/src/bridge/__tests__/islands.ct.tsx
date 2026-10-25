/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { type ContentNodeJSON } from '#/model';
import { EditorProbe } from '#/react/__tests__/fixtures/EditorProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

const text = (value: string) => ({ type: 'text', text: value });
const para = (...content: readonly object[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const callout = { type: 'callout', attrs: { tone: 'info' }, content: [text('Kept text')] };
const emoji = { type: 'emoji', attrs: { name: 'smile' } };

/** The kind of the editor selection, `node` for a whole island. */
const selectionType = (page: Page) =>
    page.evaluate(() => {
        const runtime = window.rte?.runtime;
        if (runtime === undefined) {
            return undefined;
        }
        return (runtime.state.selection.toJSON() as { readonly type: string }).type;
    });
/** The snapshot's top-level blocks as stored, islands as their original JSON. */
const stored = (page: Page) => page.evaluate(() => window.rte?.handle.getSnapshot().document.content.content);
const caretAt = (page: Page, value: string, offset: number, occurrence = 1) =>
    page.evaluate(
        ([target, at, nth]) =>
            window.rte?.setSelection(window.rte.handle, { text: target, occurrence: nth, from: at, to: at }),
        [value, offset, occurrence] as const,
    );

test('shows islands as labelled fallbacks with their text, edits around them, moves and deletes one, and keeps the original of the rest', async ({
    mount,
    page,
}) => {
    const blocks = [para(text('before')), callout, para(text('a'), emoji, text('b')), 5, para(text('after'))];
    await mount(<EditorProbe blocks={blocks as unknown as readonly ContentNodeJSON[]} />);
    await ready(page);
    const block = surfaceOf(page).getByRole('group', { name: 'Unsupported content: callout', exact: true });
    const inline = surfaceOf(page).getByRole('group', { name: 'Unsupported content: emoji', exact: true });
    const generic = surfaceOf(page).getByRole('group', { name: 'Unsupported content', exact: true });

    await expect(block).toHaveText('Kept text');
    await expect(inline).toHaveText('');
    await expect(generic).toHaveCount(1);
    for (const island of [block, inline, generic]) {
        await expect(island.locator('xpath=ancestor::*[@contenteditable="false"][1]')).toHaveCount(1);
    }

    await surfaceOf(page).locator('p').first().click();
    await caretAt(page, 'before', 6);
    await page.keyboard.type(' one');
    await caretAt(page, 'a', 1);
    await page.keyboard.type('c');
    // The arrow key selects the island after the caret as a whole, and a cut removes it.
    await caretAt(page, 'b', 1, 2);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => selectionType(page)).toBe('node');
    await page.keyboard.press('ControlOrMeta+x');
    await expect(generic).toHaveCount(0);

    await block.click();
    await expect.poll(() => selectionType(page)).toBe('node');
    const from = await block.boundingBox();
    const to = await surfaceOf(page).locator('p').last().boundingBox();
    if (from === null || to === null) {
        throw new Error('The island or the last paragraph has no box.');
    }
    await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
    await page.mouse.down();
    await page.mouse.move(from.x + from.width / 2 + 5, from.y + from.height / 2 + 5, { steps: 3 });
    await page.mouse.move(to.x + to.width - 2, to.y + to.height - 2, { steps: 5 });
    await page.mouse.up();

    await expect
        .poll(() => stored(page))
        .toEqual([para(text('before one')), para(text('ac'), emoji, text('b')), para(text('after')), callout]);
});

test('lays the island actions out apart, and below the text of a block island', async ({ mount, page }) => {
    const blocks = [para(text('before')), callout, para(text('a'), emoji, text('b'))];
    await mount(<EditorProbe blocks={blocks as unknown as readonly ContentNodeJSON[]} />);
    await ready(page);
    for (const name of ['Unsupported content: callout', 'Unsupported content: emoji']) {
        const toolbar = surfaceOf(page).getByRole('toolbar', { name, exact: true });
        const copy = await toolbar.getByRole('button', { name: 'Copy original' }).boundingBox();
        const convert = await toolbar.getByRole('button', { name: 'Convert to text' }).boundingBox();
        if (copy === null || convert === null) {
            throw new Error('An island action has no box.');
        }
        expect(convert.x - (copy.x + copy.width)).toBeGreaterThan(0);
    }
    const fallback = await surfaceOf(page)
        .getByRole('group', { name: 'Unsupported content: callout', exact: true })
        .boundingBox();
    const bar = await surfaceOf(page)
        .getByRole('toolbar', { name: 'Unsupported content: callout', exact: true })
        .boundingBox();
    if (fallback === null || bar === null) {
        throw new Error('The island text or its actions have no box.');
    }
    expect(bar.y).toBeGreaterThanOrEqual(fallback.y + fallback.height);
});

test('copies an island original as text and converts a block and an inline island to text, each as one undo step', async ({
    mount,
    page,
}) => {
    const blocks = [para(text('before')), callout, para(text('a'), emoji, text('b'))];
    await mount(<EditorProbe blocks={blocks as unknown as readonly ContentNodeJSON[]} />);
    await ready(page);
    await page.evaluate(() => {
        const copied: string[] = [];
        Object.defineProperty(window, '__copied', { value: copied });
        Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
                writeText: (value: string) => {
                    copied.push(value);
                    return Promise.resolve();
                },
            },
        });
    });
    const liveRegion = page.getByTestId('fondue-rich-text-editor').locator('[aria-live="polite"]');
    const actionOf = (name: string, action: string) =>
        surfaceOf(page)
            .locator('[data-rte-chrome]')
            .filter({ has: page.getByRole('group', { name, exact: true }) })
            .getByRole('button', { name: action });

    await actionOf('Unsupported content: callout', 'Copy original').click();
    await expect
        .poll(() => page.evaluate(() => (window as unknown as { __copied: string[] }).__copied))
        .toEqual([JSON.stringify(callout)]);
    await expect(liveRegion).toHaveText('Original copied');

    await actionOf('Unsupported content: callout', 'Convert to text').click();
    await expect(liveRegion).toHaveText('Converted to text');
    await expect.poll(() => stored(page)).toEqual([para(text('before')), para(text('Kept text')), blocks[2]]);
    await page.keyboard.press('ControlOrMeta+z');
    await expect.poll(() => stored(page)).toEqual(blocks);

    await actionOf('Unsupported content: emoji', 'Convert to text').click();
    await expect.poll(() => stored(page)).toEqual([blocks[0], blocks[1], para(text('ab'))]);
    await page.keyboard.press('ControlOrMeta+z');
    await expect.poll(() => stored(page)).toEqual(blocks);

    await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    });
    await actionOf('Unsupported content: callout', 'Copy original').click();
    await expect(liveRegion).toHaveText('Copying failed. Select the content and copy it with the keyboard.');
});
