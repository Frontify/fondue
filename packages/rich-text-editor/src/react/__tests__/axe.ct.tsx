/* (c) Copyright Frontify Ltd., all rights reserved. */

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { AXE_TAGS } from '#/testing/conformance/axeTags';

import { ImageProbe } from '../../features/mediaImage/__tests__/fixtures/ImageProbe';
import { UploadProbe } from '../../features/mediaUpload/__tests__/fixtures/UploadProbe';

import {
    afterPlay,
    FEATURE_STORIES,
    storyOf,
    moreOf,
    populate,
    PROFILES,
    ready,
    select,
    settled,
    surfaceOf,
    toolbarOf,
} from './fixtures/layout';
import { stylesApplied } from './fixtures/overlayHarness';
import { ProfileProbe } from './fixtures/ProfileProbe';
import { StoryProbe } from './fixtures/StoryProbe';

/** The bytes of a PNG whose header declares 40 by 30 pixels, as an uploaded file's are. */
const pngBytes = () => {
    const bytes = Buffer.alloc(33);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(bytes, 0);
    bytes.writeUInt32BE(13, 8);
    bytes.write('IHDR', 12, 'latin1');
    bytes.writeUInt32BE(40, 16);
    bytes.writeUInt32BE(30, 20);
    bytes.set([8, 6, 0, 0, 0], 24);
    return bytes;
};

// A 1 by 1 pixel PNG, which every asset URL of the image probe answers.
const STILL_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/** The axe violations of the whole page, each with the markup of its nodes. */
const violations = async (
    page: Page,
    intended: readonly { readonly rule: string; readonly selector: string }[] = [],
) => {
    // WebKit keeps a lazy chunk's stylesheet out of the cascade while others load, so axe reads unstyled markup before.
    await stylesApplied(page);
    // Overlays fade in, so axe reads them once their finite animations have ended.
    await page.evaluate(() =>
        Promise.allSettled(
            document
                .getAnimations()
                .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity)
                .map((animation) => animation.finished),
        ),
    );
    const { violations: found } = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
    const reported: string[] = [];
    for (const { id, nodes } of found) {
        const kept: string[] = [];
        for (const { html, target } of nodes) {
            const selectors = intended.filter(({ rule }) => rule === id).map(({ selector }) => selector);
            const wanted = await page.evaluate(
                ([at, matching]) => matching.some((selector) => document.querySelector(at)?.matches(selector) === true),
                [String(target[0]), selectors] as const,
            );
            if (!wanted) {
                kept.push(html);
            }
        }
        if (kept.length > 0) {
            reported.push(`${id}: ${kept.join(' | ')}`);
        }
    }
    return reported;
};

/**
 * What stories render on purpose for the content checks to report: an image whose `altIntent` is `missing` has no
 * `alt` (blocks AC-024), and the checks story's pale text sample has too little contrast.
 */
const INTENDED = [
    { rule: 'image-alt', selector: '[role="textbox"] figure img:not([alt])' },
    { rule: 'color-contrast', selector: '[role="textbox"] [data-rte-color="brand.pale"]' },
];

/** Runs the toolbar item `name`, from More when the toolbar does not show it. */
const runItem = async (page: Page, name: string) => {
    const item = toolbarOf(page).getByRole('button', { name, exact: true });
    if ((await item.count()) > 0) {
        await item.click();
        return;
    }
    await moreOf(page).click();
    await page
        .getByRole('menu')
        .getByRole('menuitem', { name })
        .or(page.getByRole('menuitemcheckbox', { name }))
        .click();
};

/** Whether the toolbar or its More menu offers `name`, with More closed again after. */
const offers = async (page: Page, name: string) => {
    if ((await toolbarOf(page).getByRole('button', { name, exact: true }).count()) > 0) {
        return true;
    }
    await moreOf(page).click();
    // More loads its rows on first use.
    await expect(page.getByRole('menu')).toBeVisible();
    const rows = await page.getByRole('menu').locator('[role^="menuitem"]').allInnerTexts();
    await page.keyboard.press('Escape');
    return rows.some((row) => row.split('\n')[0] === name);
};

const dialogOf = (page: Page) => page.getByRole('dialog');

/** The overlays and panels a profile's toolbar or More menu opens, from selected text where `selects` is set. */
const OVERLAYS = [
    { name: 'Link', selects: true, shown: dialogOf },
    { name: 'Color', selects: true, shown: (page: Page) => page.getByRole('menu') },
    { name: 'Language', selects: true, shown: dialogOf },
    { name: 'Emoji', selects: false, shown: dialogOf },
    {
        name: 'Accessibility checks',
        selects: false,
        shown: (page: Page) => page.getByRole('region', { name: 'Accessibility checks' }),
    },
    { name: 'Outline', selects: false, shown: (page: Page) => page.getByRole('navigation', { name: 'Outline' }) },
    { name: 'Normal text', selects: false, shown: (page: Page) => page.getByRole('menu') },
] as const;

for (const profile of PROFILES) {
    test.describe(`axe on the ${profile} profile`, () => {
        test('reports no violation while empty', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);

            expect(await violations(page)).toEqual([]);
        });

        test('reports no violation while populated', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);

            expect(await violations(page)).toEqual([]);
        });

        test('reports no violation with focus in the toolbar', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);
            await page.keyboard.press('Alt+F10');
            await expect(toolbarOf(page).locator(':focus')).toHaveCount(1);

            expect(await violations(page)).toEqual([]);
        });

        test('reports no violation with More open', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);
            await moreOf(page).click();
            await expect(page.getByRole('menu')).toBeVisible();

            expect(await violations(page)).toEqual([]);
        });

        test('reports no violation with the bubble toolbar shown', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} defaultToolbarMode="bubble" />);
            await ready(page);
            await populate(page);
            // ProseMirror's focus timer, run late on a busy page, puts back the caret a key selection just extended.
            await select(page, { text: 'The quick brown fox jumps over the lazy dog.' });
            await expect(page.locator('[data-rte-bubble-toolbar]')).toBeVisible();

            expect(await violations(page)).toEqual([]);
        });

        for (const [state, props] of [
            ['disabled', { disabled: true }],
            ['read-only', { readOnly: true }],
            ['invalid', { status: 'error' }],
        ] as const) {
            test(`reports no violation while ${state}`, async ({ mount, page }) => {
                await mount(<ProfileProbe profile={profile} {...props} />);
                await ready(page);

                expect(await violations(page)).toEqual([]);
            });
        }

        for (const { name, selects, shown } of OVERLAYS) {
            test(`reports no violation with ${name} open`, async ({ mount, page }) => {
                await mount(<ProfileProbe profile={profile} />);
                await ready(page);
                await populate(page);
                if (selects) {
                    await settled(page);
                    await page.keyboard.press('Shift+Home');
                }
                test.skip(!(await offers(page, name)), `The ${profile} profile offers no ${name}.`);
                // The outline lists headings, so its panel holds one.
                if (name === 'Outline') {
                    await runItem(page, 'Normal text');
                    await page.getByRole('menuitemradio', { name: 'Heading 1' }).click();
                }
                await runItem(page, name);
                await expect(shown(page)).toBeVisible();

                expect(await violations(page)).toEqual([]);
            });
        }

        test('reports no violation with the numbering dialog open', async ({ mount, page }) => {
            await mount(<ProfileProbe profile={profile} />);
            await ready(page);
            await populate(page);
            test.skip(!(await offers(page, 'Start numbering at')), `The ${profile} profile has no numbered list.`);
            await runItem(page, 'Numbered list');
            await runItem(page, 'Start numbering at');
            await expect(page.getByRole('dialog')).toBeVisible();

            expect(await violations(page)).toEqual([]);
        });
    });
}

test('reports no violation with the Outline open on a document with no headings', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="document" />);
    await ready(page);
    await populate(page);
    await runItem(page, 'Outline');
    const outline = page.getByRole('navigation', { name: 'Outline' });
    await expect(outline).toBeVisible();
    await expect(outline.getByText('No headings yet. Headings you add appear here.')).toBeVisible();

    expect(await violations(page)).toEqual([]);
});

for (const { feature, file } of FEATURE_STORIES) {
    test(`reports no axe violation in the populated ${feature} story`, async ({ mount, page }) => {
        await mount(<StoryProbe file={file} name="Default" />);
        await ready(page);
        await afterPlay(page);
        await surfaceOf(page).focus();

        expect(await violations(page, INTENDED)).toEqual([]);
    });
}

test('reports no axe violation with the mention list open', async ({ mount, page }) => {
    await mount(<StoryProbe file={storyOf('mentions')} name="Default" />);
    await ready(page);
    await afterPlay(page);
    await surfaceOf(page).focus();
    await page.keyboard.press('ControlOrMeta+End');
    await page.keyboard.type(' @');
    await expect(page.getByRole('listbox')).toBeVisible();

    expect(await violations(page)).toEqual([]);
});

test('reports no axe violation with the code language menu open', async ({ mount, page }) => {
    await mount(<StoryProbe file={storyOf('blocks.code')} name="Default" />);
    await ready(page);
    await afterPlay(page);
    await surfaceOf(page).focus();
    await page
        .getByRole('button', { name: /^Language: / })
        .first()
        .click();
    await expect(page.getByRole('menu')).toBeVisible();

    expect(await violations(page)).toEqual([]);
});

test('reports no axe violation while an upload is in progress', async ({ mount, page }) => {
    await mount(<UploadProbe />);
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.uploadRte !== undefined)).toBe(true);
    await page.evaluate(() => {
        const rte = window.uploadRte;
        rte?.setSelection(rte.handle, { text: 'Before', from: 6, to: 6 });
        rte?.handle.focus();
    });
    const opened = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Image' }).click();
    const chooser = await opened;
    await chooser.setFiles({ name: 'logo.png', mimeType: 'image/png', buffer: pngBytes() });
    await expect.poll(() => page.evaluate(() => window.uploadRte?.requests().length)).toBe(1);
    await expect(surfaceOf(page).getByRole('progressbar', { name: 'logo.png' })).toBeVisible();

    expect(await violations(page)).toEqual([]);
});

test.describe('axe on an image', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/test-assets/**', (route) =>
            route.fulfill({ contentType: 'image/png', body: Buffer.from(STILL_PNG, 'base64') }),
        );
    });

    // The editor and the reader both show the image whose `altIntent` is `missing` without `alt` (blocks AC-024).
    const imageWithoutAlt = 'figure img:not([alt])';
    const missingAlt = [{ rule: 'image-alt', selector: imageWithoutAlt }];

    const selectImage = async (page: Page) => {
        await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
        await expect.poll(() => page.evaluate(() => window.imageRte !== undefined)).toBe(true);
        await surfaceOf(page).focus();
        await page.evaluate(() => {
            const rte = window.imageRte;
            rte?.setSelection(rte.handle, { nodeId: 'image-1' });
        });
    };

    test('reports no violation with the image selected', async ({ mount, page }) => {
        await mount(<ImageProbe content="alt" />);
        await selectImage(page);
        // Only image-1, whose alt is undecided, renders without alt: once in the editor, once in the reader.
        await expect(page.locator(imageWithoutAlt)).toHaveCount(2);

        expect(await violations(page, missingAlt)).toEqual([]);
    });

    test('reports no violation with the alternative text dialog open', async ({ mount, page }) => {
        await mount(<ImageProbe content="alt" />);
        await selectImage(page);
        await page.getByRole('button', { name: 'Add alternative text' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator(imageWithoutAlt)).toHaveCount(2);

        expect(await violations(page, missingAlt)).toEqual([]);
    });

    for (const menu of [/^Size: /, /^Alignment: /]) {
        test(`reports no violation with the ${menu.source} menu open`, async ({ mount, page }) => {
            await mount(<ImageProbe content="still" />);
            await selectImage(page);
            await page.getByRole('button', { name: menu }).first().click();
            await expect(page.getByRole('menu')).toBeVisible();

            expect(await violations(page)).toEqual([]);
        });
    }

    test('reports no violation with the width dialog open', async ({ mount, page }) => {
        await mount(<ImageProbe content="still" />);
        await selectImage(page);
        await page.getByRole('button', { name: /^Size: / }).click();
        await page.getByRole('menuitem', { name: 'Custom width…' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();

        expect(await violations(page)).toEqual([]);
    });

    test('reports no violation with the context menu open', async ({ mount, page }) => {
        await mount(<ImageProbe content="still" />);
        await selectImage(page);
        await page.keyboard.press('Shift+F10');
        await expect(page.getByRole('menu', { name: 'Selection actions' })).toBeVisible();

        expect(await violations(page)).toEqual([]);
    });
});
