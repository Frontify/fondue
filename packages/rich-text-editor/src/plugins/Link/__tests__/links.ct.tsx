/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { LinkProbe } from './fixtures/LinkProbe';

type LinkRte = NonNullable<Window['linkRte']>;

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const bubbleOf = (page: Page) => page.getByRole('toolbar', { name: 'Link' });
// The link bubble's flyout is a dialog named Link too, so the popover is found by its own test ID.
const popoverOf = (page: Page) => page.getByTestId('fondue-rich-text-editor-link-popover');
const linkIn = (page: Page, text: string) => surfaceOf(page).locator('a', { hasText: text });
const ready = async (page: Page, editable = true) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', String(editable));
    await expect.poll(() => page.evaluate(() => window.linkRte !== undefined)).toBe(true);
};

// ProseMirror writes its selection back to the DOM 20 ms after the surface gains focus, which would undo a key pressed sooner.
const settleFocus = (page: Page) => page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 50)));
const select = async (page: Page, text: string, from?: number, to?: number) => {
    await surfaceOf(page).focus();
    await settleFocus(page);
    const start = from ?? 0;
    const end = to ?? text.length;
    await page.evaluate(
        ([target, first, last]) => {
            const rte = window.linkRte as LinkRte;
            rte.setSelection(rte.handle, { text: target, from: first, to: last });
        },
        [text, start, end] as const,
    );
};

const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const blockOf = (page: Page) =>
    page.evaluate(() => (window.linkRte as LinkRte).handle.getSnapshot().document.content.content?.[0]?.content);

test('places the caret and shows the link bubble on a plain click in the editable surface, with no navigation', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    const before = page.url();
    let popups = 0;
    page.on('popup', () => {
        popups += 1;
    });

    await linkIn(page, 'guide').click();

    await expect(bubbleOf(page)).toBeVisible();
    for (const name of ['Open link in a new tab', 'Edit link', 'Copy link', 'Remove link']) {
        await expect(bubbleOf(page).getByRole('button', { name })).toBeVisible();
    }

    await expect(bubbleOf(page).locator('bdi')).toHaveText('#followed');
    await expect(surfaceOf(page)).toBeFocused();
    expect(page.url()).toBe(before);
    expect(popups).toBe(0);
});

test('renders the bubble buttons as Fondue buttons that arrow keys move between', async ({ mount, page }) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();

    const buttons = bubbleOf(page).getByRole('button');
    await expect(buttons).toHaveCount(4);
    for (const button of await buttons.all()) {
        await expect(button).toHaveAttribute('data-variant', 'default');
        await expect(button).toHaveAttribute('data-aspect', 'square');
    }

    await page.keyboard.press('Alt+F10');
    await expect(buttons.nth(0)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(buttons.nth(1)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(buttons.nth(0)).toBeFocused();
});

test('opens the checked href in a new tab with no opener on Mod+click and from the bubble Open button', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);

    const clicked = page.waitForEvent('popup');
    await linkIn(page, 'apart').click({ modifiers: ['ControlOrMeta'] });
    const first = await clicked;
    expect(await first.evaluate(() => window.opener === null)).toBe(true);
    await first.close();

    await linkIn(page, 'apart').click();
    await expect(bubbleOf(page)).toBeVisible();
    const opened = page.waitForEvent('popup');
    await bubbleOf(page).getByRole('button', { name: 'Open link in a new tab' }).click();
    const second = await opened;
    expect(await second.evaluate(() => window.opener === null)).toBe(true);
    expect(second.url()).toBe('https://example.com/apart');
});

test('opens the href in a new tab with no opener on Mod+click before the link bubble has loaded', async ({
    mount,
    page,
}) => {
    const held: (() => Promise<void>)[] = [];
    await page.route(/LinkBubble[^/]*\.js/, (route) => {
        held.push(() => route.continue());

        return Promise.resolve();
    });
    await mount(<LinkProbe />);
    await ready(page);
    await expect.poll(() => held.length).toBeGreaterThan(0);

    const clicked = page.waitForEvent('popup');
    await linkIn(page, 'apart').click({ modifiers: ['ControlOrMeta'] });
    const popup = await clicked;

    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await expect(bubbleOf(page)).toHaveCount(0);
    await popup.close();
    await Promise.all(held.map((release) => release()));
});

test('follows a link on a plain click when read-only, in the same tab or, for a new-window link, a new tab with no opener', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe readOnly />);
    await ready(page, false);

    await linkIn(page, 'guide').click();
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe('#followed');
    await expect(bubbleOf(page)).toHaveCount(0);

    const opened = page.waitForEvent('popup');
    await linkIn(page, 'apart').click();
    const popup = await opened;
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
});

test('shows the link bubble when the arrow keys move the caret into a link from either side, keeping focus in the surface', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);

    await select(page, 'Read the ', 8, 8);
    await expect(bubbleOf(page)).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(bubbleOf(page)).toBeVisible();
    await expect(surfaceOf(page)).toBeFocused();

    await select(page, ' or ', 2, 2);
    await expect(bubbleOf(page)).toHaveCount(0);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(bubbleOf(page)).toBeVisible();
    await expect(surfaceOf(page)).toBeFocused();
    const box = await bubbleOf(page).boundingBox();
    const link = await linkIn(page, 'guide').boundingBox();
    const boxX = box?.x;
    const linkX = link?.x;
    const linkLeft = linkX ?? 0;
    expect(boxX).toBeCloseTo(linkLeft, -1);
});

test('moves focus into the link bubble on Alt+F10 and back to the surface on Escape, and closes it on Escape from the surface', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();

    await page.keyboard.press('Alt+F10');
    await expect(bubbleOf(page).getByRole('button', { name: 'Open link in a new tab' })).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(bubbleOf(page).getByRole('button', { name: 'Edit link' })).toBeFocused();
    // The first Escape closes the tooltip that focus opened.
    await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await expect(bubbleOf(page).getByRole('button', { name: 'Edit link' })).toBeFocused();
    // Radix hands Escape back to the bubble's layer in an effect once the tooltip's layer is gone.
    await frames(page);
    await page.keyboard.press('Escape');
    await expect(bubbleOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    await settleFocus(page);

    await page.keyboard.press('ArrowLeft');
    await expect(bubbleOf(page)).toBeVisible();
    await frames(page);
    await page.keyboard.press('Escape');
    await expect(bubbleOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
});

test('keeps the link bubble while hovered after the caret leaves the link, until the pointer leaves', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();

    await select(page, 'Read', 1, 1);
    await frames(page);
    const whileHovered = await bubbleOf(page).isVisible();
    await page.mouse.move(0, 0);

    await expect(bubbleOf(page)).toHaveCount(0);
    expect(whileHovered).toBe(true);
});

test('removes only the link the hovered bubble shows once the selection grows past it', async ({ mount, page }) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();

    await page.keyboard.press('ControlOrMeta+a');
    await frames(page);
    await bubbleOf(page).getByRole('button', { name: 'Remove link' }).click();

    const block = await blockOf(page);
    expect(block?.filter((run) => run.marks !== undefined).map((run) => run.text)).toEqual(['apart']);
});

test('opens the link popover on the link the hovered bubble shows once the selection grows past it', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();

    await page.keyboard.press('ControlOrMeta+a');
    await frames(page);
    await bubbleOf(page).getByRole('button', { name: 'Edit link' }).click();

    await expect(popoverOf(page)).toBeVisible();
    await expect(popoverOf(page).getByRole('textbox', { name: 'URL' })).toHaveValue('#followed');
});

test('closes the held link bubble when the document changed so its link can no longer be targeted', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();

    await select(page, 'Read', 1, 1);
    await page.keyboard.type('xyz');
    await frames(page);

    await expect(bubbleOf(page)).toHaveCount(0);
});

test('drops the hover hold when Edit hides the bubble, so it closes once the caret leaves the link', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    await expect(bubbleOf(page)).toBeVisible();
    await bubbleOf(page).hover();

    await bubbleOf(page).getByRole('button', { name: 'Edit link' }).click();
    await expect(popoverOf(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(popoverOf(page)).toHaveCount(0);
    await page.mouse.move(0, 0);
    await select(page, 'Read', 1, 1);
    await frames(page);

    await expect(bubbleOf(page)).toHaveCount(0);
});

test('keeps the link bubble while focus is in it after the caret leaves the link, until focus leaves', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'guide', 2, 2);
    // The link bubble loads after the caret is in the link; Alt+F10 before it shows never reaches it.
    await expect(bubbleOf(page)).toBeVisible();
    await page.keyboard.press('Alt+F10');
    await expect(bubbleOf(page).getByRole('button', { name: 'Open link in a new tab' })).toBeFocused();

    await page.evaluate(() => {
        const rte = window.linkRte as LinkRte;
        rte.setSelection(rte.handle, { text: 'Read', from: 1, to: 1 });
    });
    await frames(page);
    const whileFocused = await bubbleOf(page).isVisible();
    await page.getByRole('button', { name: 'After' }).focus();

    await expect(bubbleOf(page)).toHaveCount(0);
    expect(whileFocused).toBe(true);
});

test('opens the link popover from the toolbar, returns focus to the button on Escape and to the surface with the text selected on Apply', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'now', 0, 3);
    const button = page.getByRole('toolbar').getByRole('button', { name: 'Link' });

    await button.click();
    await expect(popoverOf(page).getByRole('textbox', { name: 'URL' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(popoverOf(page)).toHaveCount(0);
    await expect(button).toBeFocused();

    await button.click();
    await page.keyboard.type('frontify.com');
    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(popoverOf(page)).toHaveCount(0);
    await expect(surfaceOf(page)).toBeFocused();
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('now');
    const block = await blockOf(page);
    expect(block?.at(-1)).toEqual({
        type: 'text',
        text: 'now',
        marks: [{ type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null } }],
    });
});

test('keeps the popover open with a message when the linked text was removed meanwhile, and Insert as new link inserts one linked run as one undo step', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);
    await select(page, 'now', 0, 3);
    await page.keyboard.press('ControlOrMeta+k');
    await expect(popoverOf(page)).toBeVisible();
    await page.keyboard.type('https://frontify.com');
    await page.evaluate(() => {
        const rte = window.linkRte as LinkRte;
        rte.setSelection(rte.handle, { text: 'now' });
        rte.handle.execute('text.insert', { text: '' });
    });

    await popoverOf(page).getByRole('button', { name: 'Apply' }).click();
    await expect(popoverOf(page).getByText('The linked text was removed.')).toBeVisible();
    await expect(popoverOf(page).getByRole('textbox', { name: 'URL' })).toHaveValue('https://frontify.com');
    await popoverOf(page).getByRole('button', { name: 'Insert as new link' }).click();

    await expect(popoverOf(page)).toHaveCount(0);
    const block = await blockOf(page);
    const linked = block?.filter((run) => run.marks?.some(({ attrs }) => attrs?.href === 'https://frontify.com'));
    // The text field kept the selected text it opened with, which the new link inserts.
    expect(linked?.map((run) => run.text)).toEqual(['now']);
    await page.evaluate(() => (window.linkRte as LinkRte).handle.execute('history.undo'));
    expect(JSON.stringify(await blockOf(page))).not.toContain('"href":"https://frontify.com"');
});

test('renders a link whose href was injected past the checks as its text alone in the surface', async ({
    mount,
    page,
}) => {
    await mount(<LinkProbe />);
    await ready(page);

    await page.evaluate(() => (window.linkRte as LinkRte).injectUnsafe('Read'));

    await expect(surfaceOf(page).locator('a', { hasText: 'Read' })).toHaveCount(0);
    await expect(surfaceOf(page).locator('p')).toContainText('Read the guide');
});
