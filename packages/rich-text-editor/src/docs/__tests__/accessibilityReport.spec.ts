/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const PACKAGE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const read = (path: string) => readFileSync(join(PACKAGE, path), 'utf8');

/** The items of the accessibility Report section, one level 2 heading each. */
const SECTIONS = [
    'Tested configuration',
    'WCAG 2.2 criteria',
    'AAA targets',
    'ATAG 2.0 annex',
    'Limitations and host-owned criteria',
    'Editing and published output',
    'Product targets beyond AA',
];

const CONFORMANCE_LEVELS = ['Supports', 'Partially Supports', 'Does Not Support', 'Not Applicable', 'Not Evaluated'];

/** The criteria whose outcome only a screen reader or a real device can show. */
const SCREEN_READER_AND_DEVICE = ['1.3.1', '2.4.11', '4.1.2', '4.1.3', 'A.2.2.2'];

const WCAG_CRITERION = /\b[1-4]\.\d{1,2}\.\d{1,2}\b/;

const EVIDENCE_PATH = /`(src\/[^`]+)`/g;

const NO_AUTOMATED_TEST = 'no automated test';

/** The rows of each report that read "no automated test", so a row cannot silently lose its evidence. */
const NO_AUTOMATED_TEST_ROWS: Record<string, number> = { '1.0.0.mdx': 2 };

const CRITERIA_HEADER = /^\| Criterion\s+\| Conformance level\s+\| Remarks and explanations\s+\|$/;

type Row = {
    readonly criterion: string;
    readonly level: string;
    readonly remarks: string;
};

/** The rows of every criteria table of a report. */
const rowsOf = (source: string): Row[] => {
    const rows: Row[] = [];
    let inTable = false;
    for (const line of source.split('\n')) {
        if (CRITERIA_HEADER.test(line)) {
            inTable = true;
            continue;
        }
        if (!line.startsWith('|')) {
            inTable = false;
            continue;
        }
        if (!inTable || /^\|[\s:|-]+\|$/.test(line)) {
            continue;
        }
        const [criterion = '', level = '', remarks = ''] = line
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim());
        rows.push({ criterion, level, remarks });
    }
    return rows;
};

/** What a report marks against the Report section's rules, one message per broken row. */
const problemsOf = (source: string): string[] => {
    const rows = rowsOf(source);
    const problems: string[] = [];
    for (const { criterion, level, remarks } of rows) {
        if (!CONFORMANCE_LEVELS.includes(level)) {
            problems.push(`${criterion}: "${level}" is no conformance level`);
        }
        if (level !== 'Not Applicable') {
            const paths = [...remarks.matchAll(EVIDENCE_PATH)].map(([, path]) => path ?? '');
            if (!WCAG_CRITERION.test(criterion)) {
                problems.push(`${criterion}: names no WCAG criterion`);
            }
            if (paths.length === 0 && !remarks.includes(NO_AUTOMATED_TEST)) {
                problems.push(`${criterion}: names no evidence`);
            }
            for (const path of paths.filter((path) => !existsSync(join(PACKAGE, path)))) {
                problems.push(`${criterion}: evidence ${path} does not exist`);
            }
        }
        const number = criterion.split(' ')[0] ?? '';
        if (SCREEN_READER_AND_DEVICE.includes(number) && level !== 'Not Evaluated' && level !== 'Does Not Support') {
            problems.push(`${criterion}: marked ${level}, which only a screen reader or a device can show`);
        }
    }
    for (const number of SCREEN_READER_AND_DEVICE) {
        if (!rows.some(({ criterion }) => criterion.startsWith(`${number} `))) {
            problems.push(`${number}: has no row`);
        }
    }
    return problems;
};

/** How many marked rows of a report read "no automated test". */
const noAutomatedTestRowsOf = (source: string) =>
    rowsOf(source).filter(({ level, remarks }) => level !== 'Not Applicable' && remarks.includes(NO_AUTOMATED_TEST))
        .length;

/** The level 2 headings of a page. */
const headingsOf = (source: string) =>
    [...source.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading).filter((heading) => heading !== undefined);

const REPORTS = readdirSync(join(PACKAGE, 'src/docs/accessibility')).filter((name) => name.endsWith('.mdx'));

const fixture = (name: string) => read(`src/docs/__tests__/fixtures/accessibility-report/${name}.md`);

describe('the accessibility report check', () => {
    it('passes the complete fixture', () => {
        expect(problemsOf(fixture('complete'))).toEqual([]);
    });

    it('counts the rows of the complete fixture that read no automated test', () => {
        expect(noAutomatedTestRowsOf(fixture('complete'))).toBe(1);
    });

    it('fails a fixture with a row that names no evidence', () => {
        expect(problemsOf(fixture('row-without-evidence'))).toEqual([
            '1.4.4 Resize Text (Level AA): names no evidence',
        ]);
    });

    it('fails a fixture with a row whose evidence file does not exist', () => {
        expect(problemsOf(fixture('missing-evidence-file'))).toEqual([
            '1.4.4 Resize Text (Level AA): evidence src/react/__tests__/gone.ct.tsx does not exist',
        ]);
    });

    it('fails a fixture that marks 4.1.2 Supports', () => {
        expect(problemsOf(fixture('supports-4-1-2'))).toEqual([
            '4.1.2 Name, Role, Value (Level A): marked Supports, which only a screen reader or a device can show',
        ]);
    });
});

describe('the accessibility reports', () => {
    it('has a report for each minor or major release that has a qualification record', () => {
        const releases = readdirSync(join(PACKAGE, 'qualification'))
            .map((name) => /^(\d+\.\d+\.0)\.json$/.exec(name)?.[1])
            .filter((version) => version !== undefined);

        expect(releases.length).toBeGreaterThan(0);
        for (const version of releases) {
            expect(REPORTS, version).toContain(`${version}.mdx`);
        }
    });

    it('gives each report every item of the Report section, as a section', () => {
        for (const name of REPORTS) {
            expect(headingsOf(read(`src/docs/accessibility/${name}`)), name).toEqual(expect.arrayContaining(SECTIONS));
        }
    });

    it('names a WCAG criterion and the specs that verify each marked row, and marks no screen reader or device criterion as met', () => {
        for (const name of REPORTS) {
            const source = read(`src/docs/accessibility/${name}`);

            expect(rowsOf(source).length, name).toBeGreaterThan(0);
            expect(problemsOf(source), name).toEqual([]);
        }
    });

    it('reads no automated test in exactly the rows it did before', () => {
        for (const name of REPORTS) {
            expect(noAutomatedTestRowsOf(read(`src/docs/accessibility/${name}`)), name).toBe(
                NO_AUTOMATED_TEST_ROWS[name],
            );
        }
    });
});
