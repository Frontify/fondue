/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { RichTextReader } from '#/entries/reader';
import { decodeDocument, type Diagnostic, type ReferenceResolution } from '#/model';

import { figure, imageModel, para, resolving, storedIn, text } from './fixtures/mount';

const model = imageModel();

const mention = (nodeId: string, resourceId: string, labelSnapshot: string) => ({
    type: 'mention',
    attrs: { nodeId, resourceType: 'user', resourceId, labelSnapshot },
});

type Resolvers = {
    readonly resolveAssetUrl?: (assetId: string, options: { readonly width?: number }) => string | null;
    readonly resolveReference?: (resourceType: string, resourceId: string) => ReferenceResolution;
};

/** The reader's static markup of `blocks` with the resolvers, and the diagnostics it reported. */
const readerOf = (blocks: Parameters<typeof storedIn>[1], resolvers: Resolvers = {}) => {
    const diagnostics: Diagnostic[] = [];
    const markup = renderToStaticMarkup(
        createElement(RichTextReader, {
            document: storedIn(model, blocks),
            model,
            presentation: { styles: [], colorTokens: [], ...resolvers },
            onDiagnostic: (diagnostic) => diagnostics.push(diagnostic),
        }),
    );
    return { markup, diagnostics };
};

/** Every output of `blocks`: the reader, `toHTML`, `toPlainText` and `toMarkdown`, with their diagnostics. */
const outputsOf = (blocks: Parameters<typeof storedIn>[1], resolvers: Resolvers = {}) => {
    const document = storedIn(model, blocks);
    const codecs = createCodecs(model);
    return {
        reader: readerOf(blocks, resolvers),
        html: codecs.toHTML(document, resolvers),
        text: codecs.toPlainText(document),
        markdown: codecs.toMarkdown(document, resolvers),
    };
};

describe('image output', () => {
    it('takes the src from resolveAssetUrl at render time with the intrinsic width, and stores no URL', () => {
        const resolveAssetUrl = vi.fn(resolving);
        const blocks = [figure('image-1')];

        const { reader, html, markdown } = outputsOf(blocks, { resolveAssetUrl });

        expect(reader.markup).toBe(
            '<div class="fondue-rte-content"><figure dir="auto" style="text-align:center"><img src="https://cdn.frontify.test/asset-logo.png?w=40" alt="Frontify logo" width="40" height="30"/><span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">Image unavailable <bdi>logo.png</bdi></span></figure></div>',
        );
        expect(html.html).toBe(reader.markup);
        expect(markdown.markdown).toBe('![Frontify logo](https://cdn.frontify.test/asset-logo.png?w=40)');
        expect(resolveAssetUrl.mock.calls).toEqual([
            ['asset-logo', { width: 40 }],
            ['asset-logo', { width: 40 }],
            ['asset-logo', { width: 40 }],
        ]);
        expect(JSON.stringify(storedIn(model, blocks))).not.toContain('https://');
    });

    it('shows the placeholder with the label where resolveAssetUrl gives a javascript: URL', () => {
        const { reader, html, markdown } = outputsOf([figure('image-1')], {
            resolveAssetUrl: () => 'javascript:alert(1)',
        });

        expect(reader.markup).toBe(
            '<div class="fondue-rte-content"><figure dir="auto" style="text-align:center"><span data-rte-image-unavailable="" data-rte-message="image-unavailable">Image unavailable <bdi>logo.png</bdi></span></figure></div>',
        );
        expect(html.html).toBe(reader.markup);
        expect(markdown.markdown).toBe('');
        expect(reader.markup).not.toContain('javascript:');
    });

    it.each([
        ['returns null', (): string | null => null],
        [
            'throws',
            (): string | null => {
                throw new Error('no asset');
            },
        ],
        ['returns a URL that fails checkHref', (): string | null => 'https://user:secret@cdn.frontify.test/logo.png'],
        ['is not given', undefined],
    ] as const)('shows the localized placeholder with labelSnapshot where resolveAssetUrl %s', (_name, resolve) => {
        const resolvers = resolve === undefined ? {} : { resolveAssetUrl: resolve };
        const { reader, html } = outputsOf([figure('image-1')], resolvers);

        expect(reader.markup).toContain(
            '<span data-rte-image-unavailable="" data-rte-message="image-unavailable">Image unavailable <bdi>logo.png</bdi></span>',
        );
        expect(html.html).toBe(reader.markup);
        expect(reader.diagnostics).toEqual([]);
    });

    it('writes alt="" for a decorative image and the alt text for a meaningful one', () => {
        const blocks = [
            figure('image-1', { altIntent: 'decorative', altText: '' }),
            figure('image-2', { altIntent: 'meaningful', altText: 'Five swatches' }, 'right'),
        ];

        const { reader, html } = outputsOf(blocks, { resolveAssetUrl: resolving });

        expect(reader.markup).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><figure dir="auto" style="text-align:center"><img src="https://cdn.frontify.test/asset-logo.png?w=40" alt="" width="40" height="30"/><span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">Image unavailable <bdi>logo.png</bdi></span></figure><figure dir="auto" style="text-align:right"><img src="https://cdn.frontify.test/asset-logo.png?w=40" alt="Five swatches" width="40" height="30"/><span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">Image unavailable <bdi>logo.png</bdi></span></figure></div>"`,
        );
        expect(html.html).toBe(reader.markup);
    });

    it('writes no alt and no file name for an image whose alternative text is missing', () => {
        const blocks = [figure('image-1', { altIntent: 'missing', altText: '', labelSnapshot: 'IMG_2044.jpg' })];

        const { reader, html, text: plain } = outputsOf(blocks, { resolveAssetUrl: resolving });

        expect(reader.markup).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><figure dir="auto" style="text-align:center"><img src="https://cdn.frontify.test/asset-logo.png?w=40" width="40" height="30"/><span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">Image unavailable <bdi>IMG_2044.jpg</bdi></span></figure></div>"`,
        );
        expect(reader.markup).not.toContain('alt=');
        // Only the placeholder an image that fails to load shows names the file.
        expect(
            reader.markup.replace(
                /<span data-rte-image-unavailable="" data-rte-message="image-unavailable" hidden="">.*?<\/span>/,
                '',
            ),
        ).not.toContain('IMG_2044');
        expect(html.html).toBe(reader.markup);
        expect(plain.text).toBe('');
    });

    it('writes displayWidth as a percent width on the image and the side as text-align, the only styles it writes', () => {
        const blocks = [figure('image-1', { displayWidth: 50 }, 'left'), figure('image-2', { displayWidth: 100 })];

        const { reader, html } = outputsOf(blocks, { resolveAssetUrl: resolving });
        const styles = [...html.html.matchAll(/ style="([^"]*)"/g)].map(([, style]) => style);

        expect(styles).toEqual(['text-align:left', 'width:50%', 'text-align:center', 'width:100%']);
        expect(html.html).not.toMatch(/ (id|class)="(?!fondue-rte-content")/);
        expect(html.html).toBe(reader.markup);
    });

    it('leaves out a figure whose image has no assetId, never resolves it and reports it once in each output', () => {
        const resolveAssetUrl = vi.fn(resolving);
        const blocks = [para(text('Before')), figure('image-1', { assetId: null }), para(text('After'))];

        const { reader, html, text: plain, markdown } = outputsOf(blocks, { resolveAssetUrl });

        expect(reader.markup).toBe(
            '<div class="fondue-rte-content"><p dir="auto">Before</p><p dir="auto">After</p></div>',
        );
        expect(html.html).toBe(reader.markup);
        expect(plain.text).toBe('Before\n\nAfter');
        expect(markdown.markdown).toBe('Before\n\nAfter');
        expect(resolveAssetUrl).not.toHaveBeenCalled();
        const unresolved = (diagnostics: readonly Diagnostic[]) =>
            diagnostics.filter(({ code }) => code === 'codecs.unresolved-asset');
        for (const diagnostics of [reader.diagnostics, html.diagnostics, plain.diagnostics, markdown.diagnostics]) {
            expect(unresolved(diagnostics)).toEqual([
                expect.objectContaining({ severity: 'warning', featureId: 'media.image', path: '/content/content/1' }),
            ]);
        }
    });

    it('falls back only the image and the mention whose resolver throws, and renders the rest', () => {
        const blocks = [
            para(text('Ask '), mention('m-1', 'user-1', 'Ada'), text(' and '), mention('m-2', 'user-2', 'Grace')),
            figure('image-1', { assetId: 'asset-broken' }),
            figure('image-2'),
        ];
        const resolvers: Resolvers = {
            resolveAssetUrl: (assetId, options) => {
                if (assetId === 'asset-broken') {
                    throw new Error('lookup failed');
                }
                return resolving(assetId, options);
            },
            resolveReference: (_type, resourceId) => {
                if (resourceId === 'user-1') {
                    throw new Error('lookup failed');
                }
                return { status: 'current', label: 'Grace Hopper' };
            },
        };

        const { reader, html } = outputsOf(blocks, resolvers);

        expect(reader.markup).toContain('<span data-mention="">@<bdi>Ada</bdi></span>');
        expect(reader.markup).toContain('<span data-mention="">@<bdi>Grace Hopper</bdi></span>');
        expect(reader.markup).toContain(
            '<span data-rte-image-unavailable="" data-rte-message="image-unavailable">Image unavailable <bdi>logo.png</bdi></span>',
        );
        expect(reader.markup).toContain('<img src="https://cdn.frontify.test/asset-logo.png?w=40"');
        expect(html.html).toBe(reader.markup);
    });

    it('escapes an img onerror held in labelSnapshot and altText in the reader and every codec', () => {
        const hostile = '<img src=x onerror=alert(1)>';
        const blocks = [
            figure('image-1', { altIntent: 'meaningful', altText: hostile }),
            figure('image-2', { assetId: 'asset-gone', labelSnapshot: hostile }),
        ];
        const resolvers: Resolvers = {
            resolveAssetUrl: (assetId, options) => (assetId === 'asset-gone' ? null : resolving(assetId, options)),
        };

        const { reader, html, text: plain, markdown } = outputsOf(blocks, resolvers);

        for (const markup of [reader.markup, html.html]) {
            expect(markup).not.toContain('<img src=x');
            expect(markup).toContain('alt="&lt;img src=x onerror=alert(1)&gt;"');
            expect(markup).toContain('<bdi>&lt;img src=x onerror=alert(1)&gt;</bdi>');
        }
        expect(plain.text).toBe(`${hostile}\n\nFrontify logo`);
        // An escaped `<` starts no HTML in CommonMark, so the alt text stays text.
        expect(markdown.markdown).toBe(
            '![\\<img src=x onerror=alert(1)>](https://cdn.frontify.test/asset-logo.png?w=40)',
        );
        const container = document.createElement('div');
        container.innerHTML = reader.markup;
        expect(container.querySelectorAll('img[onerror]')).toHaveLength(0);
        expect(container.querySelectorAll('img')).toHaveLength(1);
    });
});

describe('stored host resources', () => {
    it('keeps URLs with tokens in undeclared image attributes and mention href and src as unknown attributes no output reads', () => {
        const signed = {
            token: 'https://cdn.frontify.test/a.png?token=t1',
            signature: 'https://cdn.frontify.test/a.png?signature=s1',
            'X-Amz-Signature': 'https://cdn.frontify.test/a.png?X-Amz-Signature=s2',
            sig: 'https://cdn.frontify.test/a.png?sig=s3',
        };
        const blocks = [
            para(text('Ask '), {
                type: 'mention',
                attrs: {
                    ...mention('m-1', 'user-1', 'Ada').attrs,
                    href: 'https://frontify.test/users/1',
                    src: 'https://frontify.test/avatar.png',
                },
            }),
            figure('image-1', signed),
        ];
        const resolveAssetUrl = vi.fn(resolving);

        const decoded = decodeDocument(storedIn(model, blocks), model);
        const { reader, html, text: plain, markdown } = outputsOf(blocks, { resolveAssetUrl });

        expect(decoded.status).toBe('editable');
        const unknown = decoded.diagnostics.filter(({ code }) => code === 'format.unknown-attribute');
        expect(unknown.map(({ severity, path }) => [severity, path])).toEqual([
            ['warning', '/content/content/0/content/1/attrs/href'],
            ['warning', '/content/content/0/content/1/attrs/src'],
            ['warning', '/content/content/1/content/0/attrs/token'],
            ['warning', '/content/content/1/content/0/attrs/signature'],
            ['warning', '/content/content/1/content/0/attrs/X-Amz-Signature'],
            ['warning', '/content/content/1/content/0/attrs/sig'],
        ]);
        for (const output of [reader.markup, html.html, plain.text, markdown.markdown]) {
            expect(output).not.toMatch(/token|signature|sig=|users\/1|avatar/i);
        }
        expect(resolveAssetUrl.mock.calls.every(([assetId]) => assetId === 'asset-logo')).toBe(true);
    });
});
