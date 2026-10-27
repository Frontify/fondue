/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020';
import { afterEach, describe, expect, it } from 'vitest';

const PACKAGE = fileURLToPath(new URL('../..', import.meta.url));
const FIXTURES = join(PACKAGE, 'src/__tests__/fixtures');

type StampedRecord = { commit: string; date: string; suites: Record<string, Record<string, unknown>> };

let temporary: string | undefined;

afterEach(() => {
    if (temporary !== undefined) {
        rmSync(temporary, { recursive: true, force: true });
        temporary = undefined;
    }
});

/** A temporary package directory holding copies of the record and the report, never the real ones. */
const copyOfRelease = () => {
    temporary = mkdtempSync(join(tmpdir(), 'stamp-'));
    const root = join(temporary, 'packages/rich-text-editor');
    mkdirSync(join(root, 'qualification'), { recursive: true });
    mkdirSync(join(root, 'src/docs/accessibility'), { recursive: true });
    mkdirSync(join(temporary, '.changeset'));
    cpSync(join(PACKAGE, 'qualification/1.0.0.json'), join(root, 'qualification/1.0.0.json'));
    cpSync(join(PACKAGE, 'src/docs/accessibility/1.0.0.mdx'), join(root, 'src/docs/accessibility/1.0.0.mdx'));
    writeFileSync(join(root, 'package.json'), '{ "version": "0.0.0" }');
    writeFileSync(join(temporary, '.changeset/release.md'), '---\n"@frontify/fondue-rich-text-editor": major\n---\n');

    return root;
};

const stamp = (root: string, extra: string[]) =>
    execFileSync(
        'node',
        [
            join(PACKAGE, 'qualification/stamp.mjs'),
            '--root',
            root,
            '--unit',
            join(FIXTURES, 'vitestReport.json'),
            '--components',
            join(FIXTURES, 'playwrightReport.json'),
            ...extra,
        ],
        { encoding: 'utf8' },
    );

describe('qualification/stamp.mjs', () => {
    it('writes the commit, date and counts of a gate run, keeps every other field and the schema valid', () => {
        const root = copyOfRelease();
        const before = JSON.parse(readFileSync(join(root, 'qualification/1.0.0.json'), 'utf8')) as StampedRecord;
        const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: PACKAGE, encoding: 'utf8' }).trim();

        stamp(root, ['--version', '1.0.0']);

        const after = JSON.parse(readFileSync(join(root, 'qualification/1.0.0.json'), 'utf8')) as StampedRecord;
        expect(after.commit).toBe(head);
        expect(after.date).toBe(new Date().toISOString().slice(0, 10));
        expect(after.suites.unit).toEqual({ ...before.suites.unit, passed: 11, failed: 0, skipped: 4 });
        expect(after.suites.chromium).toEqual({
            ...before.suites.chromium,
            passed: 2,
            failed: 0,
            flaky: 1,
            skipped: 1,
        });
        expect(after.suites.webkit).toEqual({ ...before.suites.webkit, passed: 1, failed: 0, flaky: 1, skipped: 1 });
        expect(after.suites.firefox).toEqual(before.suites.firefox);
        expect({ ...after, commit: 0, date: 0, suites: 0 }).toEqual({ ...before, commit: 0, date: 0, suites: 0 });

        const schema = JSON.parse(readFileSync(join(PACKAGE, 'qualification/schema.json'), 'utf8')) as object;
        const validate = new Ajv2020({ strict: true, allowUnionTypes: true, allErrors: true }).compile(schema);
        expect(validate(after), JSON.stringify(validate.errors)).toBe(true);

        const report = readFileSync(join(root, 'src/docs/accessibility/1.0.0.mdx'), 'utf8');
        expect(report).toContain(`tested at commit \`${head}\``);
    });

    it('stamps the version the changesets release next when no --version is given', () => {
        const root = copyOfRelease();

        stamp(root, []);

        const after = JSON.parse(readFileSync(join(root, 'qualification/1.0.0.json'), 'utf8')) as StampedRecord;

        expect(after.suites.unit?.passed).toBe(11);
    });
});
