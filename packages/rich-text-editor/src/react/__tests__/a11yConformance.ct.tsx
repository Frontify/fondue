/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import {
    clipped,
    afterPlay,
    execute,
    PLUGIN_STORIES,
    moreOf,
    populate,
    PROFILES,
    ready,
    scrollsAcross,
    select,
    selectImage,
    surfaceOf,
    toolbarOf,
} from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';
import { StoryProbe } from './fixtures/StoryProbe';

// WCAG 1.4.12 text spacing, as the bookmarklet the W3C cites applies it.
const TEXT_SPACING = `* {
    line-height: 1.5 !important;
    letter-spacing: 0.12em !important;
    word-spacing: 0.16em !important;
}
p { margin-block-end: 2em !important; }`;

/** The interactive chrome a pointer can target, which a target size check measures. */
const TARGETS =
    'button, [role="button"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], input:not([type="hidden"]), select, a[href]';

/**
 * The visible targets smaller than 24 by 24 CSS pixels whose 24 pixel circle, centred on them, meets another target or
 * another such circle (WCAG 2.5.8); a link inside the content is inline and exempt.
 */
const crampedTargets = (page: Page) =>
    page.evaluate((selector) => {
        const surface = document.querySelector('[role="textbox"]');
        const targets = [...document.querySelectorAll<HTMLElement>(selector)]
            .filter((element) => {
                const box = element.getBoundingClientRect();
                if (box.width === 0 || box.height === 0 || element.closest('[hidden], [aria-hidden="true"]') !== null) {
                    return false;
                }

                return !(element.tagName === 'A' && surface?.contains(element) === true);
            })
            .map((element) => ({ element, box: element.getBoundingClientRect() }));
        const small = targets.filter(({ box }) => box.width < 24 || box.height < 24);
        const centre = (box: DOMRect) => ({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
        const meetsBox = (box: DOMRect, other: DOMRect) => {
            const { x, y } = centre(box);
            const nearX = Math.max(other.left, Math.min(x, other.right));
            const nearY = Math.max(other.top, Math.min(y, other.bottom));

            return Math.hypot(x - nearX, y - nearY) < 12;
        };

        return small
            .filter(({ element, box }) =>
                targets.some((other) => {
                    if (
                        other.element === element ||
                        other.element.contains(element) ||
                        element.contains(other.element)
                    ) {
                        return false;
                    }

                    if (meetsBox(box, other.box)) {
                        return true;
                    }

                    const isSmall = small.some((candidate) => candidate.element === other.element);
                    const a = centre(box);
                    const b = centre(other.box);

                    return isSmall && Math.hypot(a.x - b.x, a.y - b.y) < 24;
                }),
            )
            .map(({ element, box }) => {
                const text = element.textContent?.trim();
                const label = element.getAttribute('aria-label') ?? text;

                return `${label} ${Math.round(box.width)}x${Math.round(box.height)}`;
            });
    }, TARGETS);

/** The label of each open tooltip: its label element, as a toolbar item's holds it beside its shortcut, else its text. */
const tooltipLabels = (page: Page) =>
    page.evaluate(() =>
        [...document.querySelectorAll('[role="tooltip"]')].map(
            (tooltip) => (tooltip.querySelector('[data-rte-tooltip-label]') ?? tooltip).textContent?.trim() ?? '',
        ),
    );

/** The visible icon-only controls in `scope`, which show their name only in a tooltip. */
const iconOnly = async (scope: Locator) => {
    const controls: Locator[] = [];
    for (const control of await scope.getByRole('button').all()) {
        const text = await control.textContent();
        if ((await control.isVisible()) && (text ?? '').trim() === '') {
            controls.push(control);
        }
    }

    return controls;
};

/** Focuses each icon-only control in `scope` and expects its accessible name to be its tooltip label. */
const expectNamedAsTooltips = async (page: Page, scope: Locator) => {
    const controls = await iconOnly(scope);
    expect(controls.length).toBeGreaterThan(0);
    for (const control of controls) {
        const name = (await control.getAttribute('aria-label')) ?? '';
        expect(name).not.toBe('');
        await control.focus();
        await expect.poll(() => tooltipLabels(page), { message: `the tooltip of ${name}` }).toContain(name);
    }
};

/** Matches text that starts with `text`, read literally. */
const literalStart = (text: string) => new RegExp(`^${text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

for (const profile of PROFILES) {
    test(`names every icon-only toolbar item and node chrome control of the ${profile} profile as its tooltip, and every More row by its label`, async ({
        mount,
        page,
    }) => {
        test.setTimeout(60_000);
        await mount(<ProfileProbe profile={profile} withServices />);
        await ready(page);
        await populate(page);

        await expectNamedAsTooltips(page, toolbarOf(page));
        await moreOf(page).click();
        // More loads its rows on first use.
        await expect(page.getByRole('menu')).toBeVisible();
        const rows = page.getByRole('menu').locator('[role^="menuitem"]');
        expect(await rows.count()).toBeGreaterThan(0);
        for (const row of await rows.all()) {
            // A row holds its label in its first span, before its shortcut.
            const label = await row.locator(':scope > span').first().textContent();
            await expect(row).toHaveAccessibleName(literalStart((label ?? '').trim()));
        }

        await page.keyboard.press('Escape');

        if (profile === 'document' || profile === 'brand-document') {
            await execute(page, 'image.insert');
            await expect(surfaceOf(page).locator('figure')).toHaveCount(1);
            await selectImage(page);
            await expectNamedAsTooltips(page, surfaceOf(page).getByRole('toolbar', { name: 'Image' }));
        }

        if (profile !== 'inline') {
            await surfaceOf(page).focus();
            await select(page, { text: 'quick' });
            await execute(page, 'code-block.toggle');
            await expectNamedAsTooltips(page, surfaceOf(page).getByRole('toolbar', { name: 'Code block' }));
        }
    });

    test.describe(`the ${profile} profile`, () => {
        for (const viewport of [
            { width: 390, height: 844 },
            { width: 844, height: 390 },
        ]) {
            test.describe(`on a phone at ${viewport.width} by ${viewport.height}`, () => {
                test.use({ viewport });

                test('keeps every toolbar control on screen and the content typeable, with no horizontal scrolling', async ({
                    mount,
                    page,
                }) => {
                    await mount(<ProfileProbe profile={profile} />);
                    await ready(page);
                    await populate(page);
                    const offscreen = await toolbarOf(page)
                        .getByRole('button')
                        .evaluateAll(
                            (buttons, width) =>
                                buttons
                                    .filter((button) => {
                                        const box = button.getBoundingClientRect();

                                        return box.left < 0 || box.right > width || box.width === 0;
                                    })
                                    .map((button) => button.getAttribute('aria-label')),
                            viewport.width,
                        );

                    expect(offscreen).toEqual([]);
                    expect(await scrollsAcross(page)).toBe(false);
                    await expect(surfaceOf(page)).toContainText('The quick brown fox');
                    await moreOf(page).click();
                    await expect(page.getByRole('menu')).toBeInViewport({ ratio: 1 });
                });
            });
        }

        test.describe('at 320 CSS pixels, as 400% zoom of 1280', () => {
            test.use({ viewport: { width: 320, height: 640 } });

            test('scrolls nothing across the page with a 200-character URL and long words in the content', async ({
                mount,
                page,
            }) => {
                await mount(<ProfileProbe profile={profile} />);
                await ready(page);
                const url = `https://example.com/${'a'.repeat(180)}`;
                await populate(page, `${url} Donaudampfschifffahrtsgesellschaftskapitän ${'x'.repeat(60)}`);

                expect(url).toHaveLength(200);
                expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
            });

            test('keeps a long code line inside its code block, scrolling nothing across the page', async ({
                mount,
                page,
            }) => {
                test.skip(profile === 'inline', 'The inline profile has no code block.');
                await mount(<ProfileProbe profile={profile} />);
                await ready(page);
                await surfaceOf(page).focus();
                await execute(page, 'code-block.toggle');
                await page.keyboard.insertText(`const url = '${'y'.repeat(200)}';`);
                // A line either wraps inside the block or scrolls in the block's own region.
                const contained = await surfaceOf(page)
                    .locator('pre')
                    .evaluate((block) => {
                        const { overflowX } = getComputedStyle(block);

                        return block.scrollWidth <= block.clientWidth || overflowX === 'auto' || overflowX === 'scroll';
                    });

                expect(contained).toBe(true);
                expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
            });
        });

        test('clips no text or control with the WCAG 1.4.12 text spacing overrides', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);
            await page.addStyleTag({ content: TEXT_SPACING });

            expect(await clipped(page)).toEqual([]);
            await moreOf(page).click();
            expect(await clipped(page)).toEqual([]);
        });

        test('gives every control a 24 by 24 target or the spacing WCAG 2.5.8 allows', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);

            expect(await crampedTargets(page)).toEqual([]);
            await moreOf(page).click();
            expect(await crampedTargets(page)).toEqual([]);
        });
    });
}

for (const { plugin, file } of PLUGIN_STORIES) {
    test(`gives every control of the ${plugin} story a 24 by 24 target or the spacing WCAG 2.5.8 allows`, async ({
        mount,
        page,
    }) => {
        await mount(<StoryProbe file={file} name="Default" />);
        await ready(page);
        await afterPlay(page);
        await surfaceOf(page).focus();

        expect(await crampedTargets(page)).toEqual([]);
    });
}
