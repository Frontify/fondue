/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ColorProbe } from './fixtures/ColorProbe';

type ColorRte = NonNullable<Window['colorRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.colorRte !== undefined)).toBe(true);
};

// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const select = async (page: Page, text: string) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate((target) => {
        const rte = window.colorRte as ColorRte;
        rte.setSelection(rte.handle, { text: target });
    }, text);
};

const changesOf = (page: Page) =>
    page.evaluate(() => (window.colorRte as ColorRte).changes.map(({ commandId }) => commandId));
const marksOf = (page: Page) =>
    page.evaluate(() =>
        ((window.colorRte as ColorRte).handle.getSnapshot().document.content.content?.[0]?.content ?? []).map(
            (node) => [node.text, node.marks ?? []],
        ),
    );
const colorButton = (page: Page) => page.getByRole('toolbar').getByRole('button', { name: 'Color' });

/** Opens the custom text colour picker from the colour menu and drags its gradient pointer 60 px to the left. */
const draftColor = async (page: Page) => {
    await select(page, 'two');
    await colorButton(page).click();
    await page.getByRole('menuitemradio', { name: 'Custom text color' }).click();
    const picker = page.getByRole('dialog', { name: 'Custom text color' });
    const pointer = picker.locator('.react-colorful__saturation-pointer').first();
    await expect(pointer).toBeVisible();
    const box = await pointer.boundingBox();
    await pointer.hover();
    await page.mouse.down();
    const left = box?.x;
    const top = box?.y;
    const startX = left ?? 0;
    const startY = top ?? 0;
    await page.mouse.move(startX + 60, startY + 40);
    await page.mouse.up();

    return picker;
};

test('keeps a literal colour as a draft while the gradient moves, and writes it only on Save as one undo step', async ({
    mount,
    page,
}) => {
    await mount(<ColorProbe literal />);
    await ready(page);

    const picker = await draftColor(page);
    const hex = await picker.getByRole('textbox').first().inputValue();
    expect(await changesOf(page)).toEqual([]);
    await picker.getByRole('button', { name: 'Save' }).click();

    await expect(picker).toHaveCount(0);
    expect(await changesOf(page)).toEqual(['mark.font-color.set']);
    const [, two] = await marksOf(page);
    expect(two?.[0]).toBe('two');
    expect(JSON.stringify(two?.[1])).toMatch(/"value":"#[0-9a-f]{6}"/);
    expect(JSON.stringify(two?.[1]).toLowerCase()).toContain(hex.replace('#', '').toLowerCase());
    await page.evaluate(() => (window.colorRte as ColorRte).handle.execute('history.undo'));
    expect(await marksOf(page)).toEqual([['one two three', []]]);
});

test('leaves the document unchanged when the colour draft is cancelled or closed with Escape', async ({
    mount,
    page,
}) => {
    await mount(<ColorProbe literal />);
    await ready(page);

    const cancelled = await draftColor(page);
    await cancelled.getByRole('button', { name: 'Cancel' }).click();
    await expect(cancelled).toHaveCount(0);
    const escaped = await draftColor(page);
    await page.keyboard.press('Escape');
    await expect(escaped).toHaveCount(0);

    expect(await changesOf(page)).toEqual([]);
    expect(await marksOf(page)).toEqual([['one two three', []]]);
});

test('draws the focus outline on the focused gradient slider of the colour draft, also with forced colours', async ({
    mount,
    page,
}) => {
    await mount(<ColorProbe literal />);
    await ready(page);
    await select(page, 'two');
    await colorButton(page).click();
    await page.getByRole('menuitemradio', { name: 'Custom text color' }).click();
    const picker = page.getByRole('dialog', { name: 'Custom text color' });
    const slider = picker.locator('.react-colorful__interactive').first();
    await expect(slider).toBeVisible();
    const outlineOf = () =>
        slider.evaluate((element) => {
            const style = getComputedStyle(element);

            return [style.outlineStyle, style.outlineWidth];
        });

    await slider.focus();
    await page.keyboard.press('ArrowRight');
    const outline = await outlineOf();
    await page.emulateMedia({ forcedColors: 'active' });
    const forced = await outlineOf();

    expect(outline).toEqual(['solid', '2px']);
    expect(forced).toEqual(['solid', '2px']);
});

test('names each swatch by its token and describes it by its colour, checks the active one, and applies one by keyboard', async ({
    mount,
    page,
}) => {
    await mount(<ColorProbe />);
    await ready(page);
    await select(page, 'one');
    await colorButton(page).click();

    const red = page.getByRole('menuitemradio', { name: 'Brand red' });
    await expect(red).toHaveAccessibleDescription('#c0392b');
    await expect(page.getByRole('menuitemradio', { name: 'Sun' })).toHaveAccessibleDescription('#fde68a');
    await expect(page.getByRole('menuitemradio', { name: 'Custom text color' })).toHaveCount(0);
    await expect(red).toBeFocused();
    await page.keyboard.press('ArrowDown');
    // Radix moves the roving focus in a timeout, so Enter waits for it.
    await expect(page.getByRole('menuitemradio', { name: 'Brand blue' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(surfaceOf(page)).toBeFocused();
    expect(await marksOf(page)).toEqual([
        ['one', [{ type: 'font_color', attrs: { tokenId: 'brand.blue', value: null } }]],
        [' two three', []],
    ]);
    await colorButton(page).click();
    await expect(page.getByRole('menuitemradio', { name: 'Brand blue' })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('menuitemradio', { name: 'Brand blue' })).toBeFocused();
});

test('applies a text colour and a highlight from the menu and reapplies the last colour with Mod+Shift+H', async ({
    mount,
    page,
}) => {
    await mount(<ColorProbe />);
    await ready(page);
    await select(page, 'one');
    await colorButton(page).click();
    await page.getByRole('menuitemradio', { name: 'Brand red' }).click();
    await select(page, 'two');
    await colorButton(page).click();
    await page.getByRole('menuitemradio', { name: 'Sun' }).click();
    await select(page, 'three');

    await page.keyboard.press('ControlOrMeta+Shift+H');

    const sun = { type: 'highlight', attrs: { tokenId: 'brand.sun', value: null } };
    expect(await marksOf(page)).toEqual([
        ['one', [{ type: 'font_color', attrs: { tokenId: 'brand.red', value: null } }]],
        [' ', []],
        ['two', [sun]],
        [' ', []],
        ['three', [sun]],
    ]);
    expect(await changesOf(page)).toEqual(['mark.font-color.set', 'mark.highlight.set', 'mark.color.reapply']);
    await expect(surfaceOf(page).locator('mark', { hasText: 'three' })).toHaveCSS(
        'background-color',
        'rgb(253, 230, 138)',
    );
});
