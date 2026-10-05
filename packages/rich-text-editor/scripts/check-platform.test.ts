/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { checkPlatform, DETECTORS, floorMissingFeatures, scanFile } from './check-platform';

const fixture = (name: string) => fileURLToPath(new URL(`../fixtures/platform/${name}`, import.meta.url));
const platform = readFileSync(fileURLToPath(new URL('../PLATFORM.md', import.meta.url)), 'utf8');
const fixtureStems: Record<string, string> = {
    webcodecs: 'image-decoder',
    'string-wellformed': 'string-is-well-formed',
};

describe('check-platform', () => {
    it('SPEC-rich-text-quality/AC-042 has a detector for every feature PLATFORM.md marks as missing at the floor', () => {
        const missing = floorMissingFeatures(platform);

        expect(missing).toContain('promise-withresolvers');
        expect(missing.filter((feature) => DETECTORS[feature] === undefined)).toEqual([]);
    });

    for (const feature of Object.keys(DETECTORS)) {
        it(`SPEC-rich-text-quality/AC-042 fails on the ${feature} fixture`, () => {
            const stem = fixtureStems[feature] ?? feature;
            const files = [`${stem}.js`, `${stem}.css`].filter((name) => existsSync(fixture(name)));

            expect(files).not.toEqual([]);
            for (const name of files) {
                const reported = scanFile(name, readFileSync(fixture(name), 'utf8'));
                expect(reported).not.toEqual([]);
                expect(reported.every((line) => line.endsWith(`uses ${feature}`))).toBe(true);
            }
        });
    }

    it('SPEC-rich-text-quality/AC-042 reports each unprefixed user-select once', () => {
        expect(scanFile('user-select.css', readFileSync(fixture('user-select.css'), 'utf8'))).toEqual([
            'user-select.css:1 uses user-select',
        ]);
    });

    it('SPEC-rich-text-quality/AC-042 allows requestIdleCallback only inside its guarded helper', () => {
        const source = readFileSync(fixture('guarded/allowed.js'), 'utf8');

        expect(scanFile('runtime/environment.js', source)).toEqual([]);
        expect(scanFile('model/environment.js', source)).toEqual(['model/environment.js:2 uses requestidlecallback']);
    });

    it('SPEC-rich-text-quality/AC-042 passes on floor-safe CSS: at-rules, keyframes and prefixed user-select', () => {
        expect(scanFile('style.css', readFileSync(fixture('guarded/allowed.css'), 'utf8'))).toEqual([]);
    });

    it('SPEC-rich-text-quality/AC-042 fails when there is no build output to scan', async () => {
        expect(await checkPlatform(fixture('empty-dist'), platform)).toEqual([
            `${fixture('empty-dist')} holds no built file; run the build first`,
        ]);
    });
});
