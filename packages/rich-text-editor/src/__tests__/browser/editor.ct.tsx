/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { RichTextEditor, RichTextRenderer, type RteDocument } from '../../index';

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
                { text: ' ' },
                { type: 'mention', id: 'design', username: 'design', name: 'Design team', kind: 'group' },
                { type: 'break' },
                { text: 'after a soft break' },
            ],
        },
        ...(['center', 'right', 'justify'] as const).map((align) => ({
            type: 'paragraph' as const,
            align,
            children: [{ text: `Aligned ${align}` }],
        })),
        {
            type: 'quote',
            children: [
                { text: 'A quote with a ' },
                {
                    text: 'coloured link',
                    underline: true,
                    fontColor: { color: '#188038' },
                    link: { href: 'https://example.com' },
                },
            ],
        },
        {
            type: 'textStyle',
            style: 'heading2',
            children: [
                { text: 'A heading with ' },
                { text: 'code', code: true },
                { text: ' and a ' },
                { text: 'link to a new tab', link: { href: 'https://example.com', openInNewTab: true } },
            ],
        },
        {
            type: 'numberedList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'One' }] },
                        {
                            type: 'numberedList',
                            children: [
                                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Nested' }] }] },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'bulletList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Bullet' }] },
                        {
                            type: 'bulletList',
                            children: [
                                { type: 'listItem', children: [{ type: 'paragraph', children: [{ text: 'Nested' }] }] },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'checkList',
            children: [
                { type: 'checkItem', checked: true, children: [{ type: 'paragraph', children: [{ text: 'Done' }] }] },
                {
                    type: 'checkItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'To do' }] },
                        {
                            type: 'checkList',
                            children: [
                                {
                                    type: 'checkItem',
                                    children: [{ type: 'paragraph', children: [{ text: 'Nested' }] }],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        ...document.blocks,
    ],
};

// Page-level rules about the bare test page (no main landmark, no h1), not about the component.
const PAGE_LEVEL_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];

// WCAG 2.2 AA, the editor's bar: axe's defaults leave out its rules, `target-size` among them.
const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

// Fondue's text field draws its placeholder under a transparent input, which axe cannot see through (5.7:1, measured by hand).
const FIELD_PLACEHOLDER = '[data-test-id="fondue-text-input"] div[aria-hidden="true"]';

const scan = (page: Page): AxeBuilder =>
    new AxeBuilder({ page }).withTags(WCAG_22_AA).disableRules(PAGE_LEVEL_RULES).exclude(FIELD_PLACEHOLDER);

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

/** How many nodes break each rule: what a scan with a known violation pins, so fixing it turns the test red. */
const countsOf = (violations: string[]): Record<string, number> => {
    const counts: Record<string, number> = {};
    for (const violation of violations) {
        const rule = violation.slice(0, violation.indexOf(':'));
        counts[rule] = (counts[rule] ?? 0) + 1;
    }
    return counts;
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

    test('the toolbar with pressed buttons has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor value={document} />);
        await page.getByRole('textbox').locator('strong').click();
        await expect(page.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
        expect(await violationsOf(page)).toEqual([]);

        await page.getByRole('textbox').getByText('First').click();
        await expect(page.getByRole('button', { name: 'Bulleted list' })).toHaveAttribute('aria-pressed', 'true');
        expect(await violationsOf(page)).toEqual([]);
    });

    test('the readonly renderer has no axe violations', async ({ mount, page }) => {
        await mount(<RendererWithMentions value={everyPluginDocument} />);
        await expect(page.getByText('@jane')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    // The muted styles: their text sits on the code's grey background too.
    const mutedCode: RteDocument = {
        version: 1,
        blocks: [
            { type: 'quote', children: [{ text: 'quoted code', code: true }] },
            ...(['custom2', 'imageCaption'] as const).map((style) => ({
                type: 'textStyle' as const,
                style,
                children: [{ text: `${style} code`, code: true as const }],
            })),
        ],
    };

    for (const view of ['renderer', 'editor'] as const) {
        test(`inline code in muted text in the ${view} has no axe violations`, async ({ mount, page }) => {
            if (view === 'renderer') {
                await mount(<RichTextRenderer value={mutedCode} />);
                await expect(page.getByText('imageCaption code')).toBeVisible();
            } else {
                await mount(<RichTextEditor value={mutedCode} />);
                await expect(page.getByRole('textbox').getByText('imageCaption code')).toBeVisible();
                await expect(page.getByRole('toolbar')).toBeVisible();
            }

            expect(await violationsOf(page)).toEqual([]);
        });
    }

    test('an empty editor with a placeholder has no axe violations', async ({ mount, page }) => {
        // Axe skips generated content, so the placeholder text itself (`::before`) goes unchecked here.
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

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the floating Turn into menu has only its symbolic heading icons flagged by axe', async ({ mount, page }) => {
        await mount(<RichTextEditor toolbarPlacement="floating" />);
        await typeAndSelect(page, 'Hello');
        await page.getByRole('button', { name: 'Turn into: Text' }).click();
        await expect(page.getByRole('menu')).toBeVisible();

        // The "H1" to "H4" icons are symbolic text, which WCAG 2.5.3 lets a name leave out ("B" for Bold); axe cannot tell.
        expect(countsOf(await violationsOf(page))).toEqual({ 'label-content-name-mismatch': 4 });
    });

    test("the text style menu has only Fondue Select's known axe violation", async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('combobox', { name: 'Text style' }).click();
        await expect(page.getByRole('listbox')).toBeVisible();

        // Known (FP-792): Fondue's Select opens its list in a dialog without a name.
        expect(countsOf(await violationsOf(page))).toEqual({ 'aria-dialog-name': 1 });
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

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the link editor has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor value={document} />);
        await page.getByRole('link', { name: 'link' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the slash menu has no axe violations', async ({ mount, page }) => {
        // Every option scrolled out of the list is scanned again once scrolled into view.
        test.slow();
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.keyboard.type('/');
        await expect(page.getByRole('listbox', { name: 'Commands' })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the mention picker has no axe violations', async ({ mount, page }) => {
        await mount(<EditorWithMentions />);
        await page.getByRole('textbox').click();
        await page.keyboard.type('@');
        await expect(page.getByRole('option', { name: /Design team/ })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the emoji shortcode picker has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.keyboard.type(':smi');
        await expect(page.getByRole('listbox', { name: 'Emoji' })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the emoji flyout has no axe violations', async ({ mount, page }) => {
        // Hundreds of emoji buttons: the slowest scan here.
        test.slow();
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('button', { name: 'Emoji' }).click();
        await expect(page.getByRole('dialog', { name: 'Emoji' })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });
});
