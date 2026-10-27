/* (c) Copyright Frontify Ltd., all rights reserved. */

// Usage: node qualification/stamp.mjs --unit <vitest json> --components <playwright json> [--version <v>]
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

/**
 * @typedef {{ passed: number; failed: number; flaky: number; skipped: number }} Counts
 * @typedef {{ command?: string } & Partial<Counts>} Suite
 * @typedef {{ commit: string; date: string; suites: Record<string, Suite> }} Record_
 * @typedef {{ numPassedTests: number; numFailedTests: number; numPendingTests: number; numTodoTests: number }} VitestReport
 * @typedef {{ specs?: { tests?: { projectName: string; status: string }[] }[]; suites?: PlaywrightSuite[] }} PlaywrightSuite
 */

const PACKAGE_NAME = '@frontify/fondue-rich-text-editor';
const BUMPS = ['patch', 'minor', 'major'];

const { values } = parseArgs({
    options: {
        unit: { type: 'string' },
        components: { type: 'string' },
        version: { type: 'string' },
        // The package directory to stamp, so a test can stamp a copy.
        root: { type: 'string' },
    },
});

const here = dirname(fileURLToPath(import.meta.url));
const root = values.root ?? join(here, '..');

/** @param {string} path */
const readText = (path) => readFileSync(path, 'utf8');

const nextVersion = () => {
    const { version } = /** @type {{ version: string }} */ (JSON.parse(readText(join(root, 'package.json'))));
    const changesets = join(root, '../../.changeset');
    let strongest = -1;
    for (const name of readdirSync(changesets)) {
        if (!name.endsWith('.md')) {
            continue;
        }
        const frontmatter = /^---\n([\s\S]*?)\n---/.exec(readText(join(changesets, name)))?.[1] ?? '';
        for (const line of frontmatter.split('\n')) {
            const match = /^["']?([^"':]+)["']?\s*:\s*(\w+)\s*$/.exec(line.trim());
            if (match?.[1] === PACKAGE_NAME) {
                strongest = Math.max(strongest, BUMPS.indexOf(match[2] ?? ''));
            }
        }
    }
    const [major = 0, minor = 0, patch = 0] = version.split('.').map(Number);
    if (strongest === 2) {
        return `${major + 1}.0.0`;
    }
    if (strongest === 1) {
        return `${major}.${minor + 1}.0`;
    }
    if (strongest === 0) {
        return `${major}.${minor}.${patch + 1}`;
    }

    return version;
};

/** @param {PlaywrightSuite[]} suites */
const playwrightCounts = (suites) => {
    /** @type {Record<string, Counts>} */
    const projects = {};
    for (const suite of suites) {
        for (const spec of suite.specs ?? []) {
            for (const test of spec.tests ?? []) {
                projects[test.projectName] ??= { passed: 0, failed: 0, flaky: 0, skipped: 0 };
                const counts = projects[test.projectName];
                if (test.status === 'expected') {
                    counts.passed++;
                } else if (test.status === 'unexpected') {
                    counts.failed++;
                } else if (test.status === 'flaky') {
                    counts.flaky++;
                } else {
                    counts.skipped++;
                }
            }
        }
        for (const [project, counts] of Object.entries(playwrightCounts(suite.suites ?? []))) {
            const total = (projects[project] ??= { passed: 0, failed: 0, flaky: 0, skipped: 0 });
            total.passed += counts.passed;
            total.failed += counts.failed;
            total.flaky += counts.flaky;
            total.skipped += counts.skipped;
        }
    }

    return projects;
};

if (values.unit === undefined || values.components === undefined) {
    console.error(
        'Usage: node qualification/stamp.mjs --unit <vitest json> --components <playwright json> [--version <v>]',
    );
    process.exit(1);
}

const version = values.version ?? nextVersion();
const recordPath = join(root, 'qualification', `${version}.json`);
const reportPath = join(root, 'src/docs/accessibility', `${version}.mdx`);
const record = /** @type {Record_} */ (JSON.parse(readText(recordPath)));

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: here, encoding: 'utf8' }).trim();
const unit = /** @type {VitestReport} */ (JSON.parse(readText(values.unit)));
const playwright = /** @type {{ suites?: PlaywrightSuite[] }} */ (JSON.parse(readText(values.components)));

record.commit = commit;
record.date = new Date().toISOString().slice(0, 10);
Object.assign(record.suites['unit'] ?? {}, {
    passed: unit.numPassedTests,
    failed: unit.numFailedTests,
    skipped: unit.numPendingTests + unit.numTodoTests,
});
for (const [project, counts] of Object.entries(playwrightCounts(playwright.suites ?? []))) {
    const suite = record.suites[project];
    if (suite?.command === undefined) {
        throw new Error(`The record names no command for the ${project} project, so it cannot be stamped.`);
    }
    Object.assign(suite, counts);
}

writeFileSync(recordPath, `${JSON.stringify(record, undefined, 4)}\n`);
writeFileSync(reportPath, readText(reportPath).replace(/(tested at commit `)[0-9a-f]{40}(`)/, `$1${commit}$2`));
