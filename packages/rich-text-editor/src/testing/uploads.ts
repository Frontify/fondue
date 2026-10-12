/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultLimits } from '#/model';
import { readImageHeader, svgHoldsScript } from '#/runtime/image-header';
import { type ServiceContext } from '#/runtime/types';
import { DEFAULT_ACCEPT_TYPES, MAX_IMAGE_SIDE } from '#/runtime/uploads';

/** The `UploadService` shape the fake meets and the kit calls. */
export interface FakeUploadService {
    upload(
        request: { readonly operationId: string; readonly blob: Blob; readonly filename: string },
        context: ServiceContext & { readonly reportProgress: (fraction: number) => void },
    ): Promise<{ readonly assetId: string; readonly mediaType: string; readonly labelSnapshot: string }>;
    releaseUnused(operationId: string, context: ServiceContext): Promise<void>;
}

const aborted = () => new DOMException('The upload was aborted.', 'AbortError');
const refused = (reason: string) => new Error(`The upload was refused: ${reason}.`);

/**
 * An in-memory `UploadService` that meets every Service obligation: it reads the type from the content, never the
 * name, refuses a file over `maxAssetBytes`, a type outside `acceptTypes`, an image over `maxImagePixels` pixels or
 * 65,535 on a side and an SVG that holds script, and answers an asset ID that is no URL. It reports progress once,
 * answers a repeated operation with its first asset, and rejects with an `AbortError` once its signal aborts.
 */
export const createFakeUploadService = (
    options: { readonly maxAssetBytes?: number; readonly acceptTypes?: readonly string[] } = {},
): FakeUploadService => {
    const maxAssetBytes = options.maxAssetBytes ?? defaultLimits.maxAssetBytes;
    const acceptTypes = options.acceptTypes ?? DEFAULT_ACCEPT_TYPES;
    const assets = new Map<string, Awaited<ReturnType<FakeUploadService['upload']>>>();
    let stored = 0;
    return {
        upload: async ({ operationId, blob, filename }, { signal, reportProgress }) => {
            if (signal.aborted) {
                throw aborted();
            }
            const known = assets.get(operationId);
            if (known !== undefined) {
                return known;
            }
            if (blob.size > maxAssetBytes) {
                throw refused('size');
            }
            const { mediaType, width, height } = await readImageHeader(blob);
            if (mediaType === null || !acceptTypes.includes(mediaType)) {
                throw refused('type');
            }
            if (width !== null && height !== null) {
                if (
                    width > MAX_IMAGE_SIDE ||
                    height > MAX_IMAGE_SIDE ||
                    width * height > defaultLimits.maxImagePixels
                ) {
                    throw refused('pixels');
                }
            }
            if (mediaType === 'image/svg+xml' && svgHoldsScript(await blob.text())) {
                throw refused('script');
            }
            if (signal.aborted) {
                throw aborted();
            }
            reportProgress(1);
            stored += 1;
            const asset = { assetId: `fake-asset-${stored}`, mediaType, labelSnapshot: filename };
            assets.set(operationId, asset);
            return asset;
        },
        releaseUnused: (operationId) => {
            assets.delete(operationId);
            return Promise.resolve();
        },
    };
};

/** The ambient `describe`, `it` and `expect` of the host's test runner, which the kit registers its cases with. */
interface TestRunner {
    describe(name: string, body: () => void): void;
    it(name: string, body: () => Promise<void>): void;
    expect(actual: unknown): { toBe(expected: unknown): void };
}

// One-pixel images, valid to decode, of the types an image service takes.
const SAMPLES: Readonly<Record<string, { readonly name: string; readonly base64: string }>> = {
    'image/png': {
        name: 'pixel.png',
        base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    },
    'image/gif': { name: 'pixel.gif', base64: 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==' },
    'image/webp': { name: 'pixel.webp', base64: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==' },
};

const bytesOf = (base64: string) => Uint8Array.from(atob(base64), (character) => character.codePointAt(0) ?? 0);

const CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
        value = (value & 1) === 1 ? 0xed_b8_83_20 ^ (value >>> 1) : value >>> 1;
    }
    return value >>> 0;
});

/** One PNG chunk with its length and CRC. */
const chunk = (type: string, data: Uint8Array) => {
    const body = new Uint8Array(4 + data.length);
    body.set([...type].map((character) => character.codePointAt(0) ?? 0));
    body.set(data, 4);
    let crc = 0xff_ff_ff_ff;
    for (const byte of body) {
        crc = (CRC_TABLE[(crc ^ byte) & 0xff] ?? 0) ^ (crc >>> 8);
    }
    const out = new Uint8Array(8 + data.length + 4);
    const view = new DataView(out.buffer);
    view.setUint32(0, data.length);
    out.set(body, 4);
    view.setUint32(8 + data.length, (crc ^ 0xff_ff_ff_ff) >>> 0);
    return out;
};

/** A PNG whose header declares `width` by `height` pixels in a few bytes, as a decompression bomb does. */
export const declaredPng = (width: number, height: number): Blob => {
    const header = new Uint8Array(13);
    const view = new DataView(header.buffer);
    view.setUint32(0, width);
    view.setUint32(4, height);
    // Eight-bit greyscale, deflate, adaptive filtering, no interlace.
    header.set([8, 0, 0, 0, 0], 8);
    const signature = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return new Blob([signature, chunk('IHDR', header), chunk('IEND', new Uint8Array())], { type: 'image/png' });
};

/** Whether `assetId` reads as a URL, a signed URL or an access token, which an asset ID never is. */
const isLocator = (assetId: string) =>
    /^[a-z][\d+.a-z-]*:/i.test(assetId) ||
    assetId.startsWith('//') ||
    /[?&](token|signature|x-amz-signature|sig)=/i.test(assetId);

/**
 * Registers one case or more for each Service obligation of `UploadService`, each calling a fresh service directly,
 * so no editor check runs first: obligation 1 with an oversized file, an HTML file named `photo.png`, a 20,000 by
 * 20,000 pixel PNG, a 70,000 by 10 pixel PNG and, when `acceptTypes` holds `image/svg+xml`, an SVG with a script;
 * obligation 2 with an accepted image whose answer must hold an asset ID that is no URL or access token.
 */
export const runUploadConformance = (
    createService: () => FakeUploadService,
    options: {
        readonly maxAssetBytes: number;
        readonly acceptTypes: readonly string[];
        readonly maxImagePixels?: number;
    },
): void => {
    const { describe, it, expect } = globalThis as Partial<TestRunner>;
    if (describe === undefined || it === undefined || expect === undefined) {
        throw new Error('runUploadConformance registers its cases through the global describe, it and expect.');
    }
    const { maxAssetBytes, acceptTypes } = options;
    const maxImagePixels = options.maxImagePixels ?? defaultLimits.maxImagePixels;
    let operations = 0;
    const send = (blob: Blob, filename: string) => {
        operations += 1;
        const operationId = `rte-upload-conformance-${operations}`;
        const session = { documentId: 'rte-upload-conformance', sessionId: 'rte-upload-conformance', generation: 0 };
        const context = { signal: new AbortController().signal, session, reportProgress: () => undefined };
        return createService().upload({ operationId, blob, filename }, context);
    };
    /** Whether the service refuses the file, as it must. */
    const refuses = async (blob: Blob, filename: string) => {
        try {
            await send(blob, filename);
            return false;
        } catch {
            return true;
        }
    };
    const accepted = Object.keys(SAMPLES).find((type) => acceptTypes.includes(type));
    // A side within 65,535 pixels whose square is over the pixel limit, and a strip within it whose long side is not.
    const side = Math.min(MAX_IMAGE_SIDE, Math.max(20_000, Math.ceil(Math.sqrt(maxImagePixels + 1))));

    describe('UploadService Service obligations', () => {
        it('Service obligation 1 refuses a file larger than maxAssetBytes', async () => {
            const png = new Uint8Array(await declaredPng(1, 1).arrayBuffer());
            const padding = new Uint8Array(maxAssetBytes + 1 - png.length);
            expect(await refuses(new Blob([png, padding], { type: 'image/png' }), 'large.png')).toBe(true);
        });

        it('Service obligation 1 reads the type from the content and refuses an HTML file named photo.png', async () => {
            const html = '<!DOCTYPE html><html><body><script>alert(1)</script></body></html>';
            expect(await refuses(new Blob([html], { type: 'image/png' }), 'photo.png')).toBe(true);
        });

        const shown = side.toLocaleString('en-US');
        it(`Service obligation 1 refuses a ${shown} by ${shown} pixel PNG over maxImagePixels`, async () => {
            expect(await refuses(declaredPng(side, side), 'square.png')).toBe(true);
        });

        it('Service obligation 1 refuses a 70,000 by 10 pixel PNG over 65,535 pixels on a side', async () => {
            expect(await refuses(declaredPng(70_000, 10), 'strip.png')).toBe(true);
        });

        if (acceptTypes.includes('image/svg+xml')) {
            it('Service obligation 1 refuses an accepted SVG that holds a script element', async () => {
                const svg =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><script>alert(1)</script></svg>';
                expect(await refuses(new Blob([svg], { type: 'image/svg+xml' }), 'logo.svg')).toBe(true);
            });
        }

        it('Service obligation 2 answers an accepted image with an asset ID that is no URL or access token', async () => {
            const sample = accepted === undefined ? undefined : SAMPLES[accepted];
            if (accepted === undefined || sample === undefined) {
                throw new Error('runUploadConformance needs acceptTypes to hold image/png, image/gif or image/webp.');
            }
            const asset = await send(new Blob([bytesOf(sample.base64)], { type: accepted }), sample.name);
            expect(typeof asset.assetId === 'string' && asset.assetId !== '' && !isLocator(asset.assetId)).toBe(true);
            expect(typeof asset.mediaType === 'string' && typeof asset.labelSnapshot === 'string').toBe(true);
        });
    });
};
