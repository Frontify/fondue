/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ClipboardProbe } from '../../fixtures/editor/ClipboardProbe';

type Clip = NonNullable<Window['clip']>;
type Flavors = { readonly html: string; readonly text: string; readonly slice: string };
type Point = { readonly x: number; readonly y: number };

declare global {
    interface Window {
        /** The flavors of the last clipboard or drag event that reached the window. */
        flavors?: Flavors | undefined;
        /** The data and source of a drag that `dragNode` sends. */
        dragData?: DataTransfer;
        dragSource?: Element;
    }
}

const SLICE_TYPE = 'application/x-frontify-rich-text+json';
const CURSOR = '.prosemirror-dropcursor-block';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = (page: Page) => page.waitForFunction(() => window.clip !== undefined);
const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });

/** Records the flavors of the next `type` event once the editor's own handler wrote them. */
const recordFlavors = (page: Page, type: 'copy' | 'cut' | 'dragstart') =>
    page.evaluate(
        ([eventType, sliceType]) => {
            window.flavors = undefined;
            window.addEventListener(
                eventType,
                (event) => {
                    const data = (event as ClipboardEvent).clipboardData ?? (event as DragEvent).dataTransfer;
                    if (data !== null) {
                        window.flavors = {
                            html: data.getData('text/html'),
                            text: data.getData('text/plain'),
                            slice: data.getData(sliceType),
                        };
                    }
                },
                { once: true },
            );
        },
        [type, SLICE_TYPE] as const,
    );
const flavorsOf = async (page: Page) => {
    await page.waitForFunction(() => window.flavors !== undefined);
    return page.evaluate(() => window.flavors as Flavors);
};
const copied = async (page: Page) => {
    await recordFlavors(page, 'copy');
    await page.keyboard.press('ControlOrMeta+c');
    return flavorsOf(page);
};

const contentOf = (page: Page) => page.evaluate(() => (window.clip as Clip).content());
const changesOf = (page: Page) => page.evaluate(() => (window.clip as Clip).changes.map(({ origin }) => origin));
// The `selectionchange` of a selection set by script lands a task later, and a pointer press before it can collapse the selection.
const settled = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const select = async (page: Page, target: Parameters<Clip['select']>[0]) => {
    await page.evaluate((selected) => (window.clip as Clip).select(selected), target);
    await settled(page);
};
const selectBlock = async (page: Page, index: number) => {
    await page.evaluate((block) => (window.clip as Clip).selectBlock(block), index);
    await settled(page);
};

/** Dispatches a paste of `data` at the surface, as a browser does after its clipboard read. */
const pasteAtSurface = (page: Page, data: Readonly<Record<string, string>>) =>
    page.evaluate((entries) => {
        const clipboardData = new DataTransfer();
        for (const [type, value] of Object.entries(entries)) {
            clipboardData.setData(type, value);
        }
        const surface = document.querySelector('[data-rte-surface]') as HTMLElement;
        surface.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
    }, data);

/**
 * Where the block drop cursor shows now: the index of the paragraph after it, -1 inside a paragraph's text, or
 * `null` with no block cursor.
 */
const cursorBoundary = (page: Page) =>
    page.evaluate(() => {
        const cursor = document.querySelector('.prosemirror-dropcursor-block');
        if (cursor === null) {
            return null;
        }
        const { y, height } = cursor.getBoundingClientRect();
        const middle = y + height / 2;
        const paragraphs = [...document.querySelectorAll('[data-rte-surface] p')].map((element) =>
            element.getBoundingClientRect(),
        );
        for (const [index, box] of paragraphs.entries()) {
            if (middle <= box.y + 2) {
                return index;
            }
            if (middle < box.bottom - 2) {
                return -1;
            }
        }
        return paragraphs.length;
    });

/** Sends a drag of an image file over `point` and then `end` there, and reads the drop cursor before `end`. */
const dragFile = async (page: Page, point: Point, end: 'drop' | 'dragleave') => {
    const send = (type: string) =>
        page.evaluate(
            ({ x, y, eventType }) => {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(new File(['x'], 'x.png', { type: 'image/png' }));
                const surface = document.querySelector('[data-rte-surface]') as HTMLElement;
                surface.dispatchEvent(
                    new DragEvent(eventType, { dataTransfer, clientX: x, clientY: y, bubbles: true, cancelable: true }),
                );
            },
            { ...point, eventType: type },
        );
    await send('dragenter');
    await send('dragover');
    const shown = await cursorBoundary(page);
    await send(end);
    return shown;
};

/** The box of the paragraph at `index`. */
const boxOf = async (page: Page, index: number) => {
    const box = await surfaceOf(page).locator('p').nth(index).boundingBox();
    if (box === null) {
        throw new Error('no paragraph box');
    }
    return box;
};
/** A point over the text of the paragraph at `index`, at `fraction` of its text's width. */
const overText = async (page: Page, index: number, fraction: number) => {
    const width = await surfaceOf(page)
        .locator('p')
        .nth(index)
        .evaluate((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            return range.getBoundingClientRect().width;
        });
    const box = await boxOf(page, index);
    return { x: box.x + width * fraction, y: box.y + box.height / 2 };
};
/**
 * Sends the drag events of the selected node to `to`, holding the platform's copy modifier at the drop when `copy`
 * is set, and reads the drop cursor before the drop. A pointer drag of an inline atom races the `selectionchange`
 * the browser sends for a script selection, so these events come from script, at real coordinates.
 */
const dragNode = async (page: Page, to: Point, copy = false) => {
    const send = (type: string, onSource: boolean) =>
        page.evaluate(
            ({ eventType, source, x, y, held }) => {
                if (eventType === 'dragstart') {
                    window.dragData = new DataTransfer();
                    window.dragSource = document.querySelector('.ProseMirror-selectednode') as Element;
                }
                const selected = window.dragSource as Element;
                const box = selected.getBoundingClientRect();
                let target = selected;
                let point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
                if (!source) {
                    target = document.elementFromPoint(x, y) as Element;
                    point = { x, y };
                }
                const apple = /Mac|iP(hone|[oa]d)/.test(navigator.platform);
                target.dispatchEvent(
                    new DragEvent(eventType, {
                        dataTransfer: window.dragData as DataTransfer,
                        clientX: point.x,
                        clientY: point.y,
                        altKey: held && apple,
                        ctrlKey: held && !apple,
                        bubbles: true,
                        cancelable: true,
                    }),
                );
            },
            { eventType: type, source: onSource, ...to, held: copy },
        );
    await send('dragstart', true);
    await send('dragenter', false);
    await send('dragover', false);
    const cursor = await cursorBoundary(page);
    await send('drop', false);
    await send('dragend', true);
    return cursor;
};

/** Drags with the mouse from `from` to `to`, holding `modifier` at the drop, and reads the drop cursor before it. */
const drag = async (page: Page, from: Point, to: Point, modifier?: string) => {
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(from.x + 5, from.y + 5, { steps: 3 });
    await page.mouse.move(to.x, to.y, { steps: 10 });
    if (modifier !== undefined) {
        await page.keyboard.down(modifier);
        await page.mouse.move(to.x + 1, to.y, { steps: 2 });
    }
    const cursor = await cursorBoundary(page);
    await page.mouse.up();
    if (modifier !== undefined) {
        await page.keyboard.up(modifier);
    }
    return cursor;
};
const centerOf = async (page: Page, selector: string): Promise<Point> => {
    const box = await page.locator(selector).first().boundingBox();
    if (box === null) {
        throw new Error(`no box for ${selector}`);
    }
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

test('SPEC-rich-text-clipboard/AC-026 writes text/plain, text/html and the internal slice on copy and dragstart', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['a   b', 'second']} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, { text: 'a   b' });

    const text = await copied(page);
    await selectBlock(page, 0);
    const block = await copied(page);
    await recordFlavors(page, 'dragstart');
    await drag(page, await centerOf(page, '.ProseMirror-selectednode'), await overText(page, 1, 0.9));
    const dragged = await flavorsOf(page);

    expect(text.text).toBe('a   b');
    expect(text.html).toBe('<div class="fondue-rte-content"><p>a   b</p></div>');
    expect(JSON.parse(text.slice)).toEqual({
        format: 'frontify.rich-text-slice',
        formatVersion: 1,
        model: { id: 'test.clipboard', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        context: 'ct',
        openStart: 1,
        openEnd: 1,
        content: [paragraph('a   b')],
    });
    expect(JSON.parse(block.slice)).toMatchObject({ openStart: 0, openEnd: 0, content: [paragraph('a   b')] });
    expect(dragged).toEqual(block);
});

test('SPEC-rich-text-clipboard/AC-029 deletes a cut selection once, as one undo step', async ({ mount, page }) => {
    await mount(<ClipboardProbe texts={['abc']} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, { text: 'b' });

    await recordFlavors(page, 'cut');
    await page.keyboard.press('ControlOrMeta+x');
    const cut = await flavorsOf(page);
    const after = await contentOf(page);
    await page.keyboard.press('ControlOrMeta+z');

    expect(cut.text).toBe('b');
    expect(after).toEqual([paragraph('ac')]);
    expect(await contentOf(page)).toEqual([paragraph('abc')]);
    expect(await changesOf(page)).toEqual(['cut', 'history']);
});

for (const [name, copies] of [
    ['moves it with its nodeId', false],
    ['inserts a copy with a new nodeId with the copy modifier held', true],
] as const) {
    test(`SPEC-rich-text-clipboard/AC-030 SPEC-rich-text-runtime/AC-001 SPEC-rich-text-runtime/AC-021 drags a mention between paragraphs and ${name}, as one drop`, async ({
        mount,
        page,
    }) => {
        await mount(<ClipboardProbe texts={['x@y', 'target']} />);
        await ready(page);
        await select(page, { nodeId: 'm-1' });
        const before = await page.evaluate(() => (window.clip as Clip).handle.getSummary().commitSequence);
        const original = await contentOf(page);

        await dragNode(page, await overText(page, 1, 0.5), copies);

        const content = (await contentOf(page)) as {
            readonly content: { readonly attrs?: { readonly nodeId: string } }[];
        }[];
        const ids = content.flatMap((block) =>
            block.content.flatMap((child) => (child.attrs === undefined ? [] : [child.attrs.nodeId])),
        );
        expect(await changesOf(page)).toEqual(['drop']);
        expect(await page.evaluate(() => (window.clip as Clip).handle.getSummary().commitSequence)).toBe(before + 1);
        if (!copies) {
            expect(content.map((block) => block.content.length)).toEqual([1, 3]);
            expect(ids).toEqual(['m-1']);
        } else {
            expect(content.map((block) => block.content.length)).toEqual([3, 3]);
            expect(ids[0]).toBe('m-1');
            expect(ids[1]).not.toBe('m-1');
            expect(ids).toHaveLength(2);
        }
        await page.keyboard.press('ControlOrMeta+z');
        expect(await contentOf(page)).toEqual(original);
    });
}

test('SPEC-rich-text-clipboard/AC-030 SPEC-rich-text-runtime/AC-010 moves a mention whose feature has paste: false as it is, and drops a copy of it as its label', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['x@y', 'target']} unpasted />);
    await ready(page);
    await select(page, { nodeId: 'm-1' });

    await dragNode(page, await overText(page, 1, 0.5));
    const moved = await contentOf(page);
    await select(page, { nodeId: 'm-1' });
    await dragNode(page, await overText(page, 0, 0.5), true);

    const mention = {
        type: 'mention',
        attrs: { nodeId: 'm-1', resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' },
    };
    const block = (...content: readonly object[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
    expect(moved).toEqual([
        block({ type: 'text', text: 'xy' }),
        block({ type: 'text', text: 'tar' }, mention, { type: 'text', text: 'get' }),
    ]);
    expect(await contentOf(page)).toEqual([block({ type: 'text', text: 'xAday' }), (moved as object[])[1]]);
});

test('SPEC-rich-text-clipboard/AC-021 drops a copy of an island holding a nodeId as its plain text, since the island cannot repeat it (DR-082)', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['first', 'second']} island />);
    await ready(page);
    await selectBlock(page, 2);

    await dragNode(page, await overText(page, 0, 0.8), true);

    const content = (await contentOf(page)) as { readonly type: string }[];
    expect(content.map(({ type }) => type)).toEqual(['paragraph', 'paragraph', 'paragraph', 'callout']);
    expect(content[1]).toEqual(paragraph('Kept'));
    expect(await changesOf(page)).toEqual(['drop']);
});

test('SPEC-rich-text-clipboard/AC-031 SPEC-rich-text-editing/AC-040 drops a host element through the paste order at the drop cursor, with no input rule', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['first', 'second']} dragged="**x**" />);
    await ready(page);

    const cursor = await drag(page, await centerOf(page, '[data-test-id="host-drag"]'), await overText(page, 1, 0.4));

    expect(cursor).toBe(1);
    expect(await contentOf(page)).toEqual([paragraph('first'), paragraph('**x**'), paragraph('second')]);
    expect(await changesOf(page)).toEqual(['drop']);
});

test('SPEC-rich-text-clipboard/AC-046 shows the drop cursor at the nearest block boundary for a paragraph, a file and a host element, until the drop or the leave', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['first', 'second', 'third']} />);
    await ready(page);
    await selectBlock(page, 0);
    const shown = [await dragNode(page, await overText(page, 1, 0.8))];
    await expect(page.locator(CURSOR)).toHaveCount(0);
    shown.push(await dragFile(page, await overText(page, 1, 0.3), 'drop'));
    await expect(page.locator(CURSOR)).toHaveCount(0);
    shown.push(await dragFile(page, await overText(page, 1, 0.3), 'dragleave'));
    await expect(page.locator(CURSOR)).toHaveCount(0);
    shown.push(await drag(page, await centerOf(page, '[data-test-id="host-drag"]'), await overText(page, 0, 0.8)));
    await expect(page.locator(CURSOR)).toHaveCount(0);

    // The paragraph moves below `second`, the file inserts nothing with no media feature, and the host text lands below `second`.
    expect(shown).toEqual([2, 1, 1, 1]);
    expect(await contentOf(page)).toEqual([
        paragraph('second'),
        paragraph('Dropped'),
        paragraph('first'),
        paragraph('third'),
    ]);
    expect(await page.evaluate(() => (window.clip as Clip).uploads())).toBe(0);
});

test('SPEC-rich-text-clipboard/AC-037 copies the same three flavors in readonly as in editable mode', async ({
    mount,
    page,
}) => {
    const component = await mount(<ClipboardProbe texts={['one', 'two @']} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, { text: 'ne' });
    const editable = await copied(page);

    await component.update(<ClipboardProbe texts={['one', 'two @']} readOnly />);
    await expect(surfaceOf(page)).toHaveAttribute('aria-readonly', 'true');
    await select(page, { text: 'ne' });
    const readonly = await copied(page);

    expect(readonly).toEqual(editable);
    expect(editable.text).toBe('ne');
    expect(JSON.parse(editable.slice)).toMatchObject({
        format: 'frontify.rich-text-slice',
        content: [paragraph('ne')],
    });
});

test('SPEC-rich-text-clipboard/AC-047 scrolls a paste in a long document only as far as the caret needs', async ({
    mount,
    page,
}) => {
    const texts = Array.from({ length: 200 }, (_, index) => `Paragraph ${index}`);
    await mount(<ClipboardProbe texts={texts} scroll />);
    await ready(page);
    const scroller = page.getByTestId('scroller');
    await surfaceOf(page).focus();
    await select(page, { text: 'Paragraph 100', from: 4, to: 4 });
    // The caret's line sits at the bottom of the box, so the pasted lines push it out of view.
    await page.evaluate(() => {
        const box = document.querySelector('[data-test-id="scroller"]') as HTMLElement;
        const line = document.querySelectorAll('[data-rte-surface] p')[100] as HTMLElement;
        box.scrollTop =
            line.getBoundingClientRect().bottom - box.getBoundingClientRect().top + box.scrollTop - box.clientHeight;
    });
    const offsets = () =>
        page.evaluate(() => {
            const box = document.querySelector('[data-test-id="scroller"]') as HTMLElement;
            return { box: box.scrollTop, page: window.scrollY };
        });
    const before = await offsets();

    await pasteAtSurface(page, { 'text/plain': 'one\ntwo\nthree' });

    const after = await offsets();
    const box = await scroller.boundingBox();
    const caret = await page.evaluate(() => (window.getSelection() as Selection).getRangeAt(0).getBoundingClientRect());
    if (box === null) {
        throw new Error('no scroller box');
    }
    const line = await boxOf(page, 0);
    expect(caret.y).toBeGreaterThanOrEqual(box.y);
    expect(caret.y + caret.height).toBeLessThanOrEqual(box.y + box.height);
    expect(Math.abs(after.box - before.box)).toBeLessThanOrEqual(4 * line.height + 40);
    expect(after.page).toBe(before.page);
});

test('SPEC-rich-text-clipboard/AC-050 keeps the document and selection in readonly through paste, cut and drops, and still copies', async ({
    mount,
    page,
}) => {
    await mount(<ClipboardProbe texts={['abc', 'def']} readOnly />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, { text: 'b' });
    const content = await contentOf(page);
    const selection = await page.evaluate(() => (window.clip as Clip).selection());

    await pasteAtSurface(page, { 'text/html': '<p>pasted</p>', 'text/plain': 'pasted' });
    await page.keyboard.press('ControlOrMeta+x');
    await dragFile(page, await overText(page, 1, 0.5), 'drop');
    await drag(page, await centerOf(page, '[data-test-id="host-drag"]'), await overText(page, 1, 0.5));
    await surfaceOf(page).focus();
    await select(page, { text: 'b' });
    const flavors = await copied(page);

    expect(await contentOf(page)).toEqual(content);
    expect(await page.evaluate(() => (window.clip as Clip).selection())).toEqual(selection);
    expect(await changesOf(page)).toEqual([]);
    expect(await page.evaluate(() => (window.clip as Clip).uploads())).toBe(0);
    expect(flavors.text).toBe('b');
    expect(flavors.html).toBe('<div class="fondue-rte-content"><p>b</p></div>');
    expect(JSON.parse(flavors.slice)).toMatchObject({ content: [paragraph('b')] });
});

test('SPEC-rich-text-clipboard/AC-003 pastes text/plain only with Ctrl+Shift+V in Chromium', async ({
    mount,
    page,
    context,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'The Verify line names Chromium, whose clipboard Playwright can grant.');
    test.skip(
        process.platform === 'darwin',
        'Playwright binds no paste command to Ctrl+Shift+V on macOS; CI runs it on Linux.',
    );
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await mount(<ClipboardProbe texts={['ab']} />);
    await ready(page);
    await surfaceOf(page).focus();
    await page.evaluate(() => navigator.clipboard.writeText('**x**'));

    await select(page, { text: 'a', from: 1, to: 1 });
    await page.keyboard.press('Control+Shift+v');
    const plain = await contentOf(page);
    await page.keyboard.press('ControlOrMeta+v');

    expect(plain).toEqual([paragraph('a**x**b')]);
    expect(await contentOf(page)).toEqual([
        {
            type: 'paragraph',
            attrs: { lang: null },
            content: [
                { type: 'text', text: 'a**x**' },
                { type: 'text', text: 'x', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'b' },
            ],
        },
    ]);
});
