/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import method from '../../../perf/method.json' with { type: 'json' };

import { CycleHost } from './fixtures/CycleHost';

const CYCLES = 100;
const TOLERANCE = 0.02;
const HEAP_GROWTH_BYTES = 2 * 1024 * 1024;

test('returns DOM nodes and event listeners to within 2% and the heap to within 2 MiB after 100 mounts and unmounts of the typical fixture', async ({
    mount,
    page,
    browserName,
}) => {
    test.skip(browserName !== 'chromium', 'The counters are Chromium DevTools Protocol methods.');
    test.setTimeout(300_000);
    await mount(<CycleHost />);
    const client = await page.context().newCDPSession(page);
    const measure = async () => {
        // A collection can free what the last one only finalized, so two settle the heap.
        await client.send('HeapProfiler.collectGarbage');
        await client.send('HeapProfiler.collectGarbage');
        const { nodes, jsEventListeners } = await client.send('Memory.getDOMCounters');
        const { usedSize } = await client.send('Runtime.getHeapUsage');

        return { nodes, listeners: jsEventListeners, heap: usedSize };
    };

    // V8's optimised code and ProseMirror's attribute cache table keep growing over the first tens of cycles, then hold.
    for (let cycle = 0; cycle < method.warmup; cycle += 1) {
        await page.evaluate(() => window.rteCycle?.('typical'));
    }

    const baseline = await measure();

    for (let cycle = 0; cycle < CYCLES; cycle += 1) {
        await page.evaluate(() => window.rteCycle?.('typical'));
    }

    const after = await measure();

    expect(Math.abs(after.nodes - baseline.nodes)).toBeLessThanOrEqual(baseline.nodes * TOLERANCE);
    expect(Math.abs(after.listeners - baseline.listeners)).toBeLessThanOrEqual(baseline.listeners * TOLERANCE);
    expect(after.heap - baseline.heap).toBeLessThanOrEqual(HEAP_GROWTH_BYTES);
});
