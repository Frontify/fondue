/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { settled } from './fixtures/layout';
import { ProfileProbe } from './fixtures/ProfileProbe';
import { ready } from './fixtures/ready';

const surfaceOf = (page: Page, name = 'Message') => page.getByRole('textbox', { name });
const submitted = (page: Page) => page.evaluate(() => window.profileProbe?.submitted ?? []);
const enterKeys = (page: Page) => page.evaluate(() => window.profileProbe?.enterKeys ?? []);
const toolbarOf = (page: Page) => page.getByRole('toolbar', { name: 'Text formatting' });

for (const key of ['Enter', 'Shift+Enter', 'ControlOrMeta+Enter']) {
    test(`submits an Inline field's valid content with ${key}`, async ({ mount, page }) => {
        await mount(<ProfileProbe profile="inline" submits />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await page.keyboard.press(key);

        expect(await submitted(page)).toEqual(['Hello']);
        await expect(surfaceOf(page)).toHaveText('Hello');
    });

    test(`announces an empty required Inline field on ${key} and submits nothing`, async ({ mount, page }) => {
        await mount(<ProfileProbe profile="inline" submits required />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.press(key);

        expect(await submitted(page)).toEqual([]);
        await expect(page.locator('[aria-live="polite"]')).toHaveText('Enter some text before you submit.');
    });

    test(`keeps an Inline field with enterBehavior none unchanged on ${key}, unprevented for the host`, async ({
        mount,
        page,
    }) => {
        await mount(<ProfileProbe profile="inline" enterNone />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await page.keyboard.press(key);
        await page.keyboard.type('!');

        expect(await enterKeys(page)).toEqual([false]);
        await expect(surfaceOf(page).locator('p')).toHaveText(['Hello!']);
        await expect(surfaceOf(page).locator('br')).toHaveCount(0);
    });
}

test('keeps one paragraph in an Inline field that pastes its own select-all copy at the end', async ({
    mount,
    page,
}) => {
    await mount(<ProfileProbe profile="inline" />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('Hello');
    await page.keyboard.press('ControlOrMeta+a');
    // The copy event's own data, which a paste hands back as the browser would after its clipboard read.
    const copying = page.evaluate(
        () =>
            new Promise<[string, string][]>((resolve) => {
                document.addEventListener(
                    'copy',
                    (event) => {
                        const data = event.clipboardData as DataTransfer;
                        resolve(data.types.map((type) => [type, data.getData(type)]));
                    },
                    { once: true },
                );
            }),
    );
    await page.keyboard.press('ControlOrMeta+c');
    const flavors = await copying;
    await page.keyboard.press('ArrowRight');
    await settled(page);
    await page.evaluate((entries) => {
        const clipboardData = new DataTransfer();
        for (const [type, value] of entries) {
            clipboardData.setData(type, value);
        }
        const surface = document.querySelector('[data-rte-surface]') as HTMLElement;
        surface.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
    }, flavors);

    await expect(surfaceOf(page).locator('p')).toHaveText(['HelloHello']);
});

test('keeps one paragraph in an Inline field that takes a text drop from outside', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="inline" />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('Hello');

    await page.evaluate(() => {
        const paragraph = document.querySelector('[data-rte-surface] p') as HTMLElement;
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        const box = range.getBoundingClientRect();
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', 'x');
        for (const type of ['dragenter', 'dragover', 'drop']) {
            paragraph.dispatchEvent(
                new DragEvent(type, {
                    dataTransfer,
                    clientX: box.x + box.width * 0.4,
                    clientY: box.y + box.height / 2,
                    bubbles: true,
                    cancelable: true,
                }),
            );
        }
    });

    await expect(surfaceOf(page).locator('p')).toHaveCount(1);
    await expect(surfaceOf(page)).toContainText('x');
    const text = await surfaceOf(page).textContent();
    expect(text?.replace('x', '')).toBe('Hello');
});

test('submits a comment with Mod+Enter, while Enter starts a new paragraph', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="comment" submits />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('One');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Two');
    await page.keyboard.press('ControlOrMeta+Enter');

    expect(await submitted(page)).toEqual(['One\nTwo']);
    await expect(surfaceOf(page).locator('p')).toHaveText(['One', 'Two']);
});

// Mod+Enter belongs to submit in a comment (Key precedence row 4), so with no `onSubmit` no part acts on it.
test('keeps the caret in a comment code block on Mod+Enter', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="comment" />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('``` x = 1');
    await page.keyboard.press('ControlOrMeta+Enter');
    await page.keyboard.type('!');

    await expect(surfaceOf(page).locator('pre')).toContainText('x = 1!');
    await expect(surfaceOf(page).locator('p')).toHaveCount(0);
});

test('leaves a comment task item unchecked on Mod+Enter', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="comment" />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('[ ] Buy');
    await page.keyboard.press('ControlOrMeta+Enter');

    await expect(surfaceOf(page).getByRole('checkbox', { name: 'Buy' })).not.toBeChecked();
});

test('announces an empty required comment on Mod+Enter and submits nothing', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="comment" submits required />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.press('ControlOrMeta+Enter');

    expect(await submitted(page)).toEqual([]);
    await expect(page.locator('[aria-live="polite"]')).toHaveText('Enter some text before you submit.');
});

for (const profile of ['inline', 'comment', 'document', 'brand-document'] as const) {
    test(`gives the ${profile} surface its textbox semantics`, async ({ mount, page }) => {
        await mount(
            <ProfileProbe
                profile={profile}
                status="error"
                required
                id="notes"
                describedby="hint"
                errormessage="problem"
            />,
        );
        await ready(page);

        const surface = surfaceOf(page);
        await expect(surface).toHaveAttribute('id', 'notes');
        await expect(surface).toHaveAttribute('aria-multiline', String(profile !== 'inline'));
        await expect(surface).toHaveAttribute('aria-describedby', /(^|\s)hint(\s|$)/);
        await expect(surface).toHaveAttribute('aria-invalid', 'true');
        await expect(surface).toHaveAttribute('aria-errormessage', 'problem');
        await expect(surface).toHaveAttribute('aria-required', 'true');
        await expect(surface).toHaveAttribute('translate', 'no');
    });
}

test('describes the submit and new line keys of a comment', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="comment" submits />);
    await ready(page);

    await expect(surfaceOf(page)).toHaveAccessibleDescription(
        /^To submit, press (⌘Enter|Ctrl\+Enter)\. For a new line, press Enter\.$/,
    );
});

test('describes the submit key of an Inline field that submits', async ({ mount, page }) => {
    await mount(<ProfileProbe profile="inline" submits />);
    await ready(page);

    await expect(surfaceOf(page)).toHaveAccessibleDescription('To submit, press Enter.');
    await expect(surfaceOf(page)).toHaveAttribute('aria-multiline', 'false');
});

for (const profile of ['document', 'brand-document'] as const) {
    for (const width of [1280, 900, 640, 420]) {
        test.describe(`the ${profile} toolbar at ${width} CSS pixels`, () => {
            test.use({ viewport: { width, height: 720 } });

            test('keeps the checks button in its group, overflowing no sooner than the items after it', async ({
                mount,
                page,
            }) => {
                await mount(<ProfileProbe profile={profile} />);
                await ready(page);
                const shown = await toolbarOf(page)
                    .getByRole('button')
                    .evaluateAll((buttons) => buttons.map((button) => button.getAttribute('aria-label')));

                if (shown.includes('Accessibility checks')) {
                    expect(shown.indexOf('Accessibility checks')).toBe(shown.indexOf('Outline') - 1);
                    return;
                }
                expect(shown).not.toContain('Outline');
                await toolbarOf(page).getByRole('button', { name: 'More', exact: true }).click();
                // A panel toggle is a checkbox item, so both roles, in menu order.
                const rows = await page.locator('[role="menuitem"], [role="menuitemcheckbox"]').allInnerTexts();
                const names = rows.map((row) => row.split('\n')[0]);

                expect(names.indexOf('Accessibility checks')).toBe(names.indexOf('Outline') - 1);
            });

            test('keeps the bubble toolbar inside the viewport, with More reachable', async ({ mount, page }) => {
                await mount(<ProfileProbe profile={profile} defaultToolbarMode="bubble" />);
                await ready(page);
                await surfaceOf(page).click();
                await page.keyboard.type('Hello');
                await settled(page);
                await page.keyboard.press('Shift+Home');
                const flyout = page.getByRole('dialog', { name: 'Selection formatting' });
                await expect(flyout).toBeVisible();

                const { scrollWidth, clientWidth } = await flyout.evaluate((element) => ({
                    scrollWidth: element.scrollWidth,
                    clientWidth: element.clientWidth,
                }));
                expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

                const more = flyout.getByRole('button', { name: 'More', exact: true });
                const box = await more.boundingBox();
                const viewport = page.viewportSize();
                expect(box).not.toBeNull();
                expect(viewport).not.toBeNull();
                expect(box!.x).toBeGreaterThanOrEqual(0);
                expect(box!.y).toBeGreaterThanOrEqual(0);
                expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
                expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);

                await more.click();
                await expect(page.getByRole('menuitem').first()).toBeVisible();
            });
        });
    }

    test(`lists the checks button in the bubble toolbar's More menu of a ${profile} in bubble mode`, async ({
        mount,
        page,
    }) => {
        await mount(<ProfileProbe profile={profile} defaultToolbarMode="bubble" />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await settled(page);
        await page.keyboard.press('Shift+Home');
        await page.getByRole('toolbar').getByRole('button', { name: 'More', exact: true }).click();

        await expect(page.getByRole('menuitem', { name: /^Accessibility checks/ })).toBeVisible();
    });

    test(`shows the text style picker in the bubble toolbar of a ${profile} in bubble mode`, async ({
        mount,
        page,
    }) => {
        await mount(<ProfileProbe profile={profile} defaultToolbarMode="bubble" />);
        await ready(page);
        await surfaceOf(page).click();
        await page.keyboard.type('Hello');
        await settled(page);
        await page.keyboard.press('Shift+Home');

        await expect(
            page.locator('[data-rte-bubble-toolbar]').getByRole('button', { name: 'Normal text', exact: true }),
        ).toBeVisible();
    });
}
