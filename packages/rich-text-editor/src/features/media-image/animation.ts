/* (c) Copyright Frontify Ltd., all rights reserved. */

interface Decoder {
    readonly tracks: { readonly ready: Promise<void>; readonly selectedTrack: { readonly animated: boolean } | null };
    close(): void;
}
interface DecoderClass {
    new (init: { readonly data: ReadableStream<Uint8Array>; readonly type: string }): Decoder;
    isTypeSupported(type: string): Promise<boolean>;
}

// Formats that hold one frame only.
const STILL_TYPES: ReadonlySet<string> = new Set(['image/jpeg', 'image/bmp']);
// A file larger than this is not read to tell; it counts as possibly animated.
const MAX_PROBE_BYTES = 8 * 1024 * 1024;

/**
 * Whether an image may animate: `ImageDecoder` reads the file's first track where the browser has it, with no
 * credentials, and where it is missing, cannot read the file or its type, or the file declares more than
 * `MAX_PROBE_BYTES`, the image counts as possibly animated, so its chrome offers Pause.
 */
export const mayAnimate = async (src: string, mediaType: string | null, signal: AbortSignal): Promise<boolean> => {
    if (mediaType !== null && STILL_TYPES.has(mediaType)) {
        return false;
    }
    const decoderClass = (globalThis as { readonly ImageDecoder?: DecoderClass }).ImageDecoder;
    if (decoderClass === undefined) {
        return true;
    }
    try {
        const response = await fetch(src, { signal, credentials: 'omit' });
        const reported = mediaType ?? response.headers.get('content-type');
        const type = reported ?? '';
        const declared = Number(response.headers.get('content-length') ?? 0);
        if (!response.ok || response.body === null || declared > MAX_PROBE_BYTES) {
            await response.body?.cancel();
            return true;
        }
        if (!(await decoderClass.isTypeSupported(type))) {
            await response.body.cancel();
            return true;
        }
        const decoder = new decoderClass({ data: response.body, type });
        try {
            await decoder.tracks.ready;
            const animated = decoder.tracks.selectedTrack?.animated;
            return animated ?? true;
        } finally {
            decoder.close();
        }
    } catch {
        return true;
    }
};
