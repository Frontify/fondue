/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { ImageProbe } from '../../plugins/Image/__tests__/fixtures/ImageProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const menuOf = (page: Page) => page.getByRole('menu', { name: 'Selection actions' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.imageRte !== undefined)).toBe(true);
};

const selectImage = (page: Page) =>
    page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { nodeId: 'image-1' });
    });

test('leaves contextmenu on text to the browser and opens the package menu on a selected image', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { text: 'Before' });
    });
    const dispatch = (selector: string) =>
        surfaceOf(page)
            .locator(selector)
            .first()
            .evaluate((element) => {
                const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2 });
                element.dispatchEvent(event);

                return event.defaultPrevented;
            });

    expect(await dispatch('p')).toBe(false);
    await expect(menuOf(page)).toHaveCount(0);

    await selectImage(page);

    expect(await dispatch('figure')).toBe(true);
    await expect(menuOf(page)).toBeVisible();
    await expect(menuOf(page).getByRole('menuitem').first()).toContainText('Move up');
});

test('opens the menu on Shift+F10 at a selected image with focus on its first item, and Escape returns focus to the surface', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await surfaceOf(page).focus();
    await selectImage(page);

    await page.keyboard.press('Shift+F10');

    await expect(menuOf(page)).toBeVisible();
    await expect(menuOf(page).getByRole('menuitem').first()).toBeFocused();
    const menu = await menuOf(page).boundingBox();
    const image = await surfaceOf(page).locator('figure').boundingBox();
    // Anchored to the selected image, not to a pointer.
    const menuY = menu?.y;
    const imageY = image?.y;
    const imageHeight = image?.height;
    const menuTop = menuY ?? 0;
    const imageTop = imageY ?? 0;
    const imageBottom = imageTop + (imageHeight ?? 0);
    expect(Math.abs(menuTop - imageBottom)).toBeLessThan(40);

    await page.keyboard.press('Escape');

    await expect(menuOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
});

test('opens the menu on Shift+F10 with focus on its first item before any idle prefetch ran', async ({
    mount,
    page,
}) => {
    // An idle callback that never runs leaves the lazy code unloaded until its first use.
    await page.addInitScript(() => {
        window.requestIdleCallback = () => 0;
    });
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await surfaceOf(page).focus();
    await selectImage(page);

    await page.keyboard.press('Shift+F10');

    await expect(menuOf(page)).toBeVisible();
    await expect(menuOf(page).getByRole('menuitem').first()).toBeFocused();
});

test('runs an item command on the image a right click selected, and returns focus to the surface', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);

    await surfaceOf(page).locator('figure').click({ button: 'right' });
    await expect(menuOf(page)).toBeVisible();
    await menuOf(page)
        .getByRole('menuitem', { name: /Move up/ })
        .click();

    await expect(menuOf(page)).toHaveCount(0);
    await expect
        .poll(() =>
            page.evaluate(() =>
                window.imageRte?.handle.getSnapshot().document.content.content?.map(({ type }) => type),
            ),
        )
        .toEqual(['figure', 'paragraph', 'paragraph']);
    await expect(surfaceOf(page)).toBeFocused();
});
