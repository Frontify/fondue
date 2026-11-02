/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { RichTextEditor, RichTextRenderer, type RteDocument } from '../../index';

// Driven through the package's public API in a real browser: keys go in as
// the browser sends them, so what the engine does with them is what a user gets.

const document: RteDocument = {
    version: 1,
    blocks: [
        {
            type: 'paragraph',
            children: [
                { text: 'Hello ' },
                { text: 'bold', bold: true },
                { text: ' and a ' },
                { text: 'link', link: { href: 'https://example.com' } },
            ],
        },
        {
            type: 'bulletList',
            children: [
                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'First' }] }] },
                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Second' }] }] },
            ],
        },
    ],
};

// Page-level rules about the bare test page (no main landmark, no h1), not about the component.
const PAGE_LEVEL_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];

/** The rule id and node of each axe violation, so a failure says what to fix. */
const violationsOf = async (page: Page): Promise<string[]> => {
    const { violations } = await new AxeBuilder({ page }).disableRules(PAGE_LEVEL_RULES).analyze();
    return violations.flatMap(({ id, nodes }) => nodes.map((node) => `${id}: ${node.target.join(' ')}`));
};

test.describe('editor', () => {
    test('mounts editable', async ({ mount }) => {
        const component = await mount(<RichTextEditor />);

        const editable = component.getByRole('textbox');
        await expect(editable).toBeVisible();
        await expect(editable).toHaveAttribute('contenteditable', 'true');
    });

    test('takes typed text', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('Hello world');

        await expect(editable).toHaveText('Hello world');
    });

    test('makes the typed text bold with Mod-b', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.press('ControlOrMeta+b');
        await page.keyboard.type('strong');

        await expect(editable.locator('strong')).toHaveText('strong');
    });

    test('links an address when a typed space replaces a selection', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('https://example.comxy');
        await page.keyboard.press('Shift+ArrowLeft');
        await page.keyboard.press('Shift+ArrowLeft');
        await page.keyboard.type(' ');

        await expect(editable.locator('a')).toHaveText('https://example.com');
        await expect(editable).toHaveText('https://example.com ');
    });

    test('makes a list of a typed "- "', async ({ mount, page }) => {
        const component = await mount(<RichTextEditor />);
        const editable = component.getByRole('textbox');

        await editable.click();
        await page.keyboard.type('- item');

        await expect(editable.locator('ul > li')).toHaveText('item');
    });
});

test.describe('accessibility', () => {
    test('the editor has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor value={document} aria-label="Description" />);
        await expect(page.getByRole('textbox')).toBeVisible();
        // The toolbar renders a frame after the text: scanning before it would leave it out.
        await expect(page.getByRole('toolbar')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the readonly renderer has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextRenderer value={document} />);
        await expect(page.getByText('Hello')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });
});
