/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';

type Rte = NonNullable<Window['rte']>;

declare global {
    interface Window {
        /** The replacement a test started, which the page holds while it waits. */
        replacement?: Promise<{ readonly status: string }>;
    }
}

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');

/** Replaces the document with the paragraphs First and Last, discarding what is unsaved, with the selection at `where`. */
const replaceWithTwo = (page: Page, where: 'start' | 'end') =>
    page.evaluate(async (selection) => {
        const { handle } = window.rte as Rte;
        const { stamp, document } = handle.getSnapshot();
        const paragraph = (text: string) => ({
            type: 'paragraph',
            attrs: { lang: null },
            content: [{ type: 'text', text }],
        });
        const next = {
            documentId: 'document-2',
            revision: null,
            document: {
                ...document,
                content: { ...document.content, content: [paragraph('First'), paragraph('Last')] } as never,
            },
        };
        const result = await handle.replaceDocument({
            expected: stamp,
            next,
            unsaved: { action: 'discard', confirmed: true },
            selection,
            history: 'reset',
        });
        return result.status;
    }, where);

const focusedSurface = (page: Page) =>
    page.evaluate(() => document.activeElement?.getAttribute('data-rte-surface') === '');

for (const [where, typed] of [
    ['start', ['!First', 'Last']],
    ['end', ['First', 'Last!']],
] as const) {
    test(`SPEC-rich-text-persistence/AC-036 keeps focus in the editor with the selection at the ${where} after a replacement`, async ({
        mount,
        page,
    }) => {
        await mount(<EditorProbe texts={['ab']} />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.type('c');

        expect(await replaceWithTwo(page, where)).toBe('replaced');

        expect(await focusedSurface(page)).toBe(true);
        await page.keyboard.type('!');
        await expect(surfaceOf(page).locator('p')).toHaveText(typed);
    });
}

test('SPEC-rich-text-persistence/AC-037 leaves focus on a host button during a replacement', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    const before = page.getByRole('button', { name: 'Before' });
    await before.focus();

    expect(await replaceWithTwo(page, 'end')).toBe('replaced');

    await expect(before).toBeFocused();
    expect(await focusedSurface(page)).toBe(false);
});

test('SPEC-rich-text-persistence/AC-037 leaves focus on the body during a replacement when the editor had none', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await page.getByRole('button', { name: 'Before' }).focus();
    await page.evaluate(() => (document.activeElement as HTMLElement).blur());

    expect(await replaceWithTwo(page, 'end')).toBe('replaced');

    expect(await page.evaluate(() => document.activeElement === document.body)).toBe(true);
    expect(await focusedSurface(page)).toBe(false);
});

test('SPEC-rich-text-persistence/AC-036 gives focus back to the editor when a replacement fails after step 4', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence holdSaves />);
    await ready(page);
    await surfaceOf(page).click();
    await page.evaluate(() => {
        const rte = window.rte as Rte;
        rte.setSelection(rte.handle, { text: 'ab', from: 2, to: 2 });
    });
    await page.keyboard.type('c');
    // The autosave's write stays in flight, so step 6 refuses the replacement.
    await expect.poll(() => page.evaluate(() => (window.rte as Rte).saves.length)).toBe(1);

    const result = await page.evaluate(async () => {
        const { handle } = window.rte as Rte;
        const { stamp, document } = handle.getSnapshot();
        return handle.replaceDocument({
            expected: stamp,
            next: { documentId: 'document-2', revision: null, document },
            unsaved: { action: 'discard', confirmed: true },
            selection: 'start',
            history: 'reset',
        });
    });

    expect(result).toEqual({ status: 'rejected', code: 'save-unresolved' });
    expect(await focusedSurface(page)).toBe(true);
    await page.keyboard.type('!');
    await expect(surfaceOf(page)).toHaveText('abc!');
});

test('SPEC-rich-text-persistence/AC-037 moves no focus on a later setMode once a replacement that went readonly has ended', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence holdSaves />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('c');

    // The `save` policy waits for its held write, during which the host switches the editor to readonly.
    expect(
        await page.evaluate(async () => {
            const rte = window.rte as Rte;
            const { stamp, document } = rte.handle.getSnapshot();
            const replaced = rte.handle.replaceDocument({
                expected: stamp,
                next: { documentId: 'document-2', revision: null, document },
                unsaved: { action: 'save' },
                selection: 'start',
                history: 'reset',
            });
            rte.handle.setMode('readonly');
            await new Promise((resolve) => setTimeout(resolve, 50));
            rte.answerSaves();
            const result = await replaced;
            return result.status;
        }),
    ).toBe('replaced');
    // The author moves on after the replacement, so the host's later mode switch must leave focus there.
    const before = page.getByRole('button', { name: 'Before' });
    await before.focus();
    await page.evaluate(() => (window.rte as Rte).handle.setMode('editable'));
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));

    await expect(before).toBeFocused();
});

test('SPEC-rich-text-persistence/AC-036 gives focus back to a surface that went readonly during the replacement', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence holdSaves />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('c');

    // The `save` policy waits for its held write, during which the host switches the editor to readonly.
    const status = await page.evaluate(async () => {
        const rte = window.rte as Rte;
        const { stamp, document } = rte.handle.getSnapshot();
        const replaced = rte.handle.replaceDocument({
            expected: stamp,
            next: { documentId: 'document-2', revision: null, document },
            unsaved: { action: 'save' },
            selection: 'start',
            history: 'reset',
        });
        rte.handle.setMode('readonly');
        await new Promise((resolve) => setTimeout(resolve, 50));
        rte.answerSaves();
        const result = await replaced;
        return result.status;
    });

    expect(status).toBe('replaced');
    await expect(surfaceOf(page)).toHaveAttribute('aria-readonly', 'true');
    expect(await focusedSurface(page)).toBe(true);
});

test('SPEC-rich-text-persistence/AC-037 leaves focus on a parent page button that took it during a replacement in an iframe', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence holdSaves inFrame />);
    const frame = page.frameLocator('iframe[title="Embedded editor"]');
    const surface = frame.getByRole('textbox', { name: 'Notes' });
    await expect(surface).toHaveAttribute('contenteditable', 'true');
    await surface.click();
    await page.keyboard.type('c');
    await page.evaluate(() => {
        const rte = window.rte as Rte;
        const { stamp, document } = rte.handle.getSnapshot();
        window.replacement = rte.handle.replaceDocument({
            expected: stamp,
            next: { documentId: 'document-2', revision: null, document },
            unsaved: { action: 'save' },
            selection: 'start',
            history: 'reset',
        });
    });

    // The author moves on to the parent page while the write is slow.
    const parent = page.getByRole('button', { name: 'Parent' });
    await parent.focus();
    await page.evaluate(async () => {
        (window.rte as Rte).answerSaves();
        await window.replacement;
    });

    await expect(parent).toBeFocused();
});

/** Puts the caret in the surface after `text` and starts composing `x` there through CDP (SPEC-rich-text-quality/AC-012). */
const composeAfter = async (page: Page, text: string) => {
    await surfaceOf(page).click();
    await page.evaluate((after) => {
        const rte = window.rte as Rte;
        rte.setSelection(rte.handle, { text: after, from: after.length, to: after.length });
    }, text);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Input.imeSetComposition', { text: 'x', selectionStart: 1, selectionEnd: 1 });
    return cdp;
};

test('SPEC-rich-text-persistence/AC-061 resolves the settled value with the composed text once the composition ends', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    const cdp = await composeAfter(page, 'ab');

    const settled = page.evaluate(() =>
        (window.rte as Rte).field
            .getSettledValue({ timeoutMs: 5000 })
            .then((document) => JSON.stringify(document.content)),
    );
    await cdp.send('Input.insertText', { text: 'xy' });

    expect(await settled).toContain('"text":"abxy"');
});

test('SPEC-rich-text-persistence/AC-061 rejects the settled value with code timeout while the composition goes on', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await composeAfter(page, 'ab');

    const outcome = await page.evaluate(() =>
        (window.rte as Rte).field.getSettledValue({ timeoutMs: 200 }).then(
            () => 'resolved',
            (error: { readonly code?: string }) => error.code,
        ),
    );

    expect(outcome).toBe('timeout');
});

test('SPEC-rich-text-react/AC-089 hides the save status in print', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} persistence holdSaves />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('c');
    const status = page.getByTestId('fondue-rich-text-editor-status');
    await expect(status).toBeVisible();

    await page.emulateMedia({ media: 'print' });

    await expect(status).toBeHidden();
    await expect(surfaceOf(page)).toBeVisible();
});
