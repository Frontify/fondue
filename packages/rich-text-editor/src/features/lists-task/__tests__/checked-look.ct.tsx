/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { paragraph, taskItem, tasks } from '#/react/__tests__/fixtures/list-blocks';
import { ListProbe } from '#/react/__tests__/fixtures/ListProbe';

const blocks = [tasks(taskItem('task-1', 'Open', false), taskItem('task-2', 'Done', true))];

type Surface = 'editor' | 'reader';

const rootOf = (page: Page, surface: Surface) => {
    if (surface === 'editor') {
        return page.getByRole('textbox', { name: 'Notes' });
    }
    return page.getByRole('region', { name: 'Reader' });
};

const textOf = (page: Page, surface: Surface, text: string) => rootOf(page, surface).getByText(text, { exact: true });

const ready = async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
    await page.mouse.move(0, 0);
    await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) {
            active.blur();
        }
    });
};

// `text-decoration-line` is not inherited, so it is read on the text and each ancestor up to its item.
const lookOf = async (page: Page, surface: Surface, text: string) =>
    textOf(page, surface, text).evaluate((element) => {
        const item = element.closest('li');
        const decorations: string[] = [];
        for (let node: Element | null = element; node !== null && node !== item; node = node.parentElement) {
            decorations.push(getComputedStyle(node).textDecorationLine);
        }
        return { decoration: decorations.join(' '), color: getComputedStyle(element).color };
    });

const shotOf = (page: Page, surface: Surface, text: string): Promise<Buffer> =>
    textOf(page, surface, text).locator('xpath=ancestor::li[1]').screenshot();

const shotsOf = async (page: Page) => ({
    editorOpen: await shotOf(page, 'editor', 'Open'),
    editorDone: await shotOf(page, 'editor', 'Done'),
    readerOpen: await shotOf(page, 'reader', 'Open'),
    readerDone: await shotOf(page, 'reader', 'Done'),
});

test('keeps a checked task text colour and decoration unless checked tasks are struck', async ({ mount, page }) => {
    const plain = await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);
    const open = await lookOf(page, 'editor', 'Open');
    const done = await lookOf(page, 'editor', 'Done');
    const readOpen = await lookOf(page, 'reader', 'Open');
    const readDone = await lookOf(page, 'reader', 'Done');
    const before = await shotsOf(page);
    await plain.unmount();

    await mount(<ListProbe blocks={blocks} reader strikeCheckedTasks />);
    await ready(page);
    const struck = await lookOf(page, 'editor', 'Done');
    const readStruck = await lookOf(page, 'reader', 'Done');
    const stillOpen = await lookOf(page, 'editor', 'Open');
    const after = await shotsOf(page);

    expect(done.decoration).not.toContain('line-through');
    expect(readDone.decoration).not.toContain('line-through');
    expect(open.decoration).not.toContain('line-through');
    expect(readOpen.decoration).not.toContain('line-through');
    expect(struck.decoration).toContain('line-through');
    expect(readStruck.decoration).toContain('line-through');
    expect(stillOpen.decoration).not.toContain('line-through');
    expect(struck.color).not.toBe(stillOpen.color);
    expect(readStruck.color).not.toBe(readOpen.color);
    expect(after.editorDone.equals(before.editorDone)).toBe(false);
    expect(after.readerDone.equals(before.readerDone)).toBe(false);
    expect(after.editorOpen.equals(before.editorOpen)).toBe(true);
    expect(after.readerOpen.equals(before.readerOpen)).toBe(true);
});

/** The colour of `text` and of its block, and whether it or an ancestor inside the content root draws a line through it. */
const strikeOf = async (page: Page, surface: Surface, text: string) =>
    textOf(page, surface, text).evaluate((element) => {
        let struck = false;
        for (
            let node: Element | null = element;
            node !== null && !node.classList.contains('fondue-rte-content');
            node = node.parentElement
        ) {
            struck ||= getComputedStyle(node).textDecorationLine.includes('line-through');
        }
        return {
            color: getComputedStyle(element).color,
            block: getComputedStyle(element.closest('p') ?? element).color,
            struck,
        };
    });

test('strikes and greys every own block of a checked task, not the unchecked task nested in it', async ({
    mount,
    page,
}) => {
    const nested = [
        tasks({
            ...taskItem('task-1', 'Done', true),
            content: [paragraph('Done'), paragraph('Also'), tasks(taskItem('task-2', 'Open', false))],
        }),
    ];
    await mount(<ListProbe blocks={nested} reader strikeCheckedTasks />);
    await ready(page);

    for (const surface of ['editor', 'reader'] as const) {
        const done = await strikeOf(page, surface, 'Done');
        const also = await strikeOf(page, surface, 'Also');
        const open = await strikeOf(page, surface, 'Open');
        expect(done.struck).toBe(true);
        expect(also.struck).toBe(true);
        expect(also.color).toBe(done.color);
        expect(open.struck).toBe(false);
        expect(open.color).not.toBe(done.color);
    }
});
