/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

test('SPEC-rich-text-runtime/AC-005 shows the retained state again after a forbidden typed and pasted change', async ({
    mount,
    page,
}) => {
    const changes: string[] = [];
    await mount(<EditorProbe texts={['ab']} guarded onChange={({ origin }) => changes.push(origin)} />);
    await ready(page);

    await surfaceOf(page).click();
    await page.keyboard.type('xyz');
    await page.evaluate(() => {
        const data = new DataTransfer();
        data.setData('text/html', '<p>pasted</p>');
        data.setData('text/plain', 'pasted');
        const paste = new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true });
        document.querySelector('[role="textbox"]')?.dispatchEvent(paste);
    });

    const texts = () =>
        page.evaluate(() => {
            const surface = document.querySelector('[role="textbox"]');
            const runtimeText = window.rte?.text();
            return [surface?.textContent, runtimeText];
        });
    await expect.poll(texts).toEqual(['ab', 'ab']);
    expect(changes).toEqual([]);
});

test('SPEC-rich-text-runtime/AC-059 keeps selection, copy and link activation working once readonly in the same task', async ({
    mount,
    page,
}) => {
    await page.route('https://example.com/**', (route) =>
        route.fulfill({ contentType: 'text/html', body: 'followed' }),
    );
    await mount(<EditorProbe texts={['Read the [guide]']} />);
    await ready(page);

    const editable = await page.evaluate(() => {
        window.rte?.handle.setMode('readonly');
        return document.querySelector('[role="textbox"]')?.getAttribute('contenteditable');
    });
    expect(editable).toBe('false');

    // A double click on the first word selects it, as on any page text.
    const paragraph = surfaceOf(page).locator('p');
    const box = await paragraph.boundingBox();
    if (box === null) {
        throw new Error('The paragraph is not visible.');
    }
    await paragraph.dblclick({ position: { x: 4, y: box.height / 2 } });
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('Read');
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

    await surfaceOf(page).getByRole('link', { name: 'guide' }).click();
    await page.waitForURL('https://example.com/followed');
});
