/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { stylesApplied } from '#/react/__tests__/fixtures/overlayHarness';

import { OutlineProbe } from './fixtures/OutlineProbe';

type OutlineRte = NonNullable<Window['outlineRte']>;

const ready = async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.outlineRte !== undefined)).toBe(true);
};

test('moves the selection to the start of the chosen heading, scrolls it into view and leaves the document unchanged', async ({
    mount,
    page,
}) => {
    await mount(<OutlineProbe />);
    await ready(page);

    const frame = page.getByTestId('frame');
    const heading = page.locator('h2', { hasText: 'Down here' });
    const before = await page.evaluate(() => {
        const rte = window.outlineRte as OutlineRte;
        return { sequence: rte.sequence(), document: rte.document() };
    });
    const hidden = await Promise.all([frame.boundingBox(), heading.boundingBox()]);
    const frameBox = hidden[0];
    const headingBox = hidden[1];
    expect(frameBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(headingBox!.y).toBeGreaterThanOrEqual(frameBox!.y + frameBox!.height);

    await page.getByRole('button', { name: 'Outline' }).click();
    await page
        .getByRole('navigation', { name: 'Outline' })
        .getByRole('button', { name: /Down here/ })
        .click();

    await expect
        .poll(() => page.evaluate(() => (window.outlineRte as OutlineRte).selection()))
        .toEqual({
            empty: true,
            parentOffset: 0,
            nodeId: 'later',
            type: 'heading',
        });
    const after = await page.evaluate(() => {
        const rte = window.outlineRte as OutlineRte;
        return { sequence: rte.sequence(), document: rte.document() };
    });
    expect(after).toEqual(before);
    const shown = await Promise.all([frame.boundingBox(), heading.boundingBox()]);
    const nextFrame = shown[0];
    const nextHeading = shown[1];
    expect(nextFrame).not.toBeNull();
    expect(nextHeading).not.toBeNull();
    expect(nextHeading!.y + nextHeading!.height).toBeGreaterThan(nextFrame!.y);
    expect(nextHeading!.y).toBeLessThan(nextFrame!.y + nextFrame!.height);
});

test('scrolls a heading above the visible area clear of the sticky toolbar', async ({ mount, page }) => {
    await mount(<OutlineProbe heading="middle" />);
    await ready(page);
    await page.getByRole('button', { name: 'Outline' }).click();
    const item = page.getByRole('navigation', { name: 'Outline' }).getByRole('button', { name: /Middle/ });
    await expect(item).toBeFocused();
    const heading = page.locator('h2', { hasText: 'Middle' });
    await page.getByTestId('frame').evaluate((frame) => {
        frame.scrollTop = frame.scrollHeight;
    });
    const below = await page.getByTestId('fondue-rich-text-editor-toolbar').boundingBox();
    const above = await heading.boundingBox();
    expect(above!.y + above!.height).toBeLessThan(below!.y);

    // A click through the DOM, so the browser does not scroll the item, and with it the heading, into view first.
    await item.evaluate((button: HTMLElement) => button.click());

    await expect
        .poll(async () => {
            const [toolbar, shown] = await Promise.all([
                page.getByTestId('fondue-rich-text-editor-toolbar').boundingBox(),
                heading.boundingBox(),
            ]);
            return shown!.y >= toolbar!.y + toolbar!.height;
        })
        .toBe(true);
});

test('scrolls a selected node into view, not the start of the surface', async ({ mount, page }) => {
    await mount(<OutlineProbe />);
    await ready(page);
    const frame = page.getByTestId('frame');
    const heading = page.locator('h2', { hasText: 'Down here' });

    await page.evaluate(() => (window.outlineRte as OutlineRte).selectHeadingNode('later'));

    await expect
        .poll(async () => {
            const [box, shown] = await Promise.all([frame.boundingBox(), heading.boundingBox()]);
            return shown!.y < box!.y + box!.height && shown!.y + shown!.height > box!.y;
        })
        .toBe(true);
});

test('shows the Outline row checked in the bubble toolbar More menu while the outline is open', async ({
    mount,
    page,
}) => {
    await mount(<OutlineProbe defaultToolbarMode="bubble" />);
    await ready(page);
    const surface = page.getByRole('textbox', { name: 'Notes' });
    const more = () => page.getByRole('toolbar').getByRole('button', { name: 'More' });
    const row = () => page.getByRole('menuitemcheckbox', { name: /Outline/ });

    await surface.focus();
    await page.keyboard.press('Alt+F10');
    await more().click();
    await expect(row()).toHaveAttribute('aria-checked', 'false');
    await row().click();
    await expect(page.getByRole('navigation', { name: 'Outline' })).toBeVisible();

    await surface.focus();
    await page.keyboard.press('Alt+F10');
    await more().click();

    await expect(row()).toHaveAttribute('aria-checked', 'true');
});

test('scrolls the caret of a heading taller than the frame clear of the sticky toolbar', async ({ mount, page }) => {
    await mount(<OutlineProbe heading="tall" />);
    await ready(page);
    await page.getByRole('button', { name: 'Outline' }).click();
    const item = page.getByRole('navigation', { name: 'Outline' }).getByRole('button', { name: /Tall/ });
    const heading = page.locator('h2', { hasText: 'Tall' });
    const toolbar = page.getByTestId('fondue-rich-text-editor-toolbar');
    // The panel loads on first use and moves the content once it and its stylesheet are in.
    await expect(item).toBeVisible();
    await stylesApplied(page);
    await heading.evaluate((element) => {
        const frame = element.closest('[data-test-id="frame"]') as HTMLElement;
        frame.scrollTop += element.getBoundingClientRect().top - frame.getBoundingClientRect().top + 100;
    });
    const [covered, bar] = await Promise.all([heading.boundingBox(), toolbar.boundingBox()]);
    expect(covered!.y).toBeLessThan(bar!.y + bar!.height);

    await item.evaluate((button: HTMLElement) => button.click());

    await expect
        .poll(async () => {
            const [shown, stuck] = await Promise.all([heading.boundingBox(), toolbar.boundingBox()]);
            return shown!.y >= stuck!.y + stuck!.height;
        })
        .toBe(true);
});

test('focuses the first outline item clear of the sticky toolbar when the outline opens out of view', async ({
    mount,
    page,
}) => {
    await mount(<OutlineProbe heading="middle" />);
    await ready(page);
    await page.getByTestId('frame').evaluate((frame) => {
        frame.scrollTop = frame.scrollHeight;
    });
    const toolbar = page.getByTestId('fondue-rich-text-editor-toolbar');

    await page.getByRole('button', { name: 'Outline' }).click();

    const item = page.getByRole('navigation', { name: 'Outline' }).getByRole('button', { name: /Middle/ });
    await expect(item).toBeFocused();
    const [shown, stuck] = await Promise.all([item.boundingBox(), toolbar.boundingBox()]);
    expect(shown!.y).toBeGreaterThanOrEqual(stuck!.y + stuck!.height);
});
