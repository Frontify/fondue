/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { ImageProbe } from './fixtures/ImageProbe';

// A 1 by 1 pixel PNG, and a 1 by 1 pixel GIF with two frames that loops.
const STILL_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const MOVING_GIF =
    'R0lGODlhAQABAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAAQABAAACAkQBACH5BAQKAAAALAAAAAABAAEAAAICTAEAOw==';

/** Answers every asset URL: the PNG and the GIF by name, and a 404 for any other. */
const serveAssets = (page: Page) =>
    page.route('**/test-assets/**', async (route) => {
        const url = route.request().url();
        if (url.endsWith('/still.png')) {
            await route.fulfill({ contentType: 'image/png', body: Buffer.from(STILL_PNG, 'base64') });

            return;
        }

        // An image the test never answers keeps the box its stored size reserves.
        if (url.endsWith('/pending.png')) {
            return;
        }

        if (url.endsWith('/moving.gif')) {
            await route.fulfill({ contentType: 'image/gif', body: Buffer.from(MOVING_GIF, 'base64') });

            return;
        }

        await route.fulfill({ status: 404, body: '' });
    });

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const readerOf = (page: Page) => page.getByRole('region', { name: 'Published' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.imageRte !== undefined)).toBe(true);
};

/** The `alt` of each image inside `root`, `null` where it has none. */
const altsIn = (page: Page, root: 'editor' | 'reader') =>
    (root === 'editor' ? surfaceOf(page) : readerOf(page))
        .locator('figure img')
        .evaluateAll((images) => images.map((image) => image.getAttribute('alt')));

test.beforeEach(async ({ page }) => {
    await serveAssets(page);
});

test('gives the editor images the alt of the reader for missing, decorative and meaningful alternative text', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="alt" />);
    await ready(page);
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(3);

    expect(await altsIn(page, 'editor')).toEqual([null, '', 'Frontify logo']);
    expect(await altsIn(page, 'reader')).toEqual(await altsIn(page, 'editor'));
});

test('offers a labelled Pause and Play toggle for an animated GIF', async ({ mount, page, browserName }) => {
    test.skip(browserName === 'firefox', 'The animated image legs run in Chromium and WebKit.');
    await mount(<ImageProbe content="animated" />);
    await ready(page);
    const pause = surfaceOf(page).getByRole('button', { name: 'Pause animation' });
    await expect(pause).toBeVisible();

    await pause.click();

    await expect(surfaceOf(page).getByRole('button', { name: 'Play animation' })).toBeVisible();
    await expect(surfaceOf(page).locator('figure canvas[aria-hidden="true"]')).toHaveCount(1);
});

test('starts an animated GIF paused under reduced motion', async ({ mount, page, browserName }) => {
    test.skip(browserName === 'firefox', 'The animated image legs run in Chromium and WebKit.');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(<ImageProbe content="animated" />);
    await ready(page);

    await expect(surfaceOf(page).getByRole('button', { name: 'Play animation' })).toBeVisible();
});

test('offers no animation toggle for a static PNG where ImageDecoder can tell', async ({ mount, page }) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    const decodes = await page.evaluate(() => 'ImageDecoder' in window);
    test.skip(!decodes, 'This browser has no ImageDecoder, so every image may animate.');
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(1);
    await expect(surfaceOf(page).getByRole('button', { name: 'Replace image' })).toBeVisible();

    await expect(surfaceOf(page).getByRole('button', { name: /animation/ })).toHaveCount(0);
});

test('shows Image unavailable with the label when the image fails to load, and keeps the node', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="broken" />);
    await ready(page);

    await expect(surfaceOf(page).locator('[data-rte-image-unavailable]')).toHaveText('Image unavailable logo.png');
    expect(await page.evaluate(() => window.imageRte?.changes)).toBe(0);
});

test('lets the browser menu open for a text selection next to an image, not preventing contextmenu', async ({
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

    const prevented = await surfaceOf(page)
        .getByText('Before')
        .evaluate((paragraph) => {
            const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2 });
            paragraph.dispatchEvent(event);

            return event.defaultPrevented;
        });

    expect(prevented).toBe(false);
});

test('prints the image with its alt and leaves out its chrome', async ({ mount, page }) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(1);

    await page.emulateMedia({ media: 'print' });

    await expect(surfaceOf(page).locator('figure img')).toBeVisible();
    await expect(surfaceOf(page).locator('figure img')).toHaveAttribute('alt', 'Frontify logo');
    await expect(surfaceOf(page).getByRole('toolbar', { name: 'Image' })).toBeHidden();
    await expect(readerOf(page).locator('figure img')).toBeVisible();
});

test.describe('with a coarse pointer', () => {
    test.use({ hasTouch: true, isMobile: true });

    test('gives every image chrome control a 44 by 44 CSS pixel target', async ({ mount, page, browserName }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<ImageProbe content="still" />);
        await ready(page);
        const controls = surfaceOf(page).getByRole('toolbar', { name: 'Image' }).getByRole('button');
        await expect(controls.first()).toBeVisible();

        const boxes = await controls.evaluateAll((buttons) =>
            buttons.map((button) => {
                const { width, height } = button.getBoundingClientRect();

                return { width, height };
            }),
        );

        expect(boxes.length).toBeGreaterThan(0);
        for (const box of boxes) {
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
        }
    });
});

test('writes one undo step at the end of a resize drag, and none when Escape ends one', async ({ mount, page }) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    const image = surfaceOf(page).locator('figure img');
    await expect(image).toHaveCount(1);
    await image.click();
    const handle = surfaceOf(page).locator('[data-rte-drag="image.size.set"]');
    await expect(handle).toBeVisible();
    const box = await handle.boundingBox();
    if (box === null) {
        throw new Error('The resize handle has no box.');
    }

    const pointerX = box.x + box.width / 2;
    const pointerY = box.y + box.height / 2;

    await page.mouse.move(pointerX, pointerY);
    await page.mouse.down();
    for (let step = 1; step <= 10; step += 1) {
        await page.mouse.move(pointerX + step * 20, pointerY);
    }

    await page.mouse.up();

    await expect.poll(() => page.evaluate(() => window.imageRte?.changes)).toBe(1);
    const width = await page.evaluate(() => {
        const nodes = window.imageRte?.handle.getSnapshot().document.content.content;
        const [, figure] = nodes ?? [];
        const children = figure?.content;
        const first = children?.[0];
        const attrs = first?.attrs;

        return attrs?.displayWidth;
    });
    expect(typeof width).toBe('number');

    const moved = await handle.boundingBox();
    if (moved === null) {
        throw new Error('The resize handle has no box.');
    }

    const start = moved.x + moved.width / 2;
    await page.mouse.move(start, pointerY);
    await page.mouse.down();
    for (let step = 1; step <= 5; step += 1) {
        await page.mouse.move(start - step * 20, pointerY);
    }

    await page.keyboard.press('Escape');
    await page.mouse.up();

    expect(await page.evaluate(() => window.imageRte?.changes)).toBe(1);
    expect(
        await page.evaluate(() => {
            const nodes = window.imageRte?.handle.getSnapshot().document.content.content;
            const [, figure] = nodes ?? [];
            const children = figure?.content;
            const first = children?.[0];
            const attrs = first?.attrs;

            return attrs?.displayWidth;
        }),
    ).toBe(width);
});

test('opens the alternative text dialog from the image chrome by keyboard, with Meaningful focused, and Escape returns to its button', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { nodeId: 'image-1' });
    });

    await page.keyboard.press('Alt+F10');
    const button = surfaceOf(page).getByRole('button', { name: 'Alternative text' });
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Alternative text' });
    await expect(dialog.getByRole('radio', { name: /Meaningful/ })).toBeFocused();
    await expect(dialog.getByRole('radio', { name: /Meaningful/ })).toBeChecked();
    await page.keyboard.press('Escape');

    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
    expect(await page.evaluate(() => window.imageRte?.changes)).toBe(0);
});

test('moves focus into the alternative text dialog the first time it opens, before any idle prefetch ran', async ({
    mount,
    page,
}) => {
    // An idle callback that never runs leaves the dialog's code unloaded until it opens.
    await page.addInitScript(() => {
        window.requestIdleCallback = () => 0;
    });
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { nodeId: 'image-1' });
    });

    await page.keyboard.press('Alt+F10');
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Alternative text' });

    await expect(dialog.getByRole('radio', { name: /Meaningful/ })).toBeFocused();
});

/** The focusable elements inside the element `aria-describedby` names on `dialog`, none when it names none. */
const describedControls = (dialog: Locator) =>
    dialog.evaluate((element) => {
        const description = element.ownerDocument.getElementById(element.getAttribute('aria-describedby') ?? '');
        const found = description?.querySelectorAll('button, input, select, textarea, [href], [tabindex]').length;

        return found ?? 0;
    });

/** Opens the alternative text dialog from the chrome of the selected first image by keyboard. */
const openAltText = async (page: Page) => {
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { nodeId: 'image-1' });
    });
    await page.keyboard.press('Alt+F10');
    await expect(surfaceOf(page).getByRole('button', { name: 'Alternative text' })).toBeFocused();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Alternative text' });
    await expect(dialog.getByRole('radio', { name: /Meaningful/ })).toBeFocused();

    return dialog;
};

/** Opens the width dialog from Custom width in the image's size menu by keyboard. */
const openWidth = async (page: Page) => {
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(1);
    await surfaceOf(page).getByRole('button', { name: 'Size: Original size' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitemradio', { name: 'Original size' })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    // Radix moves menu focus in a timer after the arrow key, so an Enter sent sooner selects Original size.
    await expect(page.getByRole('menuitem', { name: 'Custom width…' })).toBeFocused();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Image width' });
    await expect(dialog.getByRole('spinbutton', { name: 'Width in percent of the content width' })).toBeFocused();

    return dialog;
};

test('names the alternative text and width dialogs by their headings, with no description that holds a control', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);

    for (const open of [openAltText, openWidth]) {
        const dialog = await open(page);
        const heading = await dialog.getByRole('heading').textContent();
        await expect(dialog).toHaveAccessibleName(heading ?? '');
        expect(await describedControls(dialog)).toBe(0);
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
    }
});

test('says a refused width once in the editor live region on Enter in the focused field, and not when Apply moves focus to it', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);

    const dialog = await openWidth(page);
    const field = dialog.getByRole('spinbutton', { name: 'Width in percent of the content width' });
    await field.fill('5');
    await dialog.getByRole('button', { name: 'Apply' }).focus();
    await page.keyboard.press('Enter');
    await expect(field).toBeFocused();
    const announcer = page.getByTestId('fondue-rich-text-editor-announcer');
    // A modal dialog hides its siblings from a screen reader, but not a live region.
    await expect(announcer).not.toHaveAttribute('aria-hidden', 'true');
    await expect(announcer).toHaveText('');

    await page.keyboard.press('Enter');
    await expect(announcer).toHaveText('Enter a whole number from 10 to 100.');
    await expect(field).toBeFocused();
});

test.describe('on a touch device', () => {
    test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });

    test('closes the alternative text dialog with its visible close control, with no change and focus on its chrome button', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<ImageProbe content="still" />);
        await ready(page);
        const dialog = await openAltText(page);
        await dialog.getByRole('textbox', { name: 'Alternative text' }).fill('A dog');
        const close = dialog.getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(dialog).toHaveCount(0);
        await expect(surfaceOf(page).getByRole('button', { name: 'Alternative text' })).toBeFocused();
        expect(await page.evaluate(() => window.imageRte?.changes)).toBe(0);
    });

    test('closes the width dialog with its visible close control, with no change and focus on the size button', async ({
        mount,
        page,
        browserName,
    }) => {
        test.skip(browserName === 'firefox', 'Firefox has no mobile emulation.');
        await mount(<ImageProbe content="still" />);
        await ready(page);
        const dialog = await openWidth(page);
        await dialog.getByRole('spinbutton', { name: 'Width in percent of the content width' }).fill('40');
        const close = dialog.getByRole('button', { name: 'Close' });
        await expect(close).toBeVisible();

        await close.tap();

        await expect(dialog).toHaveCount(0);
        await expect(surfaceOf(page).getByRole('button', { name: 'Size: Original size' })).toBeFocused();
        expect(await page.evaluate(() => window.imageRte?.changes)).toBe(0);
    });
});

test('lists Image in More when it does not fit the toolbar, and opens the asset picker from there', async ({
    mount,
    page,
}) => {
    await page.setViewportSize({ width: 240, height: 600 });
    await mount(<ImageProbe content="still" />);
    await ready(page);
    const toolbar = page.getByRole('toolbar', { name: 'Text formatting' });
    await expect(toolbar.getByRole('button', { name: 'Image', exact: true })).toHaveCount(0);
    await surfaceOf(page).focus();
    await page.evaluate(() => {
        const rte = window.imageRte;
        rte?.setSelection(rte.handle, { text: 'Before' });
    });

    await toolbar.getByRole('button', { name: 'More' }).click();
    await page.getByRole('menuitem', { name: 'Image' }).click();

    await expect.poll(() => page.evaluate(() => window.imageRte?.picks)).toBe(1);
    await expect.poll(() => page.evaluate(() => window.imageRte?.changes)).toBe(1);
    await expect(surfaceOf(page).locator('figure')).toHaveCount(2);
});

test('reserves no box beyond the viewport for a stored size much taller than the file, in the editor and the reader', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="extreme" />);
    await ready(page);
    const size = page.viewportSize();
    const viewportHeight = size?.height;
    const viewport = viewportHeight ?? 0;

    for (const root of [surfaceOf(page), readerOf(page)]) {
        const box = await root.locator('figure').first().boundingBox();
        const height = box?.height;
        expect(height ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(viewport);
    }
});

test('shows the placeholder in place of a reader image that fails to load', async ({ mount, page }) => {
    await mount(<ImageProbe content="broken" />);
    await ready(page);
    const figure = readerOf(page).locator('figure');

    await expect(figure).toHaveAttribute('data-rte-image-failed');
    await expect(figure.locator('img')).toBeHidden();
    await expect(figure.locator('[data-rte-image-unavailable]')).toBeVisible();
    await expect(figure.locator('[data-rte-image-unavailable]')).toHaveText('Image unavailable logo.png');
});

test('places a left and a right figure on those physical sides in the editor and the reader of a right-to-left page', async ({
    mount,
    page,
}) => {
    await mount(<ImageProbe content="sides" dir="rtl" />);
    await ready(page);
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(2);

    for (const root of [surfaceOf(page), readerOf(page)]) {
        const sides = await root.locator('figure').evaluateAll((figures) =>
            figures.map((figure) => {
                const outer = figure.getBoundingClientRect();
                const image = figure.querySelector('img')?.getBoundingClientRect();
                const imageLeft = image?.left;
                const imageRight = image?.right;
                const left = imageLeft ?? 0;
                const right = imageRight ?? 0;

                return { left: left - outer.left, right: outer.right - right };
            }),
        );
        const [left, right] = sides;
        const leftStart = left?.left;
        const leftEnd = left?.right;
        const rightStart = right?.left;
        const rightEnd = right?.right;
        expect(leftStart).toBeLessThan(leftEnd ?? 0);
        expect(rightEnd).toBeLessThan(rightStart ?? 0);
    }
});

test('prints a mention chip and the image, and leaves out the image toolbar', async ({ mount, page }) => {
    await mount(<ImageProbe content="print" />);
    await ready(page);
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(1);

    await page.emulateMedia({ media: 'print' });

    await expect(surfaceOf(page).getByText('@Ada')).toBeVisible();
    await expect(surfaceOf(page).locator('figure img')).toBeVisible();
    await expect(surfaceOf(page).getByRole('toolbar', { name: 'Image' })).toBeHidden();
});

test('keeps focus in the width field once Custom width closes the size menu', async ({ mount, page }) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    await expect(surfaceOf(page).locator('figure img')).toHaveCount(1);

    const size = surfaceOf(page).getByRole('button', { name: 'Size: Original size' });
    await size.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('menuitemradio', { name: 'Original size' })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitem', { name: 'Custom width…' })).toBeFocused();
    await page.keyboard.press('Enter');

    const field = page.getByRole('spinbutton', { name: 'Width in percent of the content width' });
    await expect(field).toBeFocused();
    await page.waitForTimeout(300);
    await expect(field).toBeFocused();
});

test('moves a selected image by dragging it, keeping its nodeId, as one undo step', async ({ mount, page }) => {
    await mount(<ImageProbe content="still" />);
    await ready(page);
    const image = surfaceOf(page).locator('figure img');
    await expect(image).toHaveCount(1);
    await image.click();

    await image.dragTo(surfaceOf(page).getByText('After'), { targetPosition: { x: 40, y: 8 } });

    await expect
        .poll(() =>
            page.evaluate(() =>
                (window.imageRte?.handle.getSnapshot().document.content.content ?? []).map((block) => {
                    if (block.type !== 'figure') {
                        return block.type;
                    }

                    const first = block.content?.[0];
                    const attrs = first?.attrs;

                    return `figure:${JSON.stringify(attrs?.nodeId)}`;
                }),
            ),
        )
        .toEqual(['paragraph', 'paragraph', 'figure:"image-1"']);
    expect(await page.evaluate(() => window.imageRte?.changes)).toBe(1);
});
