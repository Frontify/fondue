/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { EditorProbe } from '../../fixtures/editor/EditorProbe';

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', /true|false/);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
};

/** The content of the surface's placeholder pseudo-element, `none` when it shows nothing. */
const placeholderShown = (page: Page) =>
    surfaceOf(page).evaluate((surface) => getComputedStyle(surface, '::before').content);

/** Adds a host button that runs `command` with `options` through the handle when pressed. */
const hostButton = (page: Page, name: string, command: string, options?: { readonly focus: string }) =>
    page.evaluate(
        ([label, id, given]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = label;
            button.addEventListener('click', () => {
                const handle = window.rte?.handle as unknown as {
                    execute: (command: string, payload?: unknown, options?: unknown) => { readonly status: string };
                };
                button.dataset.result = handle.execute(id, undefined, given).status;
            });
            document.body.append(button);
        },
        [name, command, options] as const,
    );

/** Presses a host button from the keyboard, since WebKit does not focus a clicked button. */
const press = async (page: Page, name: string) => {
    const button = page.getByRole('button', { name });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('data-result', /.+/);
    return button;
};

test('SPEC-rich-text-runtime/AC-085 moves focus to the surface after a host command run with focus editor', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await hostButton(page, 'Bold', 'mark.bold.toggle', { focus: 'editor' });

    const button = await press(page, 'Bold');

    await expect(button).toHaveAttribute('data-result', 'applied');
    await expect(surfaceOf(page)).toBeFocused();
});

for (const options of [undefined, { focus: 'preserve' }] as const) {
    test(`SPEC-rich-text-runtime/AC-086 keeps focus on the host button after a command run with focus ${String(options?.focus)}`, async ({
        mount,
        page,
    }) => {
        await mount(<EditorProbe texts={['ab']} />);
        await ready(page);
        await hostButton(page, 'Bold', 'mark.bold.toggle', options);

        const button = await press(page, 'Bold');

        await expect(button).toHaveAttribute('data-result', 'applied');
        await expect(button).toBeFocused();
    });
}

test('SPEC-rich-text-editing/AC-050 keeps focus on a host undo button while undo runs', async ({ mount, page }) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await surfaceOf(page).click();
    await page.keyboard.type('c');
    await expect.poll(() => page.evaluate(() => window.rte?.text())).toContain('c');
    await hostButton(page, 'Undo', 'history.undo');

    const button = await press(page, 'Undo');

    await expect(button).toHaveAttribute('data-result', 'applied');
    await expect(button).toBeFocused();
    expect(await page.evaluate(() => window.rte?.text())).toBe('ab');
});

for (const profile of ['core', 'document']) {
    test(`SPEC-rich-text-react/AC-076 renders no role application in the ${profile} profile stand-in`, async ({
        mount,
        page,
    }) => {
        await mount(<EditorProbe texts={['ab']} profile={profile} />);
        await ready(page);

        await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).toBeVisible();
        await expect(page.locator('[data-test-id="fondue-rich-text-editor"] [role="application"]')).toHaveCount(0);
    });
}

test('SPEC-rich-text-react/AC-076 renders no role application around node view chrome', async ({ mount, page }) => {
    const blocks = [
        { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'chrome_mention', attrs: { nodeId: 'm1' } }] },
        { type: 'chrome_image', attrs: { nodeId: 'i1', assetId: null } },
    ];
    await mount(<EditorProbe blocks={blocks} />);
    await ready(page);

    await expect(page.locator('[data-chrome="image"]')).toBeVisible();
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"] [role="application"]')).toHaveCount(0);
});

test('SPEC-rich-text-react/AC-093 shows no placeholder for an empty paragraph beside an image', async ({
    mount,
    page,
}) => {
    const blocks = [
        { type: 'paragraph', attrs: { lang: null } },
        { type: 'chrome_image', attrs: { nodeId: 'i1', assetId: null } },
    ];
    await mount(<EditorProbe blocks={blocks} placeholder="Write a note" />);
    await ready(page);

    await expect(surfaceOf(page)).not.toHaveAttribute('data-rte-empty');
    await expect(surfaceOf(page)).not.toHaveAttribute('aria-placeholder');
    expect(await placeholderShown(page)).toBe('none');
});

test('SPEC-rich-text-react/AC-093 SPEC-rich-text-react/AC-030 shows the placeholder again once the document is empty', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['a']} placeholder="Write a note" />);
    await ready(page);
    await expect(surfaceOf(page)).not.toHaveAttribute('data-rte-empty');
    await expect(surfaceOf(page)).not.toHaveAttribute('aria-placeholder');

    await surfaceOf(page).click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'a', from: 1, to: 1 }));
    await page.keyboard.press('Backspace');

    await expect.poll(() => page.evaluate(() => window.rte?.text())).toBe('');
    await expect(surfaceOf(page)).toHaveAttribute('data-rte-empty', '');
    await expect(surfaceOf(page)).toHaveAttribute('aria-placeholder', 'Write a note');
    expect(await placeholderShown(page)).toBe('"Write a note"');
});

test('SPEC-rich-text-output/AC-013 keeps the document, selection and undo depth over 20 mode switches while typing', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} />);
    await ready(page);
    await surfaceOf(page).click();
    await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'ab', from: 2, to: 2 }));
    const state = () =>
        page.evaluate(() => {
            const rte = window.rte;
            if (rte === undefined) {
                return undefined;
            }
            return {
                document: JSON.stringify(rte.handle.getSnapshot().document),
                selection: rte.runtime?.state.selection.toJSON() as unknown,
                undoDepth: rte.undoDepth(),
            };
        });

    const attributes = () =>
        surfaceOf(page).evaluate((surface) => [
            surface.getAttribute('contenteditable'),
            surface.getAttribute('aria-readonly'),
        ]);
    const shown = { readonly: ['false', 'true'], editable: ['true', null] };

    const changed: unknown[] = [];
    for (let index = 0; index < 20; index += 1) {
        await page.keyboard.type(String(index % 10));
        for (const mode of ['readonly', 'editable'] as const) {
            const before = await state();
            await page.evaluate((next) => window.rte?.handle.setMode(next), mode);
            const after = await state();
            if (JSON.stringify(after) !== JSON.stringify(before)) {
                changed.push({ index, mode, before, after });
            }
            const surfaceAttributes = await attributes();
            if (JSON.stringify(surfaceAttributes) !== JSON.stringify(shown[mode])) {
                changed.push({ index, mode, surfaceAttributes });
            }
        }
        await page.evaluate(() => window.rte?.handle.focus());
    }

    expect(changed).toEqual([]);
    expect(await page.evaluate(() => window.rte?.text())).toBe('ab01234567890123456789');
    expect(await page.evaluate(() => window.rte?.undoDepth())).toBeGreaterThan(0);
});

test('SPEC-rich-text-output/AC-014 exposes a readonly textbox in the readonly editor and document semantics in the reader', async ({
    mount,
    page,
}) => {
    await mount(<EditorProbe texts={['ab']} readOnly withReader />);
    await ready(page);

    await expect(surfaceOf(page)).toHaveAttribute('aria-readonly', 'true');
    await expect(surfaceOf(page)).not.toBeEditable();
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).toMatchAriaSnapshot(`
        - textbox "Notes":
          - paragraph: ab
    `);
    const reader = page.getByRole('region', { name: 'Reader' });
    await expect(reader).toMatchAriaSnapshot(`
        - region "Reader":
          - paragraph: ab
    `);
    await expect(reader.getByRole('textbox')).toHaveCount(0);
    await expect(reader.locator('[contenteditable]')).toHaveCount(0);
});

test('SPEC-rich-text-accessibility/AC-030 opens no overlay or chrome popup, submits nothing and keeps focus when the surface takes focus by Tab or click', async ({
    mount,
    page,
}) => {
    // The mention stand-in's chrome holds a popup, which must stay closed while the surface takes focus.
    const blocks = [
        {
            type: 'paragraph',
            attrs: { lang: null },
            content: [
                { type: 'chrome_mention', attrs: { nodeId: 'm1', label: 'Ada' } },
                { type: 'text', text: ' ab' },
            ],
        },
    ];
    await mount(<EditorProbe blocks={blocks} inForm />);
    await ready(page);
    await expect(surfaceOf(page).locator('[data-chrome="mention"]')).toBeVisible();
    await page.evaluate(() => {
        document.querySelector('form')?.addEventListener('submit', () => {
            document.body.dataset.submits = String(Number(document.body.dataset.submits ?? '0') + 1);
        });
    });
    const submits = () => page.evaluate(() => document.body.dataset.submits ?? '0');
    const overlays = () =>
        page.locator('[role="dialog"], [role="menu"], [role="listbox"], [role="tooltip"], [data-popup]');

    await page.getByRole('button', { name: 'Before' }).focus();
    await page.keyboard.press('Tab');
    await expect(surfaceOf(page)).toBeFocused();
    await expect(overlays()).toHaveCount(0);
    expect(await submits()).toBe('0');

    await page.getByRole('button', { name: 'Before' }).focus();
    // Past the end of the text, away from the mention's chrome button.
    const paragraph = await surfaceOf(page).locator('p').boundingBox();
    if (paragraph === null) {
        throw new Error('The paragraph has no box.');
    }
    await page.mouse.click(paragraph.x + paragraph.width - 2, paragraph.y + paragraph.height / 2);
    await expect(surfaceOf(page)).toBeFocused();
    await expect(overlays()).toHaveCount(0);
    expect(await submits()).toBe('0');
    expect(await page.evaluate(() => window.rte?.text())).toBe(' ab');
});

test.describe('during a composition', () => {
    test.beforeEach(({ browserName }) => {
        test.skip(
            browserName !== 'chromium',
            'CDP drives composition in Chromium only (SPEC-rich-text-quality/AC-012).',
        );
    });

    test('SPEC-rich-text-react/AC-078 keeps the composition and its text while the host rerenders with new status, required, aria-describedby and placeholder', async ({
        mount,
        page,
    }) => {
        const component = await mount(<EditorProbe texts={['ab']} />);
        await ready(page);
        await surfaceOf(page).click();
        await page.evaluate(() => window.rte?.setSelection(window.rte.handle, { text: 'ab', from: 2, to: 2 }));
        await page.evaluate(() => {
            const surface = document.querySelector('[role="textbox"]');
            surface?.addEventListener('compositionend', () => {
                document.body.dataset.ends = String(Number(document.body.dataset.ends ?? '0') + 1);
            });
        });
        const cdp = await page.context().newCDPSession(page);
        const compose = (text: string) =>
            cdp.send('Input.imeSetComposition', { text, selectionStart: text.length, selectionEnd: text.length });

        await compose('x');
        await component.update(<EditorProbe texts={['ab']} rerendered={{ status: 'error' }} />);
        await compose('xy');
        await component.update(<EditorProbe texts={['ab']} rerendered={{ status: 'error', required: true }} />);
        await component.update(
            <EditorProbe texts={['ab']} rerendered={{ status: 'error', required: true, 'aria-describedby': 'hint' }} />,
        );
        await compose('xyz');
        await component.update(
            <EditorProbe
                texts={['ab']}
                rerendered={{ status: 'error', required: true, 'aria-describedby': 'hint', placeholder: 'Write' }}
            />,
        );
        const composing = await page.evaluate(() => window.rte?.handle.getSummary().compositionActive);
        await cdp.send('Input.insertText', { text: 'xyz' });

        expect(composing).toBe(true);
        await expect(surfaceOf(page)).toHaveAttribute('aria-invalid', 'true');
        await expect(surfaceOf(page)).toHaveAttribute('aria-describedby', 'hint');
        await expect.poll(() => page.evaluate(() => window.rte?.text())).toBe('abxyz');
        await expect(surfaceOf(page)).toHaveText('abxyz');
        expect(await page.evaluate(() => document.body.dataset.ends)).toBe('1');
    });
});
