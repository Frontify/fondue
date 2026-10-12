/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type CDPSession, type Page } from '@playwright/test';

import { EditorProbe } from '../../react/__tests__/fixtures/EditorProbe';
import { type CommandResult } from '../types';

type Rte = NonNullable<Window['rte']>;

/** What a test keeps in the page between evaluations. */
interface Kept {
    first?: unknown;
    queued?: Promise<CommandResult>;
    published?: unknown[];
    diagnostics?: string[];
    finish?: (value: unknown) => void;
}
declare global {
    interface Window {
        kept?: Kept;
    }
}

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
    await page.evaluate(() => {
        window.kept = {};
    });
};

/** Puts the caret in the surface after `text`, which the composition then extends. */
const caretAfter = async (page: Page, text: string) => {
    await surfaceOf(page).click();
    await page.evaluate((after) => {
        const rte = window.rte as Rte;
        rte.setSelection(rte.handle, { text: after, from: after.length, to: after.length });
    }, text);
};

/** Drives composition as an IME does, through CDP. */
const imeOf = async (page: Page) => {
    const cdp: CDPSession = await page.context().newCDPSession(page);
    return {
        compose: (text: string) =>
            cdp.send('Input.imeSetComposition', { text, selectionStart: text.length, selectionEnd: text.length }),
        commit: (text: string) => cdp.send('Input.insertText', { text }),
    };
};

/** Starts a stand-in upload through the coordinator whose service call resolves once the page calls `kept.finish`. */
const startUpload = (page: Page, command: string, targetText?: string) =>
    page.evaluate(
        ([id, text]) => {
            const rte = window.rte as Rte;
            const kept = window.kept as Kept;
            if (rte.runtime === undefined) {
                throw new Error('no runtime');
            }
            let target;
            if (text !== undefined) {
                rte.setSelection(rte.handle, { text });
                const captured = rte.handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
                if (captured.status === 'captured') {
                    target = captured.target;
                }
            }
            const diagnostics: string[] = [];
            kept.diagnostics = diagnostics;
            rte.handle.subscribe('diagnostic', (diagnostic) => diagnostics.push(diagnostic.code));
            rte.runtime.startAsync({
                key: 'upload',
                service: 'uploads',
                featureId: 'fixture.heading-set',
                action: 'create',
                command: id,
                ...(target === undefined ? {} : { target }),
                run: () =>
                    new Promise((resolve) => {
                        kept.finish = resolve;
                    }),
            });
        },
        [command, targetText] as const,
    );
const finishUpload = (page: Page, result: unknown) =>
    page.evaluate((value) => (window.kept as Required<Kept>).finish(value), result);
/** Queues `text.insert` in the page, whose result `queuedResult` reads. */
const enqueueInsert = (page: Page, text: string) =>
    page.evaluate((inserted) => {
        (window.kept as Kept).queued = (window.rte as Rte).handle.enqueue('text.insert', { text: inserted });
    }, text);
const queuedResult = (page: Page) =>
    page.evaluate(() => Promise.race([(window.kept as Required<Kept>).queued, Promise.resolve('pending')]));
/** The text of the first text node of a document's content. */
const firstText = (content: unknown) => JSON.stringify(content).match(/"text":"([^"]*)"/)?.[1];

test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP drives composition in Chromium only.');
});

test('keeps sequence and the snapshot across three composition updates, then publishes once', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);
    const read = async () => {
        const seen = await page.evaluate(() => {
            const { handle } = window.rte as Rte;
            const kept = window.kept as Kept;
            const snapshot = handle.getSnapshot();
            if (kept.first === undefined) {
                kept.first = snapshot;
            }
            return {
                sequence: handle.getSummary().sequence,
                same: kept.first === snapshot,
                compositionActive: snapshot.compositionActive,
                content: snapshot.document.content,
            };
        });
        return { ...seen, content: firstText(seen.content) };
    };

    const updates = [];
    for (const text of ['x', 'xy', 'xyz']) {
        await ime.compose(text);
        updates.push(await read());
    }
    await ime.commit('xyz');

    expect(updates).toEqual(
        Array.from({ length: 3 }, () => ({ sequence: 0, same: true, compositionActive: true, content: 'ab' })),
    );
    await expect.poll(read).toEqual({ sequence: 1, same: false, compositionActive: false, content: 'abxyz' });
    await expect(surfaceOf(page)).toHaveText('abxyz');
});

test('runs a queued intent and publishes the snapshot only once compositionend, a microtask and 20 ms passed', async ({
    mount,
    page,
}) => {
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
    await page.clock.pauseAt('2026-01-01T00:00:01Z');
    await mount(<EditorProbe texts={['ab']} />);
    await page.clock.runFor(16);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);
    const read = async () => {
        const seen = await page.evaluate(() => ({
            published: (window.kept as Required<Kept>).published,
            compositionActive: (window.rte as Rte).handle.getSnapshot().compositionActive,
        }));
        return { ...seen, published: seen.published.map(firstText), result: await queuedResult(page) };
    };

    await ime.compose('xy');
    await page.evaluate(() => {
        const published: unknown[] = [];
        (window.kept as Kept).published = published;
        (window.rte as Rte).handle.subscribe('documentChange', (change) => {
            published.push(change.readDocument().content);
        });
    });
    await enqueueInsert(page, '!');
    await ime.commit('xy');
    // The last composed character arrives in an input event after compositionend.
    await ime.commit('z');
    await page.evaluate(
        () =>
            new Promise<void>((resolve) => {
                queueMicrotask(() => {
                    resolve();
                });
            }),
    );
    await page.clock.runFor(19);
    const before = await read();
    await page.clock.runFor(1);

    expect(before).toEqual({ published: [], compositionActive: true, result: 'pending' });
    expect(await read()).toEqual({
        published: ['abxyz', 'abxyz!'],
        compositionActive: false,
        result: expect.objectContaining({ status: 'applied' }),
    });
    await expect(surfaceOf(page)).toHaveText('abxyz!');
});

test('answers a host execute with composition-active and runs a queued intent after compositionend', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);

    await ime.compose('x');
    await enqueueInsert(page, '!');
    const executed = await page.evaluate(() => (window.rte as Rte).handle.execute('text.insert', { text: '?' }));
    await ime.compose('xy');
    const waiting = await queuedResult(page);
    await ime.commit('xy');

    expect([executed, waiting]).toEqual([{ status: 'rejected', code: 'composition-active' }, 'pending']);
    await expect.poll(() => queuedResult(page)).toMatchObject({ status: 'applied' });
    await expect(surfaceOf(page)).toHaveText('abxy!');
});

test('keeps the composed text and changes contenteditable only after compositionend', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);

    await ime.compose('x');
    await page.evaluate(() => (window.rte as Rte).handle.setMode('readonly'));
    await ime.compose('xy');
    const during = await surfaceOf(page).getAttribute('contenteditable');
    await ime.commit('xy');

    expect(during).toBe('true');
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'false');
    await expect(surfaceOf(page)).toHaveText('abxy');
    expect(await page.evaluate(() => (window.rte as Rte).text())).toBe('abxy');
});

test('keeps the surface editable when the mode returns to editable within a composition', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);

    await ime.compose('x');
    const during = await page.evaluate(() => {
        const { handle } = window.rte as Rte;
        const surface = document.querySelector('[role="textbox"]') as HTMLElement;
        handle.setMode('readonly');
        const readonly = surface.getAttribute('contenteditable');
        handle.setMode('editable');
        return [readonly, surface.getAttribute('contenteditable')];
    });
    await ime.commit('x');
    await expect
        .poll(() => page.evaluate(() => (window.rte as Rte).handle.getSnapshot().compositionActive))
        .toBe(false);

    expect(during).toEqual(['true', 'true']);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect(surfaceOf(page)).toHaveText('abx');
});

test('refuses content changes from setMode readonly on and changes contenteditable after compositionend', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await startUpload(page, 'text.insert');
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);

    await ime.compose('x');
    await page.evaluate(() => (window.rte as Rte).handle.setMode('readonly'));
    const executed = await page.evaluate(() => (window.rte as Rte).handle.execute('text.insert', { text: '?' }));
    await enqueueInsert(page, '!');
    await finishUpload(page, { text: 'up' });
    const during = await surfaceOf(page).getAttribute('contenteditable');
    await ime.commit('x');

    expect([executed, during]).toEqual([{ status: 'rejected', code: 'readonly' }, 'true']);
    await expect.poll(() => queuedResult(page)).toEqual({ status: 'rejected', code: 'readonly' });
    expect(await page.evaluate(() => (window.kept as Kept).diagnostics)).toEqual(['runtime.async-discarded']);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'false');
    await expect(surfaceOf(page)).toHaveText('abx');
});

test('applies an async result that resolves mid-composition only after compositionend', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab', 'cd']} />);
    await ready(page);
    await startUpload(page, 'heading.set', 'cd');
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);

    await ime.compose('x');
    await finishUpload(page, { level: 2 });
    await ime.compose('xy');
    const during = await surfaceOf(page).locator('h2').count();
    await ime.commit('xy');

    expect(during).toBe(0);
    await expect(surfaceOf(page).locator('h2')).toHaveText('cd');
    await expect(surfaceOf(page).locator('p')).toHaveText('abxy');
    expect(await page.evaluate(() => [(window.rte as Rte).text(), (window.kept as Kept).diagnostics])).toEqual([
        'abxycd',
        [],
    ]);
    // The result maps the author's caret through its change instead of moving it to the target.
    await page.keyboard.type('z');
    await expect(surfaceOf(page).locator('p')).toHaveText('abxyz');
});

test('keeps a forbidden composition in place while it runs and shows the retained state once input settled', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} guarded />);
    await ready(page);
    await caretAfter(page, 'ab');
    const ime = await imeOf(page);
    const texts = () =>
        page.evaluate(() => [document.querySelector('[role="textbox"]')?.textContent, (window.rte as Rte).text()]);

    await ime.compose('x');
    await ime.compose('xy');
    const during = await texts();
    await ime.commit('xy');

    expect(during).toEqual(['abxy', 'abxy']);
    await expect.poll(texts).toEqual(['ab', 'ab']);
    expect(await page.evaluate(() => (window.rte as Rte).handle.getSummary().sequence)).toBe(0);
});

test('leaves focus on a host input when an async result applies', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await caretAfter(page, 'ab');
    await startUpload(page, 'text.insert');
    await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('aria-label', 'Host input');
        document.body.append(input);
    });
    await page.getByRole('textbox', { name: 'Host input' }).focus();

    await finishUpload(page, { text: 'up' });

    await expect(surfaceOf(page)).toHaveText('abup');
    await expect(page.getByRole('textbox', { name: 'Host input' })).toBeFocused();
});
