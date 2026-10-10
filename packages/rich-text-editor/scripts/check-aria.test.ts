/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { scanAria } from './check-aria';

const path = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));
const fixture = (name: string) => readFileSync(path(`../fixtures/aria/${name}`), 'utf8');

describe('check-aria', () => {
    it('SPEC-rich-text-accessibility/AC-078 fails on aria-description and other names and roles outside WAI-ARIA 1.2', () => {
        expect(scanAria('aria-description.tsx', fixture('aria-description.tsx'))).toEqual([
            'aria-description.tsx:5 role comment is not a WAI-ARIA 1.2 role',
            'aria-description.tsx:5 aria-description is not a WAI-ARIA 1.2 state or property',
            'aria-description.tsx:6 role callout is not a WAI-ARIA 1.2 role',
            'aria-description.tsx:11 aria-description is not a WAI-ARIA 1.2 state or property',
            'aria-description.tsx:12 role mark is not a WAI-ARIA 1.2 role',
            'aria-description.tsx:13 role suggestion is not a WAI-ARIA 1.2 role',
            'aria-description.tsx:13 aria-braillelabel is not a WAI-ARIA 1.2 state or property',
        ]);
    });

    it('SPEC-rich-text-accessibility/AC-078 passes WAI-ARIA 1.2 roles, states and properties in attributes, calls, props and selectors', () => {
        expect(scanAria('allowed.tsx', fixture('allowed.tsx'))).toEqual([]);
    });

    it('SPEC-rich-text-accessibility/AC-078 leaves role properties of plain .ts objects alone, which are no element props', () => {
        expect(scanAria('read.ts', "export const step = { role: 'attrs' };")).toEqual([]);
        expect(scanAria('read.tsx', "export const step = { role: 'attrs' };")).toEqual([
            'read.tsx:1 role attrs is not a WAI-ARIA 1.2 role',
        ]);
    });

    it('SPEC-rich-text-accessibility/AC-078 fails from the command line on the files it is given', () => {
        const run = spawnSync(
            process.execPath,
            ['--import', 'tsx', 'scripts/check-aria.ts', 'fixtures/aria/aria-description.tsx'],
            { cwd: path('..'), encoding: 'utf8' },
        );

        expect(run.status).toBe(1);
        expect(run.stderr).toContain(
            'fixtures/aria/aria-description.tsx:5 aria-description is not a WAI-ARIA 1.2 state or property',
        );
    });
});
