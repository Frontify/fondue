/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { RichTextEditor, type RteDocument } from '../../index';

import { scan } from './axeScan';
import { EditorWithMentions, RendererWithMentions } from './editorWithMentions';

import type AxeBuilder from '@axe-core/playwright';

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

const COLOR_CONTRAST = 'color-contrast';

type AxeNode = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number]['nodes'][number];

/** One node breaking one axe rule, so a failure says what to fix. */
type Violation = { rule: string; target: string };

/** The CSS selector axe reports for a node. */
const selectorOf = (node: AxeNode): string => node.target.join(' ');

/**
 * Every axe violation on the page. Contrast axe could not decide counts too:
 * overlaid text is where that happens. A node scrolled out of its list is
 * undecided only for that reason, so it is checked again once scrolled into view.
 */
const violationsOf = async (page: Page): Promise<Violation[]> => {
    const { violations, incomplete } = await scan(page).analyze();
    const found: Violation[] = violations.flatMap(({ id, nodes }) =>
        nodes.map((node) => ({ rule: id, target: selectorOf(node) })),
    );
    const undecided = incomplete.filter(({ id }) => id === COLOR_CONTRAST).flatMap(({ nodes }) => nodes);
    for (const node of undecided) {
        const target = selectorOf(node);
        await page.locator(target).scrollIntoViewIfNeeded();
        const recheck = await scan(page).include(target).withRules([COLOR_CONTRAST]).analyze();
        if (recheck.violations.length > 0 || recheck.incomplete.length > 0) {
            found.push({ rule: COLOR_CONTRAST, target });
        }
    }
    return found;
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

test.describe("the host's id and test id", () => {
    test('finds the editor by its default test id', async ({ mount, page }) => {
        await mount(<RichTextEditor />);

        await expect(page.getByTestId('fondue-rich-text-editor')).toBeVisible();
    });

    test("finds the editor by the host's test id", async ({ mount, page }) => {
        await mount(<RichTextEditor data-test-id="comment-editor" />);

        await expect(page.getByTestId('comment-editor')).toBeVisible();
    });

    test('names the editable element through a label and takes focus by its id', async ({ mount, page }) => {
        await mount(
            <div>
                <label id="description-label" htmlFor="description">
                    Description
                </label>
                <RichTextEditor id="description" aria-labelledby="description-label" />
            </div>,
        );
        const editable = page.getByRole('textbox', { name: 'Description' });

        await expect(editable).toHaveAttribute('id', 'description');
        await page.locator('#description').focus();

        await expect(editable).toBeFocused();
    });

    test('puts the id on the readonly view and the test id on the root', async ({ mount, page }) => {
        await mount(
            <RichTextEditor
                value={{ version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'for reading' }] }] }}
                id="reading"
                data-test-id="reading-editor"
                readonly
            />,
        );

        await expect(page.getByTestId('reading-editor')).toBeVisible();
        await expect(page.locator('#reading')).toContainText('for reading');
    });
});

const SELECT_ALL = 'ControlOrMeta+a';

/** Types `text` into the editor and selects it, which the toolbar needs for a link or a colour. */
const typeAndSelect = async (page: Page, text: string): Promise<void> => {
    await page.getByRole('textbox').click();
    await page.keyboard.type(text);
    await page.keyboard.press(SELECT_ALL);
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
                await mount(<RendererWithMentions value={mutedCode} />);
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

    test('a labelled, required, invalid editor has no axe violations', async ({ mount, page }) => {
        await mount(
            <div>
                <label id="summary-label" htmlFor="summary">
                    Summary
                </label>
                <RichTextEditor
                    id="summary"
                    aria-labelledby="summary-label"
                    aria-describedby="summary-error"
                    aria-errormessage="summary-error"
                    required
                    status="error"
                />
                <p id="summary-error">Summary is required.</p>
            </div>,
        );
        const editable = page.getByRole('textbox', { name: 'Summary' });

        await expect(editable).toHaveAttribute('aria-required', 'true');
        await expect(editable).toHaveAttribute('aria-invalid', 'true');
        await expect(editable).toHaveAccessibleDescription('Summary is required.');
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
        const symbolicHeadings = [1, 2, 3, 4].map((level) => ({
            rule: 'label-content-name-mismatch',
            target: `div[aria-label="Heading ${level}"]`,
        }));
        expect(await violationsOf(page)).toEqual(symbolicHeadings);
    });

    test('the text style menu has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('combobox', { name: 'Text style' }).click();
        await expect(page.getByRole('option', { name: 'Heading 1' })).toBeVisible();

        expect(await violationsOf(page)).toEqual([]);
    });

    test('the text colour flyout has no axe violations', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await typeAndSelect(page, 'Hello');
        await page.getByRole('button', { name: 'Text color' }).click();
        await expect(page.getByRole('group', { name: 'Suggested colors' }).getByRole('button').first()).toBeVisible();

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

    test('the emoji flyout announces how many emoji match the search', async ({ mount, page }) => {
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('button', { name: 'Emoji' }).click();
        const flyout = page.getByRole('dialog', { name: 'Emoji' });
        const search = flyout.getByRole('searchbox', { name: 'Search emoji' });
        const status = flyout.getByRole('status');

        await search.fill('cat');
        await expect(status).toHaveText('2 results');

        await search.fill('zzzzqx');
        await expect(status).toHaveText('No matches');

        await search.fill('');
        await expect(status).toHaveText('');
    });

    test('the emoji flyout has no axe violations while searching', async ({ mount, page }) => {
        test.slow();
        await mount(<RichTextEditor />);
        await page.getByRole('textbox').click();
        await page.getByRole('button', { name: 'Emoji' }).click();
        const flyout = page.getByRole('dialog', { name: 'Emoji' });
        await flyout.getByRole('searchbox', { name: 'Search emoji' }).fill('cat');
        await expect(flyout.getByRole('status')).toHaveText('2 results');

        expect(await violationsOf(page)).toEqual([]);
    });
});

const headingThreeDocument: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading3', children: [{ text: 'A heading' }] },
        { type: 'paragraph', children: [{ text: 'A paragraph' }] },
    ],
};

const openTextStyleList = async (page: Page): Promise<Locator> => {
    await page.getByRole('textbox').locator('h3').click();
    const combobox = page.getByRole('combobox', { name: 'Text style' });
    await combobox.focus();
    await page.keyboard.press('Enter');
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');
    return combobox;
};

test.describe('text style list', () => {
    test('keeps the list open and the style unchanged on ArrowRight and ArrowLeft', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        const combobox = await openTextStyleList(page);
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowLeft');

        await expect(combobox).toBeFocused();
        await expect(combobox).toHaveAttribute('aria-expanded', 'true');
        await expect(page.getByRole('listbox')).toBeVisible();
        await expect(page.getByRole('textbox').locator('h3')).toHaveText('A heading');
    });

    test('highlights the selected option when the list opens', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        const combobox = await openTextStyleList(page);

        const selected = page.getByRole('option', { name: 'Heading 3' });
        const selectedId = await selected.getAttribute('id');
        expect(selectedId).toBeTruthy();
        await expect(combobox).toHaveAttribute('aria-activedescendant', selectedId ?? '');
    });

    test('moves to the option after the selected one on the first ArrowDown', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        const combobox = await openTextStyleList(page);

        await page.keyboard.press('ArrowDown');

        const next = page.getByRole('option', { name: 'Heading 4' });
        const nextId = await next.getAttribute('id');
        expect(nextId).toBeTruthy();
        await expect(combobox).toHaveAttribute('aria-activedescendant', nextId ?? '');
    });

    test('applies the shown style to every block the selection spans', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        await page.getByRole('textbox').locator('h3').click();
        await page.keyboard.press('Home');
        await page.keyboard.press('Shift+ArrowDown');
        await page.keyboard.press('Shift+End');
        const combobox = page.getByRole('combobox', { name: 'Text style' });
        await expect(combobox).toContainText('Heading 3');

        await combobox.focus();
        await page.keyboard.press('Enter');
        await expect(combobox).toHaveAttribute('aria-expanded', 'true');
        await page.keyboard.press('Enter');

        await expect(page.getByRole('textbox').locator('h3')).toHaveCount(2);
    });

    test('has no dialog around the list', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        await openTextStyleList(page);

        await expect(page.getByRole('dialog')).toHaveCount(0);
    });

    test('names the list "Text style"', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        await openTextStyleList(page);

        await expect(page.getByRole('listbox', { name: 'Text style' })).toBeVisible();
    });

    test('applies the highlighted option on Enter', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        await openTextStyleList(page);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await expect(page.getByRole('textbox').locator('h4')).toHaveText('A heading');
    });

    test('closes on Escape, keeps focus on the combobox and leaves the style unchanged', async ({ mount, page }) => {
        await mount(<RichTextEditor value={headingThreeDocument} />);
        const combobox = await openTextStyleList(page);
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Escape');

        await expect(combobox).toHaveAttribute('aria-expanded', 'false');
        await expect(combobox).toBeFocused();
        await expect(page.getByRole('textbox').locator('h3')).toHaveText('A heading');
    });
});
