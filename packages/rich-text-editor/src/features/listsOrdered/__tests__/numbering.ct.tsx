/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { listItem, numbered } from '#/react/__tests__/fixtures/listBlocks';
import { ListProbe } from '#/react/__tests__/fixtures/ListProbe';

type ListRte = NonNullable<Window['listRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.listRte !== undefined)).toBe(true);
};

// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const startsOf = (page: Page) =>
    page.evaluate(() =>
        (window.listRte as ListRte).changes.map(({ commandId, content }) => [
            commandId,
            (content as { content: { attrs: { start: number } }[] }).content[0]?.attrs.start,
        ]),
    );

/** Opens Start numbering at from the More menu by keyboard, with the caret in "two". */
const openNumbering = async (page: Page) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    await page.evaluate(() => {
        const rte = window.listRte as ListRte;
        rte.setSelection(rte.handle, { text: 'two', from: 1, to: 1 });
    });
    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('End');
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitem', { name: 'Move up' })).toBeFocused();
    await page.getByRole('menuitem', { name: 'Start numbering at' }).focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Start numbering at' });
    await expect(dialog.getByRole('spinbutton', { name: 'First number' })).toBeFocused();
    // The closing menu hands focus on in a timer, so keys wait for it as for the surface.
    await settleFocus(page);

    return dialog;
};

const blocks = [numbered(1, listItem('one'), listItem('two'))];

test('sets the start by keyboard in the numbering dialog as one undo step', async ({ mount, page }) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);
    await expect(dialog.getByRole('spinbutton', { name: 'First number' })).toHaveValue('1');
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('5');
    await page.keyboard.press('Enter');

    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '5');
    expect(await startsOf(page)).toEqual([['list.ordered.start.set', 5]]);
    await page.evaluate(() => (window.listRte as ListRte).handle.execute('history.undo'));
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
});

test('refuses 1,000,001 in the numbering dialog with a field error, and Escape closes it with no change', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('1000001');
    await page.keyboard.press('Enter');

    const field = dialog.getByRole('spinbutton', { name: 'First number' });
    await expect(field).toHaveAccessibleDescription('Enter a whole number from 0 to 1000000.');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toBeFocused();
    await expect(page.locator('[role="alert"]')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
    expect(await startsOf(page)).toEqual([]);
});

test('says a refused number once in the editor live region on Enter in the focused field, and not when Apply moves focus to it', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);
    const field = dialog.getByRole('spinbutton', { name: 'First number' });
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('1000001');
    await dialog.getByRole('button', { name: 'Apply' }).focus();
    await page.keyboard.press('Enter');
    await expect(field).toBeFocused();
    const announcer = page.getByTestId('fondue-rich-text-editor-announcer');
    // A modal dialog hides its siblings from a screen reader, but not a live region.
    await expect(announcer).not.toHaveAttribute('aria-hidden', 'true');
    await expect(announcer).toHaveText('');

    await page.keyboard.press('Enter');
    await expect(announcer).toHaveText('Enter a whole number from 0 to 1000000.');
    await expect(field).toBeFocused();
});

test('shows the invalid numbering field by an error icon, which a grayscale screenshot still tells apart', async ({
    mount,
    page,
}, testInfo) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);
    await page.addStyleTag({ content: 'html { filter: grayscale(1); }' });
    const dialog = await openNumbering(page);
    const field = dialog.getByRole('spinbutton', { name: 'First number' });
    const box = dialog.locator('[data-status]').filter({ has: page.getByRole('spinbutton') });
    const before = await box.screenshot();
    await expect(box.locator('svg')).toHaveCount(0);

    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('1000001');
    await page.keyboard.press('Enter');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    const invalid = await box.screenshot();
    await testInfo.attach('invalid numbering field in grayscale', { body: invalid, contentType: 'image/png' });

    await expect(box.locator('svg')).toBeVisible();
    expect(invalid.equals(before)).toBe(false);
});

test('names the numbering dialog by its heading, with no description that holds a control', async ({ mount, page }) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);

    const dialog = await openNumbering(page);

    const heading = await dialog.getByRole('heading').textContent();
    await expect(dialog).toHaveAccessibleName(heading ?? '');
    const controls = await dialog.evaluate((element) => {
        const description = element.ownerDocument.getElementById(element.getAttribute('aria-describedby') ?? '');
        const found = description?.querySelectorAll('button, input, select, textarea, [href], [tabindex]').length;

        return found ?? 0;
    });
    expect(controls).toBe(0);
});

test.describe('on a touch device', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });

    test('closes the numbering dialog with its visible close control, with no change and focus on More', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<ListProbe blocks={blocks} reader />);
        await ready(page);
        const dialog = await openNumbering(page);
        await dialog.getByRole('spinbutton', { name: 'First number' }).fill('5');
        const close = dialog.getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(page.locator('[role="dialog"]')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'More' })).toBeFocused();
        await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
        expect(await startsOf(page)).toEqual([]);
    });
});

test('opens the numbering dialog from a host execute of list.ordered.start.edit, whose confirmation sets the start as one undo step', async ({
    mount,
    page,
}) => {
    await mount(<ListProbe blocks={blocks} reader />);
    await ready(page);
    await page.evaluate(() => {
        const rte = window.listRte as ListRte;
        rte.setSelection(rte.handle, { text: 'two', from: 1, to: 1 });
        rte.handle.execute('list.ordered.start.edit');
    });

    const field = page
        .getByRole('dialog', { name: 'Start numbering at' })
        .getByRole('spinbutton', { name: 'First number' });
    await expect(field).toBeFocused();
    await expect(field).toHaveValue('1');
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('5');
    await page.keyboard.press('Enter');

    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '5');
    expect(await startsOf(page)).toEqual([['list.ordered.start.set', 5]]);
    await page.evaluate(() => (window.listRte as ListRte).handle.execute('history.undo'));
    await expect(page.getByRole('region', { name: 'Reader' }).locator('ol')).toHaveAttribute('start', '1');
});
