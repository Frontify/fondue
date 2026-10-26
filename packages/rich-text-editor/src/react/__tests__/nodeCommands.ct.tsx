/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { decodableImage } from '#/testing/images';

import { ImageProbe } from '../../features/mediaImage/__tests__/fixtures/ImageProbe';
import { UploadProbe } from '../../features/mediaUpload/__tests__/fixtures/UploadProbe';

import { execute, moreOf, ready, select, selectImage, surfaceOf } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';

/**
 * The commands the selected node's chrome offers: each button that opens no menu, and each item of each menu it
 * opens, by name.
 */
const chromeCommands = async (page: Page) => {
    const chrome = surfaceOf(page).locator('[data-rte-node-chrome]').first();
    const names: string[] = [];
    for (const button of await chrome.getByRole('button').all()) {
        const name = (await button.getAttribute('aria-label')) ?? '';
        if ((await button.getAttribute('aria-haspopup')) !== 'menu') {
            names.push(name);
            continue;
        }
        await button.click();
        const items = await page.getByRole('menu').locator('[role^="menuitem"]').allInnerTexts();
        names.push(...items.map((item) => item.split('\n')[0] ?? ''));
        await page.keyboard.press('Escape');
        await expect(page.getByRole('menu')).toHaveCount(0);
    }
    return names;
};

// A press outside closes every menu; Escape cannot close More after a chrome menu closed on Escape.
const closeMenus = async (page: Page) => {
    // A loaded run can press before the menu arms its outside-press listener; a second press changes nothing.
    await expect(async () => {
        await page.mouse.click(2, 2);
        await expect(page.getByRole('menu')).toHaveCount(0, { timeout: 1000 });
    }).toPass({ timeout: 5000 });
};

/** The rows of the More menu, by name. */
const moreRows = async (page: Page) => {
    await moreOf(page).click();
    // More loads its rows on first use.
    await expect(page.getByRole('menu')).toBeVisible();
    const rows = await page.getByRole('menu').locator('[role^="menuitem"]').allInnerTexts();
    await closeMenus(page);
    return rows.map((row) => row.split('\n')[0] ?? '');
};

/**
 * The commands More offers for the selected node: each row it lists only now, and each item of a menu such a row
 * opens, by name.
 */
const moreCommands = async (page: Page, nodeRows: readonly string[], select: () => Promise<void>) => {
    const names = [...nodeRows];
    for (const row of nodeRows) {
        await select();
        await moreOf(page).click();
        await expect(page.getByRole('menu')).toBeVisible();
        const label = new RegExp(`^${row.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)}`);
        const item = page.getByRole('menu').locator('[role^="menuitem"]').filter({ hasText: label });
        // A row the node's state leaves unavailable, as Keep alternative text with no replacement, runs nothing.
        if ((await item.getAttribute('aria-disabled')) === 'true') {
            await closeMenus(page);
            continue;
        }
        await item.click();
        // A row that opens a control opens it once More has closed.
        await expect(page.getByRole('menu', { name: 'More' })).toHaveCount(0);
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 200)));
        const opened = page.getByRole('menu');
        if ((await opened.count()) > 0) {
            const items = await opened.locator('[role^="menuitem"]').allInnerTexts();
            names.push(...items.map((entry) => entry.split('\n')[0] ?? ''));
            await closeMenus(page);
        }
        const dialog = page.getByRole('dialog');
        if ((await dialog.count()) > 0) {
            await expect(dialog.locator(':focus')).toHaveCount(1);
            await page.keyboard.press('Escape');
            await expect(dialog).toHaveCount(0);
        }
    }
    return names;
};

/** The chrome commands More lacks; a chrome name may lead with the state its command fixes, as Add alternative text. */
// Copy code and Pause or Play are chrome actions, not commands (accessibility AC-018), so More need not offer them.
const CHROME_ONLY: readonly string[] = ['Copy code', 'Pause animation', 'Play animation', 'Keep alternative text'];

const missing = (chrome: readonly string[], more: readonly string[]) =>
    chrome.filter((name) => {
        if (CHROME_ONLY.includes(name)) {
            return false;
        }
        const wanted = name.toLowerCase();
        return !more.some((row) => wanted === row.toLowerCase() || wanted.endsWith(` ${row.toLowerCase()}`));
    });

/** Selects the image, or puts the caret in the code block. */
const selectNode = async (page: Page, target: 'image' | 'code') => {
    if (target === 'code') {
        await select(page, { text: 'x = 1', from: 1, to: 1 });
        return;
    }
    await selectImage(page);
};

/** Puts the caret in the paragraph `Intro`, outside every node with chrome. */
const selectIntro = (page: Page) => select(page, { text: 'Intro', from: 1, to: 1 });

/** The rows More lists only while the node is selected, after the chrome's commands are read. */
const nodeRowsOf = async (page: Page, kind: 'image' | 'code') => {
    await selectIntro(page);
    const before = await moreRows(page);
    await selectNode(page, kind);
    const during = await moreRows(page);
    return during.filter((row) => !before.includes(row));
};

for (const profile of ['comment', 'document'] as const) {
    test(`offers every code block chrome command in More while a ${profile} code block holds the caret, and only then`, async ({
        mount,
        page,
    }) => {
        await mount(<ProfileProbe profile={profile} />);
        await ready(page);
        await surfaceOf(page).focus();
        await page.keyboard.insertText('Intro');
        await page.keyboard.press('Enter');
        await execute(page, 'code-block.toggle');
        await page.keyboard.insertText('x = 1');
        await selectNode(page, 'code');
        const chrome = await chromeCommands(page);
        const nodeRows = await nodeRowsOf(page, 'code');

        expect(chrome.length).toBeGreaterThan(1);
        expect(nodeRows).toEqual(['Code language', 'Turn into']);
        expect(missing(chrome, await moreCommands(page, nodeRows, () => selectNode(page, 'code')))).toEqual([]);
    });
}

test('offers every image chrome command in More while a Document image is selected, and only then', async ({
    mount,
    page,
}) => {
    await mount(<ProfileProbe profile="document" withServices />);
    await ready(page);
    await surfaceOf(page).focus();
    await page.keyboard.insertText('Intro');
    await execute(page, 'image.insert');
    await expect(surfaceOf(page).locator('figure')).toHaveCount(1);
    await selectNode(page, 'image');
    const chrome = await chromeCommands(page);
    const nodeRows = await nodeRowsOf(page, 'image');

    expect(chrome.length).toBeGreaterThan(1);
    expect(nodeRows.length).toBeGreaterThan(1);
    expect(missing(chrome, await moreCommands(page, nodeRows, () => selectNode(page, 'image')))).toEqual([]);
});

/** The `displayWidth` of each image of the image probe, by `nodeId`. */
const widthsOf = (page: Page) =>
    page.evaluate(() => {
        const widths: Record<string, unknown> = {};
        const nodes = window.imageRte?.handle.getSnapshot().document.content.content;
        for (const figure of nodes ?? []) {
            const first = figure.content?.[0];
            const attrs = first?.attrs;
            if (figure.type === 'figure' && typeof attrs?.nodeId === 'string') {
                widths[attrs.nodeId] = attrs.displayWidth;
            }
        }
        return widths;
    });

test('resizes the image a More menu opened for, not the image selected while it is open', async ({ mount, page }) => {
    const still = Buffer.from(await decodableImage('image/png', 1, 1));
    await page.route('https://assets.frontify.test/**', (route) =>
        route.fulfill({ contentType: 'image/png', body: still }),
    );
    await mount(<ImageProbe content="alt" />);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.imageRte !== undefined)).toBe(true);
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { nodeId: 'image-1' });
    });

    await moreOf(page).click();
    await page
        .getByRole('menu')
        .locator('[role^="menuitem"]')
        .filter({ hasText: /^Image size/ })
        .click();
    await expect(page.getByRole('menu', { name: 'Image size' })).toBeVisible();
    await surfaceOf(page).locator('figure').nth(1).click();
    await page.getByRole('menuitemradio', { name: '50%' }).click();

    await expect.poll(() => widthsOf(page)).toEqual({ 'image-1': 50, 'image-2': null, 'image-3': null });
});

test('offers Cancel upload in More while a selected image uploads, and Retry upload once it failed', async ({
    mount,
    page,
}) => {
    await mount(<UploadProbe />);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.uploadRte !== undefined)).toBe(true);
    const plain = await moreRows(page);
    await page.evaluate(() => {
        const rte = window.uploadRte;
        rte?.setSelection(rte.handle, { text: 'Before', from: 6, to: 6 });
        rte?.handle.focus();
    });
    const opened = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Image' }).click();
    const chooser = await opened;
    await chooser.setFiles({
        name: 'logo.png',
        mimeType: 'image/png',
        buffer: Buffer.from(await decodableImage('image/png', 40, 30)),
    });
    await expect.poll(() => page.evaluate(() => window.uploadRte?.requests().length)).toBe(1);
    const selectSlot = () =>
        page.evaluate(() => {
            const rte = window.uploadRte;
            const first = rte?.images()[0];
            const nodeId = first?.nodeId;
            if (rte !== undefined && typeof nodeId === 'string') {
                rte.setSelection(rte.handle, { nodeId });
            }
        });

    await selectSlot();
    const uploading = await moreRows(page);
    await page.evaluate(() => window.uploadRte?.fail(0));
    await expect(surfaceOf(page).getByRole('button', { name: 'Retry upload' })).toBeVisible();
    await selectSlot();
    const failed = await moreRows(page);

    expect(plain).not.toContain('Cancel upload');
    expect(plain).not.toContain('Retry upload');
    expect(uploading).toContain('Cancel upload');
    expect(uploading).not.toContain('Retry upload');
    expect(failed).toContain('Retry upload');
    expect(failed).not.toContain('Cancel upload');
});
