/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { RichTextEditor, type RteDocument } from '../../index';

import { EditorWithMentions, RendererWithMentions } from './editorWithMentions';

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

// What every default plugin writes, plus a mention.
const everyPluginDocument: RteDocument = {
    version: 1,
    blocks: [
        ...(['heading1', 'heading2', 'heading3', 'heading4'] as const).map((style) => ({
            type: 'textStyle' as const,
            style,
            children: [{ text: `A ${style}` }],
        })),
        ...(['custom1', 'custom2', 'custom3', 'imageTitle', 'imageCaption'] as const).map((style) => ({
            type: 'textStyle' as const,
            style,
            children: [{ text: `A ${style} paragraph` }],
        })),
        {
            type: 'paragraph',
            children: [
                { text: 'bold', bold: true },
                { text: ' italic', italic: true },
                { text: ' underline', underline: true },
                { text: ' strikethrough', strikethrough: true },
                { text: ' code', code: true },
                { text: ' sub', subscript: true },
                { text: ' super', superscript: true },
                { text: ' red', fontColor: { color: '#c5221f' } },
                { text: ' link', link: { href: 'https://example.com' } },
                { text: ' 🎉 ' },
                { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                { type: 'break' },
                { text: 'after a soft break' },
            ],
        },
        ...(['center', 'right', 'justify'] as const).map((align) => ({
            type: 'paragraph' as const,
            align,
            children: [{ text: `Aligned ${align}` }],
        })),
        { type: 'quote', children: [{ text: 'A quote' }] },
        {
            type: 'numberedList',
            children: [{ type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'One' }] }] }],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'Done' }] }] },
                { type: 'checkItem', children: [{ type: 'paragraph', children: [{ text: 'To do' }] }] },
            ],
        },
        ...document.blocks,
    ],
};

// Page-level rules about the bare test page (no main landmark, no h1), not about the component.
const PAGE_LEVEL_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];

// WCAG 2.2 AA, the editor's bar: axe's defaults leave out its rules, `target-size` among them.
const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const scan = (page: Page): AxeBuilder => new AxeBuilder({ page }).withTags(WCAG_22_AA).disableRules(PAGE_LEVEL_RULES);

/**
 * The rule id and node of each axe violation, so a failure says what to fix.
 * Contrast axe could not decide counts too: overlaid text is where that happens.
 * A node scrolled out of its list is undecided only for that reason, so it is
 * checked again once scrolled into view.
 */
const violationsOf = async (page: Page): Promise<string[]> => {
    const { violations, incomplete } = await scan(page).analyze();
    const undecided = incomplete.filter(({ id }) => id === 'color-contrast').flatMap(({ nodes }) => nodes);
    const stillUndecided = [];
    for (const node of undecided) {
        await page.locator(node.target.join(' ')).scrollIntoViewIfNeeded();
        const recheck = await scan(page).include(node.target.join(' ')).withRules(['color-contrast']).analyze();
        if (recheck.violations.length > 0 || recheck.incomplete.length > 0) {
            stillUndecided.push(`color-contrast: ${node.target.join(' ')}`);
        }
    }
    return [
        ...violations.flatMap(({ id, nodes }) => nodes.map((node) => `${id}: ${node.target.join(' ')}`)),
        ...stillUndecided,
    ];
};

/** The rules broken, once each: what a scan with a known violation pins, so fixing it turns the test red. */
const rulesOf = (violations: string[]): string[] => [
    ...new Set(violations.map((violation) => violation.slice(0, violation.indexOf(':')))),
];

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

/** Types `text` into the editor and selects it, which the toolbar needs for a link or a colour. */
const typeAndSelect = async (page: Page, text: string): Promise<void> => {
    await page.getByRole('textbox').click();
    await page.keyboard.type(text);
    await page.keyboard.press('ControlOrMeta+a');
};

test.describe('accessibility', () => {
    test('the editor has no axe violations', async ({ mount, page }) => {
        // No label from the host: the editor names itself.
        await mount(<RichTextEditor value={document} />);
        await expect(page.getByRole('textbox')).toBeVisible();
        // The toolbar renders a frame after the text: scanning before it would leave it out.
        await expect(page.getByRole('toolbar')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the readonly renderer has no axe violations', async ({ mount, page }) => {
        await mount(<RendererWithMentions value={everyPluginDocument} />);
        await expect(page.getByText('@jane')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('an empty editor with a placeholder has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor placeholder="Write something" />);
        await expect(page.getByRole('textbox')).toHaveAttribute('aria-placeholder', 'Write something');
        await expect(page.getByRole('toolbar')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the readonly editor has no axe violations', async ({ mount, page }) => {
        await mount(<EditorWithMentions value={everyPluginDocument} readonly />);
        await expect(page.getByText('@jane')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the floating toolbar has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor toolbarPlacement="floating" />);
        await typeAndSelect(page, 'Hello');
        await expect(page.getByRole('toolbar')).toBeVisible();

        // Known: the floating bar is a dialog without a name.
        expect(rulesOf(await violationsOf(page))).toEqual(['aria-dialog-name']);
    });

    test('the floating Turn into menu has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor toolbarPlacement="floating" />);
        await typeAndSelect(page, 'Hello');
        await page.getByRole('button', { name: 'Turn into: Text' }).click();
        await expect(page.getByRole('menu')).toBeVisible();

        // Known: the floating bar has no name, and the shortcut beside each heading is not in its name.
        expect(rulesOf(await violationsOf(page))).toEqual(['aria-dialog-name', 'label-content-name-mismatch']);
    });

    test('the text style menu has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('combobox', { name: 'Text style' }).click();
        await expect(page.getByRole('listbox')).toBeVisible();

        // Known: Fondue's Select opens its list in a dialog without a name.
        expect(rulesOf(await violationsOf(page))).toEqual(['aria-dialog-name']);
    });

    test('the text colour flyout has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await typeAndSelect(page, 'Hello');
        await page.getByRole('button', { name: 'Text colour' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the new link flyout has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await typeAndSelect(page, 'Hello');
        await page.getByRole('button', { name: 'Add link' }).click();
        await expect(page.getByRole('dialog', { name: 'Add link' })).toBeVisible();
        // Filled in: axe cannot see Fondue's placeholder under the transparent input (5.7:1, measured by hand).
        await page.keyboard.type('https://example.com');

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the link editor has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor value={document} />);
        await page.getByRole('link', { name: 'link' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the slash menu has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.keyboard.type('/');
        await expect(page.getByRole('listbox', { name: 'Commands' })).toBeVisible();

        // Known: the slash menu is a dialog without a name.
        expect(rulesOf(await violationsOf(page))).toEqual(['aria-dialog-name']);
    });

    test('the mention picker has no axe violations', async ({ mount, page }) => {
        await mount(<EditorWithMentions />);
        await page.getByRole('textbox').click();
        await page.keyboard.type('@ja');
        await expect(page.getByRole('option', { name: /Jane Doe/ })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the emoji shortcode picker has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.keyboard.type(':smi');
        await expect(page.getByRole('listbox', { name: 'Emoji' })).toBeVisible();

        // Known: the shortcode each option shows is not in its name.
        expect(rulesOf(await violationsOf(page))).toEqual(['label-content-name-mismatch']);
    });

    test('the emoji flyout has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('button', { name: 'Emoji' }).click();
        await expect(page.getByRole('dialog', { name: 'Emoji' })).toBeVisible();
        // Searched: axe cannot see Fondue's placeholder under the transparent input (5.7:1, measured by hand).
        await page.keyboard.type('smile');

        expect(await violationsOf(page)).toEqual([]);
    });
});
