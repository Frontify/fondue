/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { EditorProbe, ThemeSwitchProbe } from '../../fixtures/editor/EditorProbe';
import { type ContentNodeJSON } from '../model';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};
const para = (...content: readonly object[]) => ({ type: 'paragraph', attrs: { lang: null }, content });
const text = (value: string) => ({ type: 'text', text: value });
const link = { type: 'link', attrs: { href: 'https://example.com/followed', openInNewWindow: false, styleId: null } };
const blocks = (...nodes: readonly object[]) => nodes as readonly ContentNodeJSON[];

/** Adds a host stylesheet before every other one, so the package rules come later in the cascade. */
const hostStylesheet = (page: Page, css: string) =>
    page.evaluate((source) => {
        const style = document.createElement('style');
        style.textContent = source;
        document.head.prepend(style);
    }, css);

/** What `value` computes to as a colour in the editor's theme, read from an element styled with it. */
const computedColor = (page: Page, value: string) =>
    surfaceOf(page).evaluate((surface, given) => {
        const probe = document.createElement('span');
        probe.style.color = given;
        surface.parentElement?.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
    }, value);

test('SPEC-rich-text-react/AC-051 reads the paragraph spacing a host sets on the content root', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['a', 'b']} contentClassName="host-content" />);
    await ready(page);
    const spacing = () =>
        surfaceOf(page)
            .locator('p')
            .first()
            .evaluate((paragraph) => getComputedStyle(paragraph).marginBlockEnd);
    const before = await spacing();

    await hostStylesheet(page, '.host-content { --rte-content-paragraph-spacing: 13px; }');

    expect(before).not.toBe('13px');
    expect(await spacing()).toBe('13px');
});

test('SPEC-rich-text-react/AC-051 reads the surface padding, surface border and placeholder opacity a host sets on the content root', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['']} placeholder="Write a note" contentClassName="host-content" />);
    await ready(page);
    const placeholderOpacity = () =>
        surfaceOf(page).evaluate((surface) => getComputedStyle(surface, '::before').opacity);
    expect(await placeholderOpacity()).toBe('1');

    await hostStylesheet(
        page,
        `.host-content {
            --rte-content-surface-padding: 17px;
            --rte-content-surface-border: 3px solid currentcolor;
            --rte-content-placeholder-opacity: 0.5;
        }`,
    );

    await expect(surfaceOf(page)).toHaveCSS('padding-top', '17px');
    await expect(surfaceOf(page)).toHaveCSS('padding-inline-start', '17px');
    await expect(surfaceOf(page)).toHaveCSS('border-top-width', '3px');
    expect(await placeholderOpacity()).toBe('0.5');
});

test('SPEC-rich-text-accessibility/AC-008 draws links in the computed primary token through the link colour variable', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['Read the [guide]']} />);
    await ready(page);

    const link = surfaceOf(page).getByRole('link', { name: 'guide' });
    await expect(link).toHaveCSS('color', await computedColor(page, 'var(--color-primary-default)'));

    // The default matches the text colour, so a variable the link rule reads is what sets it.
    await surfaceOf(page).evaluate((surface) => surface.style.setProperty('--rte-content-link-color', 'rgb(1, 2, 3)'));

    await expect(link).toHaveCSS('color', 'rgb(1, 2, 3)');
});

test('SPEC-rich-text-accessibility/AC-008 draws the placeholder in the computed secondary token', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['']} placeholder="Write a note" />);
    await ready(page);

    expect(await surfaceOf(page).evaluate((surface) => getComputedStyle(surface, '::before').color)).toBe(
        await computedColor(page, 'var(--color-secondary-default)'),
    );
});

test('SPEC-rich-text-react/AC-066 puts the root class and the presentation content class on the surface', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['a']} contentClassName="host-content" />);
    await ready(page);

    await expect(surfaceOf(page)).toHaveClass(/(^| )fondue-rte-content( |$)/);
    await expect(surfaceOf(page)).toHaveClass(/(^| )host-content( |$)/);
});

test('SPEC-rich-text-react/AC-066 gives the reader root the same classes and content styles as the editor surface', async ({
    mount,
    page,
}) => {
    // Every block type of the CT stand-ins, until `fixtures/perf/typical` lands with TASK-rte-performance.
    const document = blocks(
        para(text('Read the '), { type: 'text', text: 'guide', marks: [link] }),
        para(text('b')),
        { type: 'heading', attrs: { nodeId: 'h1', level: 2, lang: null }, content: [text('Title')] },
        { type: 'code_block', attrs: {}, content: [text('a  b')] },
    );
    await mount(<EditorProbe blocks={document} inputRules contentClassName="host-content" withReader />);
    await ready(page);
    await hostStylesheet(page, '.host-content { --rte-content-paragraph-spacing: 13px; }');
    const reader = page.getByRole('region', { name: 'Reader' }).locator('> div');
    const styles = (root: Locator) =>
        root.evaluate((element) => {
            const read = (target: Element, names: readonly string[]) => {
                const style = getComputedStyle(target);
                return names.map((name) => style.getPropertyValue(name));
            };
            return {
                variables: read(element, ['--rte-content-paragraph-spacing', '--rte-content-text-color']),
                blocks: [...element.children].map((block) => [
                    block.tagName,
                    ...read(block, [
                        'margin-block-start',
                        'margin-block-end',
                        'color',
                        'font-size',
                        'line-height',
                        'white-space',
                        'overflow-wrap',
                        'font-variant-ligatures',
                    ]),
                ]),
            };
        });

    await expect(reader).toHaveClass(/(^| )fondue-rte-content( |$)/);
    await expect(reader).toHaveClass(/(^| )host-content( |$)/);
    const shown = await styles(reader);
    expect(shown.blocks.map(([tag]) => tag)).toEqual(['P', 'P', 'H2', 'PRE']);
    expect(shown.blocks.filter(([tag]) => tag === 'P').map(([, , end]) => end)).toEqual(['13px', '13px']);
    expect(shown).toEqual(await styles(surfaceOf(page)));
});

test('SPEC-rich-text-react/AC-092 keeps the engine classes on the surface when the content class changes', async ({
    mount,
    page,
}) => {
    const document = blocks(para(text('ab')), { type: 'chrome_image', attrs: { nodeId: 'i1', assetId: null } });
    const component = await mount(<EditorProbe blocks={document} contentClassName="first" />);
    await ready(page);
    await surfaceOf(page).locator('p').click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { nodeId: 'i1' }));
    await expect(surfaceOf(page)).toHaveClass(/(^| )ProseMirror-hideselection( |$)/);

    await component.update(<EditorProbe blocks={document} contentClassName="second" />);

    const classes = () => surfaceOf(page).evaluate((surface) => [...surface.classList].sort());
    await expect.poll(classes).not.toContain('first');
    expect(await classes()).toEqual(
        expect.arrayContaining(['ProseMirror', 'ProseMirror-hideselection', 'fondue-rte-content', 'second']),
    );
});

test('SPEC-rich-text-react/AC-066 applies a content class list separated by any white space without a page error', async ({
    mount,
    page,
}) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const component = await mount(<EditorProbe texts={['a']} contentClassName="first" />);
    await ready(page);

    await component.update(<EditorProbe texts={['a']} contentClassName={'second\n\tthird'} />);

    await expect(surfaceOf(page)).toHaveClass(/(^| )second( |$)/);
    await expect(surfaceOf(page)).toHaveClass(/(^| )third( |$)/);
    expect(errors).toEqual([]);
});

test('SPEC-rich-text-react/AC-067 lets a host rule on the content class win over the package paragraph rule without important', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['a', 'b']} contentClassName="host-content" />);
    await ready(page);

    await hostStylesheet(page, '.host-content p { margin-block-end: 21px; }');

    await expect(surfaceOf(page).locator('p').first()).toHaveCSS('margin-block-end', '21px');
});

test('SPEC-rich-text-react/AC-053 follows a theme switch in the content without a transaction or a new view', async ({
    mount,
    page,
}) => {
    await mount(<ThemeSwitchProbe />);
    await ready(page);
    const tokens = page.locator('[data-token-probe]');
    const shown = async () => ({
        text: await surfaceOf(page)
            .locator('p')
            .evaluate((paragraph) => getComputedStyle(paragraph).color),
        surface: await surfaceOf(page).evaluate((surface) => getComputedStyle(surface).backgroundColor),
        tokens: await tokens.evaluate((probe) => {
            const style = getComputedStyle(probe);
            return { text: style.color, surface: style.backgroundColor };
        }),
    });
    const session = () =>
        page.evaluate(() => {
            const { rte } = window;
            if (rte === undefined) {
                return undefined;
            }
            const kept = window as unknown as { firstView?: unknown };
            kept.firstView ??= rte.runtime?.view;
            return {
                commitSequence: rte.handle.getSummary().commitSequence,
                sameView: kept.firstView === rte.runtime?.view,
            };
        });
    const before = { session: await session(), shown: await shown(), image: await surfaceOf(page).screenshot() };

    await page.getByRole('button', { name: 'Switch theme' }).click();
    await expect
        .poll(() => tokens.evaluate((probe) => getComputedStyle(probe).backgroundColor))
        .not.toBe(before.shown.tokens.surface);
    const after = { session: await session(), shown: await shown(), image: await surfaceOf(page).screenshot() };

    for (const { shown: colors } of [before, after]) {
        expect(colors.text).toBe(colors.tokens.text);
        expect(colors.surface).toBe(colors.tokens.surface);
    }
    expect(after.shown.text).not.toBe(before.shown.text);
    expect(after.image.equals(before.image)).toBe(false);
    expect(after.session).toEqual(before.session);
    expect(after.session?.sameView).toBe(true);
});

test('SPEC-rich-text-react/AC-089 prints the text and links of the editor and the reader without node chrome', async ({
    mount,
    page,
}) => {
    const document = blocks(
        para(text('Read the '), { type: 'chrome_mention', attrs: { nodeId: 'm1', label: 'Ada' } }),
        { type: 'chrome_block', attrs: { nodeId: 'b1', language: 'plain', checked: false }, content: [text('code')] },
    );
    await mount(<EditorProbe blocks={document} />);
    await ready(page);
    const chrome = surfaceOf(page).locator('[data-rte-chrome]');
    await expect(chrome.first()).toBeVisible();

    await page.emulateMedia({ media: 'print' });

    await expect(chrome).toHaveCount(2);
    for (const slot of await chrome.all()) {
        await expect(slot).toBeHidden();
    }
    await expect(surfaceOf(page).getByText('Read the')).toBeVisible();
    await expect(surfaceOf(page).getByText('code')).toBeVisible();
});

test('SPEC-rich-text-react/AC-089 prints a link in the editor and the reader', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['Read the [guide]']} withReader />);
    await ready(page);

    await page.emulateMedia({ media: 'print' });

    await expect(surfaceOf(page).getByRole('link', { name: 'guide' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Reader' }).getByRole('link', { name: 'guide' })).toBeVisible();
});

test('SPEC-rich-text-react/AC-092 keeps the typed space of ## so the heading rule fires, with the engine white space rules', async ({
    mount,
    page,
}) => {
    const warnings: string[] = [];
    page.on('console', (message) => {
        if (message.type() === 'warning') {
            warnings.push(message.text());
        }
    });
    await mount(<EditorProbe texts={['']} inputRules />);
    await ready(page);
    await surfaceOf(page).click();

    await page.keyboard.type('## Title');

    await expect(surfaceOf(page).locator('h2')).toHaveText('Title');
    await expect(surfaceOf(page)).toHaveCSS('white-space', /break-spaces/);
    await expect(surfaceOf(page)).toHaveCSS('font-variant-ligatures', 'none');
    expect(warnings.filter((warning) => warning.includes('white-space'))).toEqual([]);
});

test('SPEC-rich-text-react/AC-092 outlines a selected image with the focus token and hides the caret', async ({
    mount,
    page,
}) => {
    await mount(
        <EditorProbe
            blocks={blocks(para(text('ab')), { type: 'chrome_image', attrs: { nodeId: 'i1', assetId: null } })}
        />,
    );
    await ready(page);
    await surfaceOf(page).locator('p').click();

    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { nodeId: 'i1' }));

    const image = surfaceOf(page).locator('.ProseMirror-selectednode');
    await expect(image).toHaveCSS('outline-style', 'solid');
    await expect(image).toHaveCSS('outline-width', '2px');
    await expect(image).toHaveCSS('outline-color', await computedColor(page, 'var(--color-focus-default)'));
    await expect(surfaceOf(page)).toHaveCSS('caret-color', 'rgba(0, 0, 0, 0)');
});

test('SPEC-rich-text-react/AC-092 paints no native selection over the text of a selected node', async ({
    mount,
    page,
}) => {
    const code = {
        type: 'chrome_block',
        attrs: { nodeId: 'b1', language: 'plain', checked: false },
        content: [text('code')],
    };
    await mount(<EditorProbe blocks={blocks(para(text('ab')), code)} />);
    await ready(page);
    await surfaceOf(page).locator('p').click();
    const content = surfaceOf(page).locator('[data-rte-chrome] + div');
    const box = await content.boundingBox();
    if (box === null) {
        throw new Error('The code block content has no box.');
    }
    // The selected node's outline can reach the content box edge in WebKit, so the text is compared without the edges.
    const shot = () => page.screenshot({ clip: { ...box, width: box.width - 4, height: box.height - 4 } });
    const unselected = await shot();

    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { nodeId: 'b1' }));
    await expect(surfaceOf(page).locator('.ProseMirror-selectednode')).toHaveCount(1);
    expect(await page.evaluate(() => window.getSelection()?.toString())).toContain('code');

    // The DOM selection covers the text, yet it looks as it did unselected.
    const selected = await shot();
    expect(selected.equals(unselected)).toBe(true);
});
