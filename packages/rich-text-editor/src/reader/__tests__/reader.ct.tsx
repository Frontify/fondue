/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { SemanticReader } from './fixtures/SemanticReader';

const root = join(import.meta.dirname, '..', '..', 'model', '__tests__', 'fixtures', 'model');
const fixtures = ['valid', 'unknown', 'invalid'].flatMap((directory) =>
    readdirSync(join(root, directory))
        .filter((name) => name.endsWith('.json'))
        .map(
            (name) =>
                [directory, name, JSON.parse(readFileSync(join(root, directory, name), 'utf8')) as unknown] as const,
        ),
);
// The tags the accessibility suite checks.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const [directory, name, document] of fixtures) {
    test(`reports no axe violation in the reader output of ${directory}/${name}`, async ({ mount, page }) => {
        await mount(<SemanticReader document={document} />);

        const { violations } = await new AxeBuilder({ page }).include('#root').withTags(TAGS).analyze();

        expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html }) => html).join(' | ')}`)).toEqual([]);
    });
}

const LINE = 'lorem';
const words = (count: number, space: string) => Array.from({ length: count }, () => LINE).join(space);
const paragraphOf = (value: string) => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: 'fixture.vocabulary', version: 1 },
    requiredCapabilities: [{ id: 'core', version: 1 }],
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null, styleId: null, align: null, indent: 0 },
                content: [{ type: 'text', text: value }],
            },
        ],
    },
});

test.describe('wrapping in print', () => {
    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ media: 'print' });
    });

    test('wraps a long line of double spaces inside a narrow box', async ({ mount, page }) => {
        await mount(<SemanticReader document={paragraphOf(words(40, '  '))} width={160} />);

        const paragraph = page.locator('#root p');
        const box = await paragraph.boundingBox();
        if (box === null) {
            throw new Error('The paragraph has no box.');
        }
        const lineHeight = await paragraph.evaluate(
            (element) => parseFloat(getComputedStyle(element).lineHeight) || 16,
        );

        expect(box.height).toBeGreaterThan(lineHeight * 3);
        expect(await paragraph.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    });

    test('would not wrap if every space of the run were U+00A0, which is why the run alternates', async ({
        mount,
        page,
    }) => {
        await mount(<SemanticReader document={paragraphOf(words(40, '  '))} width={160} />);

        const paragraph = page.locator('#root p');

        expect(await paragraph.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
    });
});
