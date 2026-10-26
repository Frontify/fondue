/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { played } from './fixtures/layout';
import { StoryProbe } from './fixtures/StoryProbe';

// The story files of the package under `src`; the probe reports the stories each one holds.
const SRC = join(import.meta.dirname, '..', '..');
const FILES = globSync('**/*.stories.tsx', { cwd: SRC })
    .map((path) => path.replaceAll('\\', '/'))
    .sort();

const editableSurfaces = (page: Page) => page.locator('[data-rte-surface][contenteditable="true"]');
const caretAtEnd = (page: Page) => page.evaluate(() => window.storyProbe?.caretAtEnd());
const storiesOf = async (page: Page) => (await page.evaluate(() => window.storyProbe?.stories)) ?? [];

/** An editor, its blocked or recovery shell, or reader content has rendered, and no editor is still loading. */
const rendered = async (page: Page) => {
    await expect(
        page.locator('[data-test-id^="fondue-rich-text"], .fondue-rte-content, [data-rte-message]').first(),
    ).toBeVisible();
    await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
};

type Allowance = {
    readonly message: RegExp;
    readonly max: number;
};

/** The messages that no allowance covers, and that the allowance holds to its count. */
const unallowed = (messages: readonly string[], allowed: Allowance | undefined) => {
    const own = messages.filter((message) => allowed?.message.test(message) === true);
    const allowedMax = allowed?.max;
    const max = allowedMax ?? 0;
    expect(own.length).toBeLessThanOrEqual(max);
    return messages.filter((message) => allowed?.message.test(message) !== true);
};

test('lists a story file for every story of the package', async ({ mount, page }) => {
    await mount(<StoryProbe />);
    const stories = await storiesOf(page);

    expect([...new Set(stories.map(({ file }) => file))].sort()).toEqual(FILES);
});

for (const file of FILES) {
    // Each story renders without console.error, passes its play function, which asserts what it documents.
    test(`renders the stories of ${file} without console.error and passes their play functions`, async ({
        mount,
        page,
    }) => {
        test.setTimeout(120_000);
        // Listening before the mount records the errors of the story modules' import too.
        const consoleErrors: string[] = [];
        const pageErrors: string[] = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });
        page.on('pageerror', (error) => pageErrors.push(error.message));
        await mount(<StoryProbe />);
        expect(consoleErrors).toEqual([]);
        expect(pageErrors).toEqual([]);

        const failures: string[] = [];
        const stories = await storiesOf(page);
        for (const story of stories.filter((candidate) => candidate.file === file)) {
            try {
                await test.step(story.name, async () => {
                    // A reload gives each story a page of its own, as a test would.
                    await page.reload();
                    await mount(<StoryProbe file={file} name={story.name} />);
                    await rendered(page);
                    // The play function bounds each of its waits at 10 s; the poll caps one story so the report names it.
                    await expect.poll(() => played(page), { timeout: 30_000 }).not.toBe('pending');
                    expect(await played(page)).toMatch(/^(passed|none)$/);
                    if (story.documented) {
                        expect(await played(page), `${story.name} documents behavior with no play function`).toBe(
                            'passed',
                        );
                    }

                    // Typing never passes a new document into the editor.
                    const surfaces = await editableSurfaces(page).count();
                    expect(surfaces === 0, `${story.name} has ${surfaces} editable surfaces`).toBe(story.noSurface);
                    if (surfaces > 0) {
                        await page.evaluate(() => window.storyProbe?.watch());
                        await caretAtEnd(page);
                        await page.keyboard.type('abcdefghij');
                        await expect(page.locator('[data-rte-surface]:focus')).toContainText('abcdefghij');

                        expect(await page.evaluate(() => window.storyProbe?.changes())).toEqual({
                            replaced: 0,
                            remounted: false,
                        });
                    }

                    expect(unallowed(consoleErrors, story.reports?.console)).toEqual([]);
                    expect(unallowed(pageErrors, story.reports?.page)).toEqual([]);
                });
            } catch (error) {
                // A failed query prints the page, so the report keeps the head of each message.
                failures.push(`${story.name}: ${String(error).slice(0, 400)}`);
            }
            consoleErrors.length = 0;
            pageErrors.length = 0;
        }

        expect(failures).toEqual([]);
    });
}
