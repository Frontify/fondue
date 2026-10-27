/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defaultLimits } from '#/model';
import { readImageHeader, svgHoldsScript } from '#/runtime/capabilities/media/imageHeader';
import { isAssetLocator } from '#/runtime/capabilities/media/media';
import { DEFAULT_ACCEPT_TYPES, MAX_IMAGE_SIDE } from '#/runtime/capabilities/media/uploads';
import { type ServiceContext } from '#/runtime/types';

import { type Bytes, decodableImage, pngChunk, SAMPLE_TYPES, sampleImage, SIZED_TYPES } from './images';

/** The `UploadService` shape the fake meets and the kit calls. */
export type FakeUploadService = {
    /** Stores the file under `operationId` and answers its asset; it rejects with the refusal's error, or an `AbortError` once the signal aborts. */
    upload(
        request: { operationId: string; blob: Blob; filename: string },
        context: ServiceContext & { reportProgress: (fraction: number) => void },
    ): Promise<{ assetId: string; mediaType: string; labelSnapshot: string }>;
    /** Forgets the asset stored under `operationId`, so the same operation uploads afresh. */
    releaseUnused(operationId: string, context: ServiceContext): Promise<void>;
};

const aborted = () => new DOMException('The upload was aborted.', 'AbortError');
const refused = (reason: string) => new Error(`The upload was refused: ${reason}.`);

/**
 * An in-memory `UploadService` that meets every Service obligation: it reads the type from the content, never the
 * name, refuses a file over `maxAssetBytes`, a type outside `acceptTypes`, an image over `maxImagePixels` pixels or
 * 65,535 on a side or whose size it cannot read, and an SVG that holds active content, and answers an asset ID that
 * is no URL. It reports progress once, answers a repeated operation with its first asset, and rejects with an
 * `AbortError` once its signal aborts.
 */
export const createFakeUploadService = (
    options: {
        /** The largest file, in bytes, the service accepts. @default defaultLimits.maxAssetBytes */
        maxAssetBytes?: number;
        /** The media types the service accepts. @default DEFAULT_ACCEPT_TYPES */
        acceptTypes?: readonly string[];
    } = {},
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

            if (mediaType === 'image/svg+xml') {
                if (svgHoldsScript(await blob.text())) {
                    throw refused('script');
                }
            } else if (width === null || height === null) {
                throw refused('unreadable size');
            } else if (
                width > MAX_IMAGE_SIDE ||
                height > MAX_IMAGE_SIDE ||
                width * height > defaultLimits.maxImagePixels
            ) {
                throw refused('pixels');
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
type TestRunner = {
    describe(name: string, body: () => void): void;
    it(name: string, body: () => Promise<void>, timeout?: number): void;
    expect(actual: unknown): { toBe(expected: unknown): void };
};

// Building and sending an image of a hundred million pixels takes seconds.
const CASE_MS = 120_000;
const PNG_SIGNATURE = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** A PNG whose header declares `width` by `height` pixels in a few bytes, as a decompression bomb does. */
export const declaredPng = (width: number, height: number): Blob => {
    const header = new Uint8Array(13);
    const view = new DataView(header.buffer);
    view.setUint32(0, width);
    view.setUint32(4, height);
    // Eight-bit greyscale, deflate, adaptive filtering, no interlace.
    header.set([8, 0, 0, 0, 0], 8);

    return new Blob([PNG_SIGNATURE, pngChunk('IHDR', header), pngChunk('IEND', new Uint8Array())], {
        type: 'image/png',
    });
};

/** SVG files whose active content a service must refuse, some of it hidden behind character references. */
const ACTIVE_SVGS: readonly (readonly [string, string])[] = [
    ['a script element', '<script>alert(1)</script>'],
    ['an event handler attribute', '<rect width="1" height="1" onload="alert(1)"/>'],
    ['a javascript: link', '<a href="java&#x09;script:alert(1)"><rect width="1" height="1"/></a>'],
    [
        'an entity-encoded script in a foreignObject iframe',
        '<foreignObject width="1" height="1"><iframe srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"/></foreignObject>',
    ],
];
const svgOf = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">${body}</svg>`;

type ConformanceOptions = {
    /** The `maxAssetBytes` the service under test enforces. */
    maxAssetBytes: number;
    /** The `acceptTypes` the service under test enforces. */
    acceptTypes: readonly string[];
    /** The `maxImagePixels` the service under test enforces. @default defaultLimits.maxImagePixels */
    maxImagePixels?: number;
};

/** The runner globals and the probes that every case group shares. */
type Conformance = {
    maxAssetBytes: number;
    acceptTypes: readonly string[];
    maxImagePixels: number;
    send: (bytes: Bytes | string, type: string, filename: string) => ReturnType<FakeUploadService['upload']>;
    refuses: (bytes: Bytes | string, type: string, filename: string) => Promise<boolean>;
    accepts: (bytes: Bytes | string, type: string, filename: string) => Promise<boolean>;
    probeType: (typeof SIZED_TYPES)[number] | undefined;
    sampleType: string | undefined;
    nameOf: (type: string | undefined) => string;
    extension: string;
    /** The probe type, which the cases that need one register only when the host accepts it. */
    probing: () => (typeof SIZED_TYPES)[number];
    /** A sample of the first type the host accepts that the kit has one of, with `padding` more bytes. */
    sample: (padding?: number) => Promise<{ bytes: Bytes; name: string; type: string }>;
} & TestRunner;

const conformanceOf = (
    createService: () => FakeUploadService,
    options: ConformanceOptions,
    runner: TestRunner,
): Conformance => {
    const { maxAssetBytes, acceptTypes } = options;
    const maxImagePixels = options.maxImagePixels ?? defaultLimits.maxImagePixels;
    let operations = 0;
    const send = (bytes: Bytes | string, type: string, filename: string) => {
        operations += 1;
        const operationId = `rte-upload-conformance-${operations}`;
        const session = { documentId: 'rte-upload-conformance', sessionId: 'rte-upload-conformance', generation: 0 };
        const context = { signal: new AbortController().signal, session, reportProgress: () => undefined };
        const blob = new Blob([bytes], { type });

        return createService().upload({ operationId, blob, filename }, context);
    };

    const refuses = async (bytes: Bytes | string, type: string, filename: string) => {
        try {
            await send(bytes, type, filename);

            return false;
        } catch {
            return true;
        }
    };

    const accepts = async (bytes: Bytes | string, type: string, filename: string) =>
        !(await refuses(bytes, type, filename));
    // The pixel probes need a type with any size in a few bytes; the other probes take any type with a sample.
    const probeType = SIZED_TYPES.find((type) => acceptTypes.includes(type));
    const sampleType = SAMPLE_TYPES.find((type) => acceptTypes.includes(type));
    const nameOf = (type: string | undefined) => type?.split('/')[1]?.split('+')[0]?.toUpperCase() ?? 'image';
    const probeSubtype = probeType?.split('/')[1];
    const extension = probeType === 'image/jpeg' ? 'jpg' : (probeSubtype ?? 'bin');
    const probing = () => probeType as NonNullable<typeof probeType>;
    const sample = async (padding = 0) => {
        const found = sampleType === undefined ? undefined : await sampleImage(sampleType, padding);
        if (sampleType === undefined || found === undefined) {
            throw new Error('runUploadConformance has samples of PNG, GIF, JPEG, WebP, AVIF and SVG only.');
        }

        return { ...found, type: sampleType };
    };

    return {
        ...runner,
        maxAssetBytes,
        acceptTypes,
        maxImagePixels,
        send,
        refuses,
        accepts,
        probeType,
        sampleType,
        nameOf,
        extension,
        probing,
        sample,
    };
};

const shown = (value: number) => value.toLocaleString('en-US');

const sizeCase = ({ it, expect, maxAssetBytes, refuses, accepts, sample, nameOf, sampleType }: Conformance) => {
    it(
        `Service obligation 1 refuses a decodable ${nameOf(sampleType)} of maxAssetBytes + 1 bytes and accepts it within maxAssetBytes`,
        async () => {
            const smallest = await sample();
            if (smallest.bytes.length > maxAssetBytes) {
                // No image fits the limit, so the smallest one shows the refusal alone.
                expect(await refuses(smallest.bytes, smallest.type, smallest.name)).toBe(true);

                return;
            }

            const over = await sample(maxAssetBytes + 1 - smallest.bytes.length);
            expect(over.bytes.length > maxAssetBytes).toBe(true);
            expect(await refuses(over.bytes, over.type, over.name)).toBe(true);
            expect(await accepts(smallest.bytes, smallest.type, smallest.name)).toBe(true);
        },
        CASE_MS,
    );
};

const contentTypeCase = ({ it, expect, refuses, accepts, sample, nameOf, sampleType }: Conformance) => {
    it(
        `Service obligation 1 reads the type from the content: it refuses an HTML file named photo.png and accepts a ${nameOf(sampleType)} under that name`,
        async () => {
            const html = '<!DOCTYPE html><html><body><script>alert(1)</script></body></html>';
            expect(await refuses(html, 'image/png', 'photo.png')).toBe(true);
            const { bytes } = await sample();
            expect(await accepts(bytes, 'image/png', 'photo.png')).toBe(true);
        },
        CASE_MS,
    );
};

const pixelCase = (c: Conformance) => {
    const { it, expect, refuses, accepts, probeType, probing, extension, maxImagePixels } = c;
    // The smallest square over the pixel limit, which exists only while its side is within 65,535 pixels.
    const square = Math.ceil(Math.sqrt(maxImagePixels + 1));
    // A host that takes no PNG, GIF or JPEG gets no pixel probe, since the kit builds no larger WebP or AVIF.
    if (probeType !== undefined && square <= MAX_IMAGE_SIDE) {
        const probeName = c.nameOf(probeType);
        const larger = square < 20_000 && 20_000 * 20_000 > maxImagePixels;
        const also = larger ? ' and a 20,000 by 20,000 one' : '';
        it(
            `Service obligation 1 refuses a decodable ${shown(square)} by ${shown(square)} pixel ${probeName} over maxImagePixels${also}, and accepts ${shown(square - 1)} by ${shown(square - 1)}`,
            async () => {
                const type = probing();
                const name = `square.${extension}`;
                expect(await refuses(await decodableImage(type, square, square), type, name)).toBe(true);
                if (larger) {
                    expect(await refuses(await decodableImage(type, 20_000, 20_000), type, name)).toBe(true);
                }

                expect(await accepts(await decodableImage(type, square - 1, square - 1), type, name)).toBe(true);
            },
            CASE_MS,
        );
    } else if (probeType !== undefined) {
        it(
            'Service obligation 1 accepts a decodable 65,535 by 2 pixel image, since no image within 65,535 pixels a side is over maxImagePixels',
            async () => {
                const type = probing();
                expect(await accepts(await decodableImage(type, MAX_IMAGE_SIDE, 2), type, `strip.${extension}`)).toBe(
                    true,
                );
            },
            CASE_MS,
        );
    }
};

const sideCase = ({ it, expect, acceptTypes, refuses, accepts }: Conformance) => {
    // Only a PNG has room in its header for more than 65,535 pixels on a side.
    if (acceptTypes.includes('image/png')) {
        it(
            'Service obligation 1 refuses a decodable 70,000 by 10 pixel PNG over 65,535 pixels on a side, and accepts 65,535 by 10',
            async () => {
                expect(await refuses(await decodableImage('image/png', 70_000, 10), 'image/png', 'strip.png')).toBe(
                    true,
                );
                expect(
                    await accepts(await decodableImage('image/png', MAX_IMAGE_SIDE, 10), 'image/png', 'strip.png'),
                ).toBe(true);
            },
            CASE_MS,
        );
    }
};

const svgCase = ({ it, expect, acceptTypes, refuses, accepts }: Conformance) => {
    if (acceptTypes.includes('image/svg+xml')) {
        it(
            'Service obligation 1 refuses an accepted SVG that holds active content, also behind character references, and accepts one with none',
            async () => {
                for (const [, body] of ACTIVE_SVGS) {
                    expect(await refuses(svgOf(body), 'image/svg+xml', 'logo.svg')).toBe(true);
                }

                expect(await accepts(svgOf('<rect width="10" height="10"/>'), 'image/svg+xml', 'logo.svg')).toBe(true);
            },
            CASE_MS,
        );
    }
};

const assetIdCase = ({ it, expect, sample, send }: Conformance) => {
    it(
        'Service obligation 2 answers an accepted image with an asset ID that is no URL or access token',
        async () => {
            const accepted = await sample();
            const asset = await send(accepted.bytes, accepted.type, accepted.name);
            expect(typeof asset.assetId === 'string' && asset.assetId !== '' && !isAssetLocator(asset.assetId)).toBe(
                true,
            );
            expect(typeof asset.mediaType === 'string' && typeof asset.labelSnapshot === 'string').toBe(true);
        },
        CASE_MS,
    );
};

/**
 * Registers one case or more for each Service obligation of `UploadService`, each calling a fresh service directly,
 * so no editor check runs first. Every refusal case pairs a probe that the service must refuse with a control, the
 * same kind of decodable file within the limit, that it must accept, so a refusal for another reason fails the case.
 * Obligation 1: a decodable file of `maxAssetBytes` + 1 bytes; an HTML file named `photo.png`; the smallest square
 * over `maxImagePixels` with each side at most 65,535 pixels, and 20,000 by 20,000 when that is over it too; a
 * 70,000 by 10 pixel PNG; and, when `acceptTypes` holds `image/svg+xml`, SVG files with active content. Obligation 2:
 * an accepted image whose answer must hold an asset ID that is no URL or access token. The probes are PNG, GIF or
 * JPEG, whichever the host accepts first, since only those carry any size in a few bytes.
 */
export const runUploadConformance = (createService: () => FakeUploadService, options: ConformanceOptions): void => {
    const { describe, it, expect } = globalThis as Partial<TestRunner>;
    if (describe === undefined || it === undefined || expect === undefined) {
        throw new Error('runUploadConformance registers its cases through the global describe, it and expect.');
    }

    const conformance = conformanceOf(createService, options, { describe, it, expect });
    describe('UploadService Service obligations', () => {
        sizeCase(conformance);
        contentTypeCase(conformance);
        pixelCase(conformance);
        sideCase(conformance);
        svgCase(conformance);
        assetIdCase(conformance);
    });
};
