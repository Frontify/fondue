/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const PACKAGE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const read = (path: string) => readFileSync(join(PACKAGE, path), 'utf8');

const CONFORMANCE_LEVELS = ['Supports', 'Partially Supports', 'Does Not Support', 'Not Applicable', 'Not Evaluated'];

/** The criteria whose outcome only a screen reader or a real device can show. */
const SCREEN_READER_AND_DEVICE = ['1.3.1', '2.4.11', '4.1.2', '4.1.3', 'A.2.2.2'];

const REQUIREMENT_ID = /(?:^|[\s(,])(?:[a-z]+\/)?AC-\d{3}\b/;

const CRITERIA_HEADER = /^\| Criterion\s+\| Conformance level\s+\| Remarks and explanations\s+\|$/;

interface Row {
    readonly criterion: string;
    readonly level: string;
    readonly remarks: string;
}

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
        if (level !== 'Not Applicable' && !REQUIREMENT_ID.test(remarks)) {
            problems.push(`${criterion}: names no requirement ID`);
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

const fixture = (name: string) => read(`src/docs/__tests__/fixtures/accessibility-report/${name}.md`);

describe('the accessibility report check', () => {
    it('passes the complete fixture', () => {
        expect(problemsOf(fixture('complete'))).toEqual([]);
    });

    it('fails a fixture with a row that names no requirement ID', () => {
        expect(problemsOf(fixture('row-without-id'))).toEqual([
            '1.4.4 Resize Text (Level AA): names no requirement ID',
        ]);
    });

    it('fails a fixture that marks 4.1.2 Supports', () => {
        expect(problemsOf(fixture('supports-4-1-2'))).toEqual([
            '4.1.2 Name, Role, Value (Level A): marked Supports, which only a screen reader or a device can show',
        ]);
    });
});
