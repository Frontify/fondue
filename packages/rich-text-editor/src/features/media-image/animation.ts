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

/**
 * Whether an image may animate: `ImageDecoder` reads the file's first track where the browser has it, and where it is
 * missing, cannot read the file or its type, the image counts as possibly animated, so its chrome offers Pause.
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
        const response = await fetch(src, { signal });
        const type = mediaType ?? response.headers.get('content-type') ?? '';
        if (!response.ok || response.body === null || !(await decoderClass.isTypeSupported(type))) {
            return true;
        }
        const decoder = new decoderClass({ data: response.body, type });
        try {
            await decoder.tracks.ready;
            return decoder.tracks.selectedTrack?.animated ?? true;
        } finally {
            decoder.close();
        }
    } catch {
        return true;
    }
};
