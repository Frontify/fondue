/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { HydrationProbe, type HydrationResult } from './fixtures/HydrationProbe';

const root = join(import.meta.dirname, '..', '..', 'model', '__tests__', 'fixtures', 'model');
const fixtures = ['valid', 'unknown', 'invalid'].flatMap((directory) =>
    readdirSync(join(root, directory))
        .filter((name) => name.endsWith('.json'))
        .map(
            (name) =>
                [directory, name, JSON.parse(readFileSync(join(root, directory, name), 'utf8')) as unknown] as const,
        ),
);

// playwright.config.ts defines process.env.NODE_ENV as development, so React hydration warnings reach these listeners in every run.
const watch = (page: Page) => {
    const problems: string[] = [];
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            problems.push(`console.error: ${message.text()}`);
        }
    });
    return problems;
};

/** Waits for the probe to report, then returns what it reported. */
const settle = async (read: () => HydrationResult | undefined): Promise<HydrationResult> => {
    await expect.poll(read).toBeDefined();
    const result = read();
    if (result === undefined) {
        throw new Error('The probe never reported.');
    }
    return result;
};

for (const [directory, name, document] of fixtures) {
    test(`hydrates ${directory}/${name} with no mismatch, page error or console error`, async ({ mount, page }) => {
        const problems = watch(page);
        let reported: HydrationResult | undefined;

        await mount(
            <HydrationProbe
                document={document}
                onDone={(done) => {
                    reported = done;
                }}
            />,
        );
        const result = await settle(() => reported);

        expect(result.recoverable).toEqual([]);
        expect(problems).toEqual([]);
        expect(result.html).toContain('<div');
        test.info().annotations.push({ type: 'react build', description: result.mode });
    });
}

test('sees a mismatch between the server markup and the first client render', async ({ mount, page }) => {
    const problems = watch(page);
    let reported: HydrationResult | undefined;

    await mount(
        <HydrationProbe
            document={fixtures[0]?.[2]}
            html="<div>not what the reader writes</div>"
            onDone={(done) => {
                reported = done;
            }}
        />,
    );
    const result = await settle(() => reported);

    expect(result.recoverable.length + problems.length).toBeGreaterThan(0);
});
