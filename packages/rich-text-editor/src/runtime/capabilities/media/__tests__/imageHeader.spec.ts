/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { failNetworkInThisFile } from '#/testing/__tests__/fixtures/network';
import { decodableImage } from '#/testing/images';

import { readImageHeader, svgHoldsScript } from '../imageHeader';

failNetworkInThisFile();

const ascii = (text: string) => new TextEncoder().encode(text);
const uint32 = (value: number) =>
    Uint8Array.from([value >>> 24, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);
/** One ISO base media box of `type` around `parts`. */
const box = (type: string, ...parts: readonly Uint8Array[]) => {
    const size = 8 + parts.reduce((total, part) => total + part.length, 0);
    return concat([uint32(size), ascii(type), ...parts]);
};
const concat = (parts: readonly Uint8Array[]) => {
    const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
    let at = 0;
    for (const part of parts) {
        out.set(part, at);
        at += part.length;
    }
    return out;
};
const VERSION = new Uint8Array(4);

describe('the image header reader', () => {
    it('reads the frame size of a JPEG past 256 comment segments, up to the start of the scan', async () => {
        const jpeg = await decodableImage('image/jpeg', 640, 480);
        const comments = Array.from({ length: 300 }, () => Uint8Array.from([0xff, 0xfe, 0x00, 0x04, 0x20, 0x20]));
        const file = new Blob([jpeg.subarray(0, 2), ...comments, jpeg.subarray(2)]);

        expect(await readImageHeader(file)).toEqual({ mediaType: 'image/jpeg', width: 640, height: 480 });
    });

    it('reads no size of a JPEG with no frame header before its scan', async () => {
        const jpeg = await decodableImage('image/jpeg', 640, 480);
        const sof = jpeg.findIndex((byte, index) => byte === 0xff && jpeg[index + 1] === 0xc0);
        const withoutFrame = concat([jpeg.subarray(0, sof), jpeg.subarray(sof + 2 + 17)]);

        expect(await readImageHeader(new Blob([withoutFrame]))).toEqual({
            mediaType: 'image/jpeg',
            width: null,
            height: null,
        });
    });

    it('reads the ispe size of an AVIF whose meta box sits after 64 KiB of other boxes', async () => {
        const ftyp = box('ftyp', ascii('avif'), uint32(0), ascii('avifmif1'));
        const ispe = box('ispe', VERSION, uint32(4032), uint32(3024));
        const meta = box('meta', VERSION, box('hdlr', VERSION, new Uint8Array(20)), box('iprp', box('ipco', ispe)));
        const file = new Blob([ftyp, box('free', new Uint8Array(70_000)), meta]);

        expect(await readImageHeader(file)).toEqual({ mediaType: 'image/avif', width: 4032, height: 3024 });
    });

    it('reads no size of a JPEG that needs more than 4096 markers or fill bytes before its frame header', async () => {
        const jpeg = await decodableImage('image/jpeg', 640, 480);
        const file = new Blob([jpeg.subarray(0, 2), new Uint8Array(5000).fill(0xff), jpeg.subarray(2)]);

        expect(await readImageHeader(file)).toEqual({ mediaType: 'image/jpeg', width: null, height: null });
    });

    it('reads no size of an AVIF whose meta box comes after more than 4096 other boxes', async () => {
        const ftyp = box('ftyp', ascii('avif'), uint32(0), ascii('avifmif1'));
        const ispe = box('ispe', VERSION, uint32(4032), uint32(3024));
        const meta = box('meta', VERSION, box('hdlr', VERSION, new Uint8Array(20)), box('iprp', box('ipco', ispe)));
        const free = Array.from({ length: 5000 }, () => box('free'));

        expect(await readImageHeader(new Blob([ftyp, ...free, meta]))).toEqual({
            mediaType: 'image/avif',
            width: null,
            height: null,
        });
    });

    it.each([
        [
            'a PNG signature with no IHDR chunk',
            concat([Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])]),
        ],
        ['a WebP header with no VP8 chunk', concat([ascii('RIFF'), uint32(0), ascii('WEBP'), ascii('JUNK')])],
    ])('names no image type for %s followed by SVG markup', async (_name, start) => {
        const file = new Blob([
            start,
            ascii('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
        ]);

        const header = await readImageHeader(file);

        expect(header.mediaType).toBeNull();
    });
});

describe('the image header reader on the formats it reads by their first bytes', () => {
    const riff = (chunk: string, body: readonly number[]) =>
        new Blob([concat([ascii('RIFF'), uint32(0), ascii('WEBP'), ascii(chunk), Uint8Array.from(body)])]);
    const littleEndian24 = (value: number) => [value & 0xff, (value >> 8) & 0xff, (value >> 16) & 0xff];

    it('reads the size of a lossy WebP, of a lossless one and of an extended one', async () => {
        // After the chunk size, the lossy frame header has a 3-byte tag, the start code, then both sizes as 14 bits.
        const lossy = riff('VP8 ', [0, 0, 0, 0, 0x10, 0, 0, 0x9d, 0x01, 0x2a, 100, 0, 50, 0]);
        // The lossless header has a signature byte, then width and height as 14 bits each, less one.
        const lossless = riff('VP8L', [0, 0, 0, 0, 0x2f, 99, 0x40, 12, 0]);
        const extended = riff('VP8X', [0, 0, 0, 0, 0, 0, 0, 0, ...littleEndian24(799), ...littleEndian24(599)]);

        expect(await readImageHeader(lossy)).toEqual({ mediaType: 'image/webp', width: 100, height: 50 });
        expect(await readImageHeader(lossless)).toEqual({ mediaType: 'image/webp', width: 100, height: 50 });
        expect(await readImageHeader(extended)).toEqual({ mediaType: 'image/webp', width: 800, height: 600 });
    });

    it('reads the frame size of a JPEG after a marker with no length, and no size when the scan comes first', async () => {
        const frame = [0xff, 0xc0, 0x00, 0x11, 0x08, 0x01, 0xe0, 0x02, 0x80, 0x03];
        const afterRestart = new Blob([Uint8Array.from([0xff, 0xd8, 0xff, 0xd0, ...frame, 0, 0, 0, 0, 0, 0, 0])]);
        const scanFirst = new Blob([Uint8Array.from([0xff, 0xd8, 0xff, 0xda, 0x00, 0x02, 0x00, 0x00])]);

        expect(await readImageHeader(afterRestart)).toEqual({ mediaType: 'image/jpeg', width: 640, height: 480 });
        expect(await readImageHeader(scanFirst)).toEqual({ mediaType: 'image/jpeg', width: null, height: null });
    });

    it('reads the largest ispe of an AVIF whose boxes use the 64-bit size and the to-the-end size', async () => {
        const ftyp = box('ftyp', ascii('avif'), uint32(0), ascii('avifmif1'));
        const ipco = box(
            'ipco',
            box('ispe', VERSION, uint32(160), uint32(120)),
            box('ispe', VERSION, uint32(4032), uint32(3024)),
            box('ispe', VERSION, uint32(320), uint32(240)),
        );
        const iprp = box('iprp', ipco);
        const large = concat([uint32(1), ascii('free'), uint32(0), uint32(16)]);
        const meta = concat([uint32(0), ascii('meta'), VERSION, iprp]);

        expect(await readImageHeader(new Blob([ftyp, large, meta]))).toEqual({
            mediaType: 'image/avif',
            width: 4032,
            height: 3024,
        });
    });

    it('reads no size of an AVIF with a box smaller than its own header, and no type of a HEIC', async () => {
        const avif = box('ftyp', ascii('avif'), uint32(0), ascii('avifmif1'));
        const heic = box('ftyp', ascii('heic'), uint32(0), ascii('mif1'));

        expect(await readImageHeader(new Blob([avif, uint32(4), ascii('meta')]))).toEqual({
            mediaType: 'image/avif',
            width: null,
            height: null,
        });
        const header = await readImageHeader(new Blob([heic, box('meta', VERSION)]));

        expect(header.mediaType).toBeNull();
    });

    it('names SVG by a doctype that precedes its svg element', async () => {
        const file = new Blob([ascii('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "x.dtd"><svg/>')]);

        const header = await readImageHeader(file);

        expect(header.mediaType).toBe('image/svg+xml');
    });
});

describe('the SVG active content check', () => {
    it.each([
        ['a script element', '<script>alert(1)</script>'],
        [
            'an entity-encoded script in a foreignObject iframe',
            '<foreignObject><iframe srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"/></foreignObject>',
        ],
        ['a foreignObject alone', '<foreignObject><div>x</div></foreignObject>'],
        ['an event handler attribute', '<rect onload="alert(1)"/>'],
        ['a javascript: link broken by a character reference', '<a href="java&#x09;script:alert(1)"/>'],
        ['a javascript: link spelled in character references', '<a href="&#106;avascript:alert(1)"/>'],
    ])('finds %s', (_name, body) => {
        expect(svgHoldsScript(`<svg xmlns="http://www.w3.org/2000/svg">${body}</svg>`)).toBe(true);
    });

    it.each([
        [
            'a script under a dotted prefix',
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:s.s="http://www.w3.org/2000/svg"><s.s:script>alert(1)</s.s:script></svg>',
        ],
        [
            'a script under a non-ASCII prefix',
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:ä="http://www.w3.org/2000/svg"><ä:script>alert(1)</ä:script></svg>',
        ],
        [
            'a script built by nested entities',
            `<!DOCTYPE svg [<!ENTITY x "&#60;"><!ENTITY y "&x;script>alert(1)&x;/script>">]><svg xmlns="http://www.w3.org/2000/svg">&y;</svg>`,
        ],
        [
            'a script named by an entity',
            '<!DOCTYPE svg [<!ENTITY s "script">]><svg xmlns="http://www.w3.org/2000/svg"><&s;>alert(1)</&s;></svg>',
        ],
        [
            'an external entity',
            '<!DOCTYPE svg [<!ENTITY x SYSTEM "https://example.test/x.xml">]><svg xmlns="http://www.w3.org/2000/svg">&x;</svg>',
        ],
        [
            'a javascript: link built from an entity declared twice, which XML reads by its first value',
            '<!DOCTYPE svg [<!ENTITY c ":"><!ENTITY c "x">]><svg xmlns="http://www.w3.org/2000/svg"><a href="javascript&c;alert(1)"><text>x</text></a></svg>',
        ],
        [
            'entities that expand to more than twice the file',
            `<!DOCTYPE svg [<!ENTITY a "${'A'.repeat(20_000)}">]><svg xmlns="http://www.w3.org/2000/svg">${'&a;'.repeat(100)}</svg>`,
        ],
        ['a parameter entity', '<!DOCTYPE svg [<!ENTITY % x "y">]><svg xmlns="http://www.w3.org/2000/svg"/>'],
    ])('finds %s', (_name, svg) => {
        expect(svgHoldsScript(svg)).toBe(true);
    });

    it('finds nothing in a drawing whose entities name namespaces, as older editors write', () => {
        const svg =
            '<!DOCTYPE svg [<!ENTITY ns_svg "http://www.w3.org/2000/svg">]><svg xmlns="&ns_svg;"><rect width="1"/></svg>';

        expect(svgHoldsScript(svg)).toBe(false);
    });

    it.each([
        ['a character reference past the last code point', '<svg>&#x110000;&#1114112;</svg>'],
        ['an unknown named reference', '<svg>&nbsp;</svg>'],
        ['an entity declared with single quotes', "<!DOCTYPE svg [<!ENTITY e 'text'>]><svg>&e;</svg>"],
        ['an entity declared and never used', '<!DOCTYPE svg [<!ENTITY e "text">]><svg/>'],
    ])('finds nothing in a drawing with %s', (_name, svg) => {
        expect(svgHoldsScript(svg)).toBe(false);
    });

    it('finds nothing in a plain drawing', () => {
        expect(svgHoldsScript('<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>')).toBe(
            false,
        );
    });
});
