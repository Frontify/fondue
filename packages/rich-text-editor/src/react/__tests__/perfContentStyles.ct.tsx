/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { PerfEditorWithReader } from './fixtures/PerfEditor';

test('gives the reader root the same classes and content styles as the editor surface over the typical fixture', async ({
    mount,
    page,
}) => {
    await mount(<PerfEditorWithReader fixture="typical" />);
    const surface = page.getByRole('textbox', { name: 'Perf' });
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy');
    const reader = page.getByRole('region', { name: 'Reader' }).locator('> div');
    const styles = (root: Locator) =>
        root.evaluate((element) => {
            const read = (target: Element, names: readonly string[]) => {
                const style = getComputedStyle(target);

                return names.map((name) => style.getPropertyValue(name));
            };

            return {
                variables: read(element, ['--rte-content-paragraph-spacing', '--rte-content-text-color']),
                blocks: [...element.children].map((block) => [
                    block.tagName,
                    ...read(block, [
                        'margin-block-start',
                        'margin-block-end',
                        'color',
                        'font-size',
                        'line-height',
                        'white-space',
                        'overflow-wrap',
                        'font-variant-ligatures',
                    ]),
                ]),
            };
        });

    await expect(reader).toHaveClass(/(^| )fondue-rte-content( |$)/);
    await expect(reader).toHaveClass(/(^| )host-content( |$)/);
    const shown = await styles(reader);
    // Every top-level block of the fixture, headings, lists, quotes, brand-styled paragraphs and plain ones.
    expect(shown.blocks).toHaveLength(200);
    expect(shown).toEqual(await styles(surface));
});
