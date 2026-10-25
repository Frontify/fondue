/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { toolbarOf } from './fixtures/layout';
import {
    codeBlock,
    surfaceOf,
    itemOf,
    ready,
    select,
    focusedName,
    expectFocus,
    domSelection,
    menuRows,
    documentHtml,
    boxOf,
} from './fixtures/toolbarHarness';
import { ToolbarProbe } from './fixtures/ToolbarProbe';

/** Each item's name and icon, from the toolbar, or from the More menu when `inMore`. */
const namesAndIcons = async (page: Page, inMore: boolean) => {
    let items = toolbarOf(page).getByRole('button');
    if (inMore) {
        await itemOf(page, 'More').click();
        items = menuRows(page);
    }
    return items.evaluateAll((elements) =>
        elements
            .map((element) => {
                // A More row's shortcut is hidden from its name.
                const copy = element.cloneNode(true) as HTMLElement;
                copy.querySelector('kbd')?.remove();
                const name = element.getAttribute('aria-label') ?? copy.textContent;
                const svg = element.querySelector('svg');
                return { name, icon: svg?.getAttribute('data-test-id') };
            })
            .filter(({ name }) => name !== 'More'),
    );
};

test('shows each command with the same registry label and icon in the toolbar and in More', async ({ mount, page }) => {
    const component = await mount(<ToolbarProbe />);
    await ready(page);
    const inToolbar = await namesAndIcons(page, false);
    await component.unmount();
    await mount(<ToolbarProbe width={60} />);
    await ready(page);
    const inMore = await namesAndIcons(page, true);

    expect(inToolbar.map(({ name }) => name)).toEqual(['Bold', 'Italic', 'Link', 'List']);
    // The rows that only More holds follow the items that did not fit.
    expect(inMore.slice(0, inToolbar.length)).toEqual(inToolbar);
});

test('uses the presentation controls label and icon for bold in the toolbar and in More', async ({ mount, page }) => {
    const controls = { 'mark.bold.toggle': { labelKey: 'RichTextEditor_fixtureStrong', icon: 'IconTextFormatItalic' } };
    const component = await mount(<ToolbarProbe controls={controls} />);
    await ready(page);
    const [inToolbar, italic] = await namesAndIcons(page, false);
    await component.unmount();
    await mount(<ToolbarProbe controls={controls} width={60} />);
    await ready(page);
    const [inMore] = await namesAndIcons(page, true);

    expect(inToolbar).toEqual({ name: 'Strong', icon: italic?.icon });
    expect(inMore).toEqual(inToolbar);
});

test('shows checked toggles and keeps an unavailable row focusable with its reason in More', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} blocks={[codeBlock('code')]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'code');
    await itemOf(page, 'More').click();
    await page.keyboard.press('ArrowDown');

    const bold = page.getByRole('menuitemcheckbox', { name: 'Bold' });
    await expect(bold).toBeFocused();
    await expect(bold).toHaveAttribute('aria-disabled', 'true');
    await expect(bold).toHaveAttribute('aria-checked', 'false');
    await expect(bold).toHaveAccessibleDescription('Not available at the current selection');
    await page.keyboard.press('Enter');
    await expect(bold).toBeVisible();
});

test('checks the toggle row of the block at the caret in More', async ({ mount, page }) => {
    const heading = { type: 'toggled_heading', attrs: { level: 6 }, content: [{ type: 'text', text: 'title' }] };
    await mount(<ToolbarProbe wide width={60} blocks={[heading as never]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'title');
    await itemOf(page, 'More').click();

    await expect(page.getByRole('menuitemcheckbox', { name: 'Heading 6' })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('menuitemcheckbox', { name: 'Heading 5' })).toHaveAttribute('aria-checked', 'false');
    const checkMark = (name: string) =>
        page.getByRole('menuitemcheckbox', { name }).locator('svg[data-test-id="fondue-icons-check-mark"]');
    await expect(checkMark('Heading 6')).toHaveCount(1);
    await expect(checkMark('Heading 5')).toHaveCount(0);
});

test('leaves focus where it moved after More closed, rather than returning it to More late', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe />);
    await ready(page);
    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();

    // The surface takes focus as soon as the closed menu leaves the DOM, before the timeout in which Radix returns focus.
    await page.evaluate(
        () =>
            new Promise<void>((resolve) => {
                const observer = new MutationObserver(() => {
                    if (document.querySelector('[role="menu"]') === null) {
                        observer.disconnect();
                        (document.querySelector('[role="textbox"]') as HTMLElement).focus();
                        resolve();
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
                document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            }),
    );
    // A timeout set now runs after the one Radix set when the menu unmounted.
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(await focusedName(page)).toBe('Notes');
});

test('does not open More when the pointer leaves it before release', async ({ mount, page }) => {
    await mount(<ToolbarProbe width={140} />);
    await ready(page);
    const box = await boxOf(itemOf(page, 'More'));

    await page.mouse.move(box.x + 4, box.y + 4);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    await expect(page.getByRole('menu')).toHaveCount(0);
});

test('runs Bold on the selection from its More row and leaves focus in the surface', async ({ mount, page }) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'two');

    await itemOf(page, 'More').click();
    await menuRows(page).filter({ hasText: 'Bold' }).click();

    await expect.poll(() => documentHtml(page)).toContain('<strong>two</strong>');
    await expect(page.getByRole('menu')).toHaveCount(0);
    const selection = await domSelection(page);
    expect(selection.inSurface).toBe(true);
});

test('opens More with Enter after a pointer opened and Escape closed it', async ({ mount, page }) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expectFocus(page, 'More');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('menu')).toBeVisible();
});

test('closes More on the first Escape when a pointer opens it just after its tooltip closed', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);
    await itemOf(page, 'More').focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);

    // A press within Radix's skip delay of the close shows the tooltip at once, which must not stay over the menu.
    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await page.keyboard.press('Escape');

    await expect(page.getByRole('menu')).toHaveCount(0);
});

test('shows the More tooltip once Escape closes the menu and returns focus to More', async ({ mount, page }) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.keyboard.press('Escape');

    await expect(page.getByRole('menu')).toHaveCount(0);
    await expectFocus(page, 'More');
    await expect(page.getByRole('tooltip')).toBeVisible();
});

test('shows the More tooltip on a hover after an outside press closed the menu', async ({ mount, page }) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').click();
    await expect(page.getByRole('menu')).toBeVisible();
    // The menu covers the narrow probe, so the press lands on the page beside it.
    await page.mouse.click(1000, 600);
    await expect(page.getByRole('menu')).toHaveCount(0);
    await itemOf(page, 'More').hover();

    await expect(page.getByRole('tooltip')).toBeVisible();
});

test('shows no check on a More row of a command that is no toggle, even while it is active', async ({
    mount,
    page,
}) => {
    const link = {
        type: 'link',
        attrs: { href: 'https://example.com/fixture', openInNewWindow: false, styleId: null },
    };
    const paragraph = {
        type: 'paragraph',
        attrs: { lang: null },
        content: [{ type: 'text', text: 'linked', marks: [link] }],
    };
    await mount(<ToolbarProbe width={60} blocks={[paragraph as never]} />);
    await ready(page);
    await surfaceOf(page).focus();
    await select(page, 'linked');
    await itemOf(page, 'More').click();

    // The active link stand-in's row, then the row of the shipped `link.edit`, which the probe's toolbar does not show.
    const rows = page.getByRole('menuitem', { name: 'Link' });
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toBeVisible();
    await expect(rows.locator('[data-test-id^="fondue-icons-check"]')).toHaveCount(0);
});

test('opens More on a click with no pointer or key press before it, as browse mode and voice control send', async ({
    mount,
    page,
}) => {
    await mount(<ToolbarProbe width={60} />);
    await ready(page);

    await itemOf(page, 'More').dispatchEvent('click');

    await expect(page.getByRole('menu')).toBeVisible();
});
