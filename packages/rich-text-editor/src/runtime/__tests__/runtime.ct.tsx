/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../react/__tests__/fixtures/EditorProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

declare global {
    interface Window {
        /** The text that mutations took out of the surface, which shows what the DOM held before a redraw. */
        replaced?: string[];
    }
}

/** Types and pastes into a surface that shows `ab`, recording the text each DOM mutation replaced. */
const typeAndPaste = async (page: Page) => {
    await surfaceOf(page).click();
    await page.evaluate(() => {
        const replaced: string[] = [];
        window.replaced = replaced;
        const surface = document.querySelector('[role="textbox"]') as HTMLElement;
        new MutationObserver((records) => {
            for (const record of records) {
                if (record.oldValue !== null) {
                    replaced.push(record.oldValue);
                }
                for (const node of record.removedNodes) {
                    replaced.push(node.textContent ?? '');
                }
            }
        }).observe(surface, { subtree: true, childList: true, characterData: true, characterDataOldValue: true });
    });
    await page.keyboard.type('xyz');
    await page.evaluate(() => {
        const data = new DataTransfer();
        data.setData('text/html', '<p>pasted</p>');
        data.setData('text/plain', 'pasted');
        const paste = new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true });
        document.querySelector('[role="textbox"]')?.dispatchEvent(paste);
    });
};
const texts = (page: Page) =>
    page.evaluate(() => {
        const surface = document.querySelector('[role="textbox"]');
        const runtimeText = window.rte?.text();
        return [surface?.textContent, runtimeText];
    });

test('shows the retained state again after a forbidden typed and pasted change', async ({ mount, page }) => {
    const changes: string[] = [];
    await mount(<EditorProbe texts={['ab']} guarded onChange={({ origin }) => changes.push(origin)} />);
    await ready(page);

    await typeAndPaste(page);

    await expect.poll(() => texts(page)).toEqual(['ab', 'ab']);
    expect(changes).toEqual([]);
    // The typed text reached the DOM, and ProseMirror's redraw took it out again.
    expect(await page.evaluate(() => (window.replaced ?? []).some((text) => text.includes('x')))).toBe(true);
});

test('keeps the same typed and pasted change where the policy allows it', async ({ mount, page }) => {
    const changes: string[] = [];
    await mount(<EditorProbe texts={['ab']} onChange={({ origin }) => changes.push(origin)} />);
    await ready(page);

    await typeAndPaste(page);

    await expect.poll(() => changes).toEqual(['input', 'input', 'input', 'paste']);
    const [dom, runtime] = await texts(page);
    expect(dom).toBe(runtime);
    expect(dom).toContain('xyz');
    expect(dom).toContain('pasted');
});
