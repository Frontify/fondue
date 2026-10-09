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

test('SPEC-rich-text-persistence/AC-020 saves a character typed in the same task as a manual commit', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');

    const result = await page.evaluate(() => {
        document.execCommand('insertText', false, 'c');
        return (window.rte as Rte).handle.requestCommit({ reason: 'manual' });
    });

    expect(result.status).toBe('acknowledged');
    expect(await savedTexts(page)).toEqual(['abc']);
});

test('SPEC-rich-text-persistence/AC-026 commits after the composition ends and saves the composed text', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Input.imeSetComposition', { text: 'x', selectionStart: 1, selectionEnd: 1 });
    const pending = page.evaluate(() => (window.rte as Rte).handle.requestCommit({ reason: 'submit' }));
    await cdp.send('Input.insertText', { text: 'xy' });

    const committed = await pending;
    expect(committed.status).toBe('acknowledged');
    expect(await savedTexts(page)).toEqual(['abxy']);
});

test('SPEC-rich-text-persistence/AC-026 fails with a timeout when the composition never ends', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Input.imeSetComposition', { text: 'x', selectionStart: 1, selectionEnd: 1 });
    const result = await page.evaluate(() =>
        (window.rte as Rte).handle.requestCommit({ reason: 'submit', timeoutMs: 200 }),
    );

    expect(result).toMatchObject({ status: 'failed', code: 'timeout', outcome: 'not-sent' });
    expect(await savedTexts(page)).toEqual([]);
});

test('SPEC-rich-text-persistence/AC-028 blocks a rejecting commit during composition and does not save', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).');
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');
    const cdp = await page.context().newCDPSession(page);

    await cdp.send('Input.imeSetComposition', { text: 'x', selectionStart: 1, selectionEnd: 1 });
    const result = await page.evaluate(() =>
        (window.rte as Rte).handle.requestCommit({ reason: 'submit', composition: 'reject' }),
    );

    expect(result).toMatchObject({ status: 'blocked', code: 'composition-active' });
    expect(await savedTexts(page)).toEqual([]);
});

test('SPEC-rich-text-persistence/AC-066 fails a commit offline as not sent, then writes the pinned snapshot once online', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} persistence />);
    await ready(page);
    await caretAfter(page, 'ab');

    await page.context().setOffline(true);
    await page.keyboard.type('c');
    const result = await page.evaluate(() => (window.rte as Rte).handle.requestCommit({ reason: 'manual' }));
    expect(result).toMatchObject({ status: 'failed', code: 'transport', outcome: 'not-sent' });
    expect(await savedTexts(page)).toEqual([]);

    await page.context().setOffline(false);
    await expect.poll(() => savedTexts(page)).toEqual(['abc']);
    await expect.poll(() => stateOf(page)).toBe('clean');
    expect(await savedTexts(page)).toEqual(['abc']);
});

test('SPEC-rich-text-runtime/AC-090 keeps the surface busy and not editable while a replacement waits, with selection and copy working', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['Read the guide']} persistence holdSaves />);
    await ready(page);
    await caretAfter(page, 'Read the guide');
    await page.keyboard.type('!');
    const surface = surfaceOf(page);

    await page.evaluate(() => {
        const { handle } = window.rte as Rte;
        const { stamp, document } = handle.getSnapshot();
        // The next record keeps the envelope and holds one paragraph.
        const paragraph = { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Next' }] };
        const next = {
            documentId: 'document-2',
            revision: null,
            document: { ...document, content: { ...document.content, content: [paragraph] } as never },
        };
        window.replacement = handle.replaceDocument({
            expected: stamp,
            next,
            unsaved: { action: 'save' },
            selection: 'start',
            history: 'reset',
        });
    });
    await expect(surface).toHaveAttribute('contenteditable', 'false');
    await expect(surface).toHaveAttribute('aria-busy', 'true');

    // A double click on the first word selects it, as on any page text.
    const paragraph = surface.locator('p');
    const box = await paragraph.boundingBox();
    if (box === null) {
        throw new Error('The paragraph is not visible.');
    }
    await paragraph.dblclick({ position: { x: 4, y: box.height / 2 } });
    await expect
        .poll(() => page.evaluate(() => (window.rte as Rte).handle.getSummary().selection.collapsed))
        .toBe(false);
    const copied = page.evaluate(
        () =>
            new Promise<string | undefined>((resolve) => {
                document.addEventListener('copy', (event) => resolve(event.clipboardData?.getData('text/plain')), {
                    once: true,
                });
            }),
    );
    await page.keyboard.press('ControlOrMeta+c');
    expect(await copied).toBe('Read');

    await page.evaluate(() => (window.rte as Rte).answerSaves());
    const replaced = await page.evaluate(async () => {
        const result = await window.replacement;
        return result?.status;
    });
    expect(replaced).toBe('replaced');
    await expect(surface).toHaveAttribute('contenteditable', 'true');
    await expect(surface).not.toHaveAttribute('aria-busy');
    await expect(surface).toHaveText('Next');
    expect(await savedTexts(page)).toContain('Read the guide!');
});

test('SPEC-rich-text-runtime/AC-090 drops a character typed while a replacement waits, and keeps the text', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['Read the guide']} persistence holdSaves />);
    await ready(page);
    await caretAfter(page, 'Read the guide');
    await page.keyboard.type('!');
    const surface = surfaceOf(page);
    await page.evaluate(() => {
        const { handle } = window.rte as Rte;
        const { stamp, document } = handle.getSnapshot();
        window.replacement = handle.replaceDocument({
            expected: stamp,
            next: { documentId: 'document-2', revision: null, document },
            unsaved: { action: 'save' },
            selection: 'start',
            history: 'reset',
        });
    });
    await expect(surface).toHaveAttribute('contenteditable', 'false');

    await surface.click();
    await page.keyboard.type('z');

    await expect(surface).toHaveText('Read the guide!');
    expect(await page.evaluate(() => (window.rte as Rte).text())).toBe('Read the guide!');
    await page.evaluate(() => (window.rte as Rte).answerSaves());
    await page.evaluate(() => window.replacement);
});
