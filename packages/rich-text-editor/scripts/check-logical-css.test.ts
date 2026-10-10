/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spawnSync } from 'node:child_process';
import { globSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

import { scanLogicalCss } from './check-logical-css';

const path = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));
const fixture = (name: string) => readFileSync(path(`../fixtures/logical-css/${name}`), 'utf8');

describe('check-logical-css', () => {
    it('SPEC-rich-text-react/AC-104 fails on left or right in a property name or a float, text-align or clear value', () => {
        expect(scanLogicalCss('physical.css', fixture('physical.css'))).toEqual([
            'physical.css:1 margin-left is physical; use its logical property',
            'physical.css:1 padding-right is physical; use its logical property',
            'physical.css:1 border-top-left-radius is physical; use its logical property',
            'physical.css:1 left is physical; use its logical property',
            'physical.css:8 float: left is physical; use start or end',
            'physical.css:8 text-align: right is physical; use start or end',
            'physical.css:8 clear: left is physical; use start or end',
        ]);
    });

    it('SPEC-rich-text-react/AC-104 passes logical properties and keywords, and left or right in other values', () => {
        expect(scanLogicalCss('logical.css', fixture('logical.css'))).toEqual([]);
    });

    it('SPEC-rich-text-react/AC-104 fails from the command line on the stylesheet it is given', () => {
        const run = spawnSync(
            process.execPath,
            ['--import', 'tsx', 'scripts/check-logical-css.ts', 'fixtures/logical-css/physical.css'],
            { cwd: path('..'), encoding: 'utf8' },
        );

        expect(run.status).toBe(1);
        expect(run.stderr).toContain('fixtures/logical-css/physical.css:1 margin-left is physical');
    });

    it('SPEC-rich-text-react/AC-104 finds no physical property in the compiled CSS of any module stylesheet or content.css', () => {
        const root = path('..');
        const modules = globSync('src/**/*.module.scss', { cwd: root }).sort();
        const faults = [
            ...modules.flatMap((file) => scanLogicalCss(file, compile(path(`../${file}`)).css)),
            ...scanLogicalCss('src/styles/content.css', readFileSync(path('../src/styles/content.css'), 'utf8')),
        ];

        expect(modules).toContain('src/ui/toolbar/styles/toolbar.module.scss');
        expect(faults).toEqual([]);
    });
});
