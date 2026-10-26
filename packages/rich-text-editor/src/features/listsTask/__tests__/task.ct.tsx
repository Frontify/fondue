/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { bullets, listItem, taskItem, tasks } from '#/react/__tests__/fixtures/listBlocks';
import { ListProbe } from '#/react/__tests__/fixtures/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.listRte !== undefined)).toBe(true);
};

const blocks = [tasks(taskItem('task-1', 'Approve the palette'), taskItem('task-2', 'Print'))];
const liveRegionOf = (page: Page) => page.getByTestId('fondue-rich-text-editor').locator('[aria-live="polite"]');

test('runs one task.setChecked with one undo step for a click, Space on the checkbox and the command', async ({
    mount,
    page,
}) => {
    const records: unknown[] = [];
    for (const route of ['click', 'Space', 'command'] as const) {
        const editor = await mount(<ListProbe blocks={blocks} />);
        await ready(page);
        const box = page.getByRole('checkbox', { name: 'Approve the palette' });
        if (route === 'click') {
            await box.click();
        }

        if (route === 'Space') {
            await box.focus();
            await page.keyboard.press('Space');
        }

        if (route === 'command') {
            await page.evaluate(() =>
                (window.listRte as ListRte).handle.execute('task.setChecked', { nodeId: 'task-1', checked: true }),
            );
        }

        await expect(box).toBeChecked();
        const changes = await page.evaluate(() => [...(window.listRte as ListRte).changes]);
        await page.evaluate(() => (window.listRte as ListRte).handle.execute('history.undo'));
        await expect(box).not.toBeChecked();
        records.push(changes);
        await editor.unmount();
    }

    const [click, space, command] = records;
    expect(click).toEqual([
        {
            origin: 'command',
            commandId: 'task.setChecked',
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' },
                content: [tasks(taskItem('task-1', 'Approve the palette', true), taskItem('task-2', 'Print'))],
            },
        },
    ]);
    expect(space).toEqual(click);
    expect(command).toEqual(click);
});

test('announces Checked and Not checked from the keyboard, and nothing more when the checkbox is clicked', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} />);
    await ready(page);
    const box = page.getByRole('checkbox', { name: 'Approve the palette' });
    const region = liveRegionOf(page);
    await surfaceOf(page).focus();
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
    await page.evaluate(() => {
        const rte = window.listRte as ListRte;
        rte.setSelection(rte.handle, { text: 'Approve the palette', from: 1, to: 1 });
    });

    await page.keyboard.press('ControlOrMeta+Enter');
    await expect(box).toBeChecked();
    await expect(region).toHaveText('Checked');

    await page.keyboard.press('ControlOrMeta+Enter');
    await expect(box).not.toBeChecked();
    await expect(region).toHaveText('Not checked');

    await box.click();
    await expect(box).toBeChecked();
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
    await expect(region).toHaveText('Not checked');
});

test.describe('on a touch screen', () => {
    test.use({ hasTouch: true, isMobile: true });

    test('gives the task checkbox a target of at least 44 by 44 CSS pixels', async ({ mount, page }) => {
        await mount(<ListProbe blocks={blocks} />);
        await ready(page);

        const box = await page.getByRole('checkbox', { name: 'Print' }).boundingBox();

        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
    });
});

test('draws no list marker on task items in the reader, also in a task list nested in a bulleted list', async ({
    mount,
    page,
}) => {
    await mount(
        <ListProbe blocks={[...blocks, bullets(listItem('Outer', tasks(taskItem('task-3', 'Inner'))))]} reader />,
    );
    await ready(page);

    const markers = await page
        .getByRole('region', { name: 'Reader' })
        .locator('li[data-checked]')
        .evaluateAll((items) => items.map((item) => getComputedStyle(item).listStyleType));

    expect(markers).toEqual(['none', 'none', 'none']);
});
