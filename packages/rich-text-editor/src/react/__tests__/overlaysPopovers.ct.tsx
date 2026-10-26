/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { cspViolationsOf } from '../../../playwright/csp';

import {
    surfaceOf,
    bubbleOf,
    popoverOf,
    suggestionsOf,
    menuOf,
    dialogOf,
    ready,
    select,
    open,
    focusedName,
    expectFocus,
    textBox,
    boxOf,
    frames,
    documentHtml,
    summary,
    paragraph,
    image,
    codeBlock,
    lines,
    openAltText,
    shownWhole,
} from './fixtures/overlayHarness';
import { OverlayProbe } from './fixtures/OverlayProbe';

test.afterEach(async ({ page }) => {
    // No paste or render path needs inline script, `eval` or a foreign origin.
    expect(await cspViolationsOf(page)).toEqual([]);
});

test('leaves focus on a host button that took it while the link popover was open', async ({ mount, page }) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await page.getByRole('button', { name: 'After' }).focus();

    await expect(popoverOf(page)).toBeHidden();
    // Radix returns focus in a timeout after the content unmounts.
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
    expect(await focusedName(page)).toBe('After');
});

test('keeps the link popover and the mention list usable inside a host dialog', async ({ mount, page }) => {
    await mount(<OverlayProbe within="dialog" bubble={false} texts={['one two three', 'Hi @']} />);
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    await page.keyboard.type('/typed');
    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(popoverOf(page)).toBeHidden();

    await page.evaluate(() => window.overlayProbe?.select({ text: 'Hi @', from: 4 }));
    await open(page, 'suggestions');
    // The list takes keys once it shows its first option as active, and Enter takes the option the arrow key moved to.
    await expect(suggestionsOf(page)).toBeVisible();
    await expect(suggestionsOf(page).getByRole('option').first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(suggestionsOf(page).getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Enter');
    await expect(suggestionsOf(page)).toBeHidden();
    await open(page, 'suggestions');
    await page.getByRole('option', { name: 'Linus' }).click();

    await expect(suggestionsOf(page)).toBeHidden();
    await expect(host).toBeVisible();
    expect(await documentHtml(page)).toBe(
        '<p>one <a href="https://example.com/fixture" rel="noopener">two</a> three</p><p>Hi @GraceLinus</p>',
    );
});

test('shows the link popover and the mention list whole and usable at the bottom of a short host dialog', async ({
    mount,
    page,
}) => {
    await mount(
        <OverlayProbe
            within="dialog"
            bubble={false}
            hostButtons={false}
            texts={[...lines(4), 'Hi @', 'one two three']}
        />,
    );
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    await frames(page);
    expect(await shownWhole(popoverOf(page)), 'link popover shown whole').toBe(true);
    // The dialog's transform must not shift the popover off the text it links.
    const linked = await textBox(page, 'two');
    const placed = await boxOf(popoverOf(page));
    expect(Math.abs(placed.top - linked.bottom)).toBeLessThanOrEqual(16);
    await page.keyboard.type('/typed');
    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(popoverOf(page)).toBeHidden();

    await page.evaluate(() => window.overlayProbe?.select({ text: 'Hi @', from: 4 }));
    await open(page, 'suggestions');
    await expect(suggestionsOf(page).getByRole('option').first()).toHaveAttribute('aria-selected', 'true');
    await frames(page);
    expect(await shownWhole(suggestionsOf(page)), 'mention list shown whole').toBe(true);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(suggestionsOf(page)).toBeHidden();
    await open(page, 'suggestions');
    await expect(suggestionsOf(page)).toBeVisible();
    await frames(page);
    await page.getByRole('option', { name: 'Linus' }).click();

    await expect(suggestionsOf(page)).toBeHidden();
    await expect(host).toBeVisible();
    expect(await page.evaluate(() => window.overlayProbe?.hostDialogChanges)).toEqual([]);
    expect(await documentHtml(page)).toBe(
        '<p>Line 1</p><p>Line 2</p><p>Line 3</p><p>Line 4</p><p>Hi @GraceLinus</p><p>one <a href="https://example.com/fixture" rel="noopener">two</a> three</p>',
    );
});

test('keeps the overlays of an editor outside any fixed containing block in the page stacking, under a host header', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe header spacer={60} hostButtons={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await expect(bubbleOf(page)).toBeVisible();
    await frames(page);

    const bubble = await boxOf(bubbleOf(page));
    // The header covers the viewport's top 120 pixels, which the bubble above the text reaches into.
    expect(bubble.top).toBeLessThan(118);
    const covering = await page.evaluate(({ x, y }) => Boolean(document.elementFromPoint(x, y)?.closest('header')), {
        x: (bubble.left + bubble.right) / 2,
        y: bubble.top + 1,
    });
    expect(covering).toBe(true);
    expect(await page.locator('[data-rte-overlays]').getAttribute('popover')).toBeNull();
});

test('keeps the link popover open while the host dialog moves focus to its container during a press inside it', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe within="dialog" bubble={false} texts={['one two three']} />);
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    const apply = await boxOf(popoverOf(page).getByRole('button', { name: 'Apply' }));
    await page.mouse.move((apply.left + apply.right) / 2, (apply.top + apply.bottom) / 2);
    await page.mouse.down();
    // As Radix's focus trap does when a render removes a node while the press leaves focus on `body`.
    await host.evaluate((element: HTMLElement) => element.focus());
    await expect(popoverOf(page)).toBeVisible();
    await page.mouse.up();

    await expect(popoverOf(page)).toBeHidden();
    expect(await documentHtml(page)).toBe(
        '<p>one <a href="https://example.com/fixture" rel="noopener">two</a> three</p>',
    );
});

test('leaves the host dialog open when Escape or a click outside closes an editor overlay inside it', async ({
    mount,
    page,
}) => {
    await mount(
        <OverlayProbe within="dialog" bubble={false} blocks={[paragraph('one two three'), paragraph('Hi @'), image]} />,
    );
    await ready(page);
    const host = page.getByRole('dialog', { name: 'Host dialog' });
    const hostChanges = () => page.evaluate(() => window.overlayProbe?.hostDialogChanges);
    // The corner of the host dialog is outside every editor overlay and inside the host.
    const clickHostCorner = async () => {
        const box = await boxOf(host);
        await page.mouse.click(box.left + 6, box.top + 6);
    };

    const overlays = [
        {
            name: 'popover',
            overlay: popoverOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await select(page, 'two');
                await open(page, 'link');
                await expectFocus(page, 'URL');
            },
        },
        {
            name: 'list',
            overlay: suggestionsOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await page.evaluate(() => window.overlayProbe?.select({ text: 'Hi @', from: 4 }));
                await open(page, 'suggestions');
            },
        },
        {
            name: 'menu',
            overlay: menuOf(page),
            show: async () => {
                await surfaceOf(page).focus();
                await select(page, 'two');
                await page.keyboard.press('Shift+F10');
                await expectFocus(page, 'Duplicate');
            },
        },
        { name: 'alt-text dialog', overlay: dialogOf(page), show: () => openAltText(page) },
    ];

    for (const { name, overlay, show } of overlays) {
        await show();
        await expect(overlay, `${name} opens`).toBeVisible();
        await frames(page);
        await page.keyboard.press('Escape');
        await expect(overlay, `${name} closes on Escape`).toBeHidden();
        await frames(page);
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
        expect(await hostChanges(), `${name} Escape`).toEqual([]);
        await expect(host).toBeVisible();

        await show();
        await expect(overlay, `${name} opens again`).toBeVisible();
        await frames(page);
        await clickHostCorner();
        await expect(overlay, `${name} closes on a click outside`).toBeHidden();
        await frames(page);
        expect(await hostChanges(), `${name} click outside`).toEqual([]);
        await expect(host).toBeVisible();
    }
});

test('keeps focus in the link field of a popover that its container scrolled out of view and back', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} texts={lines(40)} scrollHeight={200} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'Line 3');
    await open(page, 'link');
    await expectFocus(page, 'URL');
    const scrollTo = (top: number) =>
        page.locator('[data-scroller]').evaluate((scroller, value) => scroller.scrollTo({ top: value }), top);

    await scrollTo(600);
    await expect(popoverOf(page)).toBeHidden();
    await scrollTo(0);

    await expect(popoverOf(page)).toBeVisible();
    await expectFocus(page, 'URL');
});

test('focuses the surface at the mapped target when the link target was deleted while the popover was open', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await page.evaluate(() => window.overlayProbe?.handle.execute('text.insert', { text: '' }));
    await page.keyboard.press('Escape');

    await expectFocus(page, 'Notes');
    expect(await summary(page)).toMatchObject({ kind: 'text', collapsed: true });
    await page.keyboard.type('X');
    expect(await documentHtml(page)).toBe('<p>one X three</p>');
});

test('returns focus to the surface with the link applied from the link popover', async ({ mount, page }) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');
    await open(page, 'link');
    await expectFocus(page, 'URL');

    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();

    await expect(popoverOf(page)).toBeHidden();
    await expectFocus(page, 'Notes');
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('two');
    expect(await documentHtml(page)).toBe(
        '<p>one <a href="https://example.com/fixture" rel="noopener">two</a> three</p>',
    );
});

for (const [where, blocks, name] of [
    ['the toolbar', undefined, 'Bold'],
    ['node chrome', [paragraph('one'), codeBlock], 'plain'],
] as const) {
    test(`returns to the surface on Escape from ${where} inside a host dialog, which stays open`, async ({
        mount,
        page,
    }) => {
        let probe = <OverlayProbe within="dialog" bubble={false} />;
        if (blocks !== undefined) {
            probe = <OverlayProbe within="dialog" bubble={false} blocks={blocks} />;
        }

        await mount(probe);
        await ready(page);
        await surfaceOf(page).focus();
        if (blocks !== undefined) {
            await select(page, 'code');
        }

        await page.keyboard.press('Alt+F10');
        await expectFocus(page, name);
        if (blocks === undefined) {
            // The first Escape closes the tooltip that focus opened, once Radix has made its layer the highest.
            await expect(page.getByRole('tooltip')).toBeVisible();
            await frames(page);
            await page.keyboard.press('Escape');
            await expect(page.getByRole('tooltip')).toHaveCount(0);
            await frames(page);
        }

        await page.keyboard.press('Escape');

        await expectFocus(page, 'Notes');
        expect(await page.evaluate(() => window.overlayProbe?.hostDialogChanges)).toEqual([]);
    });
}

test('returns focus to the opener after a rerender gave the open overlay a new onOpenChange', async ({
    mount,
    page,
}) => {
    await mount(<OverlayProbe bubble={false} />);
    await ready(page);
    const opener = page.getByRole('button', { name: 'Open link' });
    await opener.focus();
    await page.keyboard.press('Enter');
    await expectFocus(page, 'URL');
    await page.evaluate(() => window.overlayProbe?.rerender());

    await page.keyboard.press('Escape');

    await expect(popoverOf(page)).toBeHidden();
    await expectFocus(page, 'Open link');
});
