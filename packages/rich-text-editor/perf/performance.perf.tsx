/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { type PerfFixtureName } from '#/model/__tests__/fixtures/perf/documents';

import { PerfHarness } from './harness';
import { record } from './measure';
import method from './method.json' with { type: 'json' };
import { type TimedEvent } from './page-api';

const { warmup, samples, cpuThrottlingRate, eventTiming, missingKeystrokeMs } = method;

const MIB = 1024 * 1024;

// Each row measures alone on the throttled page, one after the other.
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ mount, page }) => {
    await mount(<PerfHarness />);
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: cpuThrottlingRate });
});

/** The warm-up runs, then the sample runs, each timed by `run` in ms; a run that reports none adds no sample. */
const sample = async (page: Page, run: (page: Page) => Promise<number | null | undefined>): Promise<number[]> => {
    const durations: number[] = [];
    for (let index = 0; index < warmup + samples; index += 1) {
        const elapsed = await run(page);
        if (index >= warmup && elapsed !== null && elapsed !== undefined) {
            durations.push(elapsed);
        }
    }
    return durations;
};

/** Records the same samples under every row ID that reads them, such as a p95 row and a p99 row of one run. */
const recordAs = (ids: readonly string[], measured: readonly number[]) => {
    expect(measured).toHaveLength(samples);
    for (const id of ids) {
        record(id, { samples: measured });
    }
};

/** The keydown duration of each driven keystroke: the entry matched by `interactionId`, else the granularity's floor. */
const keystrokeDurations = (entries: readonly TimedEvent[], keystrokes: number): number[] => {
    const byInteraction = new Map<number, number>();
    for (const { name, duration, interactionId } of entries) {
        if (name === 'keydown' && interactionId > 0 && !byInteraction.has(interactionId)) {
            byInteraction.set(interactionId, duration);
        }
    }
    const found = [...byInteraction.values()].slice(-keystrokes);
    // At the threshold no entry is reported below 16 ms, so a keystroke with none was 0 or 8 ms.
    const missing = Array.from({ length: keystrokes - found.length }, () => missingKeystrokeMs);
    return [...found, ...missing];
};

const typeKeystrokes = async (page: Page, count: number) => {
    for (let keystroke = 0; keystroke < count; keystroke += 1) {
        await page.keyboard.press('a');
        await page.evaluate(() => window.rtePerf?.nextPaint());
    }
};

const measureKeystrokes = async (page: Page) => {
    await page.evaluate((threshold) => window.rtePerf?.observeEvents(threshold), eventTiming.durationThreshold);
    await page.evaluate(() => window.rtePerf?.focusMiddle());
    await typeKeystrokes(page, warmup);
    await page.evaluate(() => window.rtePerf?.resetEvents());
    await page.evaluate(() => window.rtePerf?.resetCommits());
    await typeKeystrokes(page, samples);
    // The observer delivers its entries after the last paint.
    await page.evaluate(() => window.rtePerf?.nextPaint());
    const entries = (await page.evaluate(() => window.rtePerf?.events())) ?? [];
    const commits = (await page.evaluate(() => window.rtePerf?.commits())) ?? [];
    // A keystroke with no entry counts as 8 ms, so only its commit shows that the key reached the editor.
    expect(commits.length).toBeGreaterThanOrEqual(samples);
    return { keystrokes: keystrokeDurations(entries, samples), commits: [...commits] };
};

const FIXTURES: readonly {
    readonly fixture: PerfFixtureName;
    readonly keystroke: readonly string[];
    readonly commit: readonly string[];
}[] = [
    { fixture: 'small', keystroke: ['keystroke-small-p95'], commit: [] },
    {
        fixture: 'typical',
        keystroke: ['keystroke-typical-p95', 'keystroke-typical-p99'],
        commit: ['commit-typical-p95'],
    },
    { fixture: 'large', keystroke: ['keystroke-large-p95'], commit: ['commit-large-p95'] },
    { fixture: 'words10k', keystroke: ['keystroke-words10k-p99'], commit: ['commit-words10k-p95'] },
];

for (const { fixture, keystroke, commit } of FIXTURES) {
    test(`measures keystrokes and the commit pipeline in the ${fixture} fixture`, async ({ page }) => {
        await page.evaluate((name) => window.rtePerf?.mount(name), fixture);

        const measured = await measureKeystrokes(page);

        recordAs(keystroke, measured.keystrokes);
        // The commits of the driven keystrokes, which the pipeline marks bound.
        for (const id of commit) {
            record(id, { samples: measured.commits.slice(-samples) });
        }
    });
}

for (const { fixture, ids } of [
    { fixture: 'typical', ids: ['mount-typical-p95'] },
    { fixture: 'large', ids: ['mount-large-p95'] },
] as const) {
    test(`measures mount to ready of the ${fixture} fixture`, async ({ page }) => {
        const durations = await sample(page, async () => {
            const elapsed = await page.evaluate((name) => window.rtePerf?.mount(name), fixture);
            await page.evaluate(() => window.rtePerf?.unmount());
            return elapsed;
        });

        recordAs(ids, durations);
    });
}

test('measures the selector notification to toolbar render in the typical fixture', async ({ page }) => {
    await page.evaluate(() => window.rtePerf?.mount('typical'));
    await page.evaluate(() => window.rtePerf?.focusMiddle());
    await page.evaluate((moves) => window.rtePerf?.moveBetweenBoldAndPlain(moves), warmup);
    const durations = (await page.evaluate((moves) => window.rtePerf?.moveBetweenBoldAndPlain(moves), samples)) ?? [];

    recordAs(['selector-typical-p95'], durations);
});

for (const { bytes, id } of [
    { bytes: 100 * 1024, id: 'paste-100kb-typical-p95' },
    { bytes: MIB, id: 'paste-1mib-typical-p95' },
] as const) {
    test(`measures a paste of ${bytes} bytes of HTML to the next paint in the typical fixture`, async ({ page }) => {
        await page.evaluate(() => window.rtePerf?.mount('typical'));
        await page.evaluate(() => window.rtePerf?.focusMiddle());
        const durations = await sample(page, () => page.evaluate((size) => window.rtePerf?.paste(size), bytes));

        recordAs([id], durations);
    });
}

test('measures getSnapshot() after an edit in the large fixture', async ({ page }) => {
    await page.evaluate(() => window.rtePerf?.mount('large'));
    await page.evaluate(() => window.rtePerf?.focusMiddle());
    const durations = await sample(page, () => page.evaluate(() => window.rtePerf?.snapshotAfterEdit()));

    recordAs(['snapshot-large-p95'], durations);
});

test('measures the mount of 20 editors and a keystroke in one of them', async ({ page }) => {
    const durations = await sample(page, async () => {
        const elapsed = await page.evaluate((count) => window.rtePerf?.mountMany(count), 20);
        await page.evaluate(() => window.rtePerf?.unmount());
        return elapsed;
    });
    recordAs(['mount-many-p95'], durations);

    await page.evaluate((count) => window.rtePerf?.mountMany(count), 20);
    const measured = await measureKeystrokes(page);

    recordAs(['keystroke-many-p95'], measured.keystrokes);
});

test('records the command execution to the next paint in the large fixture', async ({ page }) => {
    await page.evaluate(() => window.rtePerf?.mount('large'));
    const durations: number[] = [];
    // `table.insert` joins these when tables ship.
    for (const command of ['mark.bold.toggle', 'list.bullet.toggle']) {
        durations.push(...(await sample(page, () => page.evaluate((id) => window.rtePerf?.command(id), command))));
    }

    record('command-large-p95', { samples: durations });
});

test('records the dialog and menu open to focus inside it in the typical fixture', async ({ page }) => {
    await page.evaluate(() => window.rtePerf?.mount('typical'));
    const durations: number[] = [];
    for (const command of ['link.edit', 'emoji.picker.open']) {
        const opened = async () => {
            const elapsed = await page.evaluate(
                (id) => window.rtePerf?.openedWithFocus(id, '[role="dialog"], [role="listbox"], [role="menu"]'),
                command,
            );
            // A null sample would be dropped and let the p95 measure only the opens that worked.
            if (elapsed === null) {
                throw new Error(`${command} never moved focus into a dialog, listbox or menu within 2000 ms`);
            }
            return elapsed;
        };
        durations.push(...(await sample(page, opened)));
    }

    record('dialog-typical-p95', { samples: durations });
});
