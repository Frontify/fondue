/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { StyleProbe } from './fixtures/StyleProbe';

type StyleRte = NonNullable<Window['styleRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const readerOf = (page: Page) => page.getByRole('region', { name: 'Reader' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.styleRte !== undefined)).toBe(true);
};

// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const placeCaret = async (page: Page, text: string) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate((target) => {
        const rte = window.styleRte as StyleRte;
        rte.setSelection(rte.handle, { text: target, from: 1, to: 1 });
    }, text);
};

const TYPOGRAPHY = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'textTransform',
    'color',
    'textDecorationLine',
    'backgroundColor',
] as const;
const typographyOf = (locator: Locator) =>
    locator.evaluate((element, names) => {
        const style = getComputedStyle(element);

        return names.map((name) => style[name]);
    }, TYPOGRAPHY);

// Each block and link of the probe: its element and its text, which the editor and the reader both render.
const STYLED = [
    ['h2', 'Title style'],
    ['p', 'Lead style'],
    ['p', 'Caption style'],
    ['h3', 'Caption heading'],
    ['p', 'Legacy style'],
    ['p', 'Unknown style'],
    ['a', 'default link'],
    ['a', 'button link'],
] as const;

test('renders every style of the fixture map with the same computed typography in the editor and the reader', async ({
    mount,
    page,
}) => {
    await mount(<StyleProbe />);
    await ready(page);

    for (const [tag, text] of STYLED) {
        const editor = surfaceOf(page).locator(tag, { hasText: text });
        const reader = readerOf(page).locator(tag, { hasText: text });
        expect([text, await typographyOf(editor)]).toEqual([text, await typographyOf(reader)]);
    }

    await expect(surfaceOf(page).locator('h2', { hasText: 'Title style' })).toHaveCSS('font-size', '32px');
    await expect(surfaceOf(page).locator('a', { hasText: 'default link' })).toHaveCSS(
        'text-decoration-line',
        'underline',
    );
    await expect(surfaceOf(page).locator('a', { hasText: 'button link' })).toHaveCSS('text-decoration-line', 'none');
    await expect(surfaceOf(page).locator('p', { hasText: 'Legacy style' })).toHaveAttribute(
        'data-rte-style',
        'brand.legacy',
    );
});

test('renders every use of a style with its changed recipe in the editor and the reader, with no document change', async ({
    mount,
    page,
}) => {
    const component = await mount(<StyleProbe />);
    await ready(page);
    const lead = surfaceOf(page).locator('p', { hasText: 'Lead style' });
    await expect(lead).toHaveCSS('font-size', '20px');
    const before = await page.evaluate(() => {
        const snapshot = (window.styleRte as StyleRte).handle.getSnapshot();

        return [snapshot.stamp.sequence, JSON.stringify(snapshot.document)];
    });

    await component.update(<StyleProbe leadSize={26} />);

    await expect(lead).toHaveCSS('font-size', '26px');
    await expect(readerOf(page).locator('p', { hasText: 'Lead style' })).toHaveCSS('font-size', '26px');
    const after = await page.evaluate(() => {
        const rte = window.styleRte as StyleRte;
        const snapshot = rte.handle.getSnapshot();

        return [snapshot.stamp.sequence, JSON.stringify(snapshot.document), rte.changes.length];
    });
    expect(after).toEqual([...before, 0]);
});

test('previews each brand style row in its font family, size and weight but not its colour, while the trigger keeps a plain label', async ({
    mount,
    page,
}) => {
    await mount(<StyleProbe />);
    await ready(page);
    const trigger = page.getByRole('toolbar').getByRole('button').first();
    await placeCaret(page, 'Unknown style');
    const plainBox = await trigger.boundingBox();
    await placeCaret(page, 'Lead style');
    await expect(trigger).toHaveText('Normal text');
    const styledBox = await trigger.boundingBox();

    await trigger.click();
    const preview = (name: string) =>
        page
            .getByRole('menuitemradio', { name })
            .locator('[data-rte-style-preview]')
            .evaluate((element) => {
                const style = getComputedStyle(element);

                return [style.fontFamily, style.fontSize, style.fontWeight];
            });

    const styledHeight = styledBox?.height;
    const plainHeight = plainBox?.height;
    expect(styledHeight).toBe(plainHeight);
    expect(await preview('Lead')).toEqual(['Arial, sans-serif', '20px', '300']);
    expect(await preview('Caption')).toEqual([expect.any(String), '12px', '600']);
    await expect(page.getByRole('menuitemradio', { name: 'Lead' })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('menuitemradio', { name: 'Legacy' })).toHaveCount(0);
    await expect(page.getByRole('menuitemradio', { name: 'Title' })).toHaveCount(0);
});

test('grows a brand style row to hold its preview font, so a 32px style shows uncropped', async ({ mount, page }) => {
    await mount(<StyleProbe />);
    await ready(page);
    await placeCaret(page, 'Title style');
    const trigger = page.getByRole('toolbar').getByRole('button').first();
    await trigger.click();

    const title = page.getByRole('menuitemradio', { name: 'Title' });
    const fit = await title.locator('[data-rte-style-preview]').evaluate((element) => {
        const { height } = element.getBoundingClientRect();

        return [element.scrollHeight <= element.clientHeight, height >= 32];
    });
    const row = await title.boundingBox();

    expect(fit).toEqual([true, true]);
    const rowHeight = row?.height;
    expect(rowHeight ?? 0).toBeGreaterThanOrEqual(40);
});

test('lists the heading styles in the text style picker on a heading, and sets one as a change of styleId only', async ({
    mount,
    page,
}) => {
    await mount(<StyleProbe />);
    await ready(page);
    await placeCaret(page, 'Caption heading');
    const trigger = page.getByRole('toolbar').getByRole('button').first();
    await expect(trigger).toHaveText('Heading 3');

    await trigger.click();
    await expect(page.getByRole('menuitemradio', { name: 'Lead' })).toHaveCount(0);
    // The Title recipe is blue, which its row leaves out.
    const colors = await page
        .getByRole('menuitemradio', { name: 'Title' })
        .locator('[data-rte-style-preview]')
        .evaluate((element) => [
            getComputedStyle(element).color,
            getComputedStyle(element.parentElement as Element).color,
        ]);
    expect(colors[0]).toBe(colors[1]);
    expect(colors[0]).not.toBe('rgb(29, 78, 216)');
    await page.getByRole('menuitemradio', { name: 'Title' }).click();

    await expect(surfaceOf(page).locator('h3', { hasText: 'Caption heading' })).toHaveCSS('font-size', '32px');
    const changed = await page.evaluate(() => {
        const rte = window.styleRte as StyleRte;
        const blocks = rte.handle.getSnapshot().document.content.content ?? [];
        const block = blocks[3];
        const type = block?.type;
        const attrs = block?.attrs;

        return [rte.changes.map(({ commandId }) => commandId), type, attrs];
    });
    expect(changed).toEqual([
        ['block.style.set'],
        'heading',
        { nodeId: 'heading-3', level: 3, lang: null, styleId: 'brand.title' },
    ]);
});
