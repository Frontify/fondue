/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { defaultLimits } from '#/model';
import { readImageHeader, svgHoldsScript } from '#/runtime/capabilities/media/imageHeader';
import { createFakeUploadService, type FakeUploadService, runUploadConformance } from '#/testing';

const ACCEPT = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
const OPTIONS = { maxAssetBytes: 2 * 1024 * 1024, acceptTypes: ACCEPT };

/** Registers the kit's cases on a stand-in runner, runs each one and returns the titles of those that fail. */
const failingTitles = async (
    createService: () => FakeUploadService,
    options: Parameters<typeof runUploadConformance>[1] = OPTIONS,
): Promise<string[]> => {
    const cases = new Map<string, () => unknown>();
    vi.stubGlobal('describe', (_name: string, body: () => void) => body());
    vi.stubGlobal('it', (name: string, body: () => unknown) => cases.set(name, body));
    try {
        runUploadConformance(createService, options);
    } finally {
        vi.unstubAllGlobals();
    }

    const failing: string[] = [];
    for (const [name, body] of cases) {
        try {
            await body();
        } catch {
            failing.push(name);
        }
    }

    return failing;
};

type Check = 'size' | 'content type' | 'pixels' | 'side' | 'script' | 'asset ID' | 'everything';

/** A service that checks as the reference fake does, except for `skipped`. */
const flawed = (skipped: Check) => (): FakeUploadService => {
    let stored = 0;

    return {
        upload: async ({ blob, filename }) => {
            if (skipped === 'everything') {
                throw new Error('refused');
            }

            const header = await readImageHeader(blob);
            const mediaType = skipped === 'content type' ? blob.type : header.mediaType;
            const { width, height } = header;
            const refused =
                (skipped !== 'size' && blob.size > OPTIONS.maxAssetBytes) ||
                mediaType === null ||
                !ACCEPT.includes(mediaType) ||
                (skipped !== 'pixels' &&
                    width !== null &&
                    height !== null &&
                    width * height > defaultLimits.maxImagePixels) ||
                (skipped !== 'side' && width !== null && height !== null && Math.max(width, height) > 65_535) ||
                (skipped !== 'script' && mediaType === 'image/svg+xml' && svgHoldsScript(await blob.text()));
            if (refused) {
                throw new Error('refused');
            }

            stored += 1;
            let assetId = `asset-${stored}`;
            if (skipped === 'asset ID') {
                assetId = `https://cdn.frontify.test/${assetId}.png?token=secret`;
            }

            return { assetId, mediaType, labelSnapshot: filename };
        },
        releaseUnused: () => Promise.resolve(),
    };
};

const BROKEN: readonly (readonly [Check, string])[] = [
    ['size', 'of maxAssetBytes + 1 bytes'],
    ['content type', 'reads the type from the content'],
    ['pixels', 'over maxImagePixels'],
    ['side', 'over 65,535 pixels on a side'],
    ['script', 'refuses an accepted SVG that holds active content'],
    ['asset ID', 'answers an accepted image with an asset ID that is no URL or access token'],
];
const TITLES = [
    'Service obligation 1 refuses a decodable PNG of maxAssetBytes + 1 bytes and accepts it within maxAssetBytes',
    'Service obligation 1 reads the type from the content: it refuses an HTML file named photo.png and accepts a PNG under that name',
    'Service obligation 1 refuses a decodable 9,460 by 9,460 pixel PNG over maxImagePixels and a 20,000 by 20,000 one, and accepts 9,459 by 9,459',
    'Service obligation 1 refuses a decodable 70,000 by 10 pixel PNG over 65,535 pixels on a side, and accepts 65,535 by 10',
    'Service obligation 1 refuses an accepted SVG that holds active content, also behind character references, and accepts one with none',
    'Service obligation 2 answers an accepted image with an asset ID that is no URL or access token',
];

describe('runUploadConformance', () => {
    it('passes every case against the reference fake upload service', async () => {
        const failing = await failingTitles(() => createFakeUploadService(OPTIONS));

        expect(failing).toEqual([]);
    });

    it('runs one case or more per Service obligation, with the SVG case only where SVG is accepted', () => {
        const titles = (acceptTypes: readonly string[]) => {
            const names: string[] = [];
            vi.stubGlobal('describe', (_name: string, body: () => void) => body());
            vi.stubGlobal('it', (name: string) => names.push(name));
            try {
                runUploadConformance(() => createFakeUploadService(), { ...OPTIONS, acceptTypes });
            } finally {
                vi.unstubAllGlobals();
            }

            return names;
        };

        expect(titles(ACCEPT)).toEqual(TITLES);
        expect(titles(['image/png'])).toHaveLength(5);
    });

    it('probes the smallest square over a lowered maxImagePixels, and expects acceptance where no square within 65,535 pixels a side is over it', () => {
        const titles = (maxImagePixels: number) => {
            const names: string[] = [];
            vi.stubGlobal('describe', (_name: string, body: () => void) => body());
            vi.stubGlobal('it', (name: string) => names.push(name));
            try {
                runUploadConformance(() => createFakeUploadService(), { ...OPTIONS, maxImagePixels });
            } finally {
                vi.unstubAllGlobals();
            }

            return names.filter((name) => name.includes('pixel') && !name.includes('70,000'));
        };

        expect(titles(1_000_000)).toEqual([
            'Service obligation 1 refuses a decodable 1,001 by 1,001 pixel PNG over maxImagePixels and a 20,000 by 20,000 one, and accepts 1,000 by 1,000',
        ]);
        expect(titles(65_535 * 65_535)).toEqual([
            'Service obligation 1 accepts a decodable 65,535 by 2 pixel image, since no image within 65,535 pixels a side is over maxImagePixels',
        ]);
    });

    it('fails every case for a service that refuses every file, since each refusal case also needs an acceptance', async () => {
        const failing = await failingTitles(flawed('everything'));

        expect(failing).toEqual(TITLES);
    });

    it.each([
        ['JPEG', ['image/jpeg']],
        ['AVIF', ['image/avif']],
    ])('passes every case against the reference fake for a host that accepts %s only', async (_name, acceptTypes) => {
        const options = { ...OPTIONS, acceptTypes };

        expect(await failingTitles(() => createFakeUploadService(options), options)).toEqual([]);
    });

    it.each(BROKEN)('fails only the matching case for a service that skips the %s check', async (skipped, title) => {
        const failing = await failingTitles(flawed(skipped));

        expect(failing).toHaveLength(1);
        expect(failing[0]).toContain(title);
    });
});

describe('the reference fake upload service', () => {
    it('reports progress, answers a repeated operation with its first asset and rejects once its signal aborts', async () => {
        const service = createFakeUploadService();
        const reportProgress = vi.fn();
        const session = { documentId: 'document-1', sessionId: 'session-1', generation: 0 };
        const context = { signal: new AbortController().signal, session, reportProgress };
        const blob = new Blob(
            [Uint8Array.from(atob('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='), (c) => c.codePointAt(0) ?? 0)],
            {
                type: 'image/gif',
            },
        );

        const first = await service.upload({ operationId: 'op-1', blob, filename: 'pixel.gif' }, context);
        const again = await service.upload({ operationId: 'op-1', blob, filename: 'pixel.gif' }, context);
        const controller = new AbortController();
        controller.abort();
        const aborted = service.upload(
            { operationId: 'op-2', blob, filename: 'pixel.gif' },
            { ...context, signal: controller.signal },
        );

        expect(first).toEqual({ assetId: 'fake-asset-1', mediaType: 'image/gif', labelSnapshot: 'pixel.gif' });
        expect(again).toBe(first);
        expect(reportProgress).toHaveBeenCalledWith(1);
        await expect(aborted).rejects.toMatchObject({ name: 'AbortError' });
    });
});
