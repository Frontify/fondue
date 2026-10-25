/* (c) Copyright Frontify Ltd., all rights reserved. */

import { crc32, deflateSync } from 'node:zlib';

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { decodableImage, sampleImage } from '#/testing/images';

import { UploadProbe } from './fixtures/UploadProbe';

/** One PNG chunk with its length and CRC. */
const chunk = (type: string, data: Buffer) => {
    const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body), body.length + 4);
    return out;
};

/** A valid, decodable greyscale PNG of `width` by `height` pixels, as the uploaded file's asset is. */
const decodablePng = (width: number, height: number) => {
    const header = Buffer.alloc(13);
    header.writeUInt32BE(width, 0);
    header.writeUInt32BE(height, 4);
    header.set([8, 0, 0, 0, 0], 8);
    // Each row is a filter byte, then one byte per pixel.
    const rows = Buffer.alloc((width + 1) * height);
    const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return Buffer.concat([
        signature,
        chunk('IHDR', header),
        chunk('IDAT', deflateSync(rows)),
        chunk('IEND', Buffer.alloc(0)),
    ]);
};

/** The bytes of a PNG whose header declares `width` by `height` pixels. */
const pngBytes = (width: number, height: number) => {
    const bytes = Buffer.alloc(33);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(bytes, 0);
    bytes.writeUInt32BE(13, 8);
    bytes.write('IHDR', 12, 'latin1');
    bytes.writeUInt32BE(width, 16);
    bytes.writeUInt32BE(height, 20);
    bytes.set([8, 6, 0, 0, 0], 24);
    return bytes;
};

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.uploadRte !== undefined)).toBe(true);
};
const imagesOf = (page: Page) => page.evaluate(() => window.uploadRte?.images() ?? []);

/** Puts the caret at the end of the paragraph `Before`, then chooses `logo.png` in the file chooser that Image opens. */
const chooseLogo = async (page: Page, width = 40, height = 30) => {
    await page.evaluate(() => {
        const rte = window.uploadRte;
        rte?.setSelection(rte.handle, { text: 'Before', from: 6, to: 6 });
        rte?.handle.focus();
    });
    const opened = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Image' }).click();
    const chooser = await opened;
    await chooser.setFiles({ name: 'logo.png', mimeType: 'image/png', buffer: pngBytes(width, height) });
    await expect.poll(() => page.evaluate(() => window.uploadRte?.requests().length)).toBe(1);
};

test('starts an upload of a 40 by 30 pixel logo.png with its file name as labelSnapshot and its measured size', async ({
    mount,
    page,
}) => {
    await mount(<UploadProbe />);
    await ready(page);

    await chooseLogo(page);

    expect(await imagesOf(page)).toEqual([
        expect.objectContaining({ assetId: null, labelSnapshot: 'logo.png', width: 40, height: 30 }),
    ]);
    await expect(surfaceOf(page).getByRole('progressbar', { name: 'logo.png' })).toBeVisible();
});

test('shows the upload slot of the first upload before any idle prefetch ran', async ({ mount, page }) => {
    // An idle callback that never runs leaves the lazy code unloaded until its first use.
    await page.addInitScript(() => {
        window.requestIdleCallback = () => 0;
    });
    await mount(<UploadProbe />);
    await ready(page);

    await chooseLogo(page);

    await expect(surfaceOf(page).getByRole('progressbar', { name: 'logo.png' })).toBeVisible();
    await expect(surfaceOf(page).locator('figure [data-rte-upload]')).toBeVisible();
});

test('keeps the height of the image box when the uploaded image loads', async ({ mount, page }) => {
    let serve: () => void = () => undefined;
    const served = new Promise<void>((resolve) => {
        serve = resolve;
    });
    // The asset has the size of the uploaded file, as the host's server stores it.
    await page.route('**/test-assets/**', async (route) => {
        await served;
        await route.fulfill({ contentType: 'image/png', body: decodablePng(400, 300) });
    });
    await mount(<UploadProbe />);
    await ready(page);
    await chooseLogo(page, 400, 300);
    const slot = surfaceOf(page).locator('figure [data-rte-upload]');
    const slotBox = await slot.boundingBox();

    await page.evaluate(() => window.uploadRte?.complete(0, 'logo-asset'));
    const image = surfaceOf(page).locator('figure img');
    await expect(image).toHaveCount(1);
    const before = await image.boundingBox();
    serve();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).complete)).toBe(true);
    const after = await image.boundingBox();
    const natural = await image.evaluate((element) => [
        (element as HTMLImageElement).naturalWidth,
        (element as HTMLImageElement).naturalHeight,
    ]);

    expect(natural).toEqual([400, 300]);
    expect(before?.height).toBeGreaterThan(0);
    const beforeHeight = before?.height;
    expect(after?.height).toBe(beforeHeight);
    const slotHeight = slotBox?.height;
    const expectedHeight = beforeHeight ?? 0;
    expect(slotHeight).toBeCloseTo(expectedHeight, 0);
});

test('shows the drop cursor at the nearest block boundary for a dropped file and inserts its upload slot there', async ({
    mount,
    page,
}) => {
    await mount(<UploadProbe texts={['first', 'second']} />);
    await ready(page);
    const box = await surfaceOf(page).locator('p').nth(1).boundingBox();
    if (box === null) {
        throw new Error('no paragraph box');
    }
    // Over the text of `second`, nearer its start, so the boundary above it is nearest.
    const point = { x: box.x + 8, y: box.y + box.height / 2 };
    const send = (type: string) =>
        page.evaluate(
            ({ x, y, eventType, bytes }) => {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(new File([Uint8Array.from(bytes)], 'logo.png', { type: 'image/png' }));
                const surface = document.querySelector('[data-rte-surface]') as HTMLElement;
                surface.dispatchEvent(
                    new DragEvent(eventType, { dataTransfer, clientX: x, clientY: y, bubbles: true, cancelable: true }),
                );
            },
            { ...point, eventType: type, bytes: [...pngBytes(40, 30)] },
        );

    await send('dragenter');
    await send('dragover');
    const cursor = page.locator('.prosemirror-dropcursor-block');
    await expect(cursor).toHaveCount(1);
    const shown = await cursor.boundingBox();
    await send('drop');

    await expect
        .poll(() => page.evaluate(() => window.uploadRte?.blocks()))
        .toEqual(['paragraph', 'figure', 'paragraph']);
    await expect(cursor).toHaveCount(0);
    expect(shown?.y).toBeLessThanOrEqual(box.y);
    expect(await page.evaluate(() => window.uploadRte?.changes.map(({ origin }) => origin))).toEqual(['drop']);
});

test('moves the determinate progress bar to each step with no transition under reduced motion', async ({
    mount,
    page,
}) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await mount(<UploadProbe />);
    await ready(page);
    await chooseLogo(page);

    await page.evaluate(() => window.uploadRte?.progress(0, 0.4));
    const indicator = surfaceOf(page)
        .getByRole('progressbar', { name: 'logo.png' })
        .locator('[data-indeterminate="false"]');
    await expect(indicator).toHaveCount(1);

    expect(await indicator.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
});

test.describe('with a coarse pointer', () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });

    test('gives the upload Cancel and Retry targets of at least 44 by 44 CSS pixels', async ({ mount, page }) => {
        await mount(<UploadProbe />);
        await ready(page);
        await chooseLogo(page);
        const cancel = surfaceOf(page).getByRole('button', { name: 'Cancel upload' });
        const cancelBox = await cancel.boundingBox();

        await page.evaluate(() => window.uploadRte?.fail(0));
        const retry = surfaceOf(page).getByRole('button', { name: 'Retry upload' });
        await expect(retry).toBeVisible();
        const retryBox = await retry.boundingBox();

        for (const found of [cancelBox, retryBox]) {
            expect(found?.width).toBeGreaterThanOrEqual(44);
            expect(found?.height).toBeGreaterThanOrEqual(44);
        }
    });
});

test('decodes every image the upload conformance kit builds and samples, at the size it declares', async ({
    mount,
    page,
}) => {
    await mount(<UploadProbe />);
    await ready(page);
    const images: {
        readonly label: string;
        readonly type: string;
        readonly base64: string;
        readonly size: [number, number];
    }[] = [];
    const sizes: [number, number][] = [
        [1, 1],
        [40, 30],
        [3000, 3000],
    ];
    for (const type of ['image/png', 'image/gif', 'image/jpeg'] as const) {
        for (const [width, height] of sizes) {
            const bytes = await decodableImage(type, width, height, width === 40 ? 70_000 : 0);
            images.push({
                label: `${type} ${width}x${height}`,
                type,
                base64: Buffer.from(bytes).toString('base64'),
                size: [width, height],
            });
        }
    }
    for (const type of ['image/webp', 'image/avif'] as const) {
        for (const padding of [0, 5000]) {
            const sample = await sampleImage(type, padding);
            const size: [number, number] = type === 'image/avif' ? [2, 2] : [1, 1];
            const bytes = sample?.bytes;
            images.push({
                label: `${type} +${padding}`,
                type,
                base64: Buffer.from(bytes ?? []).toString('base64'),
                size,
            });
        }
    }

    const decoded = await page.evaluate(
        async (all) =>
            Promise.all(
                all.map(async ({ label, type, base64 }) => {
                    const bytes = Uint8Array.from(atob(base64), (character) => character.codePointAt(0) ?? 0);
                    try {
                        const bitmap = await createImageBitmap(new Blob([bytes], { type }));
                        return [label, bitmap.width, bitmap.height];
                    } catch (error) {
                        return [label, String(error)];
                    }
                }),
            ),
        images.map(({ label, type, base64 }) => ({ label, type, base64 })),
    );

    expect(decoded).toEqual(images.map(({ label, size }) => [label, ...size]));
});
