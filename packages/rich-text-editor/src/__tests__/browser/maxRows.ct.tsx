/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator, type Page } from '@playwright/test';

import { scan } from './axeScan';
import { MaxRowsFrame, MaxRowsLinkFrame, MaxRowsTableFrame } from './MaxRowsFrame';
import { BEFORE_BUTTON, HOST_TEST_ID, LINK_TEXT, MAX_ROWS } from './maxRowsValues';

// `maxRows` scrolls the content inside the editor; the keyboard focus mark tells a host box when to draw the ring.

const TYPED_LINES = 12;
const KEYBOARD_FOCUS = 'data-keyboard-focus';
const TOOLBAR_HOTKEY = 'Alt+F10';

/** Clear of the toolbar's bottom edge, inside the gap that separates it from the text. */
const GAP_BELOW_TOOLBAR = 3;

// The editable's parent is the editor's mount, which carries the mark.
const MOUNT_OF_EDITABLE = '..';

/** Sub-pixel rounding of the line height, in pixels. */
const ROUNDING_TOLERANCE = 1;

/** Tab from the button before the editor: the toolbar is one stop, then the text. */
const tabIntoEditable = async (page: Page, editable: Locator): Promise<void> => {
    await page.getByRole('button', { name: BEFORE_BUTTON }).focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(editable).toBeFocused();
};

test.describe('maxRows', () => {
    test('caps the editable at that many lines and scrolls it', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');

        const { rowsHeight, scrollHeight, clientHeight, lineHeight } = await editable.evaluate((node) => {
            const { paddingTop, paddingBottom } = getComputedStyle(node);
            return {
                // The padding is the inset for focus outlines, not rows.
                rowsHeight: node.clientHeight - Number.parseFloat(paddingTop) - Number.parseFloat(paddingBottom),
                scrollHeight: node.scrollHeight,
                clientHeight: node.clientHeight,
                lineHeight: Number.parseFloat(getComputedStyle(node.querySelector('p') as Element).lineHeight),
            };
        });

        expect(scrollHeight).toBeGreaterThan(clientHeight);
        expect(Math.abs(rowsHeight - MAX_ROWS * lineHeight)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    });

    test('keeps the toolbar in view while the content is scrolled to the bottom', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const toolbar = page.getByRole('toolbar');

        await editable.evaluate((node) => {
            node.scrollTop = node.scrollHeight;
        });

        await expect(editable.getByText('Paragraph 30')).toBeInViewport();
        await expect(toolbar).toBeInViewport();
        await expect(editable.getByText('Paragraph 1', { exact: true })).not.toBeInViewport();
    });

    test('keeps the caret in view while typing new lines at the end', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');

        await editable.click();
        await page.keyboard.press('ControlOrMeta+End');
        for (let line = 1; line <= TYPED_LINES; line++) {
            await page.keyboard.press('Enter');
            await page.keyboard.type(`New line ${line}`);
        }

        const lastLine = editable.getByText(`New line ${TYPED_LINES}`);
        await expect(lastLine).toBeInViewport();
        const editableBox = await editable.boundingBox();
        const lastLineBox = await lastLine.boundingBox();
        expect(editableBox).not.toBeNull();
        expect(lastLineBox).not.toBeNull();
        expect(lastLineBox!.y).toBeGreaterThanOrEqual(editableBox!.y);
        expect(lastLineBox!.y + lastLineBox!.height).toBeLessThanOrEqual(editableBox!.y + editableBox!.height);
    });

    test('has no horizontal scroll', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');

        const { clientWidth, scrollWidth } = await editable.evaluate((node) => ({
            clientWidth: node.clientWidth,
            scrollWidth: node.scrollWidth,
        }));

        expect(scrollWidth).toBe(clientWidth);
    });
});

test.describe('the keyboard focus mark', () => {
    test('is set on Tab and lets a host box draw its ring', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);
        const host = page.getByTestId(HOST_TEST_ID);

        await expect(mark).not.toHaveAttribute(KEYBOARD_FOCUS, 'true');
        await expect(host).toHaveCSS('box-shadow', 'none');

        await tabIntoEditable(page, editable);

        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'true');
        await expect(host).not.toHaveCSS('box-shadow', 'none');
    });

    test('goes when focus moves to the toolbar', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);
        const host = page.getByTestId(HOST_TEST_ID);

        await tabIntoEditable(page, editable);
        await page.keyboard.press(TOOLBAR_HOTKEY);

        await expect(page.getByRole('toolbar').locator(':focus')).toHaveCount(1);
        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
        await expect(host).toHaveCSS('box-shadow', 'none');
    });

    test('is not set by keyboard focus on the Text style control, which Fondue marks itself', async ({
        mount,
        page,
    }) => {
        await mount(<MaxRowsFrame />);
        const host = page.getByTestId(HOST_TEST_ID);
        const textStyle = page.getByRole('combobox', { name: 'Text style' });

        await page.getByRole('button', { name: BEFORE_BUTTON }).focus();
        await textStyle.focus();

        await expect(textStyle).toBeFocused();
        await expect(textStyle).toHaveAttribute('data-show-focus-ring', 'true');
        await expect(host).toHaveCSS('box-shadow', 'none');
    });

    test('is not set when the text is clicked', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);
        const host = page.getByTestId(HOST_TEST_ID);

        await editable.getByText('Paragraph 2', { exact: true }).click();

        await expect(editable).toBeFocused();
        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
        await expect(host).toHaveCSS('box-shadow', 'none');
    });

    test('is not set when the gap between the toolbar and the text is clicked', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);
        const host = page.getByTestId(HOST_TEST_ID);
        const toolbarBox = await page.getByRole('toolbar').boundingBox();
        expect(toolbarBox).not.toBeNull();

        await page.mouse.click(
            (toolbarBox?.x ?? 0) + GAP_BELOW_TOOLBAR,
            (toolbarBox?.y ?? 0) + (toolbarBox?.height ?? 0) + GAP_BELOW_TOOLBAR,
        );

        await expect(editable).toBeFocused();
        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
        await expect(host).toHaveCSS('box-shadow', 'none');
    });

    test('is not set when a link in the text is clicked', async ({ mount, page }) => {
        await mount(<MaxRowsLinkFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);
        const host = page.getByTestId(HOST_TEST_ID);

        await editable.getByRole('link', { name: LINK_TEXT }).click();

        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
        await expect(host).toHaveCSS('box-shadow', 'none');
    });

    test('is set again when Escape from the toolbar puts the caret back in the text', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);

        await tabIntoEditable(page, editable);
        await page.keyboard.press(TOOLBAR_HOTKEY);
        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
        await page.keyboard.press('Escape');

        await expect(editable).toBeFocused();
        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'true');
    });

    test('goes when the text is clicked after Tab', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        const mark = editable.locator(MOUNT_OF_EDITABLE);

        await tabIntoEditable(page, editable);
        await editable.getByText('Paragraph 2', { exact: true }).click();

        await expect(mark).toHaveAttribute(KEYBOARD_FOCUS, 'false');
    });
});

test.describe('a focus outline at the content edge with maxRows', () => {
    test("the table wrapper's outline is not clipped by the scroll", async ({ mount, page }) => {
        await mount(<MaxRowsTableFrame />);
        const wrapper = page.getByTestId(HOST_TEST_ID).locator('section');
        const scroller = wrapper.locator('..');

        await page.getByRole('button', { name: BEFORE_BUTTON }).focus();
        await page.keyboard.press('Tab');
        await expect(wrapper).toBeFocused();

        const { outlineReach, clip } = await scroller.evaluate((node) => {
            const { outlineOffset, outlineWidth } = getComputedStyle(node.querySelector('section') as Element);
            const box = node.getBoundingClientRect();
            return {
                outlineReach: Number.parseFloat(outlineOffset) + Number.parseFloat(outlineWidth),
                // What the scroller shows: its padding box, without the scrollbar.
                clip: { left: box.left, right: box.left + node.clientWidth },
            };
        });
        const wrapperBox = await wrapper.boundingBox();

        expect(outlineReach).toBeGreaterThan(0);
        expect(wrapperBox).not.toBeNull();
        expect(wrapperBox?.x ?? Number.NEGATIVE_INFINITY).toBeGreaterThanOrEqual(clip.left + outlineReach);
        expect((wrapperBox?.x ?? Number.POSITIVE_INFINITY) + (wrapperBox?.width ?? 0)).toBeLessThanOrEqual(
            clip.right - outlineReach,
        );
    });
});

test.describe('accessibility', () => {
    test('the editor with maxRows has no axe violations, unfocused and on keyboard focus', async ({ mount, page }) => {
        await mount(<MaxRowsFrame />);
        const editable = page.getByRole('textbox');
        await expect(page.getByRole('toolbar')).toBeVisible();

        const unfocused = await scan(page).analyze();
        expect(unfocused.violations).toEqual([]);

        await tabIntoEditable(page, editable);
        await expect(editable.locator(MOUNT_OF_EDITABLE)).toHaveAttribute(KEYBOARD_FOCUS, 'true');

        const focused = await scan(page).analyze();
        expect(focused.violations).toEqual([]);
    });
});
