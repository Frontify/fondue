/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';
import { type ContentNodeJSON } from '../model';

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

test('SPEC-rich-text-editing/AC-098 shows islands as labelled fallbacks with their text, edits around them, moves and deletes one, and keeps the original of the rest', async ({
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
