/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorHydrationProbe, type EditorHydrationResult } from './fixtures/EditorHydrationProbe';

// The browser bundle uses `useLayoutEffect`. `renderToString` in that bundle warns that the effect does not run.
const LAYOUT_EFFECT_ON_SERVER = 'useLayoutEffect does nothing on the server';

// playwright.config.ts defines process.env.NODE_ENV as development, so React hydration warnings reach these listeners in every run.
const watch = (page: Page) => {
    const problems: string[] = [];
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error' && !message.text().includes(LAYOUT_EFFECT_ON_SERVER)) {
            problems.push(`console.error: ${message.text()}`);
        }
    });
    return problems;
};

/** Waits for the probe to report, then returns what it reported. */
const settle = async (read: () => EditorHydrationResult | undefined): Promise<EditorHydrationResult> => {
    await expect.poll(read).toBeDefined();
    const result = read();
    if (result === undefined) {
        throw new Error('The probe never reported.');
    }
    return result;
};

for (const text of ['', 'Rotate the signing keys']) {
    test(`hydrates the editor of "${text}" and shows its content from the first frame`, async ({ mount, page }) => {
        const problems = watch(page);
        let reported: EditorHydrationResult | undefined;

        await mount(
            <EditorHydrationProbe
                text={text}
                onDone={(result) => {
                    reported = result;
                }}
            />,
        );
        const result = await settle(() => reported);

        expect(result.recoverable).toEqual([]);
        expect(problems).toEqual([]);
        expect(result.serverHtml).toContain('data-rte-surface=""></div>');
        expect(result.atCommit).toBe(text);
        expect(result.frames).toEqual([text, text, text]);
        test.info().annotations.push({ type: 'react build', description: result.mode });
    });
}
