/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { taskItem, tasks } from '../../../fixtures/editor/list-blocks';
import { ListProbe } from '../../../fixtures/editor/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const ready = (page: Page) =>
    expect(page.locator('[data-test-id="fondue-rich-text-editor"]').first()).not.toHaveAttribute('aria-busy');
const blocks = [tasks(taskItem('task-1', 'Approve the palette'), taskItem('task-2', 'Print'))];

test('SPEC-rich-text-editing/AC-030 runs one task.setChecked with one undo step for a click, Space on the checkbox and the command', async ({
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

test.describe('on a touch screen', () => {
    test.use({ hasTouch: true, isMobile: true });

    test('SPEC-rich-text-react/AC-041 gives the task checkbox a target of at least 44 by 44 CSS pixels', async ({
        mount,
        page,
    }) => {
        await mount(<ListProbe blocks={blocks} />);
        await ready(page);

        const box = await page.getByRole('checkbox', { name: 'Print' }).boundingBox();

        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
    });
});
