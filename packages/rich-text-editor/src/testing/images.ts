/* (c) Copyright Frontify Ltd., all rights reserved. */

// Decodable images of any size in a few bytes, built here, so the conformance kit needs no image library.

/** The types the kit builds images of at any size, in the order it prefers them. */
export const SIZED_TYPES = ['image/png', 'image/gif', 'image/jpeg'] as const;
export type SizedType = (typeof SIZED_TYPES)[number];

/** Bytes over an `ArrayBuffer` of their own, which a `Blob` takes. */
export type Bytes = Uint8Array<ArrayBuffer>;

const bytesOf = (base64: string): Bytes => Uint8Array.from(atob(base64), (character) => character.codePointAt(0) ?? 0);

// A 1 by 1 lossless WebP and a 2 by 2 AVIF, valid to decode, for the types the kit builds no size of.
const WEBP_SAMPLE = 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
const AVIF_SAMPLE =
    'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYA' +
    'AAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IA' +
    'AAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAA' +
    'AAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

const concat = (parts: readonly Uint8Array[]): Bytes => {
    const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
    let at = 0;
    for (const part of parts) {
        out.set(part, at);
        at += part.length;
    }
    return out;
};

const uint16LE = (value: number) => Uint8Array.from([value & 0xff, (value >> 8) & 0xff]);
const uint16BE = (value: number) => Uint8Array.from([(value >> 8) & 0xff, value & 0xff]);
const uint32BE = (value: number) =>
    Uint8Array.from([value >>> 24, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);

const CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
        value = (value & 1) === 1 ? 0xed_b8_83_20 ^ (value >>> 1) : value >>> 1;
    }
    return value >>> 0;
});

/** One PNG chunk with its length and CRC. */
export const pngChunk = (type: string, data: Uint8Array): Bytes => {
    const body = concat([Uint8Array.from([...type].map((character) => character.codePointAt(0) ?? 0)), data]);
    let crc = 0xff_ff_ff_ff;
    for (const byte of body) {
        crc = (CRC_TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8);
    }
    return concat([uint32BE(data.length), body, uint32BE((crc ^ 0xff_ff_ff_ff) >>> 0)]);
};

const PNG_SIGNATURE = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** `total` zero bytes through a zlib stream, written a mebibyte at a time. */
const deflatedZeros = async (total: number): Promise<Bytes> => {
    const stream = new CompressionStream('deflate');
    const writer = stream.writable.getWriter();
    const reading = new Response(stream.readable).arrayBuffer();
    const zeros = new Uint8Array(Math.min(total, 1024 * 1024));
    for (let left = total; left > 0; left -= zeros.length) {
        await writer.write(left >= zeros.length ? zeros : zeros.subarray(0, left));
    }
    await writer.close();
    return new Uint8Array(await reading);
};

/** A black greyscale PNG, each row a filter byte and a byte per pixel. */
const png = async (width: number, height: number, padding: number): Promise<Bytes> => {
    const header = concat([uint32BE(width), uint32BE(height), Uint8Array.from([8, 0, 0, 0, 0])]);
    const parts: Uint8Array[] = [
        PNG_SIGNATURE,
        pngChunk('IHDR', header),
        pngChunk('IDAT', await deflatedZeros((width + 1) * height)),
    ];
    if (padding > 0) {
        // An ancillary, private, safe-to-copy chunk, which decoders skip.
        parts.push(pngChunk('paDd', new Uint8Array(Math.max(0, padding - 12))));
    }
    parts.push(pngChunk('IEND', new Uint8Array()));
    return concat(parts);
};

/** The LZW codes of `count` pixels of colour 0, with a minimum code size of 2, packed as GIF reads them. */
const lzwZeros = (count: number): Bytes => {
    const clear = 4;
    const end = 5;
    const bytes: number[] = [];
    let buffer = 0;
    let bits = 0;
    let size = 3;
    const emit = (code: number) => {
        buffer |= code << bits;
        bits += size;
        while (bits >= 8) {
            bytes.push(buffer & 0xff);
            buffer >>>= 8;
            bits -= 8;
        }
    };
    // The code width follows the decoder, which adds an entry for each code after the first since a clear.
    let entries = end + 1;
    let first = true;
    // Each entry the encoder adds holds one more pixel than the last, so `longest` is the longest run it has.
    let longest = 1;
    const restart = () => {
        emit(clear);
        size = 3;
        entries = end + 1;
        first = true;
        longest = 1;
    };
    restart();
    for (let left = count; left > 0; ) {
        const run = Math.min(longest, left);
        emit(run === 1 ? 0 : end + run - 1);
        if (!first && entries < 4096) {
            entries += 1;
            if (entries >= 1 << size && size < 12) {
                size += 1;
            }
        }
        first = false;
        left -= run;
        if (left > 0 && run === longest) {
            longest += 1;
        }
        // A full table starts over before its next code would pass 12 bits.
        if (end + longest >= 4094) {
            restart();
        }
    }
    emit(end);
    if (bits > 0) {
        bytes.push(buffer & 0xff);
    }
    // Data sub-blocks of at most 255 bytes, then the block terminator.
    const blocks: number[] = [];
    for (let at = 0; at < bytes.length; at += 255) {
        const block = bytes.slice(at, at + 255);
        blocks.push(block.length, ...block);
    }
    blocks.push(0);
    return Uint8Array.from(blocks);
};

/** A black GIF of two colours. */
const gif = (width: number, height: number, padding: number): Bytes => {
    const screen = concat([new TextEncoder().encode('GIF89a'), uint16LE(width), uint16LE(height)]);
    const palette = Uint8Array.from([0x80, 0, 0, 0, 0, 0, 0xff, 0xff, 0xff]);
    const parts: Uint8Array[] = [screen, palette];
    if (padding > 0) {
        // A comment extension of sub-blocks, which decoders skip.
        const data = Math.max(0, padding - 3 - Math.ceil(padding / 256));
        const comment: number[] = [0x21, 0xfe];
        for (let left = data; left > 0; left -= 255) {
            const length = Math.min(255, left);
            comment.push(length, ...Array.from({ length }, () => 0x20));
        }
        comment.push(0);
        parts.push(Uint8Array.from(comment));
    }
    const descriptor = concat([
        Uint8Array.from([0x2c, 0, 0, 0, 0]),
        uint16LE(width),
        uint16LE(height),
        Uint8Array.from([0]),
    ]);
    parts.push(descriptor, Uint8Array.from([2]), lzwZeros(width * height), Uint8Array.from([0x3b]));
    return concat(parts);
};

/** A marker segment of a JPEG with its length. */
const segment = (marker: number, data: Uint8Array): Bytes =>
    concat([Uint8Array.from([0xff, marker]), uint16BE(data.length + 2), data]);

/**
 * A grey baseline JPEG of one component whose every 8 by 8 block has only a zero DC difference: one Huffman code of
 * one bit for the DC category and one for the end of block, so each block takes two bits.
 */
const jpeg = (width: number, height: number, padding: number): Bytes => {
    const parts: Uint8Array[] = [Uint8Array.from([0xff, 0xd8])];
    // Comment segments of at most 65,533 bytes, which decoders skip.
    for (let left = padding; left > 0; ) {
        const data = Math.min(65_533, Math.max(0, left - 4));
        parts.push(segment(0xfe, new Uint8Array(data).fill(0x20)));
        left -= data + 4;
    }
    parts.push(
        segment(0xdb, concat([Uint8Array.from([0]), new Uint8Array(64).fill(1)])),
        segment(
            0xc0,
            concat([Uint8Array.from([8]), uint16BE(height), uint16BE(width), Uint8Array.from([1, 1, 0x11, 0])]),
        ),
        segment(0xc4, concat([Uint8Array.from([0x00, 1]), new Uint8Array(15), Uint8Array.from([0])])),
        segment(0xc4, concat([Uint8Array.from([0x10, 1]), new Uint8Array(15), Uint8Array.from([0])])),
        segment(0xda, Uint8Array.from([1, 1, 0x00, 0, 63, 0])),
    );
    const blocks = Math.ceil(width / 8) * Math.ceil(height / 8);
    const scanBits = blocks * 2;
    const scan = new Uint8Array(Math.ceil(scanBits / 8));
    // The bits that pad the last byte are ones.
    if (scanBits % 8 !== 0) {
        scan[scan.length - 1] = (1 << (8 - (scanBits % 8))) - 1;
    }
    parts.push(scan, Uint8Array.from([0xff, 0xd9]));
    return concat(parts);
};

const built = new Map<string, Promise<Bytes>>();

/**
 * A decodable black image of `type` at `width` by `height` pixels, with `padding` more bytes in a part that decoders
 * skip, built once per run.
 */
export const decodableImage = (type: SizedType, width: number, height: number, padding = 0): Promise<Bytes> => {
    const key = `${type} ${width} ${height} ${padding}`;
    let image = built.get(key);
    if (image === undefined) {
        if (type === 'image/png') {
            image = png(width, height, padding);
        } else if (type === 'image/gif') {
            image = Promise.resolve(gif(width, height, padding));
        } else {
            image = Promise.resolve(jpeg(width, height, padding));
        }
        built.set(key, image);
    }
    return image;
};

/** The four bytes of `value`, least significant first. */
const uint32LE = (value: number) =>
    Uint8Array.from([value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, value >>> 24]);

/** `bytes` with a trailing part of `padding` bytes that decoders skip: an AVIF `free` box or a WebP chunk. */
const padded = (type: 'image/webp' | 'image/avif', bytes: Bytes, padding: number): Bytes => {
    if (padding <= 0) {
        return bytes;
    }
    const length = Math.max(8, padding);
    if (type === 'image/avif') {
        return concat([
            bytes,
            concat([
                Uint8Array.from([...uint32BE(length)]),
                new TextEncoder().encode('free'),
                new Uint8Array(length - 8),
            ]),
        ]);
    }
    // A RIFF chunk holds an even number of bytes, and the RIFF size counts it.
    const data = (length - 8) & ~1;
    const out = concat([bytes, new TextEncoder().encode('PAD '), uint32LE(data), new Uint8Array(data)]);
    out.set(uint32LE(out.length - 8), 4);
    return out;
};

/** The types an image service takes, with a one-pixel sample of each, in the order the kit prefers them. */
export const SAMPLE_TYPES = [...SIZED_TYPES, 'image/webp', 'image/avif', 'image/svg+xml'] as const;

/**
 * A one-pixel image of `type`, valid to decode, with `padding` more bytes in a part that decoders skip, and a file
 * name for it; `undefined` for a type the kit has no sample of.
 */
export const sampleImage = async (
    type: string,
    padding = 0,
): Promise<{ readonly bytes: Bytes; readonly name: string } | undefined> => {
    const extension = type.split('/')[1]?.split('+')[0] ?? 'bin';
    const name = `pixel.${extension === 'jpeg' ? 'jpg' : extension}`;
    if ((SIZED_TYPES as readonly string[]).includes(type)) {
        return { bytes: await decodableImage(type as SizedType, 1, 1, padding), name };
    }
    if (type === 'image/webp') {
        return { bytes: padded(type, bytesOf(WEBP_SAMPLE), padding), name };
    }
    if (type === 'image/avif') {
        return { bytes: padded(type, bytesOf(AVIF_SAMPLE), padding), name };
    }
    if (type === 'image/svg+xml') {
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1"/></svg>';
        // Trailing white space after the root element is still well-formed XML.
        return { bytes: new TextEncoder().encode(svg + ' '.repeat(Math.max(0, padding))), name };
    }
    return undefined;
};
