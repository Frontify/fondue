/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

/** Where the DOM selection sits, as the characters before it in the surface, and whether the surface has focus. */
const caret = (page: Page) =>
    page.evaluate(() => {
        const surface = document.querySelector('[role="textbox"]');
        const selection = window.getSelection();
        if (surface === null || selection === null || selection.anchorNode === null) {
            return { focused: false, offset: -1 };
        }
        const range = document.createRange();
        range.setStart(surface, 0);
        range.setEnd(selection.anchorNode, selection.anchorOffset);
        return { focused: document.activeElement === surface, offset: range.toString().length };
    });

test('SPEC-rich-text-runtime/AC-022 reports a typed character with origin input', async ({ mount, page }) => {
    const changes: { origin: string; commandId: string | null }[] = [];
    await mount(<EditorProbe texts={['']} onChange={(change) => changes.push(change)} />);
    await ready(page);

    await surfaceOf(page).click();
    await page.keyboard.type('a');

    await expect.poll(() => changes).toEqual([{ origin: 'input', commandId: null }]);
    await expect(surfaceOf(page)).toHaveText('a');
});

test('SPEC-rich-text-editing/AC-007 bolds a selected word with Mod+B as one command', async ({ mount, page }) => {
    const changes: { origin: string; commandId: string | null }[] = [];
    await mount(<EditorProbe texts={['bold me']} onChange={(change) => changes.push(change)} />);
    await ready(page);

    await surfaceOf(page).click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'bold' }));
    await page.keyboard.press('ControlOrMeta+b');

    await expect(surfaceOf(page).locator('strong')).toHaveText('bold');
    expect(changes).toEqual([{ origin: 'command', commandId: 'mark.bold.toggle' }]);
});

test('SPEC-rich-text-runtime/AC-066 makes the surface editable again in the same task', async ({ mount, page }) => {
    await mount(<EditorProbe />);
    await ready(page);

    const states = await page.evaluate(() => {
        const surface = document.querySelector('[role="textbox"]');
        window.rte?.handle.setMode('readonly');
        const readonly = surface?.getAttribute('contenteditable');
        window.rte?.handle.setMode('editable');
        return [readonly, surface?.getAttribute('contenteditable')];
    });

    expect(states).toEqual(['false', 'true']);
});

for (const readOnly of [false, true]) {
    const mode = readOnly ? 'readonly' : 'editable';
    test(`SPEC-rich-text-runtime/AC-087 focuses the surface at the current selection, the start and the end in mode ${mode}`, async ({
        mount,
        page,
    }) => {
        await mount(<EditorProbe texts={['ab', 'cd']} readOnly={readOnly} />);
        await ready(page);
        await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'cd', from: 1, to: 1 }));

        const reached: { focused: boolean; offset: number }[] = [];
        for (const where of ['current', 'start', 'end'] as const) {
            await page.getByRole('button', { name: 'Before' }).focus();
            await page.evaluate((target) => window.rte?.handle.focus(target), where);
            reached.push(await caret(page));
        }

        expect(reached).toEqual([
            { focused: true, offset: 3 },
            { focused: true, offset: 0 },
            { focused: true, offset: 4 },
        ]);
    });
}

test('SPEC-rich-text-react/AC-030 shows the placeholder through the surface pseudo-element only while empty', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['']} placeholder="Write a note" />);
    await ready(page);
    const before = () => surfaceOf(page).evaluate((surface) => getComputedStyle(surface, '::before').content);

    expect(await before()).toBe('"Write a note"');
    await surfaceOf(page).click();
    await page.keyboard.type('a');
    expect(await before()).toBe('none');
});

test('SPEC-rich-text-react/AC-028 takes keyboard focus on a read-only surface with Tab', async ({ mount, page }) => {
    await mount(<EditorProbe readOnly />);
    await ready(page);

    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');

    await expect(surfaceOf(page)).toBeFocused();
    await expect(surfaceOf(page)).toHaveAttribute('aria-readonly', 'true');
});
