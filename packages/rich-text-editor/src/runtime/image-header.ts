/* (c) Copyright Frontify Ltd., all rights reserved. */

/** What a file's first bytes say: its media type by content, and an image's intrinsic size, never decoded. */
export interface ImageHeader {
    /** `null` when the content matches no type this reader knows. */
    readonly mediaType: string | null;
    readonly width: number | null;
    readonly height: number | null;
}

const UNKNOWN: ImageHeader = { mediaType: null, width: null, height: null };
// Enough for every signature and fixed-place size below; JPEG and AVIF read further where they need to.
const HEAD_BYTES = 64;
const TEXT_BYTES = 1024;
const BOX_BYTES = 64 * 1024;
// A JPEG whose frame header is further in holds metadata no camera writes.
const MAX_JPEG_SEGMENTS = 256;

const bytesOf = async (blob: Blob, start: number, length: number): Promise<Uint8Array> =>
    new Uint8Array(await blob.slice(start, start + length).arrayBuffer());

const ascii = (bytes: Uint8Array, start: number, length: number) =>
    String.fromCodePoint(...bytes.subarray(start, start + length));

const uint16BE = (bytes: Uint8Array, at: number) => ((bytes[at] ?? 0) << 8) | (bytes[at + 1] ?? 0);
const uint16LE = (bytes: Uint8Array, at: number) => (bytes[at] ?? 0) | ((bytes[at + 1] ?? 0) << 8);
const uint24LE = (bytes: Uint8Array, at: number) => uint16LE(bytes, at) | ((bytes[at + 2] ?? 0) << 16);
const uint32BE = (bytes: Uint8Array, at: number) => uint16BE(bytes, at) * 65_536 + uint16BE(bytes, at + 2);

const sized = (mediaType: string, width: number, height: number): ImageHeader => ({ mediaType, width, height });

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const png = (head: Uint8Array): ImageHeader | undefined => {
    if (!PNG_SIGNATURE.every((byte, index) => head[index] === byte)) {
        return undefined;
    }
    if (ascii(head, 12, 4) !== 'IHDR') {
        return { ...UNKNOWN, mediaType: 'image/png' };
    }
    return sized('image/png', uint32BE(head, 16), uint32BE(head, 20));
};

const gif = (head: Uint8Array): ImageHeader | undefined => {
    const signature = ascii(head, 0, 6);
    if (signature !== 'GIF87a' && signature !== 'GIF89a') {
        return undefined;
    }
    return sized('image/gif', uint16LE(head, 6), uint16LE(head, 8));
};

const webp = (head: Uint8Array): ImageHeader | undefined => {
    if (ascii(head, 0, 4) !== 'RIFF' || ascii(head, 8, 4) !== 'WEBP') {
        return undefined;
    }
    const chunk = ascii(head, 12, 4);
    if (chunk === 'VP8 ') {
        return sized('image/webp', uint16LE(head, 26) & 0x3f_ff, uint16LE(head, 28) & 0x3f_ff);
    }
    if (chunk === 'VP8L') {
        const [b0 = 0, b1 = 0, b2 = 0, b3 = 0] = head.subarray(21, 25);
        return sized('image/webp', 1 + (b0 | ((b1 & 0x3f) << 8)), 1 + ((b1 >> 6) | (b2 << 2) | ((b3 & 0x0f) << 10)));
    }
    if (chunk === 'VP8X') {
        return sized('image/webp', 1 + uint24LE(head, 24), 1 + uint24LE(head, 27));
    }
    return { ...UNKNOWN, mediaType: 'image/webp' };
};

/** The frame header of a JPEG, found by walking its segments from the start of the file. */
const jpeg = async (blob: Blob, head: Uint8Array): Promise<ImageHeader | undefined> => {
    if (head[0] !== 0xff || head[1] !== 0xd8 || head[2] !== 0xff) {
        return undefined;
    }
    let at = 2;
    for (let segment = 0; segment < MAX_JPEG_SEGMENTS && at + 4 <= blob.size; segment += 1) {
        const marker = await bytesOf(blob, at, 9);
        if (marker[0] !== 0xff) {
            break;
        }
        const code = marker[1] ?? 0;
        // SOF0 to SOF15, except DHT (C4), JPG (C8) and DAC (CC), which share the range.
        if (code >= 0xc0 && code <= 0xcf && code !== 0xc4 && code !== 0xc8 && code !== 0xcc) {
            return sized('image/jpeg', uint16BE(marker, 7), uint16BE(marker, 5));
        }
        at += 2 + uint16BE(marker, 2);
    }
    return { ...UNKNOWN, mediaType: 'image/jpeg' };
};

/** The largest `ispe` property of an AVIF, which holds the primary image's size, in the file's first boxes. */
const avif = async (blob: Blob, head: Uint8Array): Promise<ImageHeader | undefined> => {
    if (ascii(head, 4, 4) !== 'ftyp') {
        return undefined;
    }
    const brands = ascii(head, 8, Math.min(uint32BE(head, 0), HEAD_BYTES) - 8);
    if (!/avi[fs]/.test(brands)) {
        return undefined;
    }
    const boxes = await bytesOf(blob, 0, BOX_BYTES);
    let width = 0;
    let height = 0;
    for (let at = boxes.indexOf(0x69); at >= 0 && at + 16 <= boxes.length; at = boxes.indexOf(0x69, at + 1)) {
        if (ascii(boxes, at, 4) === 'ispe' && uint32BE(boxes, at + 8) * uint32BE(boxes, at + 12) > width * height) {
            width = uint32BE(boxes, at + 8);
            height = uint32BE(boxes, at + 12);
        }
    }
    if (width === 0) {
        return { ...UNKNOWN, mediaType: 'image/avif' };
    }
    return sized('image/avif', width, height);
};

/** SVG and HTML by their opening markup, after a byte order mark, white space, an XML declaration or comments. */
const markup = (text: string): ImageHeader | undefined => {
    const start = text.replace(/^\uFEFF?\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*/i, '').toLowerCase();
    if (start.startsWith('<svg') || (start.startsWith('<!doctype svg') && start.includes('<svg'))) {
        return { ...UNKNOWN, mediaType: 'image/svg+xml' };
    }
    if (/^<(!doctype html|html|head|body|script|iframe|div|p)[\s>]/.test(start)) {
        return { ...UNKNOWN, mediaType: 'text/html' };
    }
    return undefined;
};

/** Reads the media type and size `blob` declares in its first bytes, without decoding it. */
export const readImageHeader = async (blob: Blob): Promise<ImageHeader> => {
    const head = await bytesOf(blob, 0, HEAD_BYTES);
    const found = png(head) ?? gif(head) ?? webp(head) ?? (await jpeg(blob, head)) ?? (await avif(blob, head));
    if (found !== undefined) {
        return found;
    }
    const text = new TextDecoder().decode(await bytesOf(blob, 0, TEXT_BYTES));
    return markup(text) ?? UNKNOWN;
};

/** Whether an SVG's text holds script: a `script` element, an event handler attribute or a `javascript:` URL. */
export const svgHoldsScript = (text: string): boolean =>
    /<script[\s>/]/i.test(text) || /\son[a-z]+\s*=/i.test(text) || /javascript\s*:/i.test(text);
