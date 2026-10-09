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
const mention = (nodeId: string, label = 'Ada') => ({ type: 'chrome_mention', attrs: { nodeId, label } });
const block = (nodeId: string, value: string) => ({
    type: 'chrome_block',
    attrs: { nodeId, language: 'plain', checked: false },
    content: [text(value)],
});
const image = (nodeId: string) => ({ type: 'chrome_image', attrs: { nodeId, assetId: null } });
const blocks = (...nodes: readonly object[]) => nodes as readonly ContentNodeJSON[];

/** Whether the DOM selection is where the editor selection is, and that position. */
const selections = (page: Page) =>
    page.evaluate(() => {
        const runtime = window.rte?.runtime;
        const selection = window.getSelection();
        if (runtime === undefined || runtime.view === undefined || selection === null || selection.focusNode === null) {
            return { dom: -1, editor: -2 };
        }
        const { view } = runtime;
        return { dom: view.posAtDOM(selection.focusNode, selection.focusOffset), editor: view.state.selection.head };
    });

test('SPEC-rich-text-react/AC-013 renders the chrome of an inserted code block before the next frame', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['code']} />);
    await ready(page);

    const present = await page.evaluate(() => {
        const rte = window.rte;
        if (rte === undefined || rte.runtime === undefined) {
            return undefined;
        }
        rte.setSelection(rte.handle, { text: 'code' });
        const { status } = rte.runtime.handle.execute('fixture.chrome-block.set');
        // Scheduled right after the transaction, so it runs before the next paint (CL-4013, #7438).
        return new Promise<{ status: string; chrome: boolean }>((resolve) => {
            requestAnimationFrame(() =>
                resolve({ status, chrome: document.querySelector('[data-chrome="block"]') !== null }),
            );
        });
    });

    expect(present).toEqual({ status: 'applied', chrome: true });
});

test('SPEC-rich-text-react/AC-018 keeps the first character typed over a select-all of a code block', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe blocks={blocks(para(text('a')), block('b1', 'code'), para(text('b')))} />);
    await ready(page);

    await surfaceOf(page).locator('[data-rte-chrome] + div').click();
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('x');

    await expect.poll(() => page.evaluate(() => window.rte?.text())).toBe('x');
});

test('SPEC-rich-text-react/AC-070 passes node selection to the image chrome with the arrow keys without remounting it', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe blocks={blocks(para(text('ab')), image('i1'))} />);
    await ready(page);
    const chrome = surfaceOf(page).locator('[data-chrome="image"]');
    const dom = surfaceOf(page).locator('[data-rte-chrome]').locator('..');
    await chrome.getByRole('button').click();
    await chrome.evaluate((element) => element.setAttribute('data-marked', ''));
    const state = async () => ({
        selected: await chrome.getAttribute('data-selected'),
        className: await dom.evaluate((element) => element.classList.contains('ProseMirror-selectednode')),
        draggable: await dom.getAttribute('draggable'),
        clicks: await chrome.getByRole('button').textContent(),
        same: await chrome.evaluate((element) => element.hasAttribute('data-marked')),
    });

    await surfaceOf(page).locator('p').click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'ab', from: 2, to: 2 }));
    await page.keyboard.press('ArrowRight');
    const selected = await state();
    await page.keyboard.press('ArrowLeft');
    const deselected = await state();

    expect(selected).toEqual({ selected: 'true', className: true, draggable: 'true', clicks: '1', same: true });
    expect(deselected).toEqual({ selected: 'false', className: false, draggable: null, clicks: '1', same: true });
});

test('SPEC-rich-text-react/AC-100 keeps the caret where the editor selection is while three mention labels update in one batch', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe blocks={blocks(para(mention('m1'), mention('m2'), mention('m3'), text(' ')))} />);
    await ready(page);
    await surfaceOf(page).locator('p').click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: ' ', from: 1, to: 1 }));

    const reached: { dom: number; editor: number }[] = [];
    for (const character of 'abc') {
        await page.keyboard.type(character);
        await page.evaluate((label) => {
            const runtime = window.rte?.runtime;
            for (const nodeId of ['m1', 'm2', 'm3']) {
                runtime?.nodeActions(nodeId).update({ label });
            }
        }, `Ada ${character}`);
        await expect(surfaceOf(page).locator('[data-chrome="mention"] button').first()).toHaveText(`Ada ${character}`);
        reached.push(await selections(page));
    }

    expect(reached).toEqual([
        { dom: 6, editor: 6 },
        { dom: 7, editor: 7 },
        { dom: 8, editor: 8 },
    ]);
});

test.describe('on a phone', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });

    test('SPEC-rich-text-react/AC-016 settles with no mutation or transaction after chrome mounts and updates children', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation; DR-061 names Chromium and WebKit.');
        await mount(<EditorProbe blocks={blocks(block('b1', 'todo'), para(text('a')))} />);
        await ready(page);
        await surfaceOf(page).locator('[data-rte-chrome] + div').tap();
        const checkbox = surfaceOf(page).getByRole('checkbox');
        for (let tap = 0; tap < 10; tap += 1) {
            await checkbox.tap();
            await expect(checkbox).toBeChecked({ checked: tap % 2 === 0 });
        }
        await page.evaluate(() => {
            const runtime = window.rte?.runtime;
            const view = runtime?.view;
            if (view !== undefined) {
                const node = view.state.schema.nodes.chrome_mention?.create({ nodeId: 'm9', label: 'Ada' });
                if (node !== undefined) {
                    view.dispatch(view.state.tr.insert(view.state.doc.content.size - 1, node));
                }
            }
        });
        await expect(surfaceOf(page).locator('[data-mounted]')).toHaveCount(1);

        const settled = await page.evaluate(
            () =>
                new Promise<{ mutations: number; commits: number }>((resolve) => {
                    const surface = document.querySelector('[role="textbox"]') as HTMLElement;
                    const commits = () => {
                        const rte = window.rte;
                        if (rte === undefined) {
                            return 0;
                        }
                        return rte.handle.getSummary().commitSequence;
                    };
                    const before = commits();
                    let mutations = 0;
                    const observer = new MutationObserver((records) => {
                        mutations += records.length;
                    });
                    observer.observe(surface, {
                        subtree: true,
                        childList: true,
                        characterData: true,
                        attributes: true,
                    });
                    setTimeout(() => {
                        observer.disconnect();
                        resolve({ mutations, commits: commits() - before });
                    }, 2000);
                }),
        );

        expect(settled).toEqual({ mutations: 0, commits: 0 });
    });
});
