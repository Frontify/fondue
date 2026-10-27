/* (c) Copyright Frontify Ltd., all rights reserved. */

/** What a file's first bytes say: its media type by content, and an image's intrinsic size, never decoded. */
export type ImageHeader = {
    /** `null` when the content matches no type this reader knows. */
    mediaType: string | null;
    width: number | null;
    height: number | null;
};

const UNKNOWN: ImageHeader = { mediaType: null, width: null, height: null };
// Enough for every signature and fixed-place size below; JPEG and AVIF read further where they need to.
const HEAD_BYTES = 64;
const TEXT_BYTES = 1024;
// The bytes one read takes from the file, so walking a JPEG's or an AVIF's structure reads it in a few slices.
const WINDOW_BYTES = 1024 * 1024;
// The markers, fill bytes or boxes one walk reads at most; a file that needs more has no size this reader can tell.
const MAX_STEPS = 4096;

const bytesOf = async (blob: Blob, start: number, length: number): Promise<Uint8Array> =>
    new Uint8Array(await blob.slice(start, start + length).arrayBuffer());

/** Reads `blob` through one window of `WINDOW_BYTES` at a time, which a walk of its structure moves along. */
const windowed = (blob: Blob) => {
    let start = 0;
    let bytes: Uint8Array = new Uint8Array();

    return async (at: number, length: number): Promise<Uint8Array> => {
        if (at < start || at + length > start + bytes.length) {
            start = at;
            bytes = await bytesOf(blob, at, Math.max(length, WINDOW_BYTES));
        }

        return bytes.subarray(at - start, at - start + length);
    };
};

const ascii = (bytes: Uint8Array, start: number, length: number) =>
    String.fromCodePoint(...bytes.subarray(start, start + length));

const uint16BE = (bytes: Uint8Array, at: number) => ((bytes[at] ?? 0) << 8) | (bytes[at + 1] ?? 0);
const uint16LE = (bytes: Uint8Array, at: number) => (bytes[at] ?? 0) | ((bytes[at + 1] ?? 0) << 8);
const uint24LE = (bytes: Uint8Array, at: number) => uint16LE(bytes, at) | ((bytes[at + 2] ?? 0) << 16);
const uint32BE = (bytes: Uint8Array, at: number) => uint16BE(bytes, at) * 65_536 + uint16BE(bytes, at + 2);

const sized = (mediaType: string, width: number, height: number): ImageHeader => ({ mediaType, width, height });

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** A PNG by its signature and the `IHDR` chunk that must follow it; other bytes after the signature are no PNG. */
const png = (head: Uint8Array): ImageHeader | undefined => {
    if (!PNG_SIGNATURE.every((byte, index) => head[index] === byte) || ascii(head, 12, 4) !== 'IHDR') {
        return undefined;
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

/** A WebP by its RIFF header and a `VP8 `, `VP8L` or `VP8X` chunk with its size; any other chunk is no WebP. */
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

    return undefined;
};

// Markers with no length after them: TEM and the restart markers.
const STANDALONE = new Set([0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7]);
const START_OF_SCAN = 0xda;
const END_OF_IMAGE = 0xd9;

/**
 * The frame header of a JPEG, found by walking its segments from the start of the file up to the start of the scan,
 * however many come first; a JPEG with none before it has no size this reader can tell.
 */
const jpeg = async (blob: Blob, head: Uint8Array): Promise<ImageHeader | undefined> => {
    if (head[0] !== 0xff || head[1] !== 0xd8 || head[2] !== 0xff) {
        return undefined;
    }

    const read = windowed(blob);
    let at = 2;
    for (let step = 0; step < MAX_STEPS && at + 4 <= blob.size; step += 1) {
        const marker = await read(at, 9);
        if (marker[0] !== 0xff) {
            break;
        }

        const code = marker[1] ?? 0;
        // Fill bytes may pad a marker.
        if (code === 0xff) {
            at += 1;
            continue;
        }

        if (code === START_OF_SCAN || code === END_OF_IMAGE) {
            return { ...UNKNOWN, mediaType: 'image/jpeg' };
        }

        // SOF0 to SOF15, except DHT (C4), JPG (C8) and DAC (CC), which share the range.
        if (code >= 0xc0 && code <= 0xcf && code !== 0xc4 && code !== 0xc8 && code !== 0xcc) {
            return sized('image/jpeg', uint16BE(marker, 7), uint16BE(marker, 5));
        }

        if (STANDALONE.has(code)) {
            at += 2;
        } else {
            at += 2 + uint16BE(marker, 2);
        }
    }

    return { ...UNKNOWN, mediaType: 'image/jpeg' };
};

/** One ISO base media box: its type, where its content starts and where it ends. */
type Box = {
    type: string;
    content: number;
    end: number;
};

/** The boxes between `start` and `end`, read from their headers alone, up to `MAX_STEPS` of them. */
const boxesIn = async (read: ReturnType<typeof windowed>, start: number, end: number): Promise<Box[]> => {
    const boxes: Box[] = [];
    let at = start;
    while (at + 8 <= end && boxes.length < MAX_STEPS) {
        const header = await read(at, 16);
        let size = uint32BE(header, 0);
        let content = at + 8;
        if (size === 1) {
            size = uint32BE(header, 8) * 2 ** 32 + uint32BE(header, 12);
            content = at + 16;
        } else if (size === 0) {
            size = end - at;
        }

        if (size < content - at) {
            break;
        }

        boxes.push({ type: ascii(header, 4, 4), content, end: Math.min(end, at + size) });
        at += size;
    }

    return boxes;
};

/**
 * The largest `ispe` property of an AVIF, which holds the primary image's size, found through its boxes:
 * `meta`, then `iprp`, then `ipco`, wherever they sit in the file.
 */
const avif = async (blob: Blob, head: Uint8Array): Promise<ImageHeader | undefined> => {
    if (ascii(head, 4, 4) !== 'ftyp') {
        return undefined;
    }

    const brands = ascii(head, 8, Math.min(uint32BE(head, 0), HEAD_BYTES) - 8);
    if (!/avi[fs]/.test(brands)) {
        return undefined;
    }

    const read = windowed(blob);
    const child = async (box: Box | undefined, type: string, skip = 0) => {
        if (box === undefined) {
            return undefined;
        }

        const children = await boxesIn(read, box.content + skip, box.end);

        return children.find((found) => found.type === type);
    };

    const top = await boxesIn(read, 0, blob.size);
    const meta = top.find(({ type }) => type === 'meta');
    // `meta` is a full box, whose version and flags come before its children.
    const properties = await child(await child(meta, 'iprp', 4), 'ipco');
    let width = 0;
    let height = 0;
    if (properties !== undefined) {
        for (const box of await boxesIn(read, properties.content, properties.end)) {
            if (box.type !== 'ispe') {
                continue;
            }

            const values = await read(box.content, 12);
            const [w, h] = [uint32BE(values, 4), uint32BE(values, 8)];
            if (w * h > width * height) {
                width = w;
                height = h;
            }
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
    let found = png(head);
    if (found === undefined) {
        found = gif(head);
    }

    if (found === undefined) {
        found = webp(head);
    }

    if (found === undefined) {
        found = await jpeg(blob, head);
    }

    if (found === undefined) {
        found = await avif(blob, head);
    }

    if (found !== undefined) {
        return found;
    }

    const text = new TextDecoder().decode(await bytesOf(blob, 0, TEXT_BYTES));

    return markup(text) ?? UNKNOWN;
};

const NAMED_REFERENCES: Readonly<Record<string, string>> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };

/** `text` with its numeric and basic named character references decoded, as an XML parser reads them. */
const decodeReferences = (text: string) =>
    text.replaceAll(/&(?:#x([\da-f]+)|#(\d+)|([a-z]+));?/gi, (whole, hex?: string, decimal?: string, name?: string) => {
        if (name !== undefined) {
            return NAMED_REFERENCES[name.toLowerCase()] ?? whole;
        }

        const digits = hex ?? decimal;
        const radix = hex === undefined ? 10 : 16;
        const code = Number.parseInt(digits ?? '', radix);
        if (Number.isInteger(code) && code >= 0 && code <= 0x10_ff_ff) {
            return String.fromCodePoint(code);
        }

        return whole;
    });

const ENTITY_DECLARATION = /<!ENTITY\s+([^\s%>"']+)\s+(?:"([^"<&]*)"|'([^'<&]*)')\s*>/gi;

/**
 * `decoded` with the references to the entities it declares replaced by their text, or `undefined` when a
 * declaration could hold markup or another reference, refers to an outside file, names an entity again, or is not
 * one this reader can tell, or when the replaced text would grow past twice the file.
 */
const expandEntities = (decoded: string): string | undefined => {
    const declarations = [...decoded.matchAll(ENTITY_DECLARATION)];
    const mentions = decoded.match(/<!ENTITY/gi)?.length;
    if ((mentions ?? 0) !== declarations.length) {
        return undefined;
    }

    const values = new Map<string, string>();
    for (const [, name = '', double, single] of declarations) {
        if (values.has(name)) {
            return undefined;
        }

        const declared = double ?? single;
        values.set(name, declared ?? '');
    }

    if (values.size === 0) {
        return decoded;
    }

    const references = [...decoded.matchAll(/&([^\s&;<>]+);/g)];
    const grown = references.reduce((total, [whole, name = '']) => total + (values.get(name) ?? whole).length, 0);
    if (grown > decoded.length * 2) {
        return undefined;
    }

    return decoded.replaceAll(/&([^\s&;<>]+);/g, (whole, name: string) => values.get(name) ?? whole);
};

/**
 * Whether an SVG's text holds active content once its character references and the entities it declares are
 * expanded: a `script` or `foreignObject` element under any prefix, an event handler attribute or a `javascript:`
 * reference, which tabs and line breaks inside it do not hide. An entity whose text holds markup or a reference is
 * refused outright, since only a full XML parser could tell what it builds.
 */
export const svgHoldsScript = (text: string): boolean => {
    const decoded = expandEntities(decodeReferences(text));
    if (decoded === undefined) {
        return true;
    }

    const compact = decoded.replaceAll(/[\t\n\r]/g, '');

    return (
        /<\s*(?:[^\s"'/:<=>]+:)?(?:script|foreignobject)[\s>/]/i.test(decoded) ||
        /[\s"'/]on[a-z]+\s*=/i.test(decoded) ||
        /javascript\s*:/i.test(compact)
    );
};
