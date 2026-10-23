/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { ParityProbe } from './fixtures/ParityProbe';

const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * The tree without its root line, its other lines one level less indented, without states such as the reader's
 * disabled task checkboxes, and with the reader-only annotations left out: the new-window text and the island notice.
 */
const withoutRoot = (snapshot: string) =>
    snapshot
        .split('\n')
        .slice(1)
        .map((line) =>
            line.replace(/^ {2}/, '').replaceAll(' (opens in a new window)', '').replaceAll(' [disabled]', ''),
        )
        .filter((line) => !line.startsWith('- note:'))
        .join('\n');

test('gives the editor and the reader of each contract fixture the same text, roles, link targets and alternative texts', async ({
    mount,
    page,
}) => {
    test.setTimeout(120_000);
    await page.route('**/test-assets/**', (route) =>
        route.fulfill({ contentType: 'image/png', body: Buffer.from(PNG, 'base64') }),
    );
    const component = await mount(<ParityProbe name="core/paragraphs" />);
    const names = await page.evaluate(() => window.parityNames ?? []);
    expect(names.length).toBeGreaterThan(30);

    for (const name of names) {
        await component.update(<ParityProbe name={name} />);
        const editor = page.getByRole('textbox', { name: 'Editor' });
        await expect(editor).toHaveAttribute('contenteditable', 'true');
        // Node view toolbars and column break separators are authoring controls only the editor shows (blocks AC-035).
        await editor.evaluate((surface) => {
            for (const control of surface.querySelectorAll(
                '[data-rte-chrome] [role="toolbar"], [data-rte-column-break]',
            )) {
                control.setAttribute('aria-hidden', 'true');
            }
        });

        expect
            .soft(withoutRoot(await editor.ariaSnapshot()), name)
            .toBe(withoutRoot(await page.getByRole('region', { name: 'Reader' }).ariaSnapshot()));
    }
});
