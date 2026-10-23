/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { type ContentNodeJSON } from '#/model';

import { MetadataProbe } from './fixtures/MetadataProbe';

const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/** A stored attribute value as text. */
const show = (value: unknown): string => {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }
    return JSON.stringify(value);
};

const textOf = (node: ContentNodeJSON): string => node.text ?? (node.content ?? []).map(textOf).join('');

/** Heading levels, block `lang`, link text and language marks with their `dir`, as the blocks hold them. */
const metadataOf = (blocks: readonly ContentNodeJSON[]): string[] =>
    blocks.flatMap((node): string[] => {
        const own: string[] = [];
        if (node.type === 'heading') {
            own.push(`h${show(node.attrs?.level)} ${textOf(node)}`);
        }
        if (node.attrs?.lang !== undefined && node.attrs.lang !== null) {
            own.push(`${node.type} lang ${show(node.attrs.lang)}`);
        }
        const text = node.text ?? '';
        for (const mark of node.marks ?? []) {
            if (mark.type === 'link') {
                own.push(`link ${show(mark.attrs?.href)} ${text}`);
            }
            if (mark.type === 'language') {
                const lang = show(mark.attrs?.lang);
                own.push(`language ${lang} ${show(mark.attrs?.dir)} ${text}`);
            }
        }
        return [...own, ...metadataOf(node.content ?? [])];
    });

test('keeps heading levels, lang, dir and link text through HTML copy and paste, and the alternative text as text', async ({
    mount,
    page,
}) => {
    await page.route('**/test-assets/**', (route) =>
        route.fulfill({ contentType: 'image/png', body: Buffer.from(PNG, 'base64') }),
    );
    await mount(<MetadataProbe />);
    await expect(page.getByRole('textbox', { name: 'Target' })).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.metadataClip !== undefined)).toBe(true);

    const html = await page.evaluate(() => window.metadataClip?.copy() ?? '');
    const blocks = (await page.evaluate((markup) => window.metadataClip?.paste(markup), html)) as ContentNodeJSON[];

    expect(metadataOf(blocks)).toEqual([
        'h2 Brand guidelines',
        'h3 Colours',
        'paragraph lang de',
        'link https://frontify.com/guide colour guide',
        'language fr ltr bonjour',
        'language he rtl שלום',
    ]);
    expect(blocks.slice(4).map(textOf)).toEqual(['Five swatches from deep blue to sand']);
    await expect(page.getByText('Media not pasted: 2')).toHaveCount(1);
});
