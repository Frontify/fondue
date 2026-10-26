/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { type SelectionTarget } from '#/testing';

export const PROFILES = ['inline', 'comment', 'document', 'brand-document'] as const;
// The package's `src`, whose feature stories each name their feature in their title.
const SRC = join(import.meta.dirname, '..', '..', '..');

/** Each feature story's file under `src` and the feature its title names, so a new feature story is never left out. */
export const FEATURE_STORIES: readonly { feature: string; file: string }[] = globSync('features/*/*.stories.tsx', {
    cwd: SRC,
})
    .map((path) => path.replaceAll('\\', '/'))
    .sort()
    .map((file) => {
        const feature = /title: 'Rich Text Editor\/Features\/([^']+)'/.exec(readFileSync(join(SRC, file), 'utf8'))?.[1];
        if (feature === undefined) {
            throw new Error(`${file} names no feature in its title.`);
        }

        return { feature, file };
    });

/** The story file of `feature`. */
export const storyOf = (feature: string): string => {
    const story = FEATURE_STORIES.find((candidate) => candidate.feature === feature);
    if (story === undefined) {
        throw new Error(`No feature story for ${feature}.`);
    }

    return story.file;
};

export { ready } from './ready';
export const surfaceOf = (page: Page) => page.getByRole('textbox');
export const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });
export const moreOf = (page: Page) => toolbarOf(page).getByRole('button', { name: 'More', exact: true });

// Two frames outlast ProseMirror's 20 ms focus timer, which otherwise puts back the caret a key selection extended.
export const settled = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

/** Fills a profile's empty document with a heading-free paragraph of text, then leaves the caret in it. */
export const populate = async (page: Page, text = 'The quick brown fox jumps over the lazy dog.') => {
    await surfaceOf(page).click();
    await page.keyboard.insertText(text);
};

/** Every element with hidden or clipped overflow whose content overflows it, except visually hidden text. */
export const clipped = (page: Page) =>
    page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('body *')]
            .filter((element) => {
                const style = getComputedStyle(element);
                const hides = (value: string) => value === 'hidden' || value === 'clip';
                // A visually hidden element is one pixel or less on purpose, as the live region is.
                if (element.clientHeight <= 1 || element.clientWidth <= 1 || style.display === 'none') {
                    return false;
                }

                const down = hides(style.overflowY) && element.scrollHeight > element.clientHeight + 1;
                const across = hides(style.overflowX) && element.scrollWidth > element.clientWidth + 1;

                return down || across;
            })
            .map(
                (element) =>
                    `${element.tagName.toLowerCase()}.${element.className} ${element.textContent?.slice(0, 40)}`,
            ),
    );

/** Whether the page scrolls horizontally. */
export const scrollsAcross = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

/** The name a focused control shows: its `aria-label`, else its label `span`, as a menu row holds it, else its text. */
export const focusedName = (page: Page) =>
    page.evaluate(() => {
        const active = document.activeElement;
        const label = active?.getAttribute('aria-label');
        const inner = active?.querySelector(':scope > span');
        const source = inner ?? active;
        const content = source?.textContent;
        const text = content?.trim();
        const named = label ?? text;

        return named ?? '';
    });

// Radix moves focus in a timeout after the key, so the next read waits for it.
export const press = async (page: Page, key: string) => {
    await page.keyboard.press(key);
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
};

/** How a mounted story's play function ended: `pending` until it has, `none` without one, else `passed` or its error. */
export const played = (page: Page) => page.evaluate(() => window.storyProbe?.played);

/** Waits until a mounted story's play function has run, so a spec acts on the state it leaves. */
export const afterPlay = (page: Page) => expect.poll(() => played(page), { timeout: 15_000 }).not.toBe('pending');

/** Presses `key` until the focused control is named `name`, and fails once 60 presses never reached it. */
export const pressUntil = async (page: Page, key: string, name: string | RegExp) => {
    const seen = new Set<string>();
    for (let step = 0; step < 60; step += 1) {
        const focused = await focusedName(page);
        let reached = focused === name;
        if (name instanceof RegExp) {
            reached = name.test(focused);
        }

        if (reached) {
            return;
        }

        seen.add(focused);
        await press(page, key);
    }

    throw new Error(`${key} never reached ${String(name)}, only ${[...seen].join(', ')}.`);
};

/** Runs `command` with `payload` through the profile probe's handle, to set up a state. */
export const execute = (page: Page, command: string, payload?: unknown) =>
    page.evaluate(([id, args]) => window.profileProbe?.execute(id, args), [command, payload] as const);

/** Moves the profile probe's selection to `target`. */
export const select = (page: Page, target: SelectionTarget) =>
    page.evaluate((to) => window.profileProbe?.select(to), target);

/** Selects the first image of the profile probe's document. */
export const selectImage = (page: Page) =>
    page.evaluate(() => {
        const probe = window.profileProbe;
        const handle = probe?.handle;
        const nodes = handle?.getSnapshot().document.content.content;
        const figure = nodes?.find(({ type }) => type === 'figure');
        const children = figure?.content;
        const image = children?.[0];
        const attrs = image?.attrs;
        const nodeId = attrs?.nodeId;
        if (typeof nodeId === 'string') {
            probe?.select({ nodeId });
        }
    });
