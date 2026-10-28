/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, globSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';

import { pendingResults } from './fixtures/qualification';
import {
    mustHoldQualificationRecord,
    nextReleaseVersion,
    nextReleaseVersionFromChangesets,
    PACKAGE_NAME,
    qualificationRecordVersion,
    readPreRelease,
} from './fixtures/releaseVersion';
import { budgets } from './fixtures/size/bundle';

const PACKAGE = fileURLToPath(new URL('../..', import.meta.url));
const QUALIFICATION = join(PACKAGE, 'qualification');
const CHANGESET_DIR = join(PACKAGE, '../../.changeset');

type Json = Record<string, unknown>;

const readJson = (path: string) => JSON.parse(readFileSync(path, 'utf8')) as Json;

const schema = readJson(join(QUALIFICATION, 'schema.json'));
const validate = new Ajv2020({ strict: true, allowUnionTypes: true, allErrors: true }).compile(schema);

const RECORDS = readdirSync(QUALIFICATION)
    .filter((name) => /^\d+\.\d+\.\d+\.json$/.test(name))
    .map((name) => ({ name, record: readJson(join(QUALIFICATION, name)) }));

/** A copy of the 1.0.0 record with `change` applied to it. */
const changed = (change: (record: Json) => void) => {
    const record = structuredClone(readJson(join(QUALIFICATION, '1.0.0.json')));
    change(record);

    return record;
};

const suitesOf = (record: Json) => record.suites as Record<string, Json>;

describe('the qualification records', () => {
    it('holds the 1.0.0 record, and each record passes the schema under its own version', () => {
        expect(existsSync(join(QUALIFICATION, '1.0.0.json'))).toBe(true);
        for (const { name, record } of RECORDS) {
            expect(validate(record), `${name}: ${JSON.stringify(validate.errors)}`).toBe(true);
            expect(name).toBe(`${String(record.version)}.json`);
        }
    });

    it('lists each bundle budget row with its size-budgets.json budget', () => {
        for (const { name, record } of RECORDS) {
            const rows = record.bundle as readonly { build: string; budgetBytes: number }[];

            expect(Object.fromEntries(rows.map(({ build, budgetBytes }) => [build, budgetBytes])), name).toEqual(
                budgets,
            );
        }
    });

    it('names the commit of each record in the accessibility report of its version', () => {
        for (const { name, record } of RECORDS) {
            const report = join(PACKAGE, 'src/docs/accessibility', `${String(record.version)}.mdx`);
            if (!existsSync(report)) {
                continue;
            }

            expect(readFileSync(report, 'utf8'), name).toContain(`tested at commit \`${String(record.commit)}\``);
        }
    });

    it('leaves no result pending in the record of the version package.json names', () => {
        const { version } = readJson(join(PACKAGE, 'package.json')) as { version: string };
        const pre = readPreRelease(CHANGESET_DIR);
        const releaseVersion = nextReleaseVersion({ packageVersion: version, changesetDir: CHANGESET_DIR });
        const recordVersion = qualificationRecordVersion(releaseVersion, pre);
        const releaseRecord = RECORDS.find(({ record }) => record.version === recordVersion);
        if (mustHoldQualificationRecord(releaseVersion)) {
            expect(releaseRecord, `${recordVersion}.json`).toBeDefined();
        }

        const current = RECORDS.find(({ record }) => record.version === version);
        if (current === undefined) {
            return;
        }

        expect(pendingResults(current.record)).toEqual([]);
    });
});

describe('the release version qualification records need', () => {
    it('resolves 0.0.0 with a pending 1.0.0 major changeset', () => {
        expect(nextReleaseVersionFromChangesets('0.0.0', [{ packageName: PACKAGE_NAME, bump: 'major' }])).toBe('1.0.0');
        expect(mustHoldQualificationRecord('1.0.0')).toBe(true);
    });

    it('reads pre mode at 1.0.0-beta.0 as needing the 1.0.0 record', () => {
        const pre = { mode: 'pre' as const };
        expect(qualificationRecordVersion('1.0.0-beta.0', pre)).toBe('1.0.0');
        expect(mustHoldQualificationRecord('1.0.0-beta.0')).toBe(true);
    });

    it('keeps a later minor release optional until its record exists', () => {
        expect(nextReleaseVersionFromChangesets('1.0.0', [{ packageName: PACKAGE_NAME, bump: 'minor' }])).toBe('1.1.0');
        expect(mustHoldQualificationRecord('1.1.0')).toBe(false);
    });

    it('names a pending suite in the record a release resolves to', () => {
        const record = changed((draft) => {
            draft.suites = { firefox: { pendingIn: 'ci-job' } };
            delete draft.performance;
        });
        expect(pendingResults(record)).toEqual(['/suites/firefox: ci-job']);
    });

    it('treats a stamped record as having no pending results', () => {
        const record = changed((draft) => {
            Object.assign(suitesOf(draft), {
                firefox: {
                    browserVersion: '150.0.2',
                    playwright: '1.60.0',
                    command: 'playwright test --project=firefox',
                    passed: 1,
                    failed: 0,
                    flaky: 0,
                    skipped: 0,
                },
            });
            draft.performance = { passed: true };
        });
        expect(pendingResults(record)).toEqual([]);
    });
});

describe('the qualification record schema', () => {
    it('rejects a record without a result for one of the chromium, firefox and webkit projects', () => {
        for (const project of ['chromium', 'firefox', 'webkit']) {
            expect(validate(changed((record) => delete suitesOf(record)[project])), project).toBe(false);
        }
    });

    it('rejects a browser result without its exact browser build version', () => {
        expect(validate(changed((record) => delete suitesOf(record).webkit?.browserVersion))).toBe(false);
        expect(
            validate(changed((record) => Object.assign(suitesOf(record).chromium ?? {}, { browserVersion: '148' }))),
        ).toBe(false);
    });

    it('rejects a failed count in a project without an accepted failure for that project', () => {
        for (const project of ['unit', 'chromium', 'webkit']) {
            const failing = (record: Json) => Object.assign(suitesOf(record)[project] ?? {}, { failed: 1 });
            const accepted = { test: 'A test.', project, decision: 'DR-061' };

            expect(validate(changed(failing)), project).toBe(false);
            expect(
                validate(
                    changed((record) => {
                        failing(record);
                        record.acceptedFailures = [{ ...accepted, project: 'firefox' }];
                    }),
                ),
                project,
            ).toBe(false);
            expect(
                validate(
                    changed((record) => {
                        failing(record);
                        record.acceptedFailures = [accepted];
                    }),
                ),
                project,
            ).toBe(true);
        }
    });

    it('rejects a bundle row that did not pass', () => {
        const failed = changed((record) => {
            const [first] = record.bundle as Json[];
            Object.assign(first ?? {}, { passed: false });
        });

        expect(validate(failed)).toBe(false);
    });

    it('rejects an open security or accessibility finding without a decision record ID, whatever its severity', () => {
        for (const kind of ['security', 'accessibility']) {
            const undecided = { kind, severity: 'minor', summary: 'A finding.' };
            const finding = { ...undecided, decision: 'DR-061' };

            expect(validate(changed((record) => Object.assign(record, { findings: [finding] }))), kind).toBe(true);
            expect(validate(changed((record) => Object.assign(record, { findings: [undecided] }))), kind).toBe(false);
            expect(
                validate(changed((record) => Object.assign(record, { findings: [{ ...finding, decision: 'none' }] }))),
                kind,
            ).toBe(false);
        }
    });
});

const REPORTS = RECORDS.flatMap(({ record }) => {
    const path = join(PACKAGE, 'src/docs/accessibility', `${String(record.version)}.mdx`);
    if (!existsSync(path)) {
        return [];
    }

    return [{ name: `${String(record.version)}.mdx`, text: readFileSync(path, 'utf8') }];
});

const PACKAGE_PATH = /^(?:(?:src|perf|playwright|qualification)\/\S+|size-budgets\.json|package\.json)$/;

const stringsIn = (value: unknown): string[] => {
    if (typeof value === 'string') {
        return [value];
    }

    if (Array.isArray(value)) {
        return value.flatMap(stringsIn);
    }

    if (typeof value === 'object' && value !== null) {
        return Object.values(value).flatMap(stringsIn);
    }

    return [];
};

const pathsMissing = (candidates: readonly string[]) =>
    candidates
        .filter((path) => PACKAGE_PATH.test(path))
        .filter((path) => {
            if (path.includes('*')) {
                return globSync(path, { cwd: PACKAGE }).length === 0;
            }

            return !existsSync(join(PACKAGE, path));
        });

const backticked = (text: string) => [...text.matchAll(/`([^`\n]+)`/g)].map((match) => match[1] ?? '');

describe('the paths the records and reports name', () => {
    it('exist in the package, and a glob matches at least one file', () => {
        for (const { name, record } of RECORDS) {
            expect(pathsMissing(stringsIn(record)), name).toEqual([]);
        }

        for (const { name, text } of REPORTS) {
            expect(pathsMissing(backticked(text)), name).toEqual([]);
        }
    });

    it('finds a path that does not exist', () => {
        expect(
            pathsMissing(['src/nowhere/missing.spec.ts', 'src/nowhere/*.ts', 'package.json', 'src/**/*.ts']),
        ).toEqual(['src/nowhere/missing.spec.ts', 'src/nowhere/*.ts']);
    });
});

describe('the version a record names', () => {
    it('is the version the package releases next, in the record file name and in the report', () => {
        const { version: packageVersion } = readJson(join(PACKAGE, 'package.json')) as { version: string };
        const version = nextReleaseVersion({ packageVersion, changesetDir: CHANGESET_DIR });

        expect(RECORDS.map(({ record }) => record.version)).toContain(version);
        const current = RECORDS.find(({ record }) => record.version === version);
        expect(current?.name).toBe(`${version}.json`);

        const report = REPORTS.find(({ name }) => name === `${version}.mdx`);
        expect(report, `${version}.mdx`).toBeDefined();
        expect(report?.text).toContain(`<Meta title="Rich Text Editor/Guides/Accessibility report ${version}" />`);
        expect(report?.text).toMatch(new RegExp(`^# Accessibility report ${version.replaceAll('.', '\\.')}$`, 'm'));
        expect(report?.text).toContain(`- **Package**: \`@frontify/fondue-rich-text-editor\` ${version},`);
    });
});
