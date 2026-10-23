/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Page } from '@playwright/test';

import { type SelectionTarget } from '#/testing';

export const PROFILES = ['inline', 'comment', 'document', 'brand-document'] as const;

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
