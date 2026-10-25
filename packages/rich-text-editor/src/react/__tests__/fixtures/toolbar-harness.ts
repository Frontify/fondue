/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { toolbarOf } from './layout';

/** A code block stand-in holding `text`, whose node chrome is a toolbar. */
export const codeBlock = (text: string) =>
    ({
        type: 'chrome_code',
        attrs: { nodeId: 'code-1', language: 'plain' },
        content: [{ type: 'text', text }],
    }) as never;

export const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
export const itemOf = (page: Page, name: string) => toolbarOf(page).getByRole('button', { name, exact: true });
export const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};
export const select = (page: Page, text: string) =>
    page.evaluate((target) => window.toolbarEditor?.setSelection(window.toolbarEditor.handle, { text: target }), text);
/** The accessible name of the focused element, as its `aria-label` or text. */
export const focusedName = (page: Page) =>
    page.evaluate(() => {
        const active = document.activeElement;
        if (active === null) {
            return null;
        }
        return active.getAttribute('aria-label') ?? active.textContent;
    });
// Radix Toolbar moves focus in a timeout after the key, so focus is read once it settles. Tests focus the surface
// rather than click it before they select, since the click's own selection may land after theirs.
export const expectFocus = (page: Page, name: string) => expect.poll(() => focusedName(page)).toBe(name);
export const domSelection = (page: Page) =>
    page.evaluate(() => ({
        text: window.getSelection()?.toString(),
        inSurface: document.activeElement?.getAttribute('role') === 'textbox',
    }));
// More rows are menu items, and checkbox items for toggles, above the toolbar mode switch.
export const menuRows = (page: Page) =>
    page
        .locator('[role="menuitem"], [role="menuitemcheckbox"]')
        .filter({ hasNotText: 'Show toolbar on selection only' });
export const documentHtml = (page: Page) => page.evaluate(() => window.toolbarEditor?.html());

/** WCAG relative luminance of a computed `rgb()` colour. */
export const luminance = (color: string) => {
    const [r = 0, g = 0, b = 0] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const channel = (value: number) => {
        const scaled = value / 255;
        if (scaled <= 0.040_45) {
            return scaled / 12.92;
        }
        return ((scaled + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
export const contrast = (a: string, b: string) => {
    const lighter = Math.max(luminance(a), luminance(b));
    const darker = Math.min(luminance(a), luminance(b));
    return (lighter + 0.05) / (darker + 0.05);
};
/** The box of a rendered element, which every element these tests measure has. */
export const boxOf = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error('the element is not rendered');
    }
    return box;
};
/** The focused element's outline and the colour behind it once it lost focus. */
export const outlineOf = (locator: Locator) =>
    locator.evaluate((element) => {
        const style = getComputedStyle(element);
        let behind: Element | null = element.parentElement;
        let background = 'rgba(0, 0, 0, 0)';
        while (behind !== null && background === 'rgba(0, 0, 0, 0)') {
            background = getComputedStyle(behind).backgroundColor;
            behind = behind.parentElement;
        }
        return {
            width: Number.parseFloat(style.outlineWidth),
            style: style.outlineStyle,
            color: style.outlineColor,
            background,
        };
    });

/** The pixels around `locator`, its focus outline included. */
export const shotAround = async (page: Page, locator: Locator) => {
    const box = await boxOf(locator);
    return page.screenshot({ clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 } });
};
/** The bottom strip of `locator`, where a pressed item draws its bar. */
export const barOf = async (page: Page, locator: Locator) => {
    const box = await boxOf(locator);
    return page.screenshot({ clip: { x: box.x, y: box.y + box.height - 3, width: box.width, height: 3 } });
};
/** What `value` computes to as a colour beside the surface, read from an element styled with it. */
export const computedColor = (page: Page, value: string) =>
    surfaceOf(page).evaluate((surface, given) => {
        const probe = document.createElement('span');
        probe.style.color = given;
        surface.parentElement?.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
    }, value);
export const linked = {
    type: 'paragraph',
    attrs: { lang: null },
    content: [
        { type: 'text', text: 'one two ' },
        {
            type: 'text',
            text: 'guide',
            marks: [{ type: 'link', attrs: { href: 'https://example.com/a', openInNewWindow: false, styleId: null } }],
        },
    ],
} as never;
/** The commit count and whether the view is the one the editor mounted with. */
export const session = (page: Page) =>
    page.evaluate(() => {
        const probe = window.toolbarEditor;
        const kept = window as unknown as { firstView?: object | undefined };
        kept.firstView ??= probe?.view();
        const commits = probe?.handle.getSummary().commitSequence;
        const view = probe?.view();
        return { commits, sameView: kept.firstView === view };
    });
export const frames = (page: Page) =>
    page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
