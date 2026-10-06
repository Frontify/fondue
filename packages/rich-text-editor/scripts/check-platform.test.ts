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

    it('SPEC-rich-text-quality/AC-042 allows isWellFormed only inside the checkHref helper', () => {
        const source = readFileSync(fixture('string-is-well-formed.js'), 'utf8');

        expect(scanFile('model/well-formed.js', source)).toEqual([]);
        expect(scanFile('model/href.js', source)).toEqual(['model/href.js:1 uses string-wellformed']);
    });

    it('SPEC-rich-text-quality/AC-042 reports bracket access and destructuring of isWellFormed outside its helper', () => {
        const bracket = 'export const check = (s) => s["isWellFormed"]();';
        const template = 'export const check = (s) => s[`toWellFormed`]();';
        const destructured = 'export const { isWellFormed } = String.prototype;';
        const renamed = 'export const { "toWellFormed": wellFormed } = String.prototype;';

        expect(scanFile('model/href.js', bracket)).toEqual(['model/href.js:1 uses string-wellformed']);
        expect(scanFile('model/href.js', template)).toEqual(['model/href.js:1 uses string-wellformed']);
        expect(scanFile('model/href.js', destructured)).toEqual(['model/href.js:1 uses string-wellformed']);
        expect(scanFile('model/href.js', renamed)).toEqual(['model/href.js:1 uses string-wellformed']);
        for (const source of [bracket, template, destructured, renamed]) {
            expect(scanFile('model/well-formed.js', source)).toEqual([]);
        }
    });

    it('SPEC-rich-text-quality/AC-042 flags iterator helpers on iterators but not on Object.keys arrays', () => {
        expect(scanFile('model/keys.js', 'export const names = (o) => Object.keys(o).map(String);')).toEqual([]);
        expect(scanFile('model/keys.js', 'export const names = (o) => Object["keys"](o).map(String);')).toEqual([]);
        expect(scanFile('model/keys.js', 'export const names = () => new Map().keys().map(String);')).toEqual([
            'model/keys.js:1 uses iterator-methods',
        ]);
    });

    it('SPEC-rich-text-quality/AC-042 passes on floor-safe CSS: at-rules, keyframes and prefixed user-select', () => {
        expect(scanFile('style.css', readFileSync(fixture('guarded/allowed.css'), 'utf8'))).toEqual([]);
    });

    it('SPEC-rich-text-quality/AC-042 fails when there is no build output to scan', async () => {
        expect(await checkPlatform(fixture('empty-dist'), platform)).toEqual([
            `${fixture('empty-dist')} holds no built file; run the build first`,
        ]);
    });

    it('SPEC-rich-text-quality/AC-042 reads floor-missing rows with trailing spaces and a capital No', () => {
        const rows = [
            '| `popover` Popover | Menus. | newly available | 2025-01-27 | No: chrome 116 |  ',
            '| `composed-ranges` Ranges | Shadow roots. | newly available | 2025-08-19 | no |\t',
            '| `dialog` <dialog> | Modal dialogs. | widely available | 2022-03-14 | yes |',
        ].join('\n');

        expect(floorMissingFeatures(rows)).toEqual(['popover', 'composed-ranges']);
    });

    it('SPEC-rich-text-quality/AC-042 fails when PLATFORM.md yields no floor-missing row', async () => {
        const violations = await checkPlatform(fixture('guarded'), '| Feature | At the floor |\n|---|---|\n');

        expect(violations).toContain('PLATFORM.md has no row marked as missing at the floor');
    });
});
