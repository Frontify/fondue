/* (c) Copyright Frontify Ltd., all rights reserved. */

// The longest side of a still in device pixels, whatever the image's own size.
const MAX_STILL = 4096;

/**
 * Draws the image's current frame on `canvas`, a still that covers it while its animation is paused, at the size the
 * image shows, in device pixels, at most `MAX_STILL` on either side.
 */
export const drawStill = (image: HTMLImageElement | null, canvas: HTMLCanvasElement | null) => {
    if (image === null || canvas === null || !image.complete || image.naturalWidth === 0) {
        return;
    }

    const { width, height } = image.getBoundingClientRect();
    const view = image.ownerDocument.defaultView;
    let ratio = 1;
    if (view !== null) {
        ratio = view.devicePixelRatio;
    }

    canvas.width = Math.max(1, Math.min(MAX_STILL, Math.round(width * ratio)));
    canvas.height = Math.max(1, Math.min(MAX_STILL, Math.round(height * ratio)));
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
};
